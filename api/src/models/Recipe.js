const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    spoonacularScore: {
      type: DataTypes.FLOAT, // ¿Entre 0 y 100?
      allowNull: true
    },
    healthScore: {
      type: DataTypes.FLOAT, // ¿Entre 0 y 100?
      allowNull: false
    },
    steps: {
      type: DataTypes.JSON, // Ver analyzedInstructions
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
