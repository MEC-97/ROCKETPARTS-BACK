const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId} = require("../controllers/productControllers")

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)

module.exports = router;
