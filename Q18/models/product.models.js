import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: [String], 
        required: true,
    },
},
{ timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);
