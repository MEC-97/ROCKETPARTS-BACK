const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId, crearProducto, buscarProductos, getProductsAvailable, getProductsUnavailable } = require("../controllers/productControllers")
const {getUsers, obtenerUserPorId, crearUser, actualizarUser} = require("../controllers/userControllers")
const { createPaymentPreference } = require("../controllers/payamentContoller")

router.get("/users" , getUsers)
router.get("/users/:id" , obtenerUserPorId)
router.post("/users", crearUser)
router.put('/users/:id', actualizarUser);

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)
router.post("/products", crearProducto)
router.get("/buscarProductos" , buscarProductos)
router.get("/disponible", getProductsAvailable)
router.get("/nodisponible", getProductsUnavailable)

router.post('/create-order', createPaymentPreference);

module.exports = router;