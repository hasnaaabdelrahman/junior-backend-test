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

        const hashedPassword = bcrypt.hash(password , 10);
        const createdUser = await user.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(200).json(user);

    }catch(error) {
            res.status(500).json(
                {
                    message: error.message
                }
            );
    }

}

exports.login = async(req , res) => {

    const token = jwt.sign(
        {
            id: foundUser.id,
            role: foundUser.role
        },
        process.env.JWT_SECRET, {
            expiresIn:'1d'

        }
    );

    try {
        const userL = await user.findOne({email});
        
        if(!userL) {
            return res.status(401).json(
            {
                message:"Invalid credentials"
            }
            );
        }
        const isMatch = await bcrypt.compare(
            password,
            userL.password
        );

        if(!isMatch) {
            return res.status(401).json(
            {
                message:"Invalid credentials"
            }
            );
        }
        res.json({token})

    } catch (error) {
        return res.status(500).json(
        {
            message: error.message
        });
    }
    
}
