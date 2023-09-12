import express from "express";
import { CartsManagerDB } from "../dao/cartsManagerDB.js";
import router from "./products.js";

// Elimina un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
  
    try {
      const cart = await CartsManagerDB.getCartById(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
      }
  
      const updatedCart = await CartsManagerDB.removeProductFromCart(cart, pid);
  
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al eliminar producto del carrito' });
    }
  });

  //Actualiza el carrito con un arreglo de productos
router.put('/:cid', async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
  
    try {
      const cart = await CartsManagerDB.getCartById(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
      }
  
      const updatedCart = await CartsManagerDB.updateCart(cart, products);
  
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al actualizar el carrito' });
    }
  });

  // Actualiza la cantidad de ejemplares de un producto en el carrito
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await CartsManagerDB.getCartById(cid);
  
      if (!cart) {
        return res.status(404).json({status: 'error', error: 'Carrito no encontrado'});
      }
  
      const updatedCart = await CartsManagerDB.updateProductQuantity(cart, pid, quantity);
  
      res.json({ status: 'success', payload: updatedCart });
    } catch (error) {
      res.status(500).json({status: 'error', error: 'Error al actualizar la cantidad de productos en el carrito'});
    }
  });

  
  // Trae el carrito completo
  router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
  
    try {
      const cart = await CartsManagerDB.getCartWithProducts(cid);
  
      if (!cart) {
        return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
      }
  
      res.json({ status: 'success', payload: cart });
    } catch (error) {
      res.status(500).json({ status: 'error', error: 'Error al obtener el carrito completo' });
    }
  });


//crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await CartsManagerDB.addCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});





/*obtener carrito por ID
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
      const cart = await CartsManagerDB.getCartsById(id);
      if(cart.length === 0) {
        res.status(404).json({ error: 'error al obtener el carrito'});
      } else {
         res.json(cart[0]);
        }
    } catch (error) {
      res.status(500).json({ error: 'error al obtener el carrito'});
   }
});

//crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
      const newCart = await CartsManagerDB.addCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito' });
    }
  });

  // Agregar producto a un carrito
router.put('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;
    try {
      const newProduct = await CartsManagerDB.addProductToCart(cartId, productId);
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar producto al carrito' });
    }
  });
  
  // Eliminar un carrito
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await CartsManagerDB.deleteCart(id);
      res.json({ message: 'Carrito eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el carrito' });
    }
  });*/


export default router;