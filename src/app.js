//importo rutas
import express from 'express';
import handlebars from 'express-handlebars';
import _dirname from './utils.js';

import routerProducts from './routes/products.js';
import routerCarts from './routes/cartsDB.js';

import { Server } from 'socket.io';
//import ProductManager from './dao/ProductManager.js';
//import CartsManager from './dao/CartsManager.js';
import { ProductManagerDB } from './dao/productManagerDB.js';
import { CartsManagerDB } from './dao/cartsManagerDB.js';

import session from 'express-session';
import sessionRouter from './routes/sessionRouter.js';

import mongoose from 'mongoose';
const uri = 'mongodb://127.0.0.1:27017/ecommerce'
mongoose.connect(uri);

const managerProduct = new ProductManagerDB('path');
const cartsManagerDB = new CartsManagerDB('path');

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


//session examples
app.use(session(
    {
        secret: 'secretPharse',
        resave: true,
        saveUninitialized: true
    }
));

app.use('/session', sessionRouter);


//ruta para renderizar realTimeProducts.handlebars
app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        title: "titulo",
        style: "index.css",
        
    });
});

socketServer.on('connection', async(socket) => {
   
    const products = await managerProduct.getProducts();
    socket.emit('updateProducts', products);       
        
});