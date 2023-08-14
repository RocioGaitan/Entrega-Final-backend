/*importo rutas */
import express from 'express';
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';

const app = express();

//uso de archivos JSON y permite recibir parametros dinamicos desde la url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//usar routers-rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);



/*escucha por el puerto 8080 */
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}`);
});