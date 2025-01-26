
const odInput = document.getElementById('periodOd');
const doInput = document.getElementById('periodDo');
const od2Input = document.getElementById('cijenaOd'); 
const do2Input = document.getElementById('cijenaDo'); 
const crtajHistogramBtn = document.getElementById('crtajHistogram');
const chartContainer = document.getElementById('chartContainer');

let statistika = StatistikaNekretnina();
statistika.init(listaNekretnina, listaKorisnika);

function prosjecnaKvadratura() {
  let kriterij;

  try {

      kriterij = JSON.parse(document.getElementById("kvadratura-kriterij").value);

  } 
  catch (e) {

      alert("Bad Format! Try : {\"tip_nekretnine\":\"Stan\"}");
      return;

  }

  const rezultat = statistika.prosjecnaKvadratura(kriterij);
  document.getElementById("rezultat-kvadratura").innerText = 
      rezultat ? `Prosječna kvadratura: ${rezultat.toFixed(2)} m²` : "Nema podataka za navedeni kriterij.";
} 

function prikaziOutlier() {
  let kriterij;

  try {
      kriterij = JSON.parse(document.getElementById("outlier-kriterij").value);
  } catch (e) {
      alert("Bad Format! Try : {\"tip_nekretnine\":\"Stan\"}");
      return;
  }

  const nazivSvojstva = document.getElementById("naziv-svojstva").value;
  const rezultat = statistika.outlier(kriterij, nazivSvojstva);
  document.getElementById("rezultat-outlier").innerText =
      rezultat ? `Outlier nekretnina: ${rezultat.naziv}, Vrijednost: ${rezultat[nazivSvojstva]}` : "Nema outlier za zadani kriterij.";
}

function mojeNekretnine() {
  const korisnikId = parseInt(document.getElementById("korisnik-id").value);
  const korisnik = listaKorisnika.find(k => k.id === korisnikId);
  if (!korisnik) {
      alert("Korisnik s tim ID ne postoji.");
      return;
  }
  const mojeNekretnine = statistika.mojeNekretnine(korisnik);
  document.getElementById("rezultat-nekretnine").innerHTML =
      mojeNekretnine.length > 0 
          ? mojeNekretnine.map(nekretnina => `<p>${nekretnina.naziv} (${nekretnina.cijena} KM)</p>`).join("")
          : "Nema nekretnina za ovog korisnika.";
}

function iscrtajHistogram() {

  const histogrami = document.getElementById("rezultat-histogram");

  const periodiInput = document.getElementById("periodi").value.trim();
  const rasponiInput = document.getElementById("rasponi").value.trim();

  let periodi, rasponi;
  
  try {
      periodi = JSON.parse(periodiInput);
      rasponi = JSON.parse(rasponiInput);
  } catch (error) {
      alert("Pogrešan format.");
      return;
  }

  const histogram = statistika.histogramCijena(periodi, rasponi);

  console.log(histogram);

  // reset
  histogrami.innerHTML = "";

  periodi.forEach((period, indeksPerioda) => {
      const podaciZaPeriod = histogram.filter(
          pod => pod.indeksPerioda === indeksPerioda
      );
      // Chart.js 
      const labels = rasponi.map(
          raspon => `${raspon.od}-${raspon.do}`
      );
      const data = rasponi.map(
          (_, indeksRaspona) => {
              const pod = podaciZaPeriod.find(p => p.indeksRasponaCijena === indeksRaspona);
              return pod ? pod.brojNekretnina : 0;
          }
      );
      // Canvas
      const canvas = document.createElement("canvas");
      canvas.id = `chart-${indeksPerioda}`;
      histogrami.appendChild(canvas);

      // bar charta
      new Chart(canvas.getContext("2d"), {
          type: "bar",
          data: {
              labels: labels,
              datasets: [{
                  label: `Period ${period.od} - ${period.do}`,
                  data: data,
                  backgroundColor: "rgba(80, 127, 199, 0.5)", // Light blue with adjusted alpha for better visibility,
                  borderColor: "navy",
                  borderWidth: 2,
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: `Histogram za period ${period.od} - ${period.do}` },
              },
              scales: {
                  x: { beginAtZero: true },
                  y: { beginAtZero: true }
              }
          }
      });
  });
}

