import {Router} from 'express';
import { productModel } from '../dao/models/productSchema.js';
const router = Router();

router.get("/", auth, async (req, res) => {

    res.render(
        'index',
        {
            title: "inicio",
            style: "index.css",
            user: req.session.user
        }
    );
});

//ruta para renderizar el formulario de inicio de sesion
router.get("/login", logged, async (req, res) => {
    res.render(
        'login',
     {
        title: "Inicio de session",
        style: "index.css",
        loginFailed: req.session.loginFailed ?? false,
        registerSuccess: req.session.registerSuccess ?? false
     }
   );
});

/*router.post("/login", (req, res) => {
    res.redirect('/api/session/realTimeProducts'); 
  });*/

//ruta para renderizar el formulario de registro
router.get("/api/session/register", logged, async (req, res) => {
    res.render(
        'register',
        {
            title: "Register",
            style: "index.css",
            registerFailed: req.session.registerFailed ?? false

        }
    );
});

/*router.post("/register", (req, res) => {
    const user = {
        // Aquí van los datos del usuario registrado, como nombre, email, etc.
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        age: req.body.age
        // Otros datos que desees incluir
      };
    
      // Ahora enviamos la respuesta con los datos del usuario registrado.
      res.status(200).json({
        message: "Usuario registrado con éxito",
        user: user // Aquí se envían los datos del usuario registrado
      });
  });*/



//ruta para obtener y mostrar productos
router.get('/realTimeProducts', async (req, res) => {
    
    try {
        const products = await productModel.find().lean();

        res.render('realTimeProducts', 
        {
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

//ruta para obtener y mostrar usuarios
router.get('/users', async (req, res) => {
    
    try {
        res.render(
       'users',
        {
         title: "user",
         style: "index.css", 
        });
       
    } catch (error) {
        // Manejo de errores si la consulta a la base de datos falla
        console.error(error);
        res.render('error', { error: 'Error al obtener la lista de usuarios' });
    }
});

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

//middleware para redirigir si ya se ha iniciado
function logged(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}

export default router;