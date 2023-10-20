import { Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    let username = req.session.user ? req.session.user : '';
    
    if(req.session.counter) {
        req.session.counter++;
        res.send(`${username } visitaste el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send(`¡Bienvenido al sitio web ${username}!`);
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy( error => {
        if(!error) res.send('Logout correcto');
        else res.send({status: 'Logout ERROR', body: error});
    });
});

router.get("/login", auth, (req, res) => {
    res.send(`Login success ${req.session.user}`);
});

function auth(req, res, next) {
    const {username, password} = req.query;
    if (username !== 'rocio' || password !== 'cba2023') {
        return res.send('Login fallido');
    }
    req.session.user = username;
    req.session.admin = true;
    return next();
}

export default router;