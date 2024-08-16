import { Request, Response } from "express";

import { ProductTypes } from "../types/types";
import { productModel } from "../models/productModel";
import { CustomResponse } from "../utils/pagination";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      category,
      image,
      rating,
      brand,
      dimensions,
      quantity,
    } = req.body;

    const existingProduct = await productModel.findOne({ title });
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: "Product with this title already exists" });
    }

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !image ||
      !rating ||
      !quantity
    ) {
      return res
        .status(400)
        .json({ error: "Please fill out all required fields" });
    }

    if (typeof price !== "number" || typeof rating !== "number") {
      return res
        .status(400)
        .json({ error: "Invalid data type for price or rating" });
    }

    const newProduct = {
      title,
      description,
      price,
      discount: discount || 0,
      category,
      image,
      rating,
      brand: brand || "",
      dimensions: dimensions || "",
      quantity,
    };

    const product = await productModel.create(newProduct);
    return res.status(201).json({ product });
  } catch (error) {
    console.log("Error in addProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllProducts = async (req: Request, res: CustomResponse) => {
  try {
    if (res.paginatedResults) {
      return res.status(200).json(res.paginatedResults);
    } else {
      const products = await productModel.find();
      return res.status(200).json(products);
    }
  } catch (error) {
    console.log("Error in getAllProducts", error);
    res.status(500).json({ error: "Error in fetching" });
  }
};


export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
      console.log("product does not exist");
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log("error in getProduct", error);
    return res.status(404).json({ error: "Error in fetching the products" });
  }
};

export const updateProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { title, description, price, category, image, rating } = req.body;
    const product = await productModel.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ eror: "product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("error in updating products", error);
    return res.status(404).json({ error: "Internal Server Error" });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const isExist = await productModel.findById(id);

    if (!isExist) {
      return res.status(404).json({ error: " NOT FOUND" });
    }

    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ eror: "product not found" });
    }
    return res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    console.log("error in delete products", error);
    return res.status(404).json({ error: "Internal Server Error" });
  }
};
