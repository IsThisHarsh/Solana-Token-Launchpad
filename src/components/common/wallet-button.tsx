import {useWallet} from '@solana/wallet-adapter-react';
import {useWalletModal} from '@solana/wallet-adapter-react-ui';
import {useEffect, useState} from 'react';
import {useWalletStore} from "@/lib/store";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Loader2, ChevronDown, Power, Copy, ExternalLink} from "lucide-react";
import {
    DropdownMenuTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown.tsx";

export function WalletButton() {
    const {
        publicKey,
        connected,
        connecting,
        disconnecting,
        disconnect,
        wallets
    } = useWallet();
    const {setVisible} = useWalletModal();
    const {setPublicKey, setConnected} = useWalletStore();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setPublicKey(publicKey);
        setConnected(connected);
    }, [publicKey, connected, setPublicKey, setConnected]);

    // Handle copy address
    const copyAddress = async () => {
        if (publicKey) {
            await navigator.clipboard.writeText(publicKey.toString());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Get shortened address
    const shortenAddress = (address: string) => {
        return `${address.slice(0, 4)}...${address.slice(-4)}`;
    };

    // Get button text based on wallet state
    const getButtonText = () => {
        if (connecting) return "Connecting...";
        if (disconnecting) return "Disconnecting...";
        if (connected) return shortenAddress(publicKey!.toString());
        return "Connect Wallet";
    };

    // Handle wallet selection
    const handleWalletSelect = () => {
        setVisible(true);
    };

    // View on Explorer link
    const explorerUrl = publicKey
        ? `https://explorer.solana.com/address/${publicKey.toString()}?cluster=devnet`
        : "";

    if (connected) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="default"
                        className={cn(
                            "inline-flex items-center gap-2",
                            connecting || disconnecting ? "opacity-50 cursor-not-allowed" : ""
                        )}
                        disabled={connecting || disconnecting}
                    >
                        {connecting && <Loader2 className="h-4 w-4 animate-spin"/>}
                        {getButtonText()}
                        <ChevronDown className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={copyAddress}>
                        <Copy className="mr-2 h-4 w-4"/>
                        {copied ? "Copied!" : "Copy Address"}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4"/>
                            View on Explorer
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={disconnect}
                        className="text-red-600 focus:text-red-600"
                    >
                        <Power className="mr-2 h-4 w-4"/>
                        Disconnect
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="default"
                    className={cn(
                        "inline-flex items-center gap-2",
                        connecting ? "opacity-50 cursor-not-allowed" : ""
                    )}
                    disabled={connecting}
                >
                    {connecting && <Loader2 className="h-4 w-4 animate-spin"/>}
                    {getButtonText()}
                    <ChevronDown className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {wallets.map((wallet) => (
                    <DropdownMenuItem
                        key={wallet.adapter.name}
                        onClick={() => handleWalletSelect()}
                    >
                        {wallet.adapter.icon && (
                            <img
                                src={wallet.adapter.icon}
                                alt={`${wallet.adapter.name} icon`}
                                className="mr-2 h-4 w-4"
                            />
                        )}
                        {wallet.adapter.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};