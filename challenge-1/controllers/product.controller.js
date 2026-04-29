const mongoose = require('mongoose')
const Product = require('../models/product.model');

exports.getProducts = async(req , res)=> {
 try{
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * 10;
      const products = await Product.find().skip(skip).limit(10);
      res.status(200).json(products);

 }
 catch(error){
   res.status(500).json({
      message:error.message
   });
 }
};


exports.getProduct = async(req , res)=> {

   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
   }
    try{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);

   }catch(error){
    res.status(500).json({
        message: error.message
    });
  }

};


exports.addProduct = async(req , res)=> {
 try{
   const product = await Product.create(req.body);
   res.status(201).json(product);
 }
 catch(error){
   res.status(500).json({
      message:error.message
   });
 }
};


exports.updatedProduct = async(req , res)=> {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
   }
     try{

   const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
      new: true,
      runValidators: true
    }

   );

   if(!product){
      return res.status(404).json({
         message:"Product not found"
      });
   }

   res.json(product);

 }catch(error){
   res.status(500).json({
      message:error.message
   });
 }

};


exports.deleteProduct = async(req , res)=> {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product ID' });
   }
    try{

   const product = await Product.findByIdAndDelete(
      req.params.id
   );

   if(!product){
      return res.status(404).json({
         message:"Product not found"
      });
   }

   res.json({
      message:"Deleted successfully"
   });

 }catch(error){
   res.status(500).json({
      message:error.message
   });
 }

};
