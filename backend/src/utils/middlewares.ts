import { NextFunction, Request, Response } from 'express';
import { User } from '../database/schemas/User';

export const isAuthenticated = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => (req.user ? next() : res.status(403).send({ msg: 'Unauthorized' }));
//res.redirect(`${process.env.BACK_URL}/api/auth/discord`)

export const haveWallets = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const user = req.user as User;
    if(Array.isArray(user.wallets)){
        if(user.wallets.length == 0){
            return res.send('No wallet found.');
        } else{
            return next();
        } 
    } else{
        return res.send('No wallet found.');
    }
};