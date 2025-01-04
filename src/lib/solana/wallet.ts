import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

export const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
];