const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
      
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true

    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0.01, 'Price must be a positive number']
    },
    quantity: {
        type: Number,
        default: 1,
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be a non-negative integer'
        }
    }
}, {
    timestamps: true
}
);

module.exports = mongoose.model("Product" , productSchema);
