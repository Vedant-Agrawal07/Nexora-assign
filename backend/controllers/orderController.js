import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

const fetchOrders = expressAsyncHandler(async (req, res) => {
  let orders = await Order.find({ owner: req.user._id })
    .populate("owner", "-password")
    .populate("products.productId");
  try {
    if (orders.length > 0) {
       // await orders.populate("owner", "-password");
      // await orders.populate("products.productId");
      res.status(200).send(orders);
      return;
    } else {
      res.status(401).send("unable to find orders");
    }
  } catch (error) {
    res.status(401).send("server error");
  }
});

const addOrder = expressAsyncHandler(async (req, res) => {
  let { cart, totalCost, deliveryDateArray, orderDate } = req.body;
  cart = JSON.parse(cart);
  deliveryDateArray = JSON.parse(deliveryDateArray);

  if (!cart || !totalCost || deliveryDateArray.length < 1) {
    res.status(400).send("no cart data or total Cost field");
  } else {
    let productArray = cart.products.map((product, index) => ({
      productId: product.productId,
      quantity: product.quantity,
      deliveryDate: deliveryDateArray[index],
    }));

    let order = await Order.create({
      owner: req.user._id,
      totalCost: totalCost,
      orderDate:orderDate,
      products: productArray,
    });
    await order.populate("owner", "-password");
    await order.populate("products.productId");

    await Cart.deleteOne({ owner: req.user._id });

    res.status(200).send(order);
  }
});

export { fetchOrders, addOrder };
