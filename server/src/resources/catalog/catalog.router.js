const {Router} = require("express");

const catalogControllers = require("./catalog.controllers");
const router = Router();

router.get("/", catalogControllers.findMany);
router.post("/", catalogControllers.createOne);

router.get("/:id", catalogControllers.findOne);
router.put("/:id", catalogControllers.updateOne);
router.delete("/:id", catalogControllers.deleteOne);

router.get("/:catalogid/products",catalogControllers.findProductsById);
router.post("/:catalogid/products",catalogControllers.createProductById);
router.put("/:catalogid/products/:id",catalogControllers.updateProductById);
router.delete("/:catalogid/products/:id",catalogControllers.deleteProductById);


module.exports = router;