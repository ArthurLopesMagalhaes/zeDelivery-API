import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";

import * as partnerService from "../services/partnerServices";

export const ping = async (req: Request, res: Response) => {
  return res.json({ pong: true });
};

export const addPartner = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.mapped() });
  }
  const { tradingName, ownerName, document } = req.body;
  const coverageArea: number[][][][] = req.body.coverageArea;
  const address: number[] = req.body.address;

  try {
    const newPartner = await partnerService.createPartner(
      tradingName,
      ownerName,
      document,
      coverageArea,
      address
    );

    if (newPartner instanceof Error) {
      return res.json({ error: newPartner.message });
    }

    return res.json({ newPartner });
  } catch (error) {
    console.log(error);
  }
};

export const getPartner = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  console.log(id);

  try {
    const partner = await partnerService.findPartnerById(id);
    if (partner instanceof Error) {
      return res.json({ error: partner.message });
    }

    return res.json({ partner });
  } catch (error) {
    return res.json({ error });
  }
};

export const getClosestPartner = async (req: Request, res: Response) => {
  const long = Number(req.query.long);
  const lat = Number(req.query.lat);

  try {
    const partner = await partnerService.findClosestPartner(long, lat);
    if (partner instanceof Error) {
      return res.json({ error: partner.message });
    }

    return res.json({ partner });
  } catch (error) {
    return res.json({ error });
  }
};
