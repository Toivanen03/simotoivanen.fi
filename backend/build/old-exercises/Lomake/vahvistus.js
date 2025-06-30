document.addEventListener("DOMContentLoaded", function () {
    let tunnus = localStorage.getItem("tunnus");
    let nimi = localStorage.getItem("nimi");
    let osoite = localStorage.getItem("osoite");
    let maa = localStorage.getItem("maa");
    let postinro = localStorage.getItem("postinumero");
    let email = localStorage.getItem("email");
    let sukupuoli = localStorage.getItem("sukupuoli");
    let kieli = localStorage.getItem("kielet");
    let viesti = localStorage.getItem("viesti");

    document.getElementById("userName").innerText = tunnus;
    document.getElementById("name").innerText = nimi;
    document.getElementById("address").innerText = osoite;
    document.getElementById("country").innerText = maa;
    document.getElementById("zipCode").innerText = postinro;
    document.getElementById("email").innerText = email;
    document.getElementById("gender").innerText = sukupuoli;
    document.getElementById("language").innerText = kieli;
    document.getElementById("message").innerText = viesti;

    localStorage.clear();
});
