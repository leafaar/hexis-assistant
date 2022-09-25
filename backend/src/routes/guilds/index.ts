import { Router } from "express";
import { getGuildPermissionsController, getGuildsController } from "../../controllers/guilds";
import { isAuthenticated } from "../../utils/middlewares";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);

//This is for the future, I was planning doing a dashboard :D
//api/guilds/123/permissions
router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController)

export default router;
