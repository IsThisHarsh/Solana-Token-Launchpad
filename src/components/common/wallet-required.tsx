import {useWallet} from '@solana/wallet-adapter-react';
import {WalletButton} from './wallet-button';

interface WalletRequiredProps {
    children: React.ReactNode;
}

export function WalletRequired({children}: WalletRequiredProps) {
    const {publicKey} = useWallet();

    if (!publicKey) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4">
                <p className="text-lg font-medium">Connect your wallet to continue</p>
                <WalletButton/>
            </div>
        );
    }

    return <>{children}</>;
}