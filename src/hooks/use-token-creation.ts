import {useConnection, useWallet} from '@solana/wallet-adapter-react';
import {useState} from 'react';
import {handleError} from '@/lib/errors';
import {TokenService} from "@/lib/solana/token";
import type {TokenFormValues} from "@/lib/validations/token.ts";
import {ERRORS} from "@/lib/config.ts";

export function useTokenCreation() {
    const {connection} = useConnection();
    const wallet = useWallet();
    const {publicKey, signTransaction} = wallet;
    const [isCreating, setIsCreating] = useState(false);

    async function createToken(data: TokenFormValues) {
        if (!publicKey || !signTransaction) {
            throw new Error(ERRORS.WALLET_NOT_CONNECTED);
        }
        if (!wallet) {
            return;
        }
        setIsCreating(true);

        const tokenService = new TokenService(connection, wallet);

        try {
            const result = await tokenService.createToken(data);

            if (!result) {
                throw new Error("Token creation failed: result is null");
            }

            console.log('Creating token with data:', data);
            return ({
                associatedToken: result.associatedToken,
                mint: result.mint,
            })
        } catch (error) {
            throw handleError(error);
        } finally {
            setIsCreating(false);
        }
    }

    return {
        createToken,
        isCreating,
        isWalletConnected: !!publicKey,
    };
}