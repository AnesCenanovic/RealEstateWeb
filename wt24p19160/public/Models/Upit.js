const { Sequelize, DataTypes } = require('sequelize');

// Export the function that takes sequelize as an argument
module.exports = (sequelize) => {
  const Upit = sequelize.define('Upit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    korisnik_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'korisnici', 
        key: 'id',          
      },
      allowNull: false,
      field: 'korisnik_id',
    },
    tekst: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tekst',
    },
    nekretnina_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'nekretnine',
        key: 'id',
      },
      allowNull: false,
      field: 'nekretnina_id',
    },
  }, {
    tableName: 'upiti',
    timestamps: false,
  });

  return Upit;
};