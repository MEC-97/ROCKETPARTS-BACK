const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rol: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_ip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logins_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    direccion:{
      type:DataTypes.STRING,
      allowNull: true,
    },
    telefono:{
      type:DataTypes.STRING,
      allowNull:true,
    },
  });
  
  User.associate = (models) => {
    User.hasMany(models.Oc, { foreignKey: 'iduser', as: 'ordenes' });
  };

  return User;
};