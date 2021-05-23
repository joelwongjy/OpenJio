import { Router } from "express";
import * as AuthController from "../../controllers/AuthController";

export const router = Router();

router.post("/login", AuthController.login);

export default router;
