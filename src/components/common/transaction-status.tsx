import {CheckCircle2, XCircle} from 'lucide-react';
import {useTheme} from "@/components/theme/ThemeProvider.tsx";

interface TransactionStatusProps {
    success?: boolean;
    signature?: string;
    error?: string;
    token?: boolean;
}

export function TransactionStatus({success, signature, error, token}: TransactionStatusProps) {
    const theme = useTheme();
    if (!success && !error) return null;

    return (
        <div className={`p-4 rounded-lg ${success ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center space-x-3">
                {success ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500"/>
                ) : (
                    <XCircle className="h-5 w-5 text-red-500"/>
                )}
                <div>
                    <p className={`text-sm font-medium ${success ? 'text-green-800' : 'text-red-800'}`}>
                        {success ? 'Transaction Successful' : 'Transaction Failed'}
                    </p>
                    {signature && (
                        <a
                            href={
                                token
                                    ? `https://explorer.solana.com/address/${signature}?cluster=devnet`
                                    : `https://explorer.solana.com/tx/${signature}?cluster=devnet`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-xs text-primary hover:underline ${theme.theme === 'dark' ? 'text-green-800' : ''}`}
                        >
                            View on Explorer
                        </a>
                    )}
                    {error && (
                        <p className="text-xs text-red-600 mt-1">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}