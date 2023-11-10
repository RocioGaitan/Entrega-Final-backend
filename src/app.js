//importo rutas
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import _dirname from './utils.js';
import path from 'path';
import mongoStore from 'connect-mongo';

import routerProducts from './routes/products.js';
import routerCarts from './routes/cartsDB.js';
import routerUser from './routes/userRouter.js';
import routerCookies from './routes/cookiesRouter.js';
import routerViews from './routes/viewsRouter.js';

import sessionRouter from './routes/sessionRouter.js'

//import sessionRouter from './routes/sessionRouter.js';
import cookieParser from 'cookie-parser';

import { Server } from 'socket.io';

import { productModel } from './dao/models/productSchema.js';
import userModel from './dao/models/userSchema.js';

const app = express();

//const uri = 'mongodb://127.0.0.1:27017/ecommercegaitan'
const uri = 'mongodb+srv://rociogaitan98rg:pRPAqndZAM5ZizsC@cluster0.zcivoyu.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

.then(() => console.log('Connected to MongoDB'))
.catch(err => { console.log('Error connecting to MongoDB', err)
});


const httpServer = app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'));
//servidor sockets-objeto global
const socketServer = new Server(httpServer);

//motor instanciado
app.engine('handlebars', handlebars.engine({
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
}));
//se indica en que parte del proyecto estan las vistas
const viewsPath = path.join(_dirname , 'views');

//session examples
app.use(session(
    {
        store: mongoStore.create({
            mongoUrl: uri,
            ttl: 100
        }),
        secret: 'secretPharse',
        resave: false,
        saveUninitialized: false
    }
));

// Indica la ubicación de las vistas
app.set('views', viewsPath);

//cuando el servidor renderice debe hacerlo con el motor de handlebars
app.set('view engine', 'handlebars');

//servidor estatico de archivos
app.use('/css', express.static(_dirname + '/public/css'));
app.use('/js', express.static(_dirname + '/public/js'));
const publicPath = _dirname + '/public';
app.use('/css', express.static(path.join(publicPath, 'css')));


//uso de archivos JSON y permite recibir parametros dinamicos desde la url
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//usar routers-rutas
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/api/users', routerUser);

app.use(cookieParser('cba2023'));
app.use('/cookies', routerCookies);
app.use('/api/session', sessionRouter);

app.use('/', routerViews);





/*app.get('/api/session/register', (req,res) => {
    res.render(
        'register',
        {
            title: "Register",
            style: "index.css"
        });
});

app.get('/api/session/login', (req, res) => {
    res.render(
        'login',
    {
        title: "Inicio de session",
        style: "index.css"
    })
});

//app.use('/api/session', sessionRouter);
app.use('/api/session', routerUser);*/


//ruta para renderizar realTimeProducts.handlebars
/*app.get('/realTimeProducts', async (req, res) => {
    
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

/*app.get('/users', async (req, res) => {
    
    try {
        const users = await userModel.find().lean();

        res.render(
            'users',
             {
            title: "titulo",
            style: "index.css",
            users
        });
       
    } catch (error) {
        // Manejo de errores si la consulta a la base de datos falla
        console.error(error);
        res.render('error', { error: 'Error al obtener la lista de usuarios' });
    }
});*/

