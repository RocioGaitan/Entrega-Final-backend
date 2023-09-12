import { Router } from "express";

import { ProductManagerDB } from "../dao/productManagerDB.js";

const router = Router();

const ProductManager = new ProductManagerDB('./Products.json');

router.get('/', async (req, res) => {
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
      const products = await ProductManager.getProducts(options);

      
  
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  });



/*cargar todos los productos
router.get('/', async (req, res) => {
     const products = await ProductManager.getProducts();
     res.send(products);
    
});*/

/*router.get('/', (req, res) => {
    res.render(
        'index',
        {
            title: 'ecommerce',
            style: 'index.css',
            products: ProductManager
        }
    )
});*/


//buscar producto por id
router.get('/:pid', async(req, res)=>{
    const {pid} = req.params;
    try {
        const productById = await ProductManager.getProductById(pid)
        res.status(200).json({message:'Products especifico por su id', productById})
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

//crear un producto
router.post('/', async(req,res) => {
    try {
        const newProduct = req.body;
        await ProductManager.addProduct(newProduct);
        res.status(200).json({message: 'Product agregado correctamente', product: newProduct});
    } catch (error) {
        res.status(500).json({error})
    }
})

//actualizar por id
router.put('/:pid', async (req, res) => {
    try{
        const {pid} = req.params;
        const updateProductData = req.body; //nuevos datos

        if(!updateProductData.title || !updateProductData.description || !updateProductData.price || !updateProductData.code || !updateProductData.stock) {
            res.status(404).json({message: 'faltan parametros por ingresar'});
        }
        //llamar a la funcion updateProduct
        const updateProduct = await ProductManager.updateProduct(pid, updateProduct)
        res.status(200).json({message: 'Product actualizado correctamente', product: updateProduct});

    } catch (error) {
        res.status(500).json({ error: error.message});
    }
    
});

//eliminar por id
router.delete('/:pid', async(req,res) => {
    const pid = req.params
    const result = await ProductManager.deleteProduct(pid)

     res.status(200).json({message:'Product eliminado', result});
    
});


export default router;