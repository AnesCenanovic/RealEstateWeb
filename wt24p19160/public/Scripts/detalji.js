document.addEventListener("DOMContentLoaded", function () {
    
    const tipInteresovanja = document.querySelector("#tip-interesovanja");
    const interesovanjeFields = document.querySelector("#interesovanje-fields");
    const interesovanjeForm = document.querySelector("#interesovanje-form");

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        console.log("Fetching query parameter:", param);
        return urlParams.get(param);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const nekretninaId = getQueryParam("id");
    console.log("Retrieved nekretninaId:", nekretninaId);


    if (!nekretninaId) {
        document.body.innerHTML = "<p>Nekretnina nije pronađena!</p>";
        return;
    }

    function updateFormFields() {
        const selectedTip = tipInteresovanja.value;
        interesovanjeFields.innerHTML = ""; // briši prijašnje

        if (selectedTip === "upit") { //polja za upit
            interesovanjeFields.innerHTML = `
                <label for="tekst-upita">Tekst:</label>
                <textarea id="tekst-upita" name="tekst" required></textarea>
            `;
        } else if (selectedTip === "zahtjev") {
            interesovanjeFields.innerHTML = `
                <label for="tekst-zahtjeva">Tekst:</label>
                <textarea id="tekst-zahtjeva" name="tekst" required></textarea>
                <label for="trazeni-datum">Traženi datum:</label>
                <input type="date" id="trazeni-datum" name="trazeniDatum" required>
            `;
        } else if (selectedTip === "ponuda") {
            // Fetch linked offers if the user is logged in
            PoziviAjax.getLinkedPonude(nekretninaId, function (error, ponude) {
                if (error) {
                    console.error("Greška pri dohvaćanju povezanih ponuda:", error);
                    return;
                }
                console.log(ponude);
                const options = ponude.map((ponuda) =>
                    `<option value="${ponuda.id}">Ponuda ID: ${ponuda.id} - ${ponuda.cijenaPonude} KM</option>`
                );
                const isDisabled = options.length === 0;

                interesovanjeFields.innerHTML = `
                    <label for="tekst-ponude">Tekst:</label>
                    <textarea id="tekst-ponude" name="tekst" required></textarea>
                    <label for="ponuda-cijena">Ponuda cijena:</label>
                    <input type="number" id="ponuda-cijena" name="ponudaCijene" required>
                    <label for="datum-ponude">Datum ponude:</label>
                    <input type="date" id="datum-ponude" name="datumPonude" required>
                    <label for="vezana-ponuda">ID vezane ponude:</label>
                    <select id="vezana-ponuda" name="idVezanePonude" ${isDisabled ? "disabled" : ""}>
                        <option value="" disabled selected>Odaberite vezanu ponudu</option>
                        ${options.join("")}
                    </select>
                    ${isDisabled ? "<p>Nema ranijih ponuda.</p>" : ""}
                `;
            });
        }
    }

    tipInteresovanja.addEventListener("change",updateFormFields);
    updateFormFields(); //pocetna inicijalizacija

    // predavanje forme

    interesovanjeForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const formData = new FormData(interesovanjeForm);
        const tip = formData.get("tip");
        const body = {};
        body.nekretnina_id = nekretninaId;

        if (tip === "upit") {

            body.tekst = formData.get("tekst");

            PoziviAjax.postUpit(body.nekretnina_id, body.tekst, function (error, response) {
                if (error) {
                    console.error("Greška pri dodavanju interesovanja: ", error);
                    alert("Dodavanje interesovanja nije uspjelo!");
                    return;
                }
                alert("Upit uspješno dodan!");
                interesovanjeForm.reset();
                updateFormFields(); // Reset fields
            });

        } else if (tip === "zahtjev") {
            body.tekst = formData.get("tekst");
            body.trazeni_datum = formData.get("trazeniDatum");

            PoziviAjax.postZahtjev(body.nekretnina_id, body.tekst, body.trazeni_datum, function (error, response) {
                if (error) {
                    console.error("Greška pri dodavanju interesovanja: ", error);
                    alert("Dodavanje interesovanja nije uspjelo!");
                    return;
                }
                alert("Zahtjev uspješno dodan!");
                interesovanjeForm.reset();
                updateFormFields(); // Reset fields
            });

        } else if (tip === "ponuda") {
            body.tekst = formData.get("tekst");
            body.cijena_ponude = parseFloat(formData.get("ponudaCijene"));
            body.datum_ponude = formData.get("datumPonude");
            body.id_vezane_ponude = formData.get("idVezanePonude") || null;
            body.odbijena_ponuda = false; // default po adminu

            PoziviAjax.postPonuda(body.nekretnina_id, body.tekst, body.cijena_ponude, body.datum_ponude, body.id_vezane_ponude, body.odbijena_ponuda,function (error, response) {
                if (error) {
                    console.error("Greška pri dodavanju interesovanja: ", error);
                    alert("Dodavanje interesovanja nije uspjelo!");
                    return;
                }
                alert("Ponuda uspješno dodana!");
                interesovanjeForm.reset();
                updateFormFields(); // Reset fields
            });
        }
    });


    PoziviAjax.getNekretnina(nekretninaId, function(error,nekretnina){
        if (error) {
            // Handle any errors during the request
            document.body.innerHTML = "<p>Greška pri dohvaćanju nekretnine!</p>";
            console.error("Error fetching nekretnina:", error);
            return;
        }
        console.log("Received response from getNekretnina:", error, nekretnina);
        document.querySelector("#nekretnina-image").src = "../Resources/Nekretnine/stan.jpg";
        document.querySelector("#naziv").textContent = nekretnina.naziv;
        document.querySelector("#kvadratura").textContent = `${nekretnina.kvadratura} m²`;
        document.querySelector("#cijena").textContent = `${nekretnina.cijena} KM`;
        document.querySelector("#tip-grijanja").textContent = nekretnina.tip_grijanja;

        const lokacijaLink = document.createElement("a");
        lokacijaLink.href = "#"; 
        lokacijaLink.textContent = nekretnina.lokacija;
        lokacijaLink.addEventListener("click", function (event) {
            console.log("Click event on lokacijaLink");
            event.preventDefault(); 

            PoziviAjax.getTop5Nekretnina(nekretnina.lokacija, function (error, topNekretnine) {
                if (error) {
                    console.error("Greška pri dohvaćanju Top 5 nekretnina:", error);
                    return;
                }
                sessionStorage.setItem("top5Nekretnine", JSON.stringify(topNekretnine));
                window.location.href = "getTop5Nekretnina.html";
            });
        });

        document.querySelector("#lokacija").appendChild(lokacijaLink);
        document.querySelector("#godina-izgradnje").textContent = nekretnina.godina_izgradnje || "Nema podataka";
        document.querySelector("#datum-objave").textContent = nekretnina.datum_objave;
        document.querySelector("#opis-text").textContent = nekretnina.opis;

        const interesovanjaContainer = document.querySelector("#interesovanja-container");
        const nextBtn = document.querySelector(".next-btn");
        const prevBtn = document.querySelector(".prev-btn");

        let allInteresovanja = [];
        let currentIndex = 0;

        function prikaziInteresovanja(){

            console.log(`Displaying interesovanja at index: ${currentIndex}`);
            interesovanjaContainer.innerHTML = ""; //izbriši prijašnje

            if (allInteresovanja.length === 0) {
                interesovanjaContainer.textContent = "Nema dostupnih upita.";
                return;
            }
            
            const interesovanje = allInteresovanja[currentIndex];
            const interesovanjeElement = document.createElement("div");

            if (interesovanje.tip === "upit") {
                interesovanjeElement.innerHTML = `
                    <p><strong>Tip:</strong> Upit</p>
                    <p><strong>ID:</strong> ${interesovanje.id}</p>
                    <p><strong>Tekst:</strong> ${interesovanje.tekst}</p>
                `;
            } else if (interesovanje.tip === "zahtjev") {
                interesovanjeElement.innerHTML = `
                    <p><strong>Tip:</strong> Zahtjev</p>
                    <p><strong>ID:</strong> ${interesovanje.id}</p>
                    <p><strong>Tekst:</strong> ${interesovanje.tekst}</p>
                    <p><strong>Datum:</strong> ${interesovanje.trazeniDatum}</p>
                    <p><strong>Status:</strong> ${
                        interesovanje.odobren ? "Odobreno" : interesovanje.odobren === false ? "Odbijeno" : "Na čekanju"
                    }</p>
                `;
                if (interesovanje.korisnik_id) {
                    interesovanjeElement.innerHTML += `
                        <p><strong>Korisnik ID:</strong> ${interesovanje.korisnik_id}</p>
                    `;
                }
            } else if (interesovanje.tip === "ponuda") {
                interesovanjeElement.innerHTML = `
                    <p><strong>Tip:</strong> Ponuda</p>
                    <p><strong>ID:</strong> ${interesovanje.id}</p>
                    <p><strong>Tekst:</strong> ${interesovanje.tekst_upita}</p>
                    <p><strong>Status:</strong> ${
                        interesovanje.odbijenaPonuda ? "Odbijena" : "Odobrena"
                    }</p>
                `;
                if (interesovanje.cijenaPonude) {
                    interesovanjeElement.innerHTML += `<p><strong>Cijena Ponude:</strong> ${interesovanje.cijenaPonude}</p>`;
                }
        
                if (interesovanje.korisnik_id) {
                    interesovanjeElement.innerHTML += `<p><strong>Korisnik ID:</strong> ${interesovanje.korisnik_id}</p>`;
                }
            }

            interesovanjaContainer.appendChild(interesovanjeElement);

            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === allInteresovanja.length - 1;
        }

        PoziviAjax.getInteresovanja(nekretninaId, function (error, interesovanja) {
            if (error) {
                console.error("Greška pri dohvaćanju interesovanja:", error);
                interesovanjaContainer.innerHTML = "<p>Greška pri dohvaćanju interesovanja.</p>";
                return;
            }
    
            // normaliziranje svih upita u jedan niz zbog prikaza
            allInteresovanja = [
                ...interesovanja.upiti.map((upit) => ({ ...upit, tip: "upit" })),
                ...interesovanja.zahtjevi.map((zahtjev) => ({ ...zahtjev, tip: "zahtjev" })),
                ...interesovanja.ponude.map((ponuda) => ({ ...ponuda, tip: "ponuda" })),
            ];
    
            // Initialize the carousel display
            prikaziInteresovanja();
        });

        prevBtn.addEventListener("click", function () {
            console.log("Prev button clicked. Current index:", currentIndex);
            if (currentIndex > 0) {
                currentIndex--;
                prikaziInteresovanja();
            }
        });


        document.querySelector(".next-btn").addEventListener("click", function () {
            console.log("Next button clicked. Current index:", currentIndex);
            if (currentIndex < allInteresovanja.length - 1) {
                currentIndex++;
                prikaziInteresovanja();
            }
        });
    });
});

