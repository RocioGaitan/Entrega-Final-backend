import mongoose from "mongoose";


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


userSchema.pre('save', function () {
    console.log(this);
})
const userModel = mongoose.model(userCollection, userSchema);

export default userModel;


/*userSchema.pre('create', function(){
    console.log(this.password);
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;*/

//userSchema.plugin(mongoosePaginate);