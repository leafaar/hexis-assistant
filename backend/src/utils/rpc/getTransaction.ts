import axios from "axios";
import { tx } from "../types";

export const getTransaction = async (signature: string) => {
    const config = {
        headers: {
        "Content-Type": "application/json",
        },
    };
    const r = {
        jsonrpc: "2.0",
        id: 1,
        method: "getTransaction",
        params: [
            signature,
            "json"
        ]
    };
    const { data } : { data: tx } = await axios.post("https://api.mainnet-beta.solana.com", r, config);
    return data;
}

export const getSignatureStatuses = async (signature: string) => {
    const config = {
        headers: {
        "Content-Type": "application/json",
        },
    };
    const r = {
        jsonrpc: "2.0",
        id: 1,
        method: "getSignatureStatuses",
        params: [
            [signature],
            {
                searchTransactionHistory: true  
            }
        ]
    };
    const { data } = await axios.post("https://api.mainnet-beta.solana.com", r, config);
    return data;
}

export const getTx = async (signature: string) => {
    let confirmations = "confirmed";
    try {
        while(confirmations === "confirmed"){
            await new Promise<void>(done => setTimeout(() => done(), 5000));  
            const status = await getSignatureStatuses(signature);
            confirmations = status.result.value[0].confirmationStatus;
        }
        const tx = await getTransaction(signature);
        return tx as tx;
    } catch (error) {
        console.log(`Error trying to get the transaction status: ${error}`);
        return null;
    }
}
