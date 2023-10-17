import { Router } from "express";
import { userModel } from "../dao/models/userSchema.js";

const router = Router();

router.get('/', async (req, res) => {
    try{
        const users = await userModel.find().populate('carts.cart');
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
});

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


router.post('/', async (req, res) => {
    const {first_name, last_name, email, gender} = req.body;

    try{
        const result = await userModel.create({first_name, last_name, email, gender});

        res.status(201).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g, "'")
        });
    }
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const {first_name, last_name, email, gender} = req.body;

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
});


export default router;
