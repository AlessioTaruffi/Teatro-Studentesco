document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById('email').value; // Prendi email
  
    // Richiesta ajax
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/retrieve_password.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Risposta del server
        alert(xhr.responseText);
      }
    };
    xhr.send('email=' + encodeURIComponent(email)); // Invia email
});