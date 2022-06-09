import { connect } from "mongoose";

export const mongoConnect = async () => {
  try {
    console.log("Conectando ao MongoDB...");
    await connect(process.env.MONGO_URL as string);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro de conexão MongoDB: ", error);
  }
};
