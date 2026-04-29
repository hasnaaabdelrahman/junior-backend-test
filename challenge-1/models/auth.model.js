const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
      
    name: {
        type: String,
        required: [true , "name is required!"],
        trim: true

    },
    email: {
        type: String,
        required: [true , "email is required!"],
        unique: true,
        lowercase: true,
        trim: true,
                match: [
            /^\S+@\S+\.\S+$/,
            'Please enter a valid email'
        ]

    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']

    },
    role: {
        type: String,
        enum: ['user' , 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model("User" , userSchema);
