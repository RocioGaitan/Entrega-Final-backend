import { Router} from "express";
import UserService from "../services/userService.js";

const US = new UserService();
const router = Router();


router.get("/", (req, res) => {
    let first_name = req.session.first_name ? req.session.first_name : '';
    
    if(req.session.counter) {
        req.session.counter++;
        res.send(`${first_name } visitaste el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send(`¡Bienvenido al sitio web ${first_name}!`);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy( error => {
        if(!error) res.send('Logout correcto');
        else res.send({status: 'Logout ERROR', body: error});
    });
});

router.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        const respuesta = await US.login(email, password);

        req.session.user = respuesta.payload;
        req.session.loginFailed = false;
        res.redirect("/");

    } catch (error) {
        req.session.loginFailed = true;
        req.session.registerSuccess = false;
        res.redirect("/login");
    }
});

router.post("/register", async (req, res) => {
    try {
        await US.createUser(req.body);
        req.session.registerSuccess = true;
        res.redirect("/login");
    } catch (error) {
        req.session.registerFailed = true;
        res.redirect("/register");
    }
});



export default router;
