import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {SolanaError} from '../errors';

export class TransactionService {
    constructor(private connection: Connection) {
    }

    async requestAirdrop(address: string, amount: number): Promise<string> {
        try {
            const publicKey = new PublicKey(address);
            const signature = await this.connection.requestAirdrop(
                publicKey,
                amount * LAMPORTS_PER_SOL
            );
            await this.connection.confirmTransaction(signature);
            return signature;
        } catch (error: any) {
            throw new SolanaError(`Airdrop failed: ${error.message}`);
        }
    }

    async transferSOL(
        from: PublicKey,
        to: PublicKey,
        amount: number
    ): Promise<string> {
        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: from,
                    toPubkey: to,
                    lamports: amount * LAMPORTS_PER_SOL,
                })
            );

            const signature = await this.connection.sendTransaction(transaction, []);
            await this.connection.confirmTransaction(signature);
            return signature;
        } catch (error: any) {
            throw new SolanaError(`Transfer failed: ${error.message}`);
        }
    }
}