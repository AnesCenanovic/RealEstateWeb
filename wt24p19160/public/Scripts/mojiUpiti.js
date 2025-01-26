window.onload = function () {
    // Fetch and display "mojiUpiti"
    PoziviAjax.getMojiUpiti(function (err, upiti) {
        const container = document.getElementById('upitiContainer');

    

        // Handle empty list
        if (!upiti || upiti.length === 0) {
            container.innerHTML = `<p>Nemate upita.</p>`;
            console.log('No queries found'); // Log empty state
            return;
        }
        console.log(upiti);
        // Render "upiti" in the container
        const list = document.createElement('ul');
        upiti.forEach(upit => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Nekretnina ID:</strong> ${upit.nekretnina_id}<br>
                <strong>Tekst Upita:</strong> ${upit.tekst}<br>
            `;
            list.appendChild(listItem);
        });
        container.appendChild(list);
    });
};