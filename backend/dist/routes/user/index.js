"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/user");
const middlewares_1 = require("../../utils/middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.isAuthenticated, user_1.getUserController);
exports.default = router;
