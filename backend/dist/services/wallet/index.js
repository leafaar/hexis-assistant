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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWalletService = exports.getWalletsService = void 0;
const schemas_1 = require("../../database/schemas");
function getWalletsService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield schemas_1.User.findById(id);
        if (!user)
            throw new Error('No user found');
        if (!user.wallets)
            throw new Error('No wallets found');
        return user.wallets;
    });
}
exports.getWalletsService = getWalletsService;
function addWalletService(discordId, wallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield schemas_1.User.findOne({ discordId });
        const anotherUser = yield schemas_1.User.findOne({ wallets: { $all: [wallet] } });
        if (anotherUser) {
            if (anotherUser.discordId !== discordId) {
                throw new Error('Someone already registered this wallet.');
            }
        }
        if (!user)
            throw new Error('No user found');
        if (user.wallets.length === 3)
            throw new Error('You reach the max amount of wallets. (3)');
        if (!user.wallets.some(walletDB => walletDB === wallet)) {
            const existingUser = yield schemas_1.User.findOneAndUpdate({ discordId }, { $push: { wallets: wallet } }, { safe: true, upsert: true });
            if (!existingUser)
                throw new Error('No user found');
            yield (existingUser === null || existingUser === void 0 ? void 0 : existingUser.save());
        }
        else {
            throw new Error('You already registered this wallet.');
        }
    });
}
exports.addWalletService = addWalletService;
