import { Router } from "express";
import * as PartnerController from "../controllers/partnerController";
import * as PartnerValidation from "../validators/PartnerValidator";

const router = Router();

router.get("/ping", PartnerController.ping);

router.get("/partner", PartnerController.getPartner);
router.post(
  "/partner",
  PartnerValidation.addAction,
  PartnerController.addPartner
);
router.get("/partnerr", PartnerController.getClosestPartner);

export default router;
