import mongoose from "mongoose";

const cartsList = 'carts';

const cartSchema = new mongoose.Schema({
    last_name: {
        type: String,
        required: true
    },
    Useremail: {
        type: String,
        required: true
    },
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                }
            }
        ],
        default: []
    }
    
});


cartSchema.pre('find', function(next) {
    this.populate('products.product');
    next();
});


export const cartModel = mongoose.model(cartsList, cartSchema);


/*cartSchema.pre('find', () => {
    this.populate('products.product')
});*/