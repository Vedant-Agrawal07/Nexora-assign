import mongoose from "mongoose";

const productModel = mongoose.Schema({
  image: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  rating: {
    stars: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  price: { type: Number, required: true },
  keywords: [{ type: String }],
});

const Product = mongoose.model("Product", productModel);
export default Product;
