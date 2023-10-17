import { Router } from "express";

import { productModel } from "../dao/models/productSchema.js";

const router = Router();


/*router.get('/', async (req, res) => {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
  
      // Construir el objeto de opciones de búsqueda
      const options = {};
  
      // Aplicar el límite y la paginación
      const skip = (page - 1) * limit;
      options.limit = parseInt(limit);
      options.skip = skip;
  
      // Aplicar el ordenamiento si se proporciona
      if (sort) {
        options.sort = { price: sort === 'asc' ? 1 : -1 };
      }
  
      // Aplicar el filtro si se proporciona
      if (query) {
        options.query = { type: query }; // Reemplaza 'type' con el campo adecuado para el filtro
      }
  
      // Realizar la consulta a la base de datos con las opciones
      
      
      const products = await productModel.find({}, null, options);
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });*/

  router.get('/', async (req, res) => {
    try {
        const uid = req.query.uid;

        //const products = await productModel.find({ _id: uid }).populate('carts.cart');
        const products = await productModel.find(uid);

        if(!products) {
            return res.status(404).send({
                status: 'error',
                message: 'Product no encontrado'
            });
        }
        
        res.send({
            status: 'success',
            payload: products
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});

//crear un producto
router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, stock } = req.body;

        const newProduct = new productModel({ 
            title,
            description,
            code,
            price,
            stock
        });

        const saveProduct = await newProduct.save();

        res.send({ 
            status: 'success',
            message: 'Product agregado correctamente',
            payload: saveProduct
        });
    } catch (error) { 
      console.error(error.message);
      res.status(500).send({
        status: 'error',
        message: error.message
     });
      
    }
   
})


//actualizar por id
router.put('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const updateProductData = req.body; //nuevos datos

        if(!updateProductData.title || 
            !updateProductData.description ||
             !updateProductData.price || 
             !updateProductData.code || 
             !updateProductData.stock) {
            res.status(404).json({message: 'faltan parametros por ingresar'});
        }
        //llamar a la funcion updateProduct
        
        const updatedProduct = await productModel.findByIdAndUpdate(id, updateProductData, {
            new: true, // Devuelve el documento modificado
            runValidators: true // Ejecuta las validaciones del esquema
        });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado correctamente', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
});

//eliminar por id
router.delete('/:pid', async(req,res) => {
    const pid = req.params
    const result = await productModel.findByIdAndDelete(pid)

     res.status(200).json({message:'Product eliminado', result});
    
});


export default router;