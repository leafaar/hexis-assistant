export type PartialGuild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
};

export type UserDiscord = {
    id: string;
    username: string;
    discriminator: string;
    avatar: boolean;
    email: string;
    flags: string;
    banner: string;
    accent_color: string;
    premium_type: string;
    public_flags: string;
};

export type SignMessageType = {
    msg: any;
    signature: any;
    publicKey: any;
    user: UserDiscord;

}

export type SignTransactionType = {
    txhash: string;
    user: UserDiscord;
    publicKey: any;
};

export interface tx {
    status: Status;
    meta: Meta;
    header: Header;
    instruction: Instruction;
    message: Message;
    transaction: Transaction;
    result: Result;
}

export interface Status {
    Ok?: any;
}

export interface Meta {
    err?: any;
    fee: number;
    innerInstructions: any[];
    logMessages: string[];
    postBalances: number[];
    postTokenBalances: any[];
    preBalances: number[];
    preTokenBalances: any[];
    rewards: any[];
    status: Status;
}

export interface Header {
    numReadonlySignedAccounts: number;
    numReadonlyUnsignedAccounts: number;
    numRequiredSignatures: number;
}

export interface Instruction {
    accounts: number[];
    data: string;
    programIdIndex: number;
}

export interface Message {
    accountKeys: string[];
    header: Header;
    instructions: Instruction[];
    recentBlockhash: string;
}

export interface Transaction {
    message: Message;
    signatures: string[];
}

export interface Result {
    blockTime: number;
    meta: Meta;
    slot: number;
    transaction: Transaction;
}

export interface RootObject {
    jsonrpc: string;
    result: Result;
    id: number;
}