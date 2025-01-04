import axios from 'axios';
import {JSON_ACCESS_KEY, JSON_MASTER_KEY} from "@/lib/constants.ts";

export interface TokenMetadata {
    name: string;
    symbol: string;
    description?: string;
    image?: string;
}

export const storeMetadata = async ({name, symbol, description, image}: TokenMetadata): Promise<string> => {
    const API_URL = 'https://api.jsonbin.io/v3/b';

    const metadata: TokenMetadata = {
        name,
        symbol,
        description,
        image
    };

    try {
        const response = await axios.post(API_URL, metadata, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSON_MASTER_KEY,
                'X-Access-Key': JSON_ACCESS_KEY,
                'X-Bin-Private': "false"
            }
        });

        return `https://api.jsonbin.io/v3/b/${response.data.metadata.id}?meta=false`;
    } catch (error) {
        console.error('Failed to store metadata:', error);
        throw new Error('Failed to store metadata');
    }
};