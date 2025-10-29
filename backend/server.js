import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import cartRoute from './routes/cartRoute.js'
import orderRoute from './routes/orderRoute.js'
// import orderRoute from "./routes/orderRoute.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));dotenv.config();
connectDb();

app.get("/", (req, res) => {
  res.send("api succesfull");
});

app.use("/api/product" , productRoute);
app.use("/api/user" , userRoute);
app.use("/api/cart",cartRoute);
app.use("/api/order" , orderRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
