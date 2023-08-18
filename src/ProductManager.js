import fs from 'fs'

class ProductManager {
    
    constructor(path) {
        this.path = path;
    }
    
    //Metodo para leer todos los productos y devolver un array
    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, "utf-8");
            return products ? JSON.parse(products) : []
            
        } catch (error) {
            return []
        }
    }

    //creo un producto
    async addProduct(product) {
        const products = await this.getProducts();

        const ultimateId = products.length > 0 ? products[products.length -1].id: 0
        const newId = ultimateId + 1

        const newProduct = {
           id: newId, ...product
        };
        products.push(newProduct);

        try {
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));

            return newProduct;
        } catch(e) {
            return {
                message: "Error al crear el producto"
            };
        }
    }

      //buscar producto por id
      async getProductById(id) {
        try{
            const productList = await this.getProducts();
            const product = productList.find((e) => e.id === id)
            return product || null
        }
        catch(error) {
            throw new Error("error al eliminar el id")
        }
    }

    //eliminar productos por id
    async deleteProduct (id) {
        try {
            const productList = await this.getProducts()
            const newProductsArray = productList.filter(p => p.id !== id)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(newProductsArray)
            ) 
        } catch (error) {
            return error
        }
    }

}

export default ProductManager;




