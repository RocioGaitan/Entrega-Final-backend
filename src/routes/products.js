import { Router } from "express";


import { productModel} from "../dao/models/productSchema.js";


const router = Router();

  router.get('/', async (req, res) => {
    try {
        const id = req.params.id;

        const products = await productModel.findOne({ _id: id }).sort({ title: 1});
        console.log(products);
        
        if(!products || products.length === 0) {
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

router.get('/paginate', async (req, res) => {
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
  });

//crear un producto
router.post('/', async (req,res) => {
    try {
        const { title, description, code, price, stock} = req.body;

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
   
});

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
            return res.status(400).json({message: 'faltan parametros por ingresar'});
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
router.delete('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid; // Obtener el ID del producto de los parámetros

        const deletedProduct = await productModel.findByIdAndDelete(pid);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado correctamente', result: deletedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;

