const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');
const { body, validationResult } = require('express-validator');

const {
    getProducts,
    getProduct,
    addProduct,
    updatedProduct,
    deleteProduct,
} = require('../controllers/product.controller');


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
 

const productValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .trim(),
 
    body('category')
        .optional()
        .isString()
        .withMessage('Category must be a string')
        .trim(),
 
    body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
 
    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
];
 

router.get(
    '/profile',
    auth,
    (req, res) => res.json({ user: req.user })
);
 
router.get('/',    auth,                              getProducts);
router.get('/:id', auth,                              getProduct);
router.post('/',   auth, authorize('admin'), productValidation, validate, addProduct);
router.put('/:id', auth, authorize('admin'), productValidation, validate, updatedProduct);
router.delete('/:id', auth, authorize('admin'),                 deleteProduct);
 
module.exports = router;