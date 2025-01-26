
const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Nekretnina = sequelize.define('Nekretnina', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tip_nekretnine: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
      field: 'tip_nekretnine',
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 255],
      },
      field: 'naziv',
    },
    kvadratura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
      field: 'kvadratura',
    },
    cijena: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: 0,
      },
      field: 'cijena',
    },
    tip_grijanja: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'tip_grijanja',
    },
    lokacija: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'lokacija',
    },
    godina_izgradnje: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 0,
      },
      field: 'godina_izgradnje',
    },
    datum_objave: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'datum_objave',
    },
    opis: {
      type: DataTypes.TEXT,
      field: 'opis',
    },
  }, {
    tableName: 'nekretnine',
    timestamps: true,
  });

  return Nekretnina;
};
