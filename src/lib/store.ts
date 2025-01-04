import {create} from 'zustand';
import {Connection, PublicKey} from '@solana/web3.js';

interface WalletState {
    connection: Connection | null;
    publicKey: PublicKey | null;
    connected: boolean;
    setConnection: (connection: Connection) => void;
    setPublicKey: (publicKey: PublicKey | null) => void;
    setConnected: (connected: boolean) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
    connection: null,
    publicKey: null,
    connected: false,
    setConnection: (connection) => set({connection}),
    setPublicKey: (publicKey) => set({publicKey}),
    setConnected: (connected) => set({connected}),
}));