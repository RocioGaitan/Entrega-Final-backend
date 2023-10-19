//importo rutas
import express from 'express';
import handlebars from 'express-handlebars';
import _dirname from './utils.js';
import path from 'path';
import routerProducts from './routes/products.js';
import routerCarts from './routes/cartsDB.js';
import routerUser from './routes/userRouter.js';

import session from 'express-session';
import sessionRouter from './routes/sessionRouter.js';

import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { productModel } from './dao/models/productSchema.js';
import userModel from './dao/models/userSchema.js';
export const messages = [];

//const uri = 'mongodb://127.0.0.1:27017/ecommercegaitan'
const uri = 'mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to MongoDB'))
.catch(err => { console.log('Error connecting to MongoDB', err)
});
//ejemplo para que se conserve la data
const app = express();



const httpServer = app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'));

//servidor sockets-objeto global
const socketServer = new Server(httpServer);

//motor instanciado
app.engine('handlebars', handlebars.engine({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}));
//se indica en que parte del proyecto estan las vistas
app.set('views', `${_dirname}/views`);
//cuando el servidor renderice debe hacerlo con el motor de handlebars
app.set('view engine', 'handlebars');
//servidor estatico de archivos
/*app.use('/css', express.static(_dirname + '/public/css'));
app.use('/js', express.static(_dirname + '/public/js'));*/
const publicPath = _dirname + '/public';
app.use('/css', express.static(path.join(publicPath, 'css')));



//uso de archivos JSON y permite recibir parametros dinamicos desde la url
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//usar routers-rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/users', routerUser);


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
app.get('/realTimeProducts', async (req, res) => {
    
    try {
        const products = await productModel.find().lean();

        res.render('realTimeProducts', {
            title: "titulo",
            style: "index.css",
            products
        });
       
    } catch (error) {
        // Manejo de errores si la consulta a la base de datos falla
        console.error(error);
        res.render('error', { error: 'Error al obtener la lista de productos' });
    }
});

app.get('/users', async (req, res) => {
    
    try {
        const users = await userModel.find().lean();

        res.render('users', {
            title: "titulo",
            style: "index.css",
            users
        });
       
    } catch (error) {
        // Manejo de errores si la consulta a la base de datos falla
        console.error(error);
        res.render('error', { error: 'Error al obtener la lista de usuarios' });
    }
});


/*const PORT = 8080;
app.listen(PORT, () => {
    console.log(`start server in PORT ${PORT}`);
});*/

/*socketServer.on('connection', async(socket) => {
   
    //const products = await product.getProducts();
    const products = productModel.find();
    socket.emit('updateProducts', products);       
     
    socket.on('message', data => {
        socketServer.emit('messageShow', data);
    });

    socket.on('chatMessage', data => {
        console.log(data);
        messages.push({
            socketId: socket.id,
            message: data,
        });
        socketServer.emit('chatMessage', messages);
    });
});*/