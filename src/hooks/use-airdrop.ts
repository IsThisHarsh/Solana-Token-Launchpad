import {useState} from 'react';
import {AirdropService} from '@/lib/solana/airdrop';
import {useToast} from '@/hooks/use-toast';
import {useSolanaConnection} from '@/hooks/use-solana-connection.ts';
import {SolanaError} from "@/lib/errors.ts";

export function useAirdrop() {
    const {connection, handleError} = useSolanaConnection();
    const {toast} = useToast();
    const [isAirdropping, setIsAirdropping] = useState(false);

    async function requestAirdrop(address: string, amount: number) {
        if (!connection) {
            toast({
                variant: 'destructive',
                title: 'Airdrop Failed',
                description: 'No Solana connection available. Please try again later.',
            });
            throw new SolanaError('No Solana connection available');
        }

        setIsAirdropping(true);
        const airdropService = new AirdropService(connection);

        try {
            const signature = await airdropService.requestAirdrop(address, amount);

            toast({
                title: 'Airdrop Successful',
                description: `${amount} SOL has been airdropped to your wallet`,
            });

            return signature;
        } catch (error) {
            const handled = handleError(error);
            toast({
                variant: 'destructive',
                title: 'Airdrop Failed',
                description: handled.message,
            });
            throw handled;
        } finally {
            setIsAirdropping(false);
        }
    }

    return {
        requestAirdrop,
        isAirdropping,
    };
}
