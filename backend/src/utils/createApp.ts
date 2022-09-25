import { config } from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
import store from 'connect-mongo';

config();
require('../strategies/discord');

export function createApp(): Express {
    const app = express();
    //Enable parsing middleware for requests
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Enable CORS
    app.use(cors({ origin: [`${process.env.FRONT_URL}`], credentials: true }));

    //Enable sessions
    app.use(
        session({
            secret: '864D16A1F101274241C298C2E20F3EB45BABBAA35CEAA73FAC332F0B1E5F1702',
            resave: false,
            saveUninitialized: false,
            cookie: { maxAge: 60000 * 60 * 24 * 7 },
            store: store.create({ 
                mongoUrl: process.env.MONGO_URL as string
            }),
        })
    );

    //Enable passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', routes);
    return app;
}