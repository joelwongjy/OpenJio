import { Router } from "express";
import * as JioController from "../../controllers/JioController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.get("/", JioController.index);
router.post("/create", JioController.create);

export default router;
