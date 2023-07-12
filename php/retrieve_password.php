<?php
    require __DIR__ . '/../vendor/autoload.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    // Retrieve the email from the request
    $email = $_POST['email'];

    // Establish a database connection (modify with your credentials)
    $host = "redacted";
    $port = 5433;
    $dbname = "redacted";
    $user = "redacted";
    $password = "redacted";
    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

    // Check if the database connection was successful
    if (!$conn) { die("Connection failed: " . pg_last_error()); }

    // Query the database for the email
    $sql = "SELECT password FROM utenti WHERE email = $1";
    $result = pg_query_params($conn, $sql, array($email));

    if ($result) {
        if (pg_num_rows($result) > 0) {
            $row = pg_fetch_assoc($result);
            $password = $row['password'];

            // Send an email to the user
            $mail = new PHPMailer(true);

            try {
                // Configure the PHPMailer instance
                $mail->isSMTP();
                $mail->Host = 'smtp.libero.it';
                $mail->Port = 465;
                $mail->SMTPAuth = true;
                $mail->SMTPSecure = 'ssl';
                $mail->Username = 'teatrostudentesco@libero.it'; 
                $mail->Password = 'redacted'; 

                $mail->setFrom('teatrostudentesco@libero.it', 'Teatro Studentesco');
                $mail->addAddress($email);
                $mail->Subject = 'Password Dimenticata';
                $mail->Body = 'La tua passwor: ' . $password . '. Se non sei stato tu a richiedere la password, contattaci tramite questa mail.';

                // Send the email
                $mail->send();
                echo 'Password inviata alla tua email!';
            } 
            catch (Exception $e) { echo 'Failed to send the password. Error: ' . $mail->ErrorInfo; }
        } 
        else { echo 'Errore: Nessun account con quella email.'; }
    } 
    else { echo 'Query error: ' . pg_last_error(); }

    // Close the database connection
    pg_close($conn);
?>