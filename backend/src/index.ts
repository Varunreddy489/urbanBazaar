import cors from 'cors';
import dotenv from "dotenv"
import express from "express"

import connectToMongo from "./db/connectToMongo";
import { userRoutes } from "./routes/user.routes";
import { cartRoutes } from "./routes/cart.routes";
import { productRoutes } from "./routes/product.routes";

const app = express();
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    connectToMongo()
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})