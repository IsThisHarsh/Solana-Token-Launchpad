import {Loader2} from 'lucide-react';

interface LoadingOverlayProps {
    loading: boolean;
    message?: string;
}

export function LoadingOverlay({loading, message}: LoadingOverlayProps) {
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto"/>
                {message && (
                    <p className="text-sm text-muted-foreground">{message}</p>
                )}
            </div>
        </div>
    );
}