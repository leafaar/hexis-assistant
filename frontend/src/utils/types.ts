import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type Guild = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: string;
    features: string[];
};

export type SignMessageType = {
    msg: any;
    signature: any;
    publicKey: any;
    user: User;
};

export type SignTransactionType = {
    txhash: string;
    publicKey: any;
    user: User;
};

export type User = {
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
    wallets: string[]
};

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;

}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}