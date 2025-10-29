import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const productFetch = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(`error fetching products ${error.message}`);
  }
});

const productSearch = expressAsyncHandler(async (req, res) => {
  "/api/product/find?search=`xyz`";

  const { search } = req.query;

  const products = await Product.find({
    $or: [
      {
        keywords: { $regex: search, $options: "i" },
      },
      {
        name: { $regex: search, $options: "i" },
      },
    ],
  });

  try {
    if (products.length > 0) {
      res.status(201).send(products);
    } else {
      res.status(401).send("unable to find products");
    }
  } catch (error) {
    res.status(400);
    throw new Error(`error fetching products`);
  }
});

export { productFetch, productSearch };
