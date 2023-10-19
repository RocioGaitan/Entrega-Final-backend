import mongoose from 'mongoose';

const productColection = 'products';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    
    price: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    }    
});


export const productModel = mongoose.model(productColection, productSchema);