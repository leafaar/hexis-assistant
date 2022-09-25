"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const guilds_1 = require("../../controllers/guilds");
const middlewares_1 = require("../../utils/middlewares");
const router = (0, express_1.Router)();
router.get('/', middlewares_1.isAuthenticated, guilds_1.getGuildsController);
//api/guilds/123/permissions
router.get('/:id/permissions', middlewares_1.isAuthenticated, guilds_1.getGuildPermissionsController);
exports.default = router;
