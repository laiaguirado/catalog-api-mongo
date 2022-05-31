const {Router} = require("express");

const catalogControllers = require("./catalog.controllers");
const router = Router();

router.get("/", catalogControllers.findMany);
router.post("/", catalogControllers.createOne);

router.get("/:id", catalogControllers.findOne);
router.put("/:id", catalogControllers.updateOne);
router.delete("/:id", catalogControllers.deleteOne);

router.get("/:catalogid/products",catalogControllers.findMessagesById);
router.post("/:catalogid/products",catalogControllers.createMessageById);


module.exports = router;