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
exports.getUserDiscordService = void 0;
const axios_1 = __importDefault(require("axios"));
const schemas_1 = require("../../database/schemas");
const constants_1 = require("../../utils/constants");
function getUserDiscordService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield schemas_1.User.findById(id);
        if (!user)
            throw new Error('No user found');
        return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });
    });
}
exports.getUserDiscordService = getUserDiscordService;
