import {PublicKey} from '@solana/web3.js';

export function isValidSolanaAddress(address: string): boolean {
    try {
        new PublicKey(address);
        return true;
    } catch {
        return false;
    }
}

export function validateImageFile(file: File): string | null {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
        return 'Invalid file type. Please upload a JPG, PNG, or GIF.';
    }

    if (file.size > maxSize) {
        return 'File is too large. Maximum size is 5MB.';
    }

    return null;
}