import { Router } from "express";
const router = Router();
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addLibrarian } from "../controllers/adminController.js";

router.post('/addLibrarian', authMiddleware(['admin']), addLibrarian);




export default router;