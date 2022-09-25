"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignTransactionController = exports.verifySignMessagesController = exports.getWalletsController = void 0;
const wallet_1 = require("../../services/wallet");
const getTransaction_1 = require("../../utils/rpc/getTransaction");
const bs58_1 = __importDefault(require("bs58"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
function getWalletsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        try {
            const wallets = yield (0, wallet_1.getWalletsService)(user.id);
            res.send(wallets);
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'Error' });
        }
    });
}
exports.getWalletsController = getWalletsController;
function verifySignMessagesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'POST') {
            const verifyRequest = req.body;
            const user = verifyRequest.user;
            try {
                let cungas = tweetnacl_1.default.sign.detached.verify(Buffer.from(verifyRequest.msg, 'base64'), Buffer.from(verifyRequest.signature, 'base64'), bs58_1.default.decode(verifyRequest.publicKey));
                console.log(cungas);
                yield (0, wallet_1.addWalletService)(user.id, verifyRequest.publicKey.toString());
                res.send({ msg: 'Success!' });
            }
            catch (error) {
                let err = error;
                console.log(error);
                res.status(400).send({ msg: err.message });
            }
        }
    });
}
exports.verifySignMessagesController = verifySignMessagesController;
function verifySignTransactionController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'POST') {
            const verifyRequest = req.body;
            const user = verifyRequest.user;
            try {
                console.log(verifyRequest.txhash);
                const transaction = yield (0, getTransaction_1.getTx)(verifyRequest.txhash);
                if (!transaction) {
                    res.status(400).send({ msg: 'error' });
                    throw new Error('Error during confirming the transaction.');
                }
                if (transaction.result.transaction.message.accountKeys[0] === verifyRequest.publicKey) {
                    yield (0, wallet_1.addWalletService)(user.id, verifyRequest.publicKey.toString());
                    res.send({ msg: 'Success!' });
                }
                else {
                    res.status(400).send({ msg: 'error' });
                }
            }
            catch (error) {
                let err = error;
                console.log(error);
                res.status(400).send({ msg: err.message });
            }
        }
    });
}
exports.verifySignTransactionController = verifySignTransactionController;
