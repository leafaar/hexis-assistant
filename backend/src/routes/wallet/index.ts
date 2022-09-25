import { Router } from "express";
import { getWalletsController, verifySignMessagesController, verifySignTransactionController } from "../../controllers/wallet";
import { haveWallets, isAuthenticated } from "../../utils/middlewares";
const router = Router();

router.get('/', isAuthenticated, haveWallets, getWalletsController);
router.post('/signMessage/', verifySignMessagesController);
router.post('/signTransaction/', verifySignTransactionController);



export default router;
