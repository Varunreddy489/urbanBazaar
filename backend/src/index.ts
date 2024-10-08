import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import connectToMongo from "./db/connectToMongo";

import { userRoutes } from "./routes/user.routes";
import { cartRoutes } from "./routes/cart.routes";
import { adminRoutes } from "./routes/admin.routes";
import { orderRoutes } from "./routes/order.routes";
import { productRoutes } from "./routes/product.routes";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectToMongo();
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});
