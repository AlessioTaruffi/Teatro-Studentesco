document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById('email').value; // prendi email input
  
    // richuesta ajax
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/php/retrieve_password_en.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // risposta del server
        alert(xhr.responseText);
      }
    };
    xhr.send('email=' + encodeURIComponent(email)); // manda email
});