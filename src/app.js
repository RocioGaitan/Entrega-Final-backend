/*importo rutas */
import express from 'express';
import handlebars from 'express-handlebars';
import _dirname from './utils.js';
import routerProducts from './routes/products.js';
import routerCarts from './routes/carts.js';

import { Server } from 'socket.io';

const app = express();

const httpServer = app.listen(8080, ()=> console.log('Servidor arriba en el puerto 8080'));

//servidor sockets 
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


socketServer.on('connection', socket =>{
    console.log('nuevo cliente');

    socket.on('message', data => {
        console.log(data);
    });
    
    socket.emit('message', "este solo lo recibe el socket, individual");
    socketServer.emit('message', ' evento para todos');
    socket.broadcast.emit('evento', 'eventos para todos menos el socket actual')
});



app.get('/', async(req, res) => {
    const name = req.query.name ?? "usuario";
    res.render(
        'index',
        {
            title: "hola rocio",
            name: name,
            style: "index.css"
        }
    );

});


/*escucha por el puerto 8080 
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`servidor arriba en el puerto ${PORT}`);
});*/