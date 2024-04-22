import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const getBalance = async (pubkey: PublicKey, isMainnet: boolean) => {
    const connection = new Connection(
        isMainnet
            ? process.env.NEXT_PUBLIC_HELIUS_RPC_MAINNET!
            : process.env.NEXT_PUBLIC_HELIUS_RPC_DEVNET!
    );

    const balance = await connection.getBalance(pubkey);
    return balance / LAMPORTS_PER_SOL;
}

export { getBalance }