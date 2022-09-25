import { Request, Response } from 'express';
import { User } from '../../database/schemas/User';
import { getUserDiscordService } from '../../services/user';

export async function getUserController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const { data: userInfo } = await getUserDiscordService(user.id);
        res.send(userInfo);
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: 'Error' });
    }
}