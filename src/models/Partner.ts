import { Schema, Model, model, connection } from "mongoose";

type CoverageAreaType = {
  type: string;
  coordinates: number[][][][];
};

type AddressType = {
  type: string;
  cordinates: number[];
};

export type PartnerType = {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: CoverageAreaType;
  address: AddressType;
};

const GeoCoverageSchema = new Schema(
  {
    type: { type: String, default: "MultiPolygon" },
    coordinates: {
      type: [[[[Number]]]],
      required: true,
    },
  },
  { _id: false }
);

const GeoAddressSchema = new Schema(
  {
    type: { type: String, default: "Point" },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  { _id: false }
);

const schema = new Schema<PartnerType>({
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true },
  coverageArea: GeoCoverageSchema,
  address: GeoAddressSchema,
});

const modelName = "Partner";

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<PartnerType>)
  : model<PartnerType>(modelName, schema);
