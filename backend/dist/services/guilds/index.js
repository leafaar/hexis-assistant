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
exports.getMutualGuildsService = exports.getUserGuildsService = exports.getBotGuildsService = void 0;
const axios_1 = __importDefault(require("axios"));
const schemas_1 = require("../../database/schemas");
const constants_1 = require("../../utils/constants");
function getBotGuildsService() {
    const TOKEN = process.env.DISCORD_BOT_TOKEN;
    return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${TOKEN}` },
    });
}
exports.getBotGuildsService = getBotGuildsService;
function getUserGuildsService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield schemas_1.User.findById(id);
        if (!user)
            throw new Error('No user found');
        return axios_1.default.get(`${constants_1.DISCORD_API_URL}/users/@me/guilds`, {
            headers: { Authorization: `Bearer ${user.accessToken}` },
        });
    });
}
exports.getUserGuildsService = getUserGuildsService;
function getMutualGuildsService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data: botGuilds } = yield getBotGuildsService();
        const { data: userGuilds } = yield getUserGuildsService(id);
        const adminUserGuilds = userGuilds.filter(({ permissions }) => (parseInt(permissions) & 0x8) === 0x8);
        console.log(adminUserGuilds);
        return adminUserGuilds.filter((guild) => botGuilds.some((botGuild) => botGuild.id === guild.id));
    });
}
exports.getMutualGuildsService = getMutualGuildsService;
