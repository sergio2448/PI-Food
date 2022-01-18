const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    diets: { // ¿Inconsistencia en la API?
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};

/* ENUM('gluten free','dairy free','lacto ovo vegetarian','vegan', 'paleolithic', 'primal', 'pescatarian', 'fodmap friendly', 'whole 30', 'vegetarian', 'ketogenic', 'lacto vegetarian', 'ovo vegetarian', 'pescetarian', 'paleo'), */