import { Router } from "express";

const router = Router();


const carts = [
    {
        name: "rocio",
        course: "la chica que"

}
];

/*get devuelve los productos */
router.get('/', (req, res) => {
    res.send(carts);
});

/*crea un producto de acuerdo al valor que se le pase req */
router.post('/api/carts', (req, res) => {
    const cart = {
        name: req.body.name ?? "sin nombre",
        course: req.body.course ?? "si curso"
    }

    carts.push(cart);

    /*estatus de creacion de producto */
    res.status(201).send('viajera por el mundo desde cart');
    
});


export default router;