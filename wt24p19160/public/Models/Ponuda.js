const { Sequelize, DataTypes } = require('sequelize');

// Export the function that takes sequelize as an argument
module.exports = (sequelize) => {
  const Ponuda = sequelize.define('Ponuda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    korisnik_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'korisnici',
        key: 'id',
      },
      field: 'korisnik_id',
    },
    tekst_upita: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'tekst_upita',
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
    cijenaPonude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      field: 'cijena_ponude',
    },
    datumPonude: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'datum_ponude',
    },
    odbijenaPonuda: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default to false
      field: 'odbijena_ponuda',
    },
    vezanaPonudaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ponude',
        key: 'id',
      },
      field: 'vezana_ponuda_id',
    },
  }, {
    tableName: 'ponude',
    timestamps: false,
  });

  return Ponuda;
};