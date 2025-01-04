export class SolanaError extends Error {
    constructor(
        message: string,
        public code?: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'SolanaError';
    }
}

export class WalletError extends Error {
    constructor(
        message: string,
        public code?: string,
        public details?: unknown
    ) {
        super(message);
        this.name = 'WalletError';
    }
}

export function handleError(error: unknown): Error {
    if (error instanceof SolanaError || error instanceof WalletError) {
        return error;
    }

    if (error instanceof Error) {
        return new SolanaError(error.message);
    }

    return new SolanaError('An unknown error occurred');
}