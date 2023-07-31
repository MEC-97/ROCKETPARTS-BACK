require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { 
  DB_USER, DB_HOST,DB_NAME,DB_PASSWORD 
} = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    // dialect: 'postgres'
  }
);
 const basename = path.basename(__filename);

 const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  
  //Define las relaciones entre los modelos
  sequelize.models = Object.fromEntries(capsEntries);
  const { User, Product } = sequelize.models;
  
  User.belongsToMany(Product, { through: 'user_product' })
  Product.belongsToMany(User, {through: 'user_product'})
  

module.exports = {
  ...sequelize.models, 
  conn: sequelize, 
};