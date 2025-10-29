import mongoose from "mongoose";

const orderModel = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  totalCost: { type: Number, required: true },
  orderDate:{type:String , required:true},
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      deliveryDate: { type: String, required: true },
    },
  ],
});

const Order = mongoose.model("Order", orderModel);
export default Order;
