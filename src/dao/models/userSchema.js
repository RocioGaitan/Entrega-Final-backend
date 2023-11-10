import mongoose from "mongoose";


const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        minLength: 3,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        minLength: 4,
        unique: true,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
   password: {
    type: String,
    require: true
   }
});


/*userSchema.pre('save', function () {
    console.log(this);
});*/

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;


/*userSchema.pre('create', function(){
    console.log(this.password);
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;*/

//userSchema.plugin(mongoosePaginate);