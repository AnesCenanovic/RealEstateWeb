const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Korisnik = sequelize.define('Korisnik', {
      ime: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          is: ["^[a-zA-Z]+$", 'i'], 
        },
        field: 'ime',
      },
      prezime: {
        type: DataTypes.STRING,
        allowNull: false, 
        validate: {
          is: ["^[a-zA-Z]+$", 'i'], 
        },
        field: 'prezime',
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
          is: ["^[a-zA-Z0-9_]+$", 'i'], 
        },
        field: 'username',
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, 
        field: 'password',
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
        field: 'is_admin',
      },
    }, {
      tableName: 'korisnici', 
      timestamps: true, 
    });
  
    return Korisnik;
  };