const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt24", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

const db = {};

// Add Sequelize and sequelize to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;


// Import models
db.Korisnik = require("../Models/Korisnik")(sequelize);
db.Nekretnina = require("../Models/Nekretnina")(sequelize);
db.Upit = require("../Models/Upit")(sequelize);
db.Zahtjev = require("../Models/Zahtjev")(sequelize);
db.Ponuda = require("../Models/Ponuda")(sequelize);

// Define relationships

db.Korisnik.hasMany(db.Upit, { as: "upiti", foreignKey: "korisnik_id" });
db.Korisnik.hasMany(db.Zahtjev, { as: "zahtjevi", foreignKey: "korisnik_id" });
db.Korisnik.hasMany(db.Ponuda, { as: "ponude", foreignKey: "korisnik_id" });


db.Nekretnina.hasMany(db.Upit, { as: "upiti", foreignKey: "nekretnina_id" });
db.Nekretnina.hasMany(db.Zahtjev, { as: "zahtjevi", foreignKey: "nekretnina_id" });
db.Nekretnina.hasMany(db.Ponuda, { as: "ponude", foreignKey: "nekretnina_id" });


db.Upit.belongsTo(db.Korisnik, { as: "korisnik", foreignKey: "korisnik_id" });
db.Upit.belongsTo(db.Nekretnina, { as: "nekretnina", foreignKey: "nekretnina_id" });


db.Zahtjev.belongsTo(db.Korisnik, { as: "korisnik", foreignKey: "korisnik_id" });
db.Zahtjev.belongsTo(db.Nekretnina, { as: "nekretnina", foreignKey: "nekretnina_id" });


db.Ponuda.belongsTo(db.Korisnik, { as: "korisnik", foreignKey: "korisnik_id" });
db.Ponuda.belongsTo(db.Nekretnina, { as: "nekretnina", foreignKey: "nekretnina_id" });


db.Ponuda.hasMany(db.Ponuda, { as: "vezanePonude", foreignKey: "vezanaPonudaId" });



module.exports = db;