import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
   password: {
    type: String,
    require: true
   }
});


userSchema.pre('create,', function(user){
    console.log(user)
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;