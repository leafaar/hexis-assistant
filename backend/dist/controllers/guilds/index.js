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
exports.getGuildPermissionsController = exports.getGuildsController = void 0;
const guilds_1 = require("../../services/guilds");
function getGuildsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        try {
            const guilds = yield (0, guilds_1.getMutualGuildsService)(user.id);
            res.send(guilds);
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'Error' });
        }
    });
}
exports.getGuildsController = getGuildsController;
function getGuildPermissionsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const { id } = req.params;
        try {
            const guilds = yield (0, guilds_1.getMutualGuildsService)(user.id);
            const valid = guilds.some((guild) => guild.id === id);
            return valid ? res.sendStatus(200) : res.sendStatus(403);
        }
        catch (error) {
            console.log(error);
            res.status(400).send({ msg: 'Error' });
        }
    });
}
exports.getGuildPermissionsController = getGuildPermissionsController;
