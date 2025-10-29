import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
//  import User from "../models/userModel.js";

const fetchCart = expressAsyncHandler(async (req, res) => {
  let fetchCart = await Cart.findOne({ owner: req.user._id })
    .populate("owner", "-password")
    .populate("products.productId");

  try {
    if (fetchCart) {
      res.status(201).json(fetchCart);
    } else {
      res.status(400).send("unable to fetch cart");
    }
  } catch (error) {
    throw new Error("server error");
  }
});

const addToCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let existingCart = await Cart.findOne({ owner: req.user._id });

  if (existingCart) {
    let productExists = existingCart.products.find(
      (product) => product.productId.toString() === productId
    );
    if (productExists) {
      productExists.quantity += quantity;
    } else {
      existingCart.products.push({
        productId: productId,
        quantity: quantity,
        delivery_optionId: `1`,
      });
    }
    await existingCart.save();
    await existingCart.populate("owner", "-password");
    await existingCart.populate("products.productId");

    res.status(201).send(existingCart);
  } else {
    let newCart = await Cart.create({
      owner: req.user._id,
      products: [
        {
          productId: productId,
          quantity: quantity,
          delivery_optionId: "1",
        },
      ],
    });
    await newCart.populate("owner", "-password");
    await newCart.populate("products.productId");

    res.status(201).send(newCart);
  }
});

const removeFromCart = expressAsyncHandler(async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ owner: req.user._id });
  try {
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );
    await cart.save();
    await cart.populate("owner", "-password");
    await cart.populate("products.productId");
    res.status(201).send(cart);
  } catch (error) {
    res.status(400);
    throw new Error("unable to remove product");
  }
});

const updateCartProduct = expressAsyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ owner: req.user._id });

  try {
    let exisitingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    exisitingProduct.quantity = quantity;
    await cart.save();
    await cart.populate("owner", "-password");
    await cart.populate("products.productId");
    res.status(201).send(cart);
  } catch (error) {
    res.status(400);
    throw new Error("unable to update cart");
  }
});

const updateOptionId = expressAsyncHandler(async (req, res) => {
  const { productId, optionId } = req.body;

  let cart = await Cart.findOne({ owner: req.user._id });

  try {
    let exisitingProduct = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    exisitingProduct.delivery_optionId = optionId;

    await cart.save();

    await cart.populate("owner", "-password");
    await cart.populate("products.productId");
    res.status(201).send(cart);
  } catch (error) {
    res.status(400);
    throw new Error("unable to update option");
  }
});

export {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCartProduct,
  updateOptionId,
};
