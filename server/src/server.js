const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db");
const forumRouter = require("./resources/catalog/catalog.router");

const app = express();
app.use(morgan("dev")); //sale más info de la petición en el terminal
app.use(cors());
app.use(express.json());

app.get("/", async (req,res)=> {
    res.status(200).send({test:"hello world"});
});

app.use('/catalogs', forumRouter);

const startServer = async () =>{
    await db.connect();
    app.listen(8080, ()=>{
        console.log("Shops API listening on: 8080");
    });
}

startServer();