import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
    console.log("lien ket CSDL thanh cong");
  } catch (error) {
    console.error("Loi khi ket noi CSDL:", error);
    process.exit(1);
  }
};
