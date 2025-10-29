import mongoose from "mongoose";

const cartModel = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
      delivery_optionId: { type: String, trim: true },
    },
  ],
});

const Cart = mongoose.model("Cart" , cartModel);
export default Cart;
