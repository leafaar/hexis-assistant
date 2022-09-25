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
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const schemas_1 = require("../database/schemas");
passport_1.default.serializeUser((user, done) => {
    return done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield schemas_1.User.findById(id);
        return user ? done(null, user) : done(null, null);
    }
    catch (error) {
        console.log(error);
        return done(error, null);
    }
}));
passport_1.default.use(new passport_discord_1.Strategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify', 'guilds'],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(accessToken, refreshToken);
    console.log(profile);
    const { id: discordId } = profile;
    try {
        const existingUser = yield schemas_1.User.findOneAndUpdate({ discordId }, { accessToken, refreshToken }, { new: true });
        console.log(`Existing user: ${existingUser}`);
        if (existingUser)
            return done(null, existingUser);
        const newUser = new schemas_1.User({ discordId, accessToken, refreshToken });
        const savedUser = yield newUser.save();
        return done(null, savedUser);
    }
    catch (error) {
        console.log(error);
        return done(error, undefined);
    }
})));
