const {Router} = require("express");

const catalogControllers = require("./catalog.controllers");
const router = Router();

router.get("/", catalogControllers.findMany);

module.exports = router;