import {Connection, Keypair, PublicKey, SystemProgram, Transaction} from '@solana/web3.js';
import {
    AuthorityType,
    createAssociatedTokenAccountInstruction,
    createInitializeMetadataPointerInstruction,
    createInitializeMintInstruction,
    createMintToInstruction,
    createSetAuthorityInstruction,
    ExtensionType,
    getAssociatedTokenAddressSync,
    getMintLen,
    LENGTH_SIZE,
    TOKEN_2022_PROGRAM_ID,
    TYPE_SIZE
} from "@solana/spl-token";
import {createInitializeInstruction, InitializeInstructionArgs, pack} from "@solana/spl-token-metadata";
import {WalletContextState} from "@solana/wallet-adapter-react";
import type {TokenFormValues} from "@/lib/validations/token";
import {ERRORS} from "@/lib/config";
import {storeMetadata, TokenMetadata} from "@/lib/json";

interface CreateTokenResult {
    mint: PublicKey;
    associatedToken: PublicKey;
    transactions: string[];
}

interface TokenMetadataInfo {
    metadata: any;
    uri: string;
    mintLen: number;
    metadataLen: number;
}

export class TokenService {
    private readonly connection: Connection;
    private readonly wallet: WalletContextState;

    constructor(connection: Connection, wallet: WalletContextState) {
        this.connection = connection;
        this.wallet = wallet;
    }

    private checkWalletConnection() {
        if (!this.wallet.publicKey) {
            throw new Error(ERRORS.WALLET_NOT_CONNECTED);
        }
        if (!this.wallet.signTransaction) {
            throw new Error(ERRORS.WALLET_NOT_CONNECTED);
        }
    }

    private async prepareMetadata(data: TokenFormValues, mintKeypair: Keypair): Promise<TokenMetadataInfo> {
        const payload: TokenMetadata = {
            name: data.name,
            symbol: data.symbol,
            description: data.description,
            image: data.image
        };

        const uri = await storeMetadata(payload);
        const metadata = {
            name: data.name,
            symbol: data.symbol,
            mint: mintKeypair.publicKey,
            uri: uri,
            additionalMetadata: [],
        };

        const mintLen = getMintLen([ExtensionType.MetadataPointer]);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        return {metadata, uri, mintLen, metadataLen};
    }

    private async calculateRentExemption(mintLen: number, metadataLen: number): Promise<number> {
        return await this.connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
    }

