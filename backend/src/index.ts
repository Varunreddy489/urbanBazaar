import cors from 'cors';
import dotenv from "dotenv"
import express from "express"
import cookieParser from 'cookie-parser';

import connectToMongo from "./db/connectToMongo";
import { userRoutes } from "./routes/user.routes";
import { cartRoutes } from "./routes/cart.routes";
import { productRoutes } from "./routes/product.routes";
import { adminRoutes } from './routes/admin.routes';
import { parse } from 'path';

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use("/api/user", userRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/product", productRoutes)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    connectToMongo()
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})