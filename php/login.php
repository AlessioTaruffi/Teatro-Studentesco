<?php
    $dbconn = pg_connect("host=VPN port=5433 dbname=redacted user=redacted password=redacted") or die('Could not connect: ' . pg_last_error());

    $checkEmailPassword = "SELECT * FROM utenti WHERE email = '".$_POST['email']."' AND password = '".$_POST['password']."'";

    $result = pg_query($dbconn, $checkEmailPassword) or die('Query failed: ' . pg_last_error());
    if(pg_num_rows($result) == 1){ $response = array('code' => true, 'email' => $_POST['email']); }

    else{ $response = array('code' => false); }

    echo json_encode($response);
    pg_close($dbconn);
?>