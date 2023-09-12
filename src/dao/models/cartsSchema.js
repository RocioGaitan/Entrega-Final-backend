import mongoose from "mongoose";

const cartsList = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'carts',
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
});


export const cartModel = mongoose.model(cartsList, cartSchema);