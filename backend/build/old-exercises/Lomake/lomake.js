function validateForm() {
    let errorOccurred = {};
    let userIdLength = document.forms["lomake"]["tunnus"].value.length;
    let passWord = document.forms["lomake"]["salasana"].value;
    let nameLength = document.forms["lomake"]["nimi"].value;
    let addressLength = document.forms["lomake"]["osoite"].value;
    let pWordCheck = document.forms["lomake"]["salasanaCheck"].value;
    let country = document.forms["lomake"]["maa"].value;
    let postalCode = document.forms["lomake"]["postinumero"].value;
    let email = document.forms["lomake"]["email"].value;
    let emailCheck = document.forms["lomake"]["emailCheck"].value;

    let gender;
    if (document.forms["lomake"]["sukupuoliMies"].checked) {
        gender = "Mies";
    } else if (document.forms["lomake"]["sukupuoliNainen"].checked) {
        gender = "Nainen";
    } else if (document.forms["lomake"]["sukupuoliUndefined"].checked) {
        gender = "Muu";
    } else {
        errorOccurred.genderNotSelected = "Tieto on pakollinen";
    }
    localStorage.setItem("sukupuoli", gender);


    let languages = {};
    if (document.forms["lomake"]["suomi"].checked) {
        languages.firstLanguage = "Suomi";
    }
    if (document.forms["lomake"]["muu"].checked) {
        languages.secondLanguage = "Muu";
    }
    if (Object.keys(languages).length = 0) {
        errorOccurred.languageNotSelected = "Tieto on pakollinen";
    }

    if (languages.firstLanguage && languages.secondLanguage) {
        localStorage.setItem("kielet", languages.firstLanguage + ", " + languages.secondLanguage);
    } else if (languages.firstLanguage && (!languages.secondLanguage)) {
        localStorage.setItem("kielet", "Suomi");
    } else {
        localStorage.setItem("kielet", "Muu");
    }


    const emailValidate = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,3}$/;


    if (userIdLength < 6) {
        errorOccurred.idError = "Käyttäjätunnuksen on oltava vähintään kuusi merkkiä pitkä";
    }

    if (passWord.length < 6 || !(/[a-z]/.test(passWord) && /[A-Z]/.test(passWord) && /\d/.test(passWord) && /[!@£$€&%#?]/.test(passWord))) {
        errorOccurred.passWordError = "Salasanan on oltava vähintään kuusi merkkiä pitkä. Lisäksi siinä on oltava vähintään yksi iso kirjain, yksi pieni kirjain, yksi numero sekä yksi erikoismerkki (!@£$€&%#?).";
    }

    if (passWord != pWordCheck) {
        errorOccurred.pWordCheckError = "Salasanat eivät vastaa toisiaan";
    }

    if (nameLength === "") {
        errorOccurred.nameError = "Nimi on pakollinen tieto";
    }

    if (addressLength === "") {
        errorOccurred.addressError = "Katuosoite on pakollinen tieto";
    }

    if (country === "") {
        errorOccurred.countryError = "Valitse sijaintisi";
    }

    if (!/^\d{5}$/.test(postalCode)) {
        errorOccurred.postalCodeError = "Virheellinen postinumero";
    }

    if (!emailValidate.test(email)) {
        errorOccurred.emailError = "Virheellinen sähköpostiosoite";
    }

    if (email != emailCheck) {
        errorOccurred.emailCheckError = "Sähköpostiosoitteet eivät vastaa toisiaan";
    }


    if (Object.keys(errorOccurred).length > 0) {
        document.getElementById("tunnusOk").innerHTML = errorOccurred.idError || "";
        document.getElementById("salasanaOk").innerHTML = errorOccurred.passWordError || "";
        document.getElementById("salasanaCheckOk").innerHTML = errorOccurred.pWordCheckError || "";
        document.getElementById("nimiOk").innerHTML = errorOccurred.nameError || "";
        document.getElementById("osoiteOk").innerHTML = errorOccurred.addressError || "";
        document.getElementById("maaOk").innerHTML = errorOccurred.countryError || "";
        document.getElementById("postinumeroOk").innerHTML = errorOccurred.postalCodeError || "";
        document.getElementById("emailOk").innerHTML = errorOccurred.emailError || "";
        document.getElementById("emailCheckOk").innerHTML = errorOccurred.emailCheckError || "";
        document.getElementById("sukupuoliOk").innerHTML = errorOccurred.genderNotSelected || "";
        document.getElementById("kieliOk").innerHTML = errorOccurred.languageNotSelected || "";
        document.getElementById("virhe").innerHTML = "Antamissasi tiedoissa on virheitä. Tarkista, että kaikki tiedot on täytetty." || "";
        return false;
    }

    submitForm();
    return false
}


function submitForm() {
    let tunnus = document.getElementById("tunnus").value;
    localStorage.setItem("tunnus", tunnus);

    let nimi = document.getElementById("nimi").value;
    localStorage.setItem("nimi", nimi);

    let osoite = document.getElementById("osoite").value;
    localStorage.setItem("osoite", osoite);

    let maa = document.getElementById("maa").value;
    localStorage.setItem("maa", maa);

    let postinro = document.getElementById("postinumero").value;
    localStorage.setItem("postinumero", postinro);

    let email = document.getElementById("email").value;
    localStorage.setItem("email", email);

    let viesti = document.getElementById("viesti").value;
    localStorage.setItem("viesti", viesti);

    window.location.href = "vahvistus.html";

    return false;

}
