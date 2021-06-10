import { Router } from "express";
import * as JioController from "../../controllers/JioController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

//router.use(checkBearerToken(BearerTokenType.AccessToken));
router.get("/", JioController.index);
router.get("/:id", JioController.show);
router.post("/create", JioController.create);
router.delete("/:id", JioController.remove);

export default router;
