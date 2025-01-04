import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {useCallback} from 'react';
import {ERRORS} from '@/lib/config';
import {handleError} from "@/lib/errors.ts";

export function useSolanaConnection() {
    const {connection} = useConnection();
    const {publicKey, signTransaction} = useWallet();

    const requireWallet = useCallback(() => {
        if (!publicKey || !signTransaction) {
            throw new Error(ERRORS.WALLET_NOT_CONNECTED);
        }
        return {publicKey, signTransaction};
    }, [publicKey, signTransaction]);

    return {
        connection,
        requireWallet,
        handleError,
    };
}