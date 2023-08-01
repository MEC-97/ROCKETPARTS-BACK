const express = require('express');
const router = express.Router();
const {getProducts, obtenerProductoPorId, crearProducto, buscarProductos } = require("../controllers/productControllers")
const {getUsers, obtenerUserPorId, obtenerUserPorSub, crearUser, actualizarUser} = require("../controllers/userControllers")
const { getOrders, obtenerOrderPorId } = require("../controllers/orderControllers")


router.get("/users" , getUsers)
router.get("/users/:id" , obtenerUserPorSub)
// router.get("/users/:id" , obtenerUserPorId)
router.post("/users", crearUser)
router.put('/users/:id', actualizarUser);

router.get("/products" , getProducts)
router.get("/products/:id" , obtenerProductoPorId)
router.post("/products", crearProducto)
router.get("/buscarProductos" , buscarProductos)

router.get("/orders" , getOrders)
router.get("/orders/:id" , obtenerOrderPorId)
 

module.exports = router;
 