import userModel from '../dao/models/userSchema.js';

import {createHash, isValidPassword} from '../utils/functionUtils.js';


class UserService {

    async createUser(user) {
        try {
            user.password = createHash(user.password);
            return await userModel.create(user);
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async login(email, password) {
        try {
            const user = await userModel.find({email: email});

            if (user.length > 0 && isValidPassword(password, user[0])) {
                return user[0];
            }
            
            throw new Error('Login fallido');

        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

}


export default UserService;

/*class UserService{
    
    async getUser(uid) {
        try {
            const user = await userModel.find({_id: uid});
            return {
              status: 'success',
               payload: user
            };
        } catch (error) {
            console.error(error.message);
            return {
                status: 'error',
                message: error.message.replace(/"/g,"'")
            }
        }
    }

    async createUser(users) {
        try {
            users.password = this.getHash(users.password);
            return await userModel.create(users);
           
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async login(email, password) {
        try {
            const user = await userModel.find({email: email});

            /*if (user && isValidPassword(user, password)) {
                return user;
            }
            //throw new Error('Login failed');
            if (user.length > 0 && user[0].password === this.getHash(password)) {
                return user[0];
            }
            
            throw new Error('Login failed');
    

        
        } catch (error) {
            console.error(error.message);
            return {
                status: 'error',
                message: error.message.replace(/"/g,"'")
                
            };
        }
    }

    
    getHash(password) {
        return crypto.createHash('sha256').update(password).digest('hex');
    }

}*/


 /*if(user.length > 0 && user[0].password === this.getHash(password)) {
            return {
                status: 'success',
                payload: user
            }
        }
        throw new Error('Login fallido');
        
        if (user.length > 0 && isValidPassword(user[0], password)) {
                return user[0];
            }
            
            throw new Error('Login failed');*/