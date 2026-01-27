const savedScore = localStorage.getItem('pisteet');
const savedSpeed = localStorage.getItem('nopeus');
let pisteet = savedScore ? parseInt(savedScore) : 0;
let nopeus = savedSpeed ? parseFloat(savedSpeed) : 1;

let efekti = document.getElementById("coin");
let tausta = document.getElementById("taustamusiikki");

function nollaaPisteet() {
    pisteet = 0;
    nopeus = 1;
    localStorage.setItem('pisteet', pisteet.toString());
    musiikkiNopeus(1);
    updateScore();
}

function mykistäMusiikki(laite) {
    let checkboxMusic = document.getElementById("musiikkiPäällä");
    let checkboxMusicMobile = document.getElementById("musiikkiPäälläMobiili");
    if (laite === 'desktop') {
        tausta.muted = checkboxMusic.checked;
    } else if (laite === 'mobiili') {
        tausta.muted = checkboxMusicMobile.checked;
    }
}

function mykistäEfektit(laite) {
    let checkbox = document.getElementById("efektitPäällä");
    let checkboxMobile = document.getElementById("efektitPäälläMobiili");
    if (laite === 'desktop') {
        efekti.muted = checkbox.checked;
    } else if (laite === 'mobiili') {
        efekti.muted = checkboxMobile.checked;
    }
}

function mVoimakkuus(mVoimakkuus) {
    tausta.volume = mVoimakkuus;
}

function eVoimakkuus(eVoimakkuus) {
    efekti.volume = eVoimakkuus;
}

function musiikkiNopeus(uusiNopeus) {
    tausta.playbackRate = uusiNopeus;
    nopeus = uusiNopeus;
    localStorage.setItem("nopeus", uusiNopeus.toString());
    tausta.play();
}

function playEfekti() {
    efekti.currentTime = 0;
    efekti.play();
}

window.onload = function() {
    welcome();
};

function welcome(viesti) {
    saavutusTekstiSelain = document.getElementById("selosteSelain").innerHTML = viesti;
    document.getElementById("startGame").style.display = "block";
};

function ok() {
    updateScore();
    tausta.volume = 0.2;
    efekti.volume = 0.2;
    musiikkiNopeus(nopeus);
    document.getElementById("startGame").style.display = "none";
}

function clickOssi() {
    pisteet++;
    localStorage.setItem('pisteet', pisteet.toString());
    localStorage.setItem('nopeus', nopeus.toString());
    if (pisteet === 10) {
        viesti = ("Tukesi riittävät vihkoon ja lyijykynään. Tiesi kirjailijaksi on alkamassa!");
        saavutus(viesti);
        musiikkiNopeus(1.1);
    }
    if (pisteet === 40) {
        viesti = ("Luovan tauon aika. Rahasi riittävät pieneen kossuun.");
        saavutus(viesti);
        musiikkiNopeus(1.2);
    }
    if (pisteet === 100) {
        viesti = ("Löydät kirpparilta käytetyn kirjoituskoneen.");
        saavutus(viesti);
        musiikkiNopeus(1.3);
    }
    if (pisteet === 500) {
        viesti = ("Rahasi riittävät jo läppäriin. Nyt alkaa Lyyti kirjoittamaan!");
        saavutus(viesti);
        musiikkiNopeus(1.4);
    }
    if (pisteet === 1000) {
        viesti = ("Ensimmäinen sivu valmis. Kolauspäivän kunniaksi Kontulan Himabaariin yhdelle!");
        saavutus(viesti);
        musiikkiNopeus(1.5);
    }
    if (pisteet === 10000) {
        viesti = ("Ensimmäinen luku valmis. Kelan rahat riittävät tänään keskustaan asti. Roskabaariin!");
        saavutus(viesti);
        musiikkiNopeus(1.6);
    }
    if (pisteet === 100000) {
        viesti = ("Aki, Make ja Pera tulivat kylään ja joivat rahasi. Onneksi ensi viikolla kolahtaa taas.");
        saavutus(viesti);
        musiikkiNopeus(1.7);
    }
    if (pisteet === 1000000) {
        viesti = ("Kahden kuukauden ryyppäämisen jälkeen jatkat kirjoittamista.");
        saavutus(viesti);
        musiikkiNopeus(1.8);
    }
    if (pisteet === 10000000) {
        viesti = ('Iltahömppä kirjoittaa sinusta "uutisen". Olet julkkis!');
        saavutus(viesti);
        musiikkiNopeus(1.9);
    }
    if (pisteet === 100000000) {
        viesti = ("Kirjasi on valmis. Päätät juhlistaa saavutustasi pienellä päiväkännillä.");
        saavutus(viesti);
        musiikkiNopeus(2);
    }
    if (pisteet === 200000000) {
        viesti = ("Kirjasi julkaistaan. Hip hei!");
        saavutus(viesti);
        musiikkiNopeus(2.1);
    }
    if (pisteet === 300000000) {
        viesti = ("Kukaan osta kirjaasi, mutta onneksi tuet juoksevat!");
        saavutus(viesti);
        musiikkiNopeus(2.2);
    }
    if (pisteet === 500000000) {
        viesti = ("Teostasi on myyty jo kymmenen kappaletta. Olet kohta maksanut velkasi yhteiskunnalle!");
        saavutus(viesti);
        musiikkiNopeus(2.3);
    }
    if (pisteet === 1000000000) {
        viesti = ("Aloitat uuden kirjan kirjoittamisen.");
        saavutus(viesti);
        musiikkiNopeus(2.4);
    }
    if (pisteet === 2000000000) {
        viesti = ("Luova tauko. Kukaan ei osta kirjojasi.");
        saavutus(viesti);
        musiikkiNopeus(2.5);
    }
    if (pisteet === 3000000000) {
        viesti = ("Iltahömppä kirjoittaa sielunkumppanistasi. Muutat yhteen Alma Tuuvan kanssa.");
        saavutus(viesti);
        musiikkiNopeus(2.6);
    }
    if (pisteet === 4000000000) {
        viesti = ("Kela aloittaa liikaa maksetun asumistuen takaisinperinnän. Kännit hiluilla.");
        saavutus(viesti);
        musiikkiNopeus(2.7);
    }
    if (pisteet === 7000000000) {
        viesti = ("Jatkat toista teostasi.");
        saavutus(viesti);
        musiikkiNopeus(2.8);
    }
    if (pisteet === 8000000000) {
        viesti = ("Toinen kirjasi valmistuu.");
        saavutus(viesti);
        musiikkiNopeus(2.9);
    }
    if (pisteet === 9000000000) {
        viesti = ("Toista kirjaasi myydään lähes tusinan verran!");
        saavutus(viesti);
        musiikkiNopeus(3);
    }
    if (pisteet === 9999999999) {
        viesti = ("Olet täysiverinen sossupummi ja elämäntapataiteilija. Onneksi olkoon!");
        saavutus(viesti);
        musiikkiNopeus(1);
    }

    updateScore();
    showImage();
    playEfekti();
}

