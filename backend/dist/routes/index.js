"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const wallet_1 = __importDefault(require("./wallet"));
const guilds_1 = __importDefault(require("./guilds"));
const user_1 = __importDefault(require("./user"));
const router = (0, express_1.Router)();
router.use('/auth', auth_1.default);
router.use('/wallet', wallet_1.default);
router.use('/user', user_1.default);
router.use('/guilds', guilds_1.default);
exports.default = router;