    private createInitialTransaction(
        mintKeypair: Keypair,
        data: TokenFormValues,
        metadataInfo: TokenMetadataInfo,
        lamports: number,
        dummyUpdateAuthority?: Keypair,
    ): Transaction {

        return new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: this.wallet.publicKey!,
                newAccountPubkey: mintKeypair.publicKey,
                space: metadataInfo.mintLen,
                lamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(
                mintKeypair.publicKey,
                this.wallet.publicKey!,
                mintKeypair.publicKey,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeMintInstruction(
                mintKeypair.publicKey,
                data.decimals,
                this.wallet.publicKey!,
                this.wallet.publicKey!,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: mintKeypair.publicKey,
                metadata: mintKeypair.publicKey,
                name: metadataInfo.metadata.name,
                symbol: metadataInfo.metadata.symbol,
                uri: metadataInfo.uri,
                mintAuthority: this.wallet.publicKey!,
                updateAuthority: dummyUpdateAuthority ? dummyUpdateAuthority.publicKey : this.wallet.publicKey!,
            } as InitializeInstructionArgs)
        );
    }

    private async removeDummyAccount(dummyAccount: PublicKey): Promise<void> {
        const connection = this.connection;
        const wallet = this.wallet;

        const balance = await connection.getBalance(dummyAccount);

        if (balance > 0) {
            const transaction = new Transaction();
            transaction.add(
                SystemProgram.transfer({
                    fromPubkey: dummyAccount,
                    toPubkey: wallet.publicKey!,
                    lamports: balance,
                })
            );

            await this.sendAndConfirmTransaction(transaction);
        }
    }

    private async sendAndConfirmTransaction(
        transaction: Transaction,
        signers?: Keypair[]
    ): Promise<string> {
        const {blockhash, lastValidBlockHeight} = await this.connection.getLatestBlockhash();
        if (!blockhash) throw new Error('Failed to get blockhash');

        transaction.recentBlockhash = blockhash;
        transaction.feePayer = this.wallet.publicKey!;

        if (signers?.length) {
            transaction.partialSign(...signers);
        }

        const txId = await this.wallet.sendTransaction(transaction, this.connection);
        await this.connection.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature: txId
        });

        return txId;
    }

    private createAssociatedTokenAccount(
        mintPubkey: PublicKey,
    ): { transaction: Transaction, address: PublicKey } {
        const associatedToken = getAssociatedTokenAddressSync(
            mintPubkey,
            this.wallet.publicKey!,
            false,
            TOKEN_2022_PROGRAM_ID
        );

        const transaction = new Transaction().add(
            createAssociatedTokenAccountInstruction(
                this.wallet.publicKey!,
                associatedToken,
                this.wallet.publicKey!,
                mintPubkey,
                TOKEN_2022_PROGRAM_ID
            )
        );

        return {transaction, address: associatedToken};
    }

    private createMintTransaction(
        mintPubkey: PublicKey,
        associatedToken: PublicKey,
        supply: number
    ): Transaction {
        return new Transaction().add(
            createMintToInstruction(
                mintPubkey,
                associatedToken,
                this.wallet.publicKey!,
                supply * 1000000000,
                [],
                TOKEN_2022_PROGRAM_ID
            )
        );
    }

    private createRevokeAuthoritiesTransaction(
        mintPubkey: PublicKey,
        data: TokenFormValues
    ): Transaction {
        const transaction = new Transaction();

        if (data.revokeFreeze) {
            transaction.add(
                createSetAuthorityInstruction(
                    mintPubkey,
                    this.wallet.publicKey!,
                    AuthorityType.FreezeAccount,
                    null,
                    [],
                    TOKEN_2022_PROGRAM_ID
                )
            );
        }

        if (data.revokeMint) {
            transaction.add(
                createSetAuthorityInstruction(
                    mintPubkey,
                    this.wallet.publicKey!,
                    AuthorityType.MintTokens,
                    null,
                    [],
                    TOKEN_2022_PROGRAM_ID
                )
            );
        }

        return transaction;
    }

    async createToken(data: TokenFormValues): Promise<CreateTokenResult | null> {
        try {
            this.checkWalletConnection();

            const mintKeypair = Keypair.generate();
            const dummyUpdateAuthority = Keypair.generate();

            const metadataInfo = await this.prepareMetadata(data, mintKeypair);

            const lamports = await this.calculateRentExemption(
                metadataInfo.mintLen,
                metadataInfo.metadataLen
            );

            // Create and send initial transaction
            const initialTx = data.revokeUpdate
                ? this.createInitialTransaction(mintKeypair, data, metadataInfo, lamports, dummyUpdateAuthority)
                : this.createInitialTransaction(mintKeypair, data, metadataInfo, lamports);

            const txId = await this.sendAndConfirmTransaction(initialTx, [mintKeypair]);

            // Create associated token account
            const {transaction: ataTx, address: associatedToken} =
                this.createAssociatedTokenAccount(mintKeypair.publicKey);
            const tx2Id = await this.sendAndConfirmTransaction(ataTx);

            // Mint tokens
            const mintTx = this.createMintTransaction(
                mintKeypair.publicKey,
                associatedToken,
                data.supply
            );
            const tx3Id = await this.sendAndConfirmTransaction(mintTx);

            // Revoke authorities if requested
            const revokeTx = this.createRevokeAuthoritiesTransaction(mintKeypair.publicKey, data);
            const tx4Id = await this.sendAndConfirmTransaction(revokeTx);
            await this.removeDummyAccount(dummyUpdateAuthority.publicKey)

            return {
                mint: mintKeypair.publicKey,
                associatedToken,
                transactions: [txId, tx2Id, tx3Id, tx4Id]
            };

        } catch (error) {
            console.error('Unexpected error in createToken:', error);
            return null;
        }
    }
}