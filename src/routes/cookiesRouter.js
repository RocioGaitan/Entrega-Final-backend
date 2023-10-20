import {Router} from 'express';

const router = Router();

router.get("/CookiesParse", (req, res) => {
    res.send(req.cookies);
});

router.post("/setCookies", (req, res) => {

    const email = req.body.email ? req.body.email : 'Undefined';
    res.cookie(
        'user',
        email,
        {maxAge: 10000}
    ).redirect("/");
});

export default router;