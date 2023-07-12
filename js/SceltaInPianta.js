function spettacoloSelezionato() {
    var spettacoloSelezionato = document.getElementById('sceltaSpettacolo');
    var secondoMenu = document.getElementById('sceltaData');

    secondoMenu.innerHTML = "";

    if (spettacoloSelezionato.value == "amleto") {
        // Opzioni per la selezione "Amleto"
        var opzione1 = document.createElement("option");
        opzione1.text = "Mer 12.04 21:00";
        secondoMenu.add(opzione1);

        var opzione2 = document.createElement("option");
        opzione2.text = "Gio 13.04 21:00";
        secondoMenu.add(opzione2);

        var opzione3 = document.createElement("option");
        opzione3.text = "Ven 14.04 21:00";
        secondoMenu.add(opzione3);

        var opzione4 = document.createElement("option");
        opzione4.text = "Sab 15.04 21:00";
        secondoMenu.add(opzione4);

        var opzione5 = document.createElement("option");
        opzione5.text = "Dom 16.04 21:00";
        secondoMenu.add(opzione5);
    } 
    else if (spettacoloSelezionato.value == "mercante") {
        // Opzioni per la selezione "Il mercante di Venezia"
        var opzione6 = document.createElement("option");
        opzione6.text = "Lun 17.04 21:00";
        secondoMenu.add(opzione6);

        var opzione7 = document.createElement("option");
        opzione7.text = "Mar 18.04 21:00";
        secondoMenu.add(opzione7);

        var opzione8 = document.createElement("option");
        opzione8.text = "Mer 19.04 21:00";
        secondoMenu.add(opzione8);

        var opzione9 = document.createElement("option");
        opzione9.text = "Gio 20.04 21:00";
        secondoMenu.add(opzione9);
    } 
    else if (spettacoloSelezionato.value == "pascal") {
        // Opzioni per la selezione "Il fu mattia Pascal"
        var opzione10 = document.createElement("option");
        opzione10.text = "Ven 21.04 21:00";
        secondoMenu.add(opzione10);

        var opzione11 = document.createElement("option");
        opzione11.text = "Sab 22.04 21:00";
        secondoMenu.add(opzione11);

        var opzione12 = document.createElement("option");
        opzione12.text = "Dom 23.04 21:00";
        secondoMenu.add(opzione12);

        var opzione13 = document.createElement("option");
        opzione13.text = "Lun 24.04 21:00";
        secondoMenu.add(opzione13);

        var opzione14 = document.createElement("option");
        opzione14.text = "Mar 25.04 21:00";
        secondoMenu.add(opzione14);

        var opzione15 = document.createElement("option");
        opzione15.text = "Mer 26.04 21:00";
        secondoMenu.add(opzione15);

        var opzione16 = document.createElement("option");
        opzione16.text = "Gio 27.04 21:00";
        secondoMenu.add(opzione16);
    }
    else if (spettacoloSelezionato.value == "promessisposi") {
        // Opzioni per la selezione "Promessi Sposi"
        var opzione17 = document.createElement("option");
        opzione17.text = "Gio 27.04 21:00";
        secondoMenu.add(opzione17);

        var opzione18 = document.createElement("option");
        opzione18.text = "Ven 28.04 21:00";
        secondoMenu.add(opzione18);

        var opzione19 = document.createElement("option");
        opzione19.text = "Sab 29.04 21:00";
        secondoMenu.add(opzione19);

        var opzione20 = document.createElement("option");
        opzione20.text = "Dom 30.04 21:00";
        secondoMenu.add(opzione20);
    }
    else if (spettacoloSelezionato.value == "concerto") {
        // Opzioni per la selezione "Concerto del 1 maggio"
        var opzione21 = document.createElement("option");
        opzione21.text = "Lun 01.05 21:00";
        secondoMenu.add(opzione21);
    }
}

function sendSelectedSeatsToServer() {
    const selectedSeats = document.querySelectorAll('.seat.active');
    const seatNumbers = Array.from(selectedSeats).map(seat => seat.id);
    const selectedShow = document.getElementById('sceltaSpettacolo').value;
    const dataora = document.getElementById('sceltaData').value;

    const data = {
        seats: seatNumbers,
        show: selectedShow,
        dataora: dataora
    };
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/prenotazione.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) { console.log('Posti salvati con successo!'); }
        else console.log('Errore nel salvataggio posti!');
    };
    xhr.send(JSON.stringify(data));
}

function restoreSelectedSeats() {
    const selectedShow = document.getElementById('sceltaSpettacolo').value;
    const selectedDate = document.getElementById('sceltaData').value;

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/php/Prenotati.php?show=${selectedShow}&date=${selectedDate}`, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const previousSeats = JSON.parse(xhr.responseText);

            // Rimuovi la classe 'selected' da tutti i posti
            const allSeats = document.querySelectorAll('.seat');
            allSeats.forEach(seat => seat.classList.remove('selected'));
            $("#legenda").addClass('selected');

            // Aggiungi la classe 'selected' ai posti precedentemente selezionati
            previousSeats.forEach(seatNumber => {
                const seat = document.getElementById(seatNumber);
                if (seat) { seat.classList.add('selected'); }
            });
        }
    };
    xhr.send();
}