import { Router } from "express";
import { getUserController } from "../../controllers/user";
import { isAuthenticated } from "../../utils/middlewares";
const router = Router();

router.get('/', isAuthenticated, getUserController);


export default router;
