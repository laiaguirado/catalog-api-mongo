const mongoose = require("mongoose");
const {Schema} = mongoose;

const catalogSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxlength: 20
    } 
});

const Catalog = mongoose.model('catalog', catalogSchema);

module.exports = Catalog;