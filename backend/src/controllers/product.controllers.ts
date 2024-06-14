import { Request, Response } from "express";
import { productModel } from "../models/productModel";
import { productTypes } from "../types/types";

export const addProduct = async (req: Request<any, any, productTypes>, res: Response) => {
    try {
        const { title, description, price, category, imageUrl, rating } = req.body

        const existingProduct = await productModel.findOne({ title });
        if (existingProduct) {
            return res.status(400).json({ error: "Product with this title already exists" });
        }

        if (!title || !description || !price || !category || !imageUrl || !rating) {
            return res.status(500).json({ error: "fill put all the fields" })
        }

        if (typeof price !== 'number' || typeof rating !== 'number') {
            return res.status(400).json({ error: "Invalid data type for price or rating" });
        }

        const newProduct = {
            title,
            description,
            price,
            category,
            imageUrl,
            rating,
        }
        const product = await productModel.create(newProduct);
        return res.status(201).json({ product });
    } catch (error) {
        console.log("error in add product:", error);
        res.json(404).json({ error: "internal server error" })
    }
};

export const getAllProducts = async (req: Request<any, any, productTypes>, res: Response) => {
    try {
        const products = await productModel.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log("Error in getAllProducts", error);
        res.status(500).json({ error: "Error in fetching" });
    }
};

export const getProduct = async (req: Request<any, any, productTypes>, res: Response) => {
    try {

        const { id } = req.params

        const product = await productModel.findById(id)
        return res.status(200).json(product)
    } catch (error) {
        console.log("error in getProduct", error);
        return res.status(404).json({ error: "Error in fetching the products" })
    }
}

export const updateProducts = async (req: Request<any, any, productTypes>, res: Response) => {
    try {
        const { id } = req.params

        const { title, description, price, category, imageUrl, rating } = req.body
        const product = await productModel.findByIdAndUpdate(id, req.body)

        if (!product) {
            return res.status(404).json({ eror: "product not found" })
        }

        return res.status(200).json(product)
    } catch (error) {
        console.log("error in updating products", error);
        return res.status(404).json({ error: "Internal Server Error" })
    }
}

export const deleteProducts = async (req: Request<any, any, productTypes>, res: Response) => {
    try {
        const { id } = req.params

        const isExist = await productModel.findById(id);

        if (!isExist) {
            return res.status(404).json({ error: " NOT FOUND" })
        }

        const product = await productModel.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ eror: "product not found" })
        }
        return res.status(200).send({ message: 'user deleted successfully' });

    } catch (error) {
        console.log("error in delete products", error);
        return res.status(404).json({ error: "Internal Server Error" })
    }
}