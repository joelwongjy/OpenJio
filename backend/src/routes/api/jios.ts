import { Router } from "express";
import * as JioController from "../../controllers/JioController";
import { checkBearerToken } from "../../middlewares/checkBearerToken";
import { BearerTokenType } from "../../types/tokens";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.get("/:id", JioController.show);
router.get("/user/:id", JioController.showUserJios);
router.post("/create", JioController.create);
router.patch("/:id", JioController.edit);
router.delete("/:id", JioController.remove);

export default router;
