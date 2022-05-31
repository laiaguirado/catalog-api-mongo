const {Router} = require("express");

const productControllers = require("./product.controllers");
const router = Router();

router.get("/", productControllers.findMany);
router.post("/", productControllers.createOne);

router.get("/:id", productControllers.findOne);

module.exports = router;