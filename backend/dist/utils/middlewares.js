"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.haveWallets = exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => (req.user ? next() : res.status(403).send({ msg: 'Unauthorized' }));
exports.isAuthenticated = isAuthenticated;
//res.redirect(`${process.env.BACK_URL}/api/auth/discord`)
const haveWallets = (req, res, next) => {
    const user = req.user;
    if (Array.isArray(user.wallets)) {
        if (user.wallets.length == 0) {
            return res.send('No wallet found.');
        }
        else {
            return next();
        }
    }
    else {
        return res.send('No wallet found.');
    }
};
exports.haveWallets = haveWallets;
