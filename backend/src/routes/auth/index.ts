import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => 
    res.send(200)
);

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => 
    res.redirect(`${process.env.FRONT_URL}`)
);

router.get('/status', (req, res) => {
    return req.user ? res.send(req.user) : res.redirect(`${process.env.BACK_URL}/auth/discord`);
});

export default router;