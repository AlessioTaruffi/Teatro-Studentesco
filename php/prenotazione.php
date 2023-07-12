<?php
    $conn = pg_connect("host=VPN port=5433 dbname=redacted user=redacted password=redacted") or die('Could not connect: ' . pg_last_error());
    $data = json_decode(file_get_contents('php://input'));
    $seats = $data->seats;
    $selectedShow = $data->show;
    $dataora = $data->dataora;

    // Esegui l'operazione di salvataggio per ogni posto
    foreach ($seats as $seat) {
        $sql = "INSERT INTO posti (posto, spettacolo, dataora) VALUES ('$seat', '$selectedShow', '$dataora')";
        $result = pg_query($conn, $sql) or die('Query failed: ' . pg_last_error());
    }
    pg_close($conn);
?>