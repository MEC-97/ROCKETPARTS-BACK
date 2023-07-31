const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId, crearProducto, buscarProductos } = require("../controllers/productControllers")
// const {createPaymentPreference} = require("../controllers/payamentContoller")
// const{postOCyDetalle} = require("../controllers/prueba")

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)
router.post("/products", crearProducto)
router.get("/buscarProductos" , buscarProductos)

// router.post('/generar-orden', postOCyDetalle)
// router.post('/create-order', createPaymentPreference);

module.exports = router;
 