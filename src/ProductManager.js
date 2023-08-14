import fs from 'fs'

class ProductManager {
    
    constructor(path) {
        this.path = path;
    }
    
    //Metodo para leer todos los productos y devolver un array
    async getProducts() {
        try {
            if(fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
            
              return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            return error    
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

    /*//actualizar productos por id
    async updateProduct (id, obj) {
        try {
            const productList = await this.getProducts()
            const productIndex = productList.findIndex(p => p.id === id)
            if (productIndex === -1) {
                return 'No se encontro el producto con ese id'
            }
            const product = productList[productIndex]
            productList[productIndex] = { ...product, ...obj }
            await fs.promises.writeFile(this.path, JSON.stringify(productList))
            
        } catch (error) {
            throw new Error("error al actualizar id")
        }
    }*/

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




