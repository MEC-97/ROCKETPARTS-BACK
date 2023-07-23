const { Product } = require('../db.js');

async function getProducts(req, res) {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    try {
      const { count, rows } = await Product.findAndCountAll({
        offset,
        limit: pageSize,
      });
      const totalPages = Math.ceil(count / pageSize);
      res.json({
        totalProductos: count,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        productos: rows,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
}

async function obtenerProductoPorId(req, res) {
  const { id } = req.params;

  try {
    const respuesta = await Product.findByPk(id)
    if (!respuesta) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    const {nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto} = respuesta
    const producto = {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto}
    res.json(producto);
    console.log(JSON.stringify(respuesta))
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
}

module.exports = {getProducts, obtenerProductoPorId}