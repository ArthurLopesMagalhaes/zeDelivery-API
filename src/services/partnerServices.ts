import Partner from "../models/Partner";

export const createPartner = async (body: any) => {
  const hasPartner = await Partner.findOne({ document: body.document });
  if (hasPartner) {
    return new Error("Partner already exists");
  }

  const newPartner = Partner.create(body);

  return newPartner;
};

export const findPartnerById = async (id: string) => {
  const partner = await Partner.findById(id);

  if (!partner) {
    return new Error("Parceiro não encontrado");
  }
  return partner;
};
