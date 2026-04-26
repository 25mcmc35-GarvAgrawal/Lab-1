import { Router } from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

const productRouter = Router() ;

productRouter.post("/", createProduct);        // create
productRouter.get("/:id", getProduct);         // get one
productRouter.patch("/:id", updateProduct);    // update
productRouter.delete("/:id", deleteProduct);   // delete

export {productRouter}