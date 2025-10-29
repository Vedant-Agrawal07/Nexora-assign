import mongoose from "mongoose";
import Product from "../models/productModel.js";
import { coreproducts } from "../Coreproducts.js";
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      //
    });

    console.log(`mongo db connection: ${conn.connection.host}`);

    const existingProducts = await Product.find();

    if (existingProducts.length === 0) {
      await Product.insertMany(coreproducts);
    } else {
      console.log("core products already exist");
    }
  } catch (error) {
    console.log(`error is ${error.message}`);
    process.exit();
  }
};

export default connectDb;