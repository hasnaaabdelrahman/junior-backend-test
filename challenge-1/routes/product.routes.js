const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const authorize = require('../middlewares/role.middleware');


router.get(
 '/profile',
 auth,
 (req,res)=>{
   res.json({
      user:req.user
   });
 }
);

const {
    getProducts,
    getProduct,
    addProduct,
    updatedProduct,
    deleteProduct,
} = require('../controllers/product.controller');





router.get('/' , auth , getProducts);
router.get('/:id'  , auth ,  getProduct);
router.post('/'  , auth ,   authorize('admin'),  addProduct);
router.put('/:id'  , auth ,   authorize('admin'),  updatedProduct);
router.delete('/:id'  , auth ,  authorize('admin'),  deleteProduct);

module.exports = router;