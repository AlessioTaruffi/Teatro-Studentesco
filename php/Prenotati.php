<?php
    $servername = "VPN";
    $username = "redacted";
    $password = "redacted";
    $dbname = "redacted";

    $conn = pg_connect("host=$servername port=5433 dbname=$dbname user=$username password=$password");
    if (!$conn) { die("Connessione al database fallita"); }

    $selectedShow = pg_escape_string($_GET['show']);
    $selectedDate = pg_escape_string($_GET['date']);
    $selectedSeats = array();

    // Recupera i posti precedentemente selezionati dal database per lo spettacolo specificato
    $sql = "SELECT posto FROM posti WHERE spettacolo = '$selectedShow' AND dataora = '$selectedDate'";
    $result = pg_query($conn, $sql);

    if (pg_num_rows($result) > 0) { while ($row = pg_fetch_assoc($result)) { $selectedSeats[] = $row['posto']; } }

    pg_close($conn);

    // Restituisci i posti precedentemente selezionati come risposta JSON
    header('Content-Type: application/json');
    echo json_encode($selectedSeats);
?>