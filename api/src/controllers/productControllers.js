const { Product } = require('../db.js');
const { Op } = require('sequelize');
//const db = require('./db');

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
    const {nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria} = respuesta
    const producto = {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria}
    res.json(producto);
    console.log(JSON.stringify(respuesta))
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
}

const crearProducto = async (req, res) => {
  try {
    const { id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, fotosecund,calificacionproducto, categoria } = req.body;

    const newProduct = await Product.create({
      id,
      nombreproducto,
      descproducto,
      colorproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      calificacionproducto,
      categoria
    });
      console.log(Object.keys(newProduct))
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear un nuevo producto' });
  }
};




const buscarProductos = async (req, res) => {
  try {
    const { prod, cate, marca, page, limit, minPrice, maxPrice } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    const arrayCondiciones = [];
    let condicionCat = {};

    const orden = [];
    arrayCondiciones.push({ borrador: false });

    if (prod) {
      arrayCondiciones.push({ nombreproducto: { [Op.iLike]: `%${prod}%` } });
    }
    if (cate) {
      condicionCat = { categoria: { [Op.iLike]: `%${cate}%` } };
    }
    if (marca) {
      arrayCondiciones.push({ marca: { [Op.iLike]: `%${marca}%` } });
    }
    if (minPrice) {
      arrayCondiciones.push({ precioproducto: { [Op.gte]: parseFloat(minPrice) } });
    }
    if (maxPrice) {
      arrayCondiciones.push({ precioproducto: { [Op.lte]: parseFloat(maxPrice) } });
    }

    const { count, rows } = await Product.findAndCountAll({
      order: orden.length ? orden : [],
      where: { [Op.and]: arrayCondiciones, ...condicionCat },
      offset,
      limit: pageSize,
    });

    if (count === 0) {
      return res.json({
        message: 'No se encontraron los criterios de búsqueda especificados.',
      });
    }

    const totalPages = Math.ceil(count / pageSize);
    const arrayRespuesta = rows.map((producto) => {
      const {
        id,
        nombreproducto,
        descproducto,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        categoria,
        marca,
        calificacionproducto,
      } = producto;

      return {
        id,
        nombreproducto,
        descproducto,
        colorproducto,
        fotoprinc,
        precioproducto,
        disponibproducto,
        categoria,
        marca,
        calificacionproducto,
      };
    });

    res.json({
      totalProductos: count,
      totalPages,
      currentPage: pageNumber,
      pageSize,
      productos: arrayRespuesta,
    });
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};


const getProductsAvailable = async () => {
  try {
    const products = await Product.findAll({
      where: {
        disponibproducto: {
          [Op.gt]: 0, // Utilizamos el operador [Op.gt] para obtener los productos con disponibproducto mayor a 0.
        },
      },
    });
    return products;
  } catch (error) {
    console.error('Error al obtener los productos disponibles:', error);
    throw error;
  }
};

const getProductsUnavailable = async () => {
  try {
    const products = await Product.findAll({
      where: {
        disponibproducto: {
          [Op.eq]: 0, // Utilizamos el operador [Op.eq] para obtener los productos con disponibproducto igual a 0.
        },
      },
    });
    return products;
  } catch (error) {
    console.error('Error al obtener los productos no disponibles:', error);
    throw error;
  }
};





module.exports = {getProducts, obtenerProductoPorId, crearProducto, buscarProductos, getProductsAvailable, getProductsUnavailable}