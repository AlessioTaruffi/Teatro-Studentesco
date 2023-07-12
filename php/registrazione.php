<?php
    $dbconn = pg_connect("host=VPN port=5433 dbname=redacted user=redacted password=redacted") or die('Could not connect: ' . pg_last_error());
    $query = "INSERT INTO utenti(nome, cognome, email, telefono, password) VALUES ('".$_POST['nome']."', '".$_POST['cognome']."', '".$_POST['email']."', '".$_POST['telefono']."', '".$_POST['password']."')";
    $checkEmail = "SELECT * FROM utenti WHERE email = '".$_POST['email']."'";
    $checkTelefono = "SELECT * FROM utenti WHERE telefono = '".$_POST['telefono']."'";
    $result = pg_query($dbconn, $checkEmail) or die('Query failed: ' . pg_last_error());

    if(pg_num_rows($result) != 0){ $response = array('email' => true); }
    else{
        $result = pg_query($dbconn, $checkTelefono) or die('Query failed: ' . pg_last_error());
        if(pg_num_rows($result) != 0){ $response = array('telefono' => true); }
        else{
            $result = pg_query($dbconn, $query) or die('Query failed: ' . pg_last_error());
            $response = array('code' => false);
        }
    }
    echo json_encode($response);
    pg_close($dbconn);
?>