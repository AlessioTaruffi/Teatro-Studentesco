$(document).ready(function () {
    $("#submitBtn").click(function () {
        if(validaRegistrazione()){
            var email = $("#email").val();
            var nome = $("#nome").val();
            var cognome = $("#cognome").val();
            var telefono = $("#telefono").val();
            var password = $("#password").val();

            $.ajax({
                url: '/php/registrazione.php',
                type: 'POST',
                data: { nome:nome
                    , cognome:cognome
                    , email:email
                    , telefono:telefono
                    , password:password },
                dataType: 'json',
                success: function(data) {
                    if(data.email) { alert("Email già registrata. Impossibile procedere."); } 
                    else {
                        if(data.telefono){ alert("Telefono già registrato. Impossibile procedere."); }
                        else{
                            alert("Registrazione effettuata con successo.");
                            $("#formRegistrazione").submit();
                        }
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(textStatus, errorThrown); // Error handling
                }
            });
        }
    });
});

function validaRegistrazione() {
    var v = parseInt(document.getElementsByName("nome")[0].value);
    if (!isNaN(v)) {
        alert("Il nome non deve essere un numero");
        return false;
    }
    var v = parseInt(document.getElementsByName("cognome")[0].value);
    if (!isNaN(v)) {
        alert("Il cognome non deve essere un numero");
        return false;
    }
    var telefono = document.getElementsByName("telefono")[0].value;
    if (telefono.length !== 10) {
        alert("Il telefono deve essere composto da 10 cifre");
        return false;
    }
    var v = parseInt(telefono);
    if (isNaN(v)) {
        alert("Il telefono deve essere un numero");
        return false;
    }
    if (document.getElementsByName("nome")[0].value === "") {
        alert("Nome obbligatorio. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("cognome")[0].value === "") {
        alert("Cognome obbligatorio. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("email")[0].value === "") {
        alert("Email obbligatoria. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("telefono")[0].value === "") {
        alert("Telefono obbligatorio. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("password")[0].value === "") {
        alert("Password obbligatoria. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("password2")[0].value === "") {
        alert("Password obbligatoria. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("password")[0].value !== document.getElementsByName("password2")[0].value) {
        alert("Le password inserite non sono uguali. Impossibile procedere.");
        return false;
    }
    if (document.getElementsByName("privacy")[0].checked === false) {
        alert("La politica sulla privacy deve essere accettata. Impossibile procedere.");
        return false;
    }
    return true;
}