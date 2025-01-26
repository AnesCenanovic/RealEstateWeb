document.addEventListener('DOMContentLoaded', function() {
    const top5Nekretnine = JSON.parse(sessionStorage.getItem('top5Nekretnine'));
    const top5Container = document.querySelector('#top5-nekretnine');

    if (top5Nekretnine && top5Nekretnine.length > 0) {
        top5Nekretnine.forEach(nekretnina => {
            const nekretninaDiv = document.createElement('div');
            nekretninaDiv.classList.add('nekretnina');
            nekretninaDiv.innerHTML = `
                <img class="slika-nekretnine" src="../Resources/Nekretnine/stan.jpg" alt="Stan Default">
                <p><strong>Naziv:</strong> ${nekretnina.naziv}</p>
                <p><strong>Kvadratura:</strong> ${nekretnina.kvadratura} m²</p>
                <p><strong>Cijena:</strong> ${nekretnina.cijena} KM</p>
            `;
            top5Container.appendChild(nekretninaDiv);
        });
    } else {
        top5Container.innerHTML = '<p>Nema dostupnih nekretnina za ovu lokaciju.</p>';
    }
});