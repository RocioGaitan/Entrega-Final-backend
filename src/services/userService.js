import userModel from '../dao/models/userSchema.js';
import crypto from 'crypto';
import { isValidPassword } from '../utils/functionUtils.js';


class UserService{
    
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

    async createUser(user) {
        try {
            user.password = this.getHash(user.password);
            const result = await userModel.create(user);
            return {
                status: 'success',
                payload: result
            };
        } catch (error) {
            console.error(error.message);
            return {
                status: 'error',
                message: error.message.replace(/"/g,"'")
                
            };
        }
    }

    async login(email, password) {
        try {
            const user = await userModel.find({email: email});

            /*if (user && isValidPassword(user, password)) {
                return user;
            }
            throw new Error('Login failed');*/
        if(user.length > 0 && user[0].password === this.getHash(password)) {
            return {
                status: 'success',
                payload: user
            }
        }
        throw new Error('Login fallido');

        
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

}

export default UserService;
