import { Router} from "express";

const router = Router();

router.get("/", (req, res) => {
    if(req.session.counter) {
        req.session.counter++;
        res.send(`se ha visitado el sitio ${req.session.counter} veces`);
    } else {
        req.session.counter = 1;
        res.send('Bienvenido');
    }
});

export default router;