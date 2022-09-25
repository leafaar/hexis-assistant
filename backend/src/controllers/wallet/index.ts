import { Request, Response } from 'express';
import { addWalletService, getWalletsService } from '../../services/wallet';
import { SignMessageType, SignTransactionType, tx } from '../../utils/types';
import { User } from '../../database/schemas/User';
import { getTx } from '../../utils/rpc/getTransaction';
import base58 from 'bs58';
import nacl from 'tweetnacl'

export async function getWalletsController(req: Request, res: Response) {
    const user = req.user as User;
    try {
        const wallets = await getWalletsService(user.id);
        res.send(wallets);
    } catch (error) {
        console.log(error);
        res.status(400).send({ msg: 'Error' });
    }
}
export async function verifySignMessagesController(req: Request, res: Response) {
    if(req.method === 'POST'){
        const verifyRequest = req.body as SignMessageType;
        const user = verifyRequest.user;
        try {
            const verifyWallet = nacl.sign.detached.verify(Buffer.from(verifyRequest.msg, 'base64'), Buffer.from(verifyRequest.signature, 'base64'), base58.decode(verifyRequest.publicKey));
            if(verifyWallet){
                await addWalletService(user.id, verifyRequest.publicKey.toString());
                res.send({ msg: 'Success!' });
            }else{
                res.status(400).send({ msg: "Error" });
            }
        } catch (error) {
            let err = error as Error;
            console.log(error);
            res.status(400).send({ msg: err.message });
        }
    }
}

export async function verifySignTransactionController(req: Request, res: Response) {
    if(req.method === 'POST'){
        const verifyRequest = req.body as SignTransactionType;
        const user = verifyRequest.user;
        try {
            console.log(verifyRequest.txhash);
            const transaction = await getTx(verifyRequest.txhash);
            if(!transaction){
                res.status(400).send({ msg: 'error' });
                throw new Error('Error during confirming the transaction.')
            }
            if(transaction.result.transaction.message.accountKeys[0] === verifyRequest.publicKey){
                await addWalletService(user.id, verifyRequest.publicKey.toString());
                res.send({ msg: 'Success!' });
            } else {
                res.status(400).send({ msg: 'error' });
            }
        } catch (error) {
            let err = error as Error;
            console.log(error);
            res.status(400).send({ msg: err.message });
        }
    }
}
