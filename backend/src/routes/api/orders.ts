import { Router } from "express";
import { BearerTokenType } from "../../types/tokens";
import {
  checkBearerToken,
} from "../../middlewares/checkBearerToken";
import * as OrderController from "../../controllers/OrderController";

export const router = Router();

router.use(checkBearerToken(BearerTokenType.AccessToken));
router.get("/:id", OrderController.show);
router.patch("/:id", OrderController.edit);

export default router;
