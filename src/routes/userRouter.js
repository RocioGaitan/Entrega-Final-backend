import { Router } from "express";
import { userModel } from "../dao/models/userSchema.js";
import _dirname from "../utils.js";
import fs from 'fs';

const router = Router();

router.get('/', async (req, res) => {
    try{
        const users = await userModel.find();
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

router.get('/search', async (req, res) => {
    try {
        const { first_name } = req.query;
        if (!first_name) {
            throw new Error('Insert filter param');
        }
        
        const users = await userModel.find({ first_name}).explain('executionStats');

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
            message: error.message.replace(/"/g, "")
        });
    }
});

router.put('/:id', async (req, res) => {

    const id = req.params.id;
    const {first_name, last_name, email, gender} = req.body;

    try{
        const user = await userModel.find({_id: id});
        if(!user) {
            throw new Error('User not found');
        }

        const newUser = {
            first_name: first_name ?? user.first_name,
            last_name: last_name ?? user.last_name,
            email: email ?? user.email,
            gender: gender ?? user.gender
        }
        const result = await userModel.updateOne({_id: id}, newUser);

        res.status(200).send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message.replace(/"/g,"")
        });
    }
});



router.post('/insertAll', async (req, res) => {

    try {
        if (!req.body.passphrase || req.body.passphrase != 'CoderHouse2023') {
            throw new Error('This action is not permitted');
        }

        const users = fs.readFileSync(`${__dirname}/../database/Users.json`, "utf8");

        const result = await userModel.insertMany(JSON.parse(users));
    
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

export default router;
