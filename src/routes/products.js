import { Router } from "express";

import { ProductManagerDB } from "../dao/productManagerDB.js";

const router = Router();

const ProductService = new ProductManagerDB();
/*const PM = new ProductManager('./Products.json');*/

//cargar todos los productos
router.get('/', async (req, res) => {
     const product = await ProductService.getProducts();
     res.send(product);
})

//buscar producto por id
router.get('/:pid', async(req, res)=>{
    const {pid} = req.params;
    try {
        const productById = await ProductService.getProductById(pid)
        res.status(200).json({message:'Products especifico por su id', productById})
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

//crear un producto
router.post('/', async(req,res) => {
    try {
        const newProduct = req.body;
        await ProductService.addProduct(newProduct);
        res.status(200).json({message: 'Product agregado correctamente', product: newProduct});
    } catch (error) {
        res.status(500).json({error})
    }
})

//actualizar por id
router.put('/:pid', async (req, res) => {
    try{
        const {productId} = req.params;
        const updateProductData = req.body; //nuevos datos
        //llamar a la funcion updateProduct
        const updateProduct = await ProductService.updateProduct(productId, updateProductData)
        res.status(200).json({message: 'Product actualizado correctamente', product: updateProduct});

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
    
});

//eliminar por id
router.delete('/:pid', async(req,res) => {
    const pid = req.params
    const result = await ProductService.deleteProduct(pid)

     res.status(200).json({message:'Product eliminado', result});
    
});


export default router;