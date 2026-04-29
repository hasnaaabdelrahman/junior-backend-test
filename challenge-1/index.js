const express = require('express');
const dotenv = require('dotenv');

const connectDb = require('./config/DB')


dotenv.config();

connectDb();


const app = express();
app.use(express.json());

app.use('/api/auth' , require('./routes/auth.routes'));
app.use('/api/products' , require('./routes/product.routes'));


app.listen(3000 , ()=> {
    console.log("Server is running on port 3000")
});