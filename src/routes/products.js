import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const PM = new ProductManager('./Products.json');


router.get('/', async (req, res) =>{
    res.send(await PM.getAllProducts());
});

router.post('/', (req, res) =>{
    const product = {
        id: req.body.course ?? 'sin id',
        title: req.body.course ?? 'sin nombre'
    }

    PM.createProduct(product);

    res.status(201).send('Producto agregado correctamente');
});



/*get devuelve los productos 
router.get('/', async (req, res) => {
    res.send("daleee");
});

/*app.get('/api/products/:Id', async (req, res) => {
    res.send(await PM.getProductById(req.params.Id));
});

/*crea un producto de acuerdo al valor que se le pase req 
router.post('/api/products', (req, res) => {
    res.status(201).send('programadora recibida correctamente');
    
});*/


export default router;