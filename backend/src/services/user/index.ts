import axios from 'axios';
import { User } from '../../database/schemas'
import { DISCORD_API_URL } from '../../utils/constants';
import { UserDiscord } from '../../utils/types';

export async function getUserDiscordService(id: string) {
    const user = await User.findById(id);
    if(!user) throw new Error('No user found');
    return axios.get<UserDiscord>(`${DISCORD_API_URL}/users/@me`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
    });  
}