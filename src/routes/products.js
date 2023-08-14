import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const PM = new ProductManager('./Products.json');

//cargar todos los productos
router.get('/', async (req, res) => {
     const product = await PM.getProducts()
     res.json({status: "Lista de products agregados", product})
})

//buscar producto por id
router.get('/:pid', async(req, res)=>{
    const pid = parseInt(req.params.pid)
    try {
        const productById = await PM.getProductById(pid)
        res.status(200).json({message:'Products especifico por su id', productById})
    } catch (error){
        res.status(500).json({error})
    }
})

//crear un producto
router.post('/', async(req,res) => {
    try {
        const newProduct = req.body;
        await PM.addProduct(newProduct);
        res.status(200).json({message: 'Product agregado correctamente', product: newProduct})
    } catch (error) {
        res.status(500).json({error})
    }
})

//actualizar por id
router.put('/:pid', async (req,res) => {
    try {
        const pid = parseInt(req.params.pid);
        const cambiarObjeto = req.body;

        const prodToChange = await PM.getProductById(pid);

        if (prodToChange) {
            const updatedProduct = { ...prodToChange, ...cambiarObjeto };
            await PM.deleteProduct(pid);
            await PM.addProduct(updatedProduct);

            res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }}
    /*try {
        const pid = req.params.pid;
        const changes = req.body;

        const prodToChange = await PM.getProductById(pid);

        if (prodToChange) {
            const updatedProduct = { ...prodToChange, ...cambiarObjeto };
            await productos.deleteProduct(pid);
            await productos.save(updatedProduct);

            res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
        const result = await PM.updateProduct(pid, changes)
        
        res.status(200).json({message:'Product actualizado correctamente', changes})
    
    }*/ catch (error){
        res.status(500).json({error})
    }
});

//eliminar por id
router.delete('/:pid', async(req,res) => {
    const pid = parseInt(req.params.pid)
    try {
        const productAct = await PM.deleteProduct(pid)

        res.status(200).json({message:'Product eliminado', productAct})
    } catch (error) {
        res.status(500).json({error})
    }
})


export default router;