let StatistikaNekretnina = function () {

    let listaNekretnina = [];
    let listaKorisnika = [];

    //postojeći modul
    let spisakNekretnina = new SpisakNekretnina();
    //re-use init
    let init = function (listaNekretnina, listaKorisnika) {
      spisakNekretnina.init(listaNekretnina, listaKorisnika);
      this.listaNekretnina = spisakNekretnina.listaNekretnina;
      this.listaKorisnika = spisakNekretnina.listaKorisnika;
    };

    //filtriranje prosjeka kvadrature
    let prosjecnaKvadratura = function (kriterij) {
      const filteredProperties = spisakNekretnina.filtrirajNekretnine(kriterij);
      return filteredProperties.reduce((sum, property) => sum + property.kvadratura, 0) / filteredProperties.length;
    };

    let outlier = function (kriterij, nazivSvojstva) {

        const filteredProperties = spisakNekretnina.filtrirajNekretnine(kriterij);
    
        if (filteredProperties.length === 0) {
            return null;
        }
    
        //prosjek
        const sum = filteredProperties.reduce((total, property) => total + property[nazivSvojstva], 0);
        const average = sum / filteredProperties.length;
    
        //pronalaženje nekretnine s najvećim odstupanjem
        return filteredProperties.reduce((maxOutlier, property) => {
            const currentDifference = Math.abs(property[nazivSvojstva] - average);
            return currentDifference > maxOutlier.difference ? { property, difference: currentDifference } : maxOutlier;
        }, { property: null, difference: 0 }).property;
    }

    let histogramCijena = function(periodi, rasponiCijena) {
        console.log(this.listaNekretnina);
        console.log(periodi);
        console.log(rasponiCijena);
            return periodi.flatMap((period, periodIndex) => {
                return rasponiCijena.map((raspon, rasponIndex) => {
                    return {
                        indeksPerioda: periodIndex,
                        indeksRasponaCijena: rasponIndex,
                        brojNekretnina: this.listaNekretnina.filter(nekretnina => {
                            let godina = nekretnina.datum_objave.split('.')[2];
                            return godina >= period.od &&
                                   godina <= period.do &&
                                   nekretnina.cijena >= raspon.od &&
                                   nekretnina.cijena <= raspon.do;
                        }).length
                    };
                });
            }).flat();
    };

    let mojeNekretnine = function (korisnik) {
        console.log(this.listaNekretnina);
        const nekretnineSaBaremJednimUpitomKorisnika = this.listaNekretnina.filter(nekretnina => {
            return nekretnina.upiti.some(upit => upit.korisnik_id === korisnik.id);
        });
    
        //descending
        return nekretnineSaBaremJednimUpitomKorisnika.sort((a, b) => b.upiti.length - a.upiti.length);
    }
    
    
    return {
      init: init,
      prosjecnaKvadratura: prosjecnaKvadratura,
      outlier: outlier,
      mojeNekretnine: mojeNekretnine,
      histogramCijena: histogramCijena,
    };
};