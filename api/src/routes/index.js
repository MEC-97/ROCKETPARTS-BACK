const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId, crearProducto, buscarProductos } = require("../controllers/productControllers")

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)
router.post("/products", crearProducto)
router.get("/buscarProductos" , buscarProductos)

module.exports = router;
 