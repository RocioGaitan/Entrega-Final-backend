import { Router } from "express";
import userModel from "../dao/models/userSchema.js";
import UserService from "../services/userService.js";

const router = Router();
const userS = new UserService();

router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
});

router.post("/register", async (req, res) => {
    try {
        await userS.createUser(req.body);
        req.session.registerSuccess = true;
      res.render("login");
    } catch (error) {
        req.session.registerFailed = true;
        res.redirect("/register");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password} = req.body;
        const respuesta = await userS.login(email, password);

        req.session.user = respuesta.payload;
        req.session.loginFailed = false;
        res.redirect("/realTimeProducts");

    } catch (error) {
        req.session.loginFailed = true;
        req.session.registerSuccess = false;
        res.redirect("/login");
    }
});

router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, gender } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(id, { first_name, last_name, email, gender }, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
});

// DELETE: Eliminar un usuario
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await userModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});

export default router;






/*router.get("/", async (req, res) => {
    let page = parseInt(req.query.page);
    if (!page) {
        page = 1;
    }

    let result = await userModel.paginate({}, {page, limit: 5, lean: true});

    result.title = "users";
    result.prevLink = result.hasPrevPage?`http://localhost:8080/users?page=${result.prevPage}`:'';
    result.nextLink = result.hasNextPage?`http://localhost:8080/users?page=${result.nextPage}`:'';
    result.isValid= !(page<=0||page>result.totalPages)

    res.render(
        'users',
        result
    );
});

router.post('/register', async (req, res) => {

    try{
        /*const { email, password} = req.body;
        const result = await userS.login(email, password);
        const result = await userS.createUser(req.body);
        res.send(result);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.post('/login', async (req, res) => {

    try{
        const { email, password} = req.body;
        const result = await userS.login(email, password);

        res.send(result);
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const {first_name, last_name, email, gender, carts} = req.body;

    try{
        const user = await userModel.findOne({_id: id});
        if(!user) {
            throw new Error('User no encontrado');
        }

        if (first_name !== undefined) {
            user.first_name = first_name;
        }
        if (last_name !== undefined) {
            user.last_name = last_name;
        }
        if (email !== undefined) {
            user.email = email;
        }
        if (gender !== undefined) {
            user.gender = gender;
        }
        if (carts !== undefined) {
            user.carts = carts;
        }

        const result = await userModel.findByIdAndUpdate(id, user, { new: true});

        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g,"'")
        });
    }
});

router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const result = await userModel.deleteOne({_id: id});
        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g, "'")
        });
    }
});*/


//export default router;


/*router.get('/search', async (req, res) => {
    try {
        const { first_name } = req.query;
        if (!first_name) {
            throw new Error('Inserta un parametro');
        }
        
        const users = await userModel.find({ first_name}).populate('carts.cart');

        res.send({
            status: 'success',
            payload: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            status: 'error',
            message: error.message
        });
    }
});*/