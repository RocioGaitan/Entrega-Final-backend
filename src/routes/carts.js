import { Router } from "express";
import CartsManager from '../CartsManager.js'

const router = Router();

const cartManager = new CartsManager('./Carrito.json')

//crear un carts
router.post('/', async(req,res) => {
    try {
        await cartManager.addCart(req.body)
        res.status(200).json({message: 'Carrito agregado'})
    } catch (error) {
        res.status(500).json({error: 'Error al agregar al carrito'})
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
   
    try{
        console.log(cartManager)
        const {cid, pid} = req.params
        if(cartManager) {
            const newProductAdded = await cartManager.addProductToCart(+cid, +pid);
            res.status(200).json({message: 'Product agregado al carrito', product: newProductAdded})

        } else {
            res.status(200).json({message: 'cart no encontrado'});
        }
    
    } catch (error) {
        res.status(500).json({message: "Error al agregar product a carts"})
    }
})

//carrito
router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        return res.status(200).send({status: 200, cart: carts});
    } catch (error) {
        res.sendStatus(404).send({ ststus: 404, error: error.message})
    }
})


//carrito por id
router.get('/:cid', async(req, res) => {
        try {
            const cid = parseInt(req.params.cid);
        const cartId = await cartManager.getCartsById(cid)
        res.status(200).json({message: 'cart por id', cartId})
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router;

