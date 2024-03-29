import { Router } from "express";
import * as PartnerController from "../controllers/partnerController";
import * as PartnerValidation from "../validators/PartnerValidator";

const router = Router();

router.get("/ping", PartnerController.ping);

router.get("/partner/:id", PartnerController.getPartner);
router.post(
  "/partner",
  PartnerValidation.addAction,
  PartnerController.addPartner
);
router.get("/closestpartner", PartnerController.getClosestPartner);

export default router;
