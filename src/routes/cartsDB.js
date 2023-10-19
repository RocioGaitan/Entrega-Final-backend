import { Router } from "express";
import { cartModel } from '../dao/models/cartSchema.js';


const router = Router();

//obtener los carts
router.get('/', async (req, res) => {
  try {
      const carts = await cartModel.find().populate('products.product');
      //const carts = await cartModel.find();
      res.status(200).json({ status: 'success', payload: carts });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({
          status: 'error',
          message: error.message
      });
  }
});

router.get('/:uid', async (req, res) => {
  try {
      const uid = req.params.uid;
      
      const cart = await cartModel.find({ _id: uid}).populate('products.product');
      res.status(200).json({
          status: 'success',
          payload: cart
      });
      
  } catch (error) {
      console.error(error.message);
      res.status(500).json({
          status: 'error',
          message: error.message
      });
  }
});

//crear un cart
router.post('/', async (req, res) => {

  const {last_name, Useremail, products} = req.body;

  try {
      const result = await cartModel.create({last_name, Useremail, products});
  
      res.status(201).json({
          status: 'success',
          payload: result
      });
  } catch (error) {
      res.status(400).json({
          status: 'error',
          message: error.message.replace(/"/g, "'")
      });
  }
});

//actualizar cart
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { last_name, Useremail, products } = req.body;

  try {
    const updatedCart = await cartModel.findByIdAndUpdate(id, { last_name, Useremail, products }, { new: true });
    res.status(200).json({
      status: 'success',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message.replace(/"/g, "'")
    });
  }
});

//eliminar
router.delete('/:id/:pid', async (req, res) => {
  const { id, pid } = req.params;

  try {
    const cart = await cartModel.findById(id);

    if (!cart) {
      return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }

    cart.products = cart.products.filter(product => product !== pid);
    const updatedCart = await cart.save();

    res.status(200).json({ status: 'success', payload: updatedCart });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al eliminar producto del carrito' });
  }
});

export default router;

