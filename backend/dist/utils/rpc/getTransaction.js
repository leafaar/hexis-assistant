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
exports.getTx = exports.getSignatureStatuses = exports.getTransaction = void 0;
const axios_1 = __importDefault(require("axios"));
const getTransaction = (signature) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { data } = yield axios_1.default.post("https://api.mainnet-beta.solana.com", r, config);
    return data;
});
exports.getTransaction = getTransaction;
const getSignatureStatuses = (signature) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { data } = yield axios_1.default.post("https://api.mainnet-beta.solana.com", r, config);
    return data;
});
exports.getSignatureStatuses = getSignatureStatuses;
const getTx = (signature) => __awaiter(void 0, void 0, void 0, function* () {
    let confirmations = "confirmed";
    try {
        while (confirmations === "confirmed") {
            yield new Promise(done => setTimeout(() => done(), 5000));
            const status = yield (0, exports.getSignatureStatuses)(signature);
            confirmations = status.result.value[0].confirmationStatus;
        }
        const tx = yield (0, exports.getTransaction)(signature);
        return tx;
    }
    catch (error) {
        console.log(`Erro tentando pegar o Status de uma transação: ${error}`);
        return null;
    }
});
exports.getTx = getTx;
