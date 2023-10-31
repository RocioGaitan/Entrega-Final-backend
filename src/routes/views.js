import {Router} from 'express';

const router = Router();

router.get("/", auth, async (req, res) => {

    res.render(
        'users',
        {
            title: "SESE",
            style: "index.css",
            user: req.session.user
        }
    );
});

router.get("/api/session/login", logged, async (req, res) => {

    res.render(
        'session',
        {
            title: "DALE QUE SO VO",
            style: "index.css",
            loginFailed: req.session.loginFailed ?? false,
            registerSuccess: req.session.registerSuccess ?? false
        }
    );
});

router.get("/register", logged, async (req, res) => {

    res.render(
        'register',
        {
            title: "VOS PODES CULIAU",
            style: "index.css",
            registerFailed: req.session.registerFailed ?? false
        }
    );
});

function auth(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

function logged(req, res, next) {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
}

export default router;