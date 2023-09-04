import { productModel } from "../dao/models/productSchema.js";


class ProductManagerDB {
    
    constructor(path) {
        this.path = path;
    }
    
    //Metodo para leer todos los productos y devolver un array
    async getProducts() {
        try {
            const products = await productModel.find();
            return products;
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    //creo un product
    async addProduct(product) {
        const {title, description, code, price, stock} = product;

        if(!title || !description || !code || !price || !stock) {
            return "error al crear product faltan campos por completar"
        }

        const newProduct = {
            title,
            description,
            code,
            price,
            stock
        }

        try{
            const result = await productModel.create(newProduct);
            return 'producto creado corrrectamente';
        
        } catch(error) {
            console.log(error.message);
            throw new Error('error al crear product');

        }

    }

    //actualizar producto
    async updateProduct(id, updateProductData) {
        try {
            const product = await productModel.findById(id);

            if (!product) {
                throw new Error('Producto no encontrado');
            } 
    
            //actualizar el producto existente con los nuevos datos
            Object.assign(product, updateProductData);
            //guardar el producto
            const updateProduct = await product.save();
            res.status(200).json({ message: 'Producto actualizado con exito', product: updateProduct});
    
        } catch (error){
            res.status(500).json({error})
        }
    }
    


    //buscar producto por id
    async getProductById(id) {
        try{
            const product = await productModel.findById(id);
            return product || null;

        }
        catch(error) {
            throw new error("error al eliminar el id")
        }
    }

    //eliminar productos por id
    async deleteProduct (id) {
        try {
           const result = await productModel.deleteOne({ _id: id});
           if(result.deletedCount === 0) {
            return null;
           }
           return result;
        } catch (error) {
           throw new error('Error al eliminar product por id');
        }
    }

}


export {ProductManagerDB};