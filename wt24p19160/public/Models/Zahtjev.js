const { Sequelize, DataTypes } = require('sequelize');

// Export the function that takes sequelize as an argument
module.exports = (sequelize) => {
  const Zahtjev = sequelize.define('Zahtjev', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    korisnik_id: {
      type: DataTypes.INTEGER,
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
    trazeniDatum: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'trazeni_datum',
    },
    odobren: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false
      field: 'odobren',
    },
  }, {
    tableName: 'zahtjevi',
    timestamps: false,
  });

  return Zahtjev;
};