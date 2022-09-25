import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { validateCookies } from "./helpers";
import { Guild, SignMessageType, SignTransactionType, User } from "./types";

const environment = process.env.NODE_ENV
const isDevelopment = environment === 'development'
const API_URL = isDevelopment ? `http://localhost:3001` : 'production url';


export const fetchMutualGuilds = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if(!headers) return { redirect: { destination: '/' } };

    try {
        const { data: guilds } = await axios.get<Guild[]>(`${API_URL}/guilds`, { headers });
        console.log(guilds);
        return { props: { guilds } };
    } catch (error) {
        console.log(error);
        return { redirect: { destination: '/' } };
    }
}

export const fetchUser = async (context: GetServerSidePropsContext) => {
    const headers = validateCookies(context);
    if(!headers) return { redirect: { destination: '/discord' } };

    try {
        const { data: user } = await axios.get<User>(`${API_URL}/user`, { headers });
        const { data: wallets } = await axios.get(`${API_URL}/wallet`, { headers });
        user.wallets = wallets;
        console.log(user);
        return { props: { user, wallets } };
    } catch (error) {
        console.log(error);
        return { redirect: { destination: '/' } };
    }
}

export const SignMessageRequest = async (body: SignMessageType) => {
    return await axios.post(`${API_URL}/wallet/signMessage/`, body);
}
export const SignTransactionRequest = async (body: SignTransactionType) => {
    return await axios.post(`${API_URL}/wallet/signTransaction/`, body);
}