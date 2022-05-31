const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
    catalog_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    },
    description:{
        type: String,
        maxlength: 100
    },
    price:{
        type: String,
        required: true
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;