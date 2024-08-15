import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addMyBook, getMyBooks } from "../controllers/userController.js";

router.route('/addMyBook').post(addMyBook);
router.route('/getMyBooks').get(getMyBooks);


export default router;