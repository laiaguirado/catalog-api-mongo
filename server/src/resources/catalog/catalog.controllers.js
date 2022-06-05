const Catalog = require("./catalog.model");
const Product = require("../product/product.model");

const findMany = async (req,res)=>{
    try{
        const docs = await Catalog.find().lean().exec();
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal Server error'});
    }
}

const createOne = async (req,res)=>{
    try{
        const newCatalog = req.body;
        if(JSON.stringify(newCatalog)=='{}'){
            return res.status(400).json({error:'Creation failed because there are no input data'});
        }
        const doc = await Catalog.create(newCatalog);
        res.status(201).json({results: doc})
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Creation failed'})
    }
}

const findOne = async (req, res) =>{
    const {id} = req.params;
    try{
        const doc = await Catalog.findOne({_id: id});
        if(!doc){
            return res.status(404).json({error:`Catalog with ID ${id} not found.`});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Internal Server error'});
    }
}

const updateOne = async (req,res)=>{
    const {id} = req.params;
    try{
        const updatedCatalog = req.body;
        if(JSON.stringify(updatedCatalog)=='{}'){
            return res.status(400).json({error:'Updated failed because there are no input data'});
        }
        const doc = await Catalog.findOneAndUpdate({_id: id},updatedCatalog,{new:true});
        if(!doc){
            return res.status(404).json({error:`Catalog with ID ${id} not found.`});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot update'});
    }
}

const deleteOne = async (req,res)=>{
    const {id} = req.params;
    try{
        const doc = await Catalog.findOneAndDelete({_id: id}); 
        if(!doc){
            return res.status(404).json({error:`Catalog with ID ${id} not found.`});
        }
        res.status(200).json({results:doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot delete'});
    }
}

const findProductsById = async (req,res)=>{
    const {catalogid} = req.params;
    try{
        const docs = await Product.find({catalog_id: catalogid});
        if(!docs){
            return res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        res.status(200).json({results: docs});
    }catch(e){
        console.log(e);
        res.status(500).json( {error : 'Internal error'});
    }
}

const createProductById = async (req,res)=>{
    const {catalogid} = req.params;
    try{
        const newProduct = req.body;
        //comprovar que hi ha JSON d'entrada
        if(JSON.stringify(newProduct)=='{}'){  
            return res.status(400).json({error:'Updated failed because there are no input data'});
        }
        //comprovar que el catalog_id existeix
        const catalogDoc = await Catalog.findOne({_id:catalogid});
        if(!catalogDoc){
            return res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        //afegir el producte al cataleg
        newProduct.catalog_id = catalogid;
        const doc = await Product.create(newProduct);
        res.status(201).json({results: doc});
    }catch(e){
        console.log(e);
        res.status(500).json( {error : 'Creation failed'});
    }
}

const updateProductById = async (req,res)=>{
    const {id,catalogid} = req.params;
    try{
        const updatedProduct = req.body;
        if(JSON.stringify(updatedProduct)=='{}'){
            return res.status(400).json({error:'Updated failed because there are no input data'});
        }
        const catalogDoc = await Catalog.findOne({_id:catalogid});
        if(!catalogDoc){
            return res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        updatedProduct.catalog_id = catalogid;
        const doc = await Product.findOneAndUpdate({_id: id},updatedProduct,{new:true});
        if(!doc){
            return res.status(400).send({error: `Product with ID ${id} not found.`})
        }
        res.status(201).json({results: doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot update'});
    }
}

const deleteProductById = async (req,res)=>{
    const {id, catalogid} = req.params;
    try{
        const catalogDoc = await Catalog.findOne({_id:catalogid});
        if(!catalogDoc){
            return res.status(400).send({error: `Catalog with ID ${catalogid} not found.`})
        }
        const doc = await Product.findOneAndDelete({$and: [{_id: id, catalog_id: catalogid}]});
        if(!doc){
            return res.status(404).json({error:`Product with ID ${id} not found.`});
        }
        res.status(200).json({results: doc});
    }catch(e){
        console.log(e);
        res.status(500).json({error:'Cannot delete'});
    }
}

module.exports = { findMany, createOne, findOne, updateOne,deleteOne, findProductsById, createProductById, updateProductById, deleteProductById};