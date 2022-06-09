import { checkSchema } from "express-validator";

export const addAction = checkSchema({
  tradingName: {
    notEmpty: true,
    trim: true,
    errorMessage: "Trading name is required",
  },
  ownerName: {
    notEmpty: true,
    trim: true,
    errorMessage: "Owner name is required",
  },
  document: {
    notEmpty: true,
    errorMessage: "Document is required",
  },
  "coverageArea.type": {
    optional: true,
  },
  "coverageArea.coordinates": {
    matches: {
      options: [
        /\[\[\[\[[^\]]*\],.*\[[^\]]*\],.*\[[^\]]*\],.*\[[^\]]*\]].*,/i,
        "g",
      ],
    },
    notEmpty: true,
    errorMessage: "Coverage area is required / Wrong pattern",
  },
  "address.type": {
    optional: true,
  },
  "address.coordinates": {
    isArray: {
      options: {
        min: 2,
        max: 2,
      },
      errorMessage: "Address coordinates must have 2 entrys",
    },
  },
});
