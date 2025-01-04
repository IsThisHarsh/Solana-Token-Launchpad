import {clusterApiUrl} from '@solana/web3.js';

export const NETWORK = {
    MAINNET: 'mainnet-beta',
    DEVNET: 'devnet',
    TESTNET: 'testnet',
} as const;

export const ENDPOINTS = {
    [NETWORK.MAINNET]: clusterApiUrl(NETWORK.MAINNET),
    [NETWORK.DEVNET]: clusterApiUrl(NETWORK.DEVNET),
    [NETWORK.TESTNET]: clusterApiUrl(NETWORK.TESTNET),
} as const;

export const CURRENT_NETWORK = NETWORK.DEVNET;
export const CURRENT_ENDPOINT = ENDPOINTS[CURRENT_NETWORK];
export const JSON_ACCESS_KEY="$2a$10$EVqVxo3nSM3R2G8Gw5WQ3.trMibTXPIN2mtfDEoAkd9btyPkxK9x6";
export const JSON_MASTER_KEY="$2a$10$Hw0SSAugCULML/vgeJ0OWOZfi7m9LGK7aLUeaPVGp53iprQZMNM02";