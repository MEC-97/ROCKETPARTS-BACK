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
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener la lista de productos' });
    }
}

