import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;

    if (
        !name?.trim() ||
        !description?.trim() ||
        !category?.trim() ||
        price === undefined
    ) {
        throw new ApiError(400, "Name, description, price, category are required");
    }

    if(typeof price !== "number" || price < 0){
        throw new ApiError(400 , "Invalid price") ;
    }

    const product = await Product.create({
        name,
        description,
        price,
        category
    });

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product added successfully"));
});

const getProduct = asyncHandler(async (req , res) => {
    const productId = req.params.id ;

    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(400 , "Invalid product id") ; 
    }

    const product = await Product.findById(productId) ; 

    if(!product){
        throw new ApiError(404 , "No Product Exist");
    }
    return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
})

const deleteProduct = asyncHandler(async(req , res) => {
    const productId = req.params.id ; 

    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new ApiError(400 , "Invalid id") ; 
    }

    const deletedProduct = await Product.findOneAndDelete(productId) ;

    if(!deletedProduct){
        throw new ApiError(404 , "Product does not Exist") ; 
    }

    return res.status(200).json(new ApiResponse(200 , {} , "Product deleted successfully")) ; 
})

const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new ApiError(400, "Invalid id");
    }

    const hasName = typeof name === "string" && name.trim();
    const hasDescription = typeof description === "string" && description.trim();
    const hasCategory = typeof category === "string" && category.trim();
    const hasPrice = price !== undefined;

    if (!hasName && !hasDescription && !hasCategory && !hasPrice) {
        throw new ApiError(400, "At least one field is required to update");
    }

    if (price !== undefined && (typeof price !== "number" || price <= 0)) {
        throw new ApiError(400, "Invalid price");
    }

    const updates = {};

    if (hasName) updates.name = name.trim();
    if (hasDescription) updates.description = description.trim();
    if (hasCategory) updates.category = category.trim();
    if (hasPrice) updates.price = price;

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: updates },
        {
            new: true,
            runValidators: true,
        }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});


export {
    createProduct ,
    deleteProduct ,
    getProduct ,
    updateProduct 
}