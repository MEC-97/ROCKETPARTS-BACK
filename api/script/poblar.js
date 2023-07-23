const { Sequelize } = require('sequelize');
const { Product } = require('../src/db'); 
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST,DB_NAME } = process.env;

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
});

// Función para poblar la base de datos con productos
const populateDatabase = async () => {
  try {
    await sequelize.sync(); // Sincronizar los modelos con la base de datos

    // Crear productos de ejemplo
    const productos = [
      {
        nombreproducto: 'VIDEO GEFORCE RTX 3070 8GB GIGABYTE GAMING OC LHR',
        descproducto: 'Multiprocesadores NVIDIA Ampere Streaming , Núcleos RT de segunda generación,Núcleos de tensor de tercera generación,Desarrollado por GeForce RTX ™ 3070, Integrado con interfaz de memoria GDDR6 de 256 bits de 8 GB',
        colorproducto: ['Negro'],
        fotoprinc: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/video-geforce-rtx-3070-8gb-gigabyte-gaming-oc-lhr-0.jpg",
        precioproducto: 10,
        disponibproducto: 20,
        fotosecund: [],
        borrador: false,
        calificacionproducto: [4, 5, 3],
      },
      {
        nombreproducto: 'MONITOR 19" PHILIPS 193V5LHSB2/55 LED HD 60HZ VGA HDMI',
        descproducto: 'LCD TFT, Sistema W-LED, 18,5 pulg / 47 cm, Resolución óptima: 1366 x 768 a 60 Hz',
        colorproducto: ['Azul', 'Negto'],
        fotoprinc: "https://www.fullh4rd.com.ar/img/productos/18/monitor-19-philips-193v5lhsb255-led-hd-60hz-vga-hdmi-0.jpg",
        precioproducto: 10,
        disponibproducto: 20,
        fotosecund: [],
        borrador: false,
        calificacionproducto: [4, 5, 3],
      },
      {
        nombreproducto: 'VIDEO GEFORCE RTX 3070 8GB GIGABYTE GAMING OC LHR',
        descproducto: 'Multiprocesadores NVIDIA Ampere Streaming , Núcleos RT de segunda generación,Núcleos de tensor de tercera generación,Desarrollado por GeForce RTX ™ 3070, Integrado con interfaz de memoria GDDR6 de 256 bits de 8 GB',
        colorproducto: ['Negro'],
        fotoprinc: "https://www.fullh4rd.com.ar/img/productos/Pics_Prod/video-geforce-rtx-3070-8gb-gigabyte-gaming-oc-lhr-0.jpg",
        precioproducto: 10,
        disponibproducto: 20,
        fotosecund: [],
        borrador: false,
        calificacionproducto: [4, 5, 3],
      },
      {
        nombreproducto: 'MONITOR 19" PHILIPS 193V5LHSB2/55 LED HD 60HZ VGA HDMI',
        descproducto: 'LCD TFT, Sistema W-LED, 18,5 pulg / 47 cm, Resolución óptima: 1366 x 768 a 60 Hz',
        colorproducto: ['Azul', 'Negto'],
        fotoprinc: "https://www.fullh4rd.com.ar/img/productos/18/monitor-19-philips-193v5lhsb255-led-hd-60hz-vga-hdmi-0.jpg",
        precioproducto: 10,
        disponibproducto: 20,
        fotosecund: [],
        borrador: false,
        calificacionproducto: [4, 5, 3],
      
      },
      // seguir agregando productos si es que funciona esta cosa 

    ];

    // Crear los registros de productos en la base de datos
    await Product.bulkCreate(productos);

    console.log('Base de datos poblada con productos');
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    sequelize.close(); // Cerrar la conexión a la base de datos
  }
};

// Ejecutar la función para poblar la base de datos

module.exports = { populateDatabase }