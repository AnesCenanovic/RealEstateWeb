document.addEventListener('DOMContentLoaded', () => {

    let carouselContainer = document.getElementById('upiti');
    const carouselContainerOriginal = document.getElementById('upiti');
    const carouselContainerOriginalHTML = carouselContainerOriginal.innerHTML;
    const upitElements = document.querySelectorAll('.upit');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    postaviCarousel(carouselContainer,upitElements);

  });

function postaviCarousel(glavniElement, sviElementi, indeks = 0) {

    const originalContent = glavniElement.innerHTML;
    //Check
    if (!glavniElement || !sviElementi.length || isNaN(indeks)) {
      return null;
    }
  
    //Ograničavanje indeksa na valjan raspon
    indeks = indeks % sviElementi.length;
    if (indeks < 0) {
      indeks += sviElementi.length;
    }
  
    //Prikaz početnog elementa
    glavniElement.innerHTML = sviElementi[indeks].innerHTML;
  
    //Funkcije za pomicanje lijevo i desno
    const fnLijevo = () => {
      indeks = (indeks - 1 + sviElementi.length) % sviElementi.length;
      glavniElement.innerHTML = sviElementi[indeks].innerHTML;
    };
  
    const fnDesno = () => {
      indeks = (indeks + 1) % sviElementi.length;
      glavniElement.innerHTML = sviElementi[indeks].innerHTML;
    };
  
    return { fnLijevo, fnDesno };
  }
