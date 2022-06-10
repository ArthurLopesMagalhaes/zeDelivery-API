import { shorterDistance } from "../helpers/distanceCalculation";
import pointInPolygon from "point-in-polygon";
import Partner, { PartnerType } from "../models/Partner";

export const createPartner = async (
  tradingName: string,
  ownerName: string,
  document: string,
  coverageArea: number[][][][],
  address: number[]
) => {
  const hasPartner = await Partner.findOne({ document });
  if (hasPartner) {
    return new Error("Partner already exists");
  }

  const newPartner = await Partner.create({
    tradingName,
    ownerName,
    document,
    coverageArea,
    address,
  });

  return newPartner._id;
};

export const findPartnerById = async (id: string) => {
  const partner = await Partner.findById(id);
  if (!partner) {
    return new Error("Parceiro não encontrado");
  }
  return partner;
};

export const findClosestPartner = async (long: number, lat: number) => {
  const partner: PartnerType[] = await Partner.find({});

  if (!partner) {
    return new Error("Partner not found");
  }

  let partnersCoverThePoint: PartnerType[] = [];
  let nearestPartner: PartnerType | undefined = undefined;

  partner.forEach((item) => {
    // partner.filter()
    for (let i in item.coverageArea.coordinates[0]) {
      if (pointInPolygon([long, lat], item.coverageArea.coordinates[0][i])) {
        partnersCoverThePoint.push(item);
      }
    }
  });

  partnersCoverThePoint.forEach((item) => {
    let lowerDistance: number = 99999;
    let distance = shorterDistance(
      long,
      lat,
      item.address.coordinates[0],
      item.address.coordinates[1]
    );

    if (distance < lowerDistance) {
      nearestPartner = item;
      lowerDistance = distance;
    }
  });

  return nearestPartner;
};
