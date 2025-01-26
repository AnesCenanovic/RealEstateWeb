let SpisakNekretnina = function () {

    let listaNekretnina = [];
    let listaKorisnika = [];

    let init = function (listaNekretnina, listaKorisnika) {
        this.listaNekretnina = listaNekretnina;
        this.listaKorisnika = listaKorisnika;
    }

    let filtrirajNekretnine = function (kriterij) {
        return this.listaNekretnina.filter(nekretnina => {

            if (kriterij.tip_nekretnine && nekretnina.tip_nekretnine !== kriterij.tip_nekretnine) {
                console.log("tip nekretnine");
                return false;
            }

            if (kriterij.naziv && !nekretnina.naziv.toLowerCase().includes(kriterij.naziv.toLowerCase())) {
                console.log("naziv");
                return false;
            }

            if (kriterij.min_kvadratura && nekretnina.kvadratura < kriterij.min_kvadratura) {
                console.log("min kvadratura");
                return false;
            }

            if (kriterij.max_kvadratura && nekretnina.kvadratura > kriterij.max_kvadratura) {
                console.log("max kvadratura");
                return false;
            }

            if (kriterij.min_cijena && nekretnina.cijena < kriterij.min_cijena) {
                console.log("min cijena");
                return false;
            }

            if (kriterij.max_cijena && nekretnina.cijena > kriterij.max_cijena) {
                console.log("max cijena");
                return false;
            }

            if (kriterij.tip_grijanja && nekretnina.tip_grijanja !== kriterij.tip_grijanja) {
                console.log("tip grijanja");
                return false;
            }

            if (kriterij.lokacija && !nekretnina.lokacija.toLowerCase().includes(kriterij.lokacija.toLowerCase())) {
                console.log("lokacija");
                return false;
            }

            if (kriterij.godina_izgradnje && nekretnina.godina_izgradnje !== kriterij.godina_izgradnje) {
                console.log("godina izgradnje");
                return false;
            }

            if (kriterij.datum_objave && nekretnina.datum_objave !== kriterij.datum_objave) {
                console.log("datum objave");
                return false;
            }

            return true;
        });
    }

    let ucitajDetaljeNekretnine = function (id) {
        return listaNekretnina.find(nekretnina => nekretnina.id === id) || null;
    }

    return {
        init: init,
        filtrirajNekretnine: filtrirajNekretnine,
        ucitajDetaljeNekretnine: ucitajDetaljeNekretnine
    }
};