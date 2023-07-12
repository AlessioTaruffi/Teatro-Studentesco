
$(document).ready(function () {
    $("#formLogin").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;
        const email = $("#emailLogin").val();
        const password = $("#passwordLogin").val();
        const data = {
            email: email,
            password: password,
        }
        $.ajax({
            url: "/php/login.php",
            method: "POST",
            data: data,
            dataType: "json",
            success: function (data) {
                if (data.code) {
                    alert("Login effettuato con successo");
                    login(data.email);
                } 
                else { alert("Credenziali errate"); }
            },
            error: function (jqXHR, textStatus, errorThrown) { 
                console.error(textStatus, errorThrown); // Error handling
            }
        })
    })
});

/*piccolo script che nasconde il banner dei cookie se essi sono stati accettati in precedenza*/
$(document).ready(function () {
    checkLogin();
    checkCookie();
    if (getCookie()) { $(".cookie").hide(); }
    $("#bottoneCookie").click(function () {
        const now = new Date();
        const cookie = {
            valore: "true",
            scadenza: now.getTime() + 1000 * 60 * 60 * 24 * 30,
        }
        localStorage.setItem("cookie", JSON.stringify(cookie));
        $(".cookie").hide();
    });

    $("#logout").click(function () {
        logout();
        alert("Logout effettuato con successo");
    })
});

function getCookie() {
    const cookieStr = localStorage.getItem("cookie");
    if (cookieStr == null) { return false; }
    const item = JSON.parse(cookieStr);
    const now = new Date();
    if ((now.getTime() > item.scadenza)) {
        localStorage.removeItem("cookie");
        return false;
    }
    return true;
}

function checkCookie() {
    const cookieStr = localStorage.getItem("cookie");
    if (cookieStr == null) { return false; }
    const item = JSON.parse(cookieStr);
    const now = new Date();
    /*LEVA 1=1 O IL COOKIE APPARE SEMPRE, serve come hard reset e a scopo dimostrativo
    magari mettere script cookie in file apparte così che sia attivo su ogni page
    altrinenti usciti dalla homepage senza accettare si toglie ed ha poco senso*/
    if ((now.getTime() > item.scadenza)) {
        localStorage.removeItem("cookie");
        return false;
    }
    return true;
}

function login(email) {
    /*fa apparire e sparire delle cose, memorizza email e session time*/
    $("#profilo").show();
    $("#nomeProfilo").text(email);
    localStorage.setItem("email", email);
    $("#immagineProfilo").attr("src", "/images/user.png");
    $("#id01").hide();
    $("#logout").show();
    $("#login").hide();
    const now = new Date();
    const login = {
        valore: "true",
        scadenza: now.getTime() + 1000 * 60 * 60 * 24 * 30,
    }
    localStorage.setItem("scadenzaLogin", JSON.stringify(login));
}

function logout() {
    /*fa apparire e sparire delle cose, memorizza email e session time*/
    $("#profilo").hide();
    $("#nomeProfilo").text("");
    localStorage.setItem("email", "");
    $("#immagineProfilo").attr("src", "");
    $("#id01").hide();
    $("#logout").hide();
    $("#login").show();
    localStorage.removeItem("scadenzaLogin");
}

function checkLogin() {
    const loginStr = localStorage.getItem("scadenzaLogin");
    if (loginStr == null) { return false; }
    const item = JSON.parse(loginStr);
    const now = new Date();
    if ((now.getTime() > item.scadenza)) {
        logout();
        return false;
    }
    $("#profilo").show();
    $("#nomeProfilo").text(localStorage.getItem("email"));
    $("#immagineProfilo").attr("src", "/images/user.png");
    $("#id01").hide();
    $("#logout").show();
    $("#login").hide();
    return true;
}

function deleteCookie() { localStorage.removeItem("cookie"); }

