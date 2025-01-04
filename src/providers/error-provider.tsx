import {ReactNode} from 'react';
import {Toaster} from '@/components/ui/toaster';
import {ErrorBoundary} from "@/components/common/error-boundary.tsx";

interface ErrorProviderProps {
    children: ReactNode;
}

export function ErrorProvider({children}: ErrorProviderProps) {
    return (
        <ErrorBoundary>
            {children}
            <Toaster/>
        </ErrorBoundary>
    );
}