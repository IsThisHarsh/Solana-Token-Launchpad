import {WalletContextState} from "@solana/wallet-adapter-react";
import {Connection, PublicKey} from "@solana/web3.js";

export interface CreateToken {
    wallet: WalletContextState;
    connection: Connection;
    data: TokenData;
}

export interface TokenData {
    name: string;
    symbol: string;
    imageUrl: string;
    uri: string;
    description: string;
    decimals: number;
    supply: number;
    mintAuthority: PublicKey;
    updateAuthority: PublicKey;
    freezeAuthority: PublicKey;
    metadata : []
}