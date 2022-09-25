"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const routes_1 = __importDefault(require("../routes"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
(0, dotenv_1.config)();
require('../strategies/discord');
function createApp() {
    const app = (0, express_1.default)();
    //Enable parsing middleware for requests
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    //Enable CORS
    app.use((0, cors_1.default)({ origin: [`${process.env.FRONT_URL}`], credentials: true }));
    //Enable sessions
    app.use((0, express_session_1.default)({
        secret: '864D16A1F101274241C298C2E20F3EB45BABBAA35CEAA73FAC332F0B1E5F1702',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60000 * 60 * 24 * 7 },
        store: connect_mongo_1.default.create({
            mongoUrl: process.env.MONGO_URL
        }),
    }));
    //Enable passport
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/', routes_1.default);
    return app;
}
exports.createApp = createApp;
