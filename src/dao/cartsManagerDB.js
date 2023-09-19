import { cartModel } from "./models/cartsSchema.js";
//import { ProductManagerDB } from "./productManagerDB.js";


export class CartsManagerDB{
    constructor(path) {
        this.path = path;
        this.cartItems = [];
    }
    
      async getCartById(cartId) {
        return await cartModel.findById(cartId);
      }
    
      async removeProductFromCart(cart, productId) {
        const updatedProducts = cart.products.filter(
          (product) => product.product.toString() !== productId
        );
        cart.products = updatedProducts;
        await cart.save();
        return cart;
      }

      async updateCart(cart, products) {
        cart.products = products;
        await cart.save();
        return cart;
      }
    
      async updateProductQuantity(cart, productId, quantity) {
        const product = cart.products.find(
          (product) => product.product.toString() === productId
        );
        if (product) {
          product.quantity = quantity;
          await cart.save();
        }
        return cart;
      }

      async removeAllProductsFromCart(cart) {
        cart.products = [];
        await cart.save();
        return cart;
      }
    
      async getCartWithProducts(cartId) {
        return await cartModel
          .findById(cartId)
          .populate("products.product", ["title", "price"]);
      }

      async addCart() {
        try{
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('Error al agregar un carrito');
        }
    }
    
}

/*export class CartsManagerDB {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            return await cartModel.find().populate('products.product');
        } catch (error) {
            throw new Error('error al mostrar el carrito');
        }
    }

    async getCartsById(id) {
        try {
            const cart = await cartModel.findById(id).populate('products.product');
            return cart ? [cart] : [];
        } catch(error) {
            throw new Error('Error en carrito');
        }
    }

    async addCart() {
        try{
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            throw new Error('error al agregar un carrito');
        }
    }

    async addProductToCart(cartId, productId) {
        try{
            const cart = await cartModel.findById(cartId);

            if(!cart) {
                throw new Error('carrito no encontrado');
            }
            const productById = await ProductManagerDB.getProductById(productId);

            const newProductCart = {
                product: productById._id,
                quatity: 1,
            };
            const existingProductIndex = cartModel.products.findIndex(
                (product) => product.product.toString() === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity++;
      } else {
        cart.products.push(newProductCart);
      }

      await cart.save();
      return newProductCart;
    } catch (error) {
      throw new Error('Error al agregar producto al carrito');
    }
  }
}*/