function saavutus(viesti) {
    if (window.innerWidth <= 1023) {
        saavutusTekstiMobiili = document.getElementById("selosteMobiili").innerHTML = viesti;
        document.getElementById("saavutusLaatikkoMobiili").style.display = "block";
        setTimeout(function () {
            document.getElementById("saavutusLaatikkoMobiili").style.display = "none";
        }, 20000);
    } else {
        saavutusTekstiSelain = document.getElementById("selosteSelain").innerHTML = viesti;
        document.getElementById("saavutusLaatikkoSelain").style.display = "block";
        setTimeout(function () {
            document.getElementById("saavutusLaatikkoSelain").style.display = "none";
        }, 20000);
    }
}

function updateScore() {
    tausta.play();
    scoreCalc(pisteet);
    
}

function showImage() {
    let image = document.createElement("img");
    image.src = "img/kela.png";
    image.style.position = "absolute";
    if (window.innerWidth <= 1023 && window.matchMedia("(orientation: landscape)").matches){
        image.style.width = "100px";
        image.style.left = (event.pageX - image.width / 2 + window.scrollX + 260) + "px";
        image.style.top = (event.pageY - image.height / 2 + window.scrollY - 80) + "px";
    } else if (window.innerWidth <= 1023) {
        image.style.width = "100px";
        image.style.left = (event.pageX - image.width / 2 + window.scrollX + 140) + "px";
        image.style.top = (event.pageY - image.height / 2 + window.scrollY - 20) + "px";
    } else {
        image.style.width = "200px";
        image.style.left = (event.pageX - image.width / 2 + window.scrollX + 230) + "px";
        image.style.top = (event.pageY - image.height / 2 + window.scrollY - 270) + "px";
    }
    document.body.appendChild(image);
    image.style.display = "block";
    image.classList.add("animaatio");
    setTimeout(function () {
        document.body.removeChild(image);
    }, 1000);
}

function scoreCalc(pisteet) {
    const numerot = [
        '<img src="img/0.png" alt="nolla" width="52px">',
        '<img src="img/1.png" alt="yksi" width="38px">',
        '<img src="img/2.png" alt="kaksi" width="50px">',
        '<img src="img/3.png" alt="kolme" width="52px">',
        '<img src="img/4.png" alt="neljä" width="50px">',
        '<img src="img/5.png" alt="viisi" width="50px">',
        '<img src="img/6.png" alt="kuusi" width="48px">',
        '<img src="img/7.png" alt="seitsemän" width="45px">',
        '<img src="img/8.png" alt="kahdeksan" width="50px">',
        '<img src="img/9.png" alt="yhdeksän" width="46px">'
    ];

    document.getElementById("miljardit").innerHTML = numerot[Math.floor(pisteet / 1000000000) % 10];
    document.getElementById("sadatmillit").innerHTML = numerot[Math.floor(pisteet / 100000000) % 10];
    document.getElementById("kymppimillit").innerHTML = numerot[Math.floor(pisteet / 10000000) % 10];
    document.getElementById("miljoonat").innerHTML = numerot[Math.floor(pisteet / 1000000) % 10];
    document.getElementById("sadattonnit").innerHTML = numerot[Math.floor(pisteet / 100000) % 10];
    document.getElementById("kymppitonnit").innerHTML = numerot[Math.floor(pisteet / 10000) % 10];
    document.getElementById("tuhannet").innerHTML = numerot[Math.floor(pisteet / 1000) % 10];
    document.getElementById("sadat").innerHTML = numerot[Math.floor(pisteet / 100) % 10];
    document.getElementById("kympit").innerHTML = numerot[Math.floor(pisteet / 10) % 10];
    document.getElementById("ykköset").innerHTML = numerot[pisteet % 10];
}

function suljeSaavutusSelain() {
    document.getElementById("saavutusLaatikkoSelain").style.display = "none";
}

function suljeSaavutusMobiili() {
    document.getElementById("saavutusLaatikkoMobiili").style.display = "none";
}