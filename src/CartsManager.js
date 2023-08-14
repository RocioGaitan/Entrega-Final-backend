import fs from 'fs'
import ProductManager from './ProductManager.js';
const productManager = new ProductManager('./Products.json');

class CartsManager {
    constructor(path) {
        this.path = path;
        this.carts = []
    }
    
    async getCarts() {
        try{
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf-8");
               return JSON.parse(carts)
            } else {
                return []
            }
        } catch (error) {
            throw new Error("error al mostrar el carrito")
        }
    }

    //
    async getCartsById(id) {
        try {
            const cartList = await this.getCarts()
            const cartById = cartList.find(c => c.id === id)
            return cartById ? [cartById] : [];
        } catch (error) {
            throw new Error("error en carrito")
        }
    }

    //agregar un carrito
    async addCart() {
        try {
            const cartList = await this.getCarts();
            let id;

            if(!cartList.length) {
                id = 1
            } else {
                id = cartList[cartList.length - 1].id + 1
            }
            let newCart = {
                id: id,
                products: []
            }
            cartList.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(cartList))
            return newCart
        } catch (error) {
            throw new Error("error al agregar un producto en carrito")
        }
    }


    //agregar producto a un carrito
    async addProductToCart(cid, pid) {
        try {
            const cartList = await this.getCartsById(cid)
            const productById = await productManager.getProductById(pid)

            const newProductToCart = {
                product: productById.id,
                quantity: 1
            };

            const updateCarts = cartList.map(cart => {
                if(cart.id === cid) {
                    const productInCart = cart.products.find(product => product.product === pid)
                    if (productInCart) {
                        productInCart.quantity++
                    } else {
                        cart.products.push(newProductToCart)
                    }
                }
                return cart;
            });
            const contentCart = await this.getCarts();

            const data = contentCart.map(existCart => {
                const actCart = updateCarts.find(cart => cart.id === existCart.id);
                return actCart || existCart;
            })

            await fs.promises.writeFile(this.path, JSON.stringify(data));
            return newProductToCart;

        } catch (error) {
            throw new Error("error")
        }
    }
}

export default CartsManager;

