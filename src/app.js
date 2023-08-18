//importo rutas
import express from 'express';
import handlebars from 'express-handlebars';
import _dirname from './utils.js';
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';

import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';

const managerProduct = new ProductManager('./Products.json');

//ejemplo para que se conserve la data
const app = express();

const httpServer = app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'));

//servidor sockets-objeto global
const socketServer = new Server(httpServer);

//motor instanciado
app.engine('handlebars', handlebars.engine());
//se indica en que parte del proyecto estan las vistas
app.set('views', _dirname + '/views');
//cuando el servidor renderice debe hacerlo con el motor de handlebars
app.set('view engine', 'handlebars');
//servidor estatico de archivos
app.use(express.static(_dirname + '/public'));

//uso de archivos JSON y permite recibir parametros dinamicos desde la url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//usar routers-rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);

//ruta para renderizar realTimeProducts.handlebars
app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        title: "titulo",
        style: "index.css"
    });
});

socketServer.on('connection', async(socket) => {
   
    const products = await managerProduct.getProducts();
    socket.emit('updateProducts', products);       
        
});