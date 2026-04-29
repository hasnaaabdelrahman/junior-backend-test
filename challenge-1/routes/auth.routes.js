const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');


const {
    register,
    login
} = require('../controllers/auth.controller');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }
    next();
};

const registerValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .trim(),
 
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
 
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];
 
 
const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email')
        .normalizeEmail(),
 
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
];

router.post('/register', registerValidation, validate, register);
router.post('/login',    loginValidation,    validate, login);

module.exports = router;