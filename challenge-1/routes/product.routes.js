const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    addProduct,
    updatedProduct,
    deleteProduct,
} = require('../controllers/product.controller');

router.get('/' , getProducts);
router.get('/:id' , getProduct);
router.post('/' , addProduct);
router.put('/:id' , updatedProduct);
router.delete('/:id' , deleteProduct);

module.exports = router;