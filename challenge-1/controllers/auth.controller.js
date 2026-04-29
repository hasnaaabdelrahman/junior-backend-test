const user = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async(req , res) => {

    try {
        const {name , email , password} = req.body;

        const existingUser = await user.findOne({email});

        if(existingUser) {
            return res.status(400).json(
                {
                    message: "user already exists!"
                }
            );
        }

        const hashedPassword = await bcrypt.hash(password , 10);
        const createdUser = await user.create({
            name,
            email,
            password: hashedPassword
        });
        createdUser.password = undefined;
        res.status(201).json(createdUser);

    }catch(error) {
            res.status(500).json(
                {
                    message: error.message
                }
            );
    }

}

exports.login = async(req , res) => {

    try {
        const {email,password} = req.body;
    
        const foundUser =
        await user.findOne({email});

        if(!foundUser){
        return res.status(401).json({
            message:"Invalid credentials"
        });
        }

        const isMatch = await bcrypt.compare(
            password,
            foundUser.password
        );

        if(!isMatch) {
            return res.status(401).json(
            {
                message:"Invalid credentials"
            }
            );
        }

        const token = jwt.sign(
        {
        id:foundUser._id,
        role:foundUser.role
        },
        process.env.JWT_SECRET,
        {
        expiresIn:'1d'
        }
        );

        res.json({token})

    } catch (error) {
        return res.status(500).json(
        {
            message: error.message
        });
    }
    
}
