import {Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {SolanaError} from '../errors';
import {MAX_AIRDROP_AMOUNT} from '../config';

export class AirdropService {
    constructor(private connection: Connection) {
    }

    async requestAirdrop(address: string, amount: number) {
        try {
            const publicKey = new PublicKey(address);
            const lamports = amount * LAMPORTS_PER_SOL;

            if (amount > MAX_AIRDROP_AMOUNT) {
                throw new SolanaError(
                    `Maximum airdrop amount is ${MAX_AIRDROP_AMOUNT} SOL`,
                    'EXCEED_MAX_AMOUNT'
                );
            }

            const signature = await this.connection.requestAirdrop(publicKey, lamports);
            const latestBlockHash = await this.connection.getLatestBlockhash();

            await this.connection.confirmTransaction({
                blockhash: latestBlockHash.blockhash,
                lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                signature: signature,
            });

            return signature;
        } catch (error) {
            throw new SolanaError('Airdrop failed', 'AIRDROP_ERROR', error);
        }
    }

    async getBalance(address: string): Promise<number> {
        try {
            const publicKey = new PublicKey(address);
            const balance = await this.connection.getBalance(publicKey);
            return balance / LAMPORTS_PER_SOL;
        } catch (error) {
            throw new SolanaError('Failed to get balance', 'BALANCE_ERROR', error);
        }
    }
}