const noppia = parseInt(localStorage.getItem("noppia"));                          //Haetaan muuttujat localStoragesta
const pelaajienMaara = (localStorage.getItem("pelaajienMaara"));
let pelaajaLista = JSON.parse(localStorage.getItem("pelaajienNimet"));
const pisteRaja = parseInt(localStorage.getItem("pisteet"));

let n = 1;                                          //Alustetaan muut muuttujat
let pelaaja = pelaajaLista["nimi" + n];
let heittoVuoronPisteet = 0;
let heittoVuoronPisteet2 = 0;
let kierroksenPisteet = 0;
let noppaKuva1;
let noppaKuva2;
let kokonaispisteet = 0;
let kuvat = ["img/Nopat/1.png", "img/Nopat/2.png", "img/Nopat/3.png", "img/Nopat/4.png", "img/Nopat/5.png", "img/Nopat/6.png"];
let index = 0;
let tuplat;
let tuplatHeitetty;



let pelaajat = {};                                  //Luodaan pelaajille kokonaispistelaskuri
for (let i = 1; i <= pelaajienMaara; i++) {
    pelaajat["nimi" + i] = {
        kokonaispisteet: 0
    };
}

if (noppia === 1) {                                                             //Piilotetaan tarpeeton noppanäkymä
    document.getElementById("yhdenNopanPeli").style.display = "block";
    document.getElementById("kahdenNopanPeli").style.display = "none";
} else if (noppia === 2) {
    document.getElementById("yhdenNopanPeli").style.display = "none";
    document.getElementById("kahdenNopanPeli").style.display = "block";
}



window.onload = pelinAloitus();                                             //Toimintolaatikko kutsutaan sivun latauksen yhteydessä



function pelinAloitus() {                                               //Tulostetaan ensimmäisen pelivuoron viesti ja luodaan heittopainike
    document.getElementById("peliLaatikko").style.display = "block";
    document.getElementById("otsikko").innerHTML = pelaaja + " aloittaa. Onnea peliin!";
    document.getElementById("heittoPainike").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="animaatio()">Heitä!</button>';
}


function piilotaPeliLaatikko() {                                        //Funktio piilottaa viestilaatikon heiton ajaksi
    document.getElementById("peliLaatikko").style.display = "none";
}


function playEfekti() {                                             //Toistaa äänitehosteen noppaa heittäessä
    let efekti = document.getElementById("dice");
    efekti.play();
}


function playFanfaari() {                                             //Toistaa äänitehosteen noppaa heittäessä
    let fanfaari = document.getElementById("coin");
    fanfaari.play();
}


function animaatio() {                                              //"Animoidaan" nopanheitto kuvia vaihtamalla
    if (pelaajienMaara >= 2) {
        document.getElementById("p1pisteet").innerHTML = pelaajaLista.nimi1 + ": <br>" + pelaajat.nimi1.kokonaispisteet + " pistettä";
        document.getElementById("p2pisteet").innerHTML = pelaajaLista.nimi2 + ": <br>" + pelaajat.nimi2.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 3) {
        document.getElementById("p3pisteet").innerHTML = pelaajaLista.nimi3 + ": <br>" + pelaajat.nimi3.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 4) {
        document.getElementById("p4pisteet").innerHTML = pelaajaLista.nimi4 + ": <br>" + pelaajat.nimi4.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 5) {
        document.getElementById("p5pisteet").innerHTML = pelaajaLista.nimi5 + ": <br>" + pelaajat.nimi5.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 6) {
        document.getElementById("p6pisteet").innerHTML = pelaajaLista.nimi6 + ": <br>" + pelaajat.nimi6.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 7) {
        document.getElementById("p7pisteet").innerHTML = pelaajaLista.nimi7 + ": <br>" + pelaajat.nimi7.kokonaispisteet + " pistettä";
    }
    if (pelaajienMaara >= 8) {
        document.getElementById("p8pisteet").innerHTML = pelaajaLista.nimi8 + ": <br>" + pelaajat.nimi8.kokonaispisteet + " pistettä";
    }                   //If-lauseet päivittävät kokonaistilanteen kunkin pelaajan kohdalta ruudulle.
    document.getElementById("vuorossa").innerHTML = pelaaja;
    piilotaPeliLaatikko();
    playEfekti();
    index = 0;
    if (noppia === 1) {                                     //Nopan kuvia vaihdetaan satunnaisessa järjestyksessä, samalla arvotaan pisteluku
        let ajastus = setInterval(function () {
            let satunnainen = Math.floor(Math.random() * kuvat.length);
            document.getElementById("noppaYksi").innerHTML = '<img src="' + kuvat[satunnainen] + '" alt="Noppa" width="150px">';
            if (index === kuvat.length * 3) {
                clearInterval(ajastus);
                setTimeout(function () {
                    noppaKuva1 = kuvat[satunnainen];                         //Napataan näytölle jäävän kuvan polku
                    heittoVuoronPisteet = parseInt(noppaKuva1[10]);          //Polusta otetaan kuvatiedoston nimi indeksillä ja tallennetaan lukuna muuttujaan
                    document.getElementById("noppaYksi").innerHTML = '<img src="' + kuvat[satunnainen] + '" alt="Noppa" width="150px">';
                    pistelaskuri();
                }, 800);
            }
            index++;
        }, 100);
    } else if (noppia === 2) {                          //Kahden nopan versio tekee periaatteessa kaiken tuplana.
        let ajastus = setInterval(function () {
            let satunnainen1 = Math.floor(Math.random() * kuvat.length);
            let satunnainen2 = Math.floor(Math.random() * kuvat.length);
            document.getElementById("noppaYksiKauttaKaksi").innerHTML = '<img src="' + kuvat[satunnainen1] + '" alt="Noppa" width="150px">';
            document.getElementById("noppaKaksiKauttaKaksi").innerHTML = '<img src="' + kuvat[satunnainen2] + '" alt="Noppa" width="150px">';
            if (index === kuvat.length * 3) {
                clearInterval(ajastus);
                setTimeout(function () {
                    noppaKuva1 = kuvat[satunnainen1];                         //Napataan näytölle jäävän kuvan polku
                    noppaKuva2 = kuvat[satunnainen2];
                    heittoVuoronPisteet = parseInt(noppaKuva1[10]);          //Polusta otetaan kuvatiedoston nimi indeksillä ja tallennetaan lukuna muuttujaan
                    heittoVuoronPisteet2 = parseInt(noppaKuva2[10]);
                    document.getElementById("noppaYksiKauttaKaksi").innerHTML = '<img src="' + kuvat[satunnainen1] + '" alt="Noppa" width="150px">';
                    document.getElementById("noppaKaksiKauttaKaksi").innerHTML = '<img src="' + kuvat[satunnainen2] + '" alt="Noppa" width="150px">';
                    pistelaskuri();
                }, 800);
            }
            index++;
        }, 100);
    }
}


function pistelaskuri() {                                           //Päivitetään kierroksen pisteet kokonaispisteisiin
    if (noppia === 2) {
        if (heittoVuoronPisteet === heittoVuoronPisteet2 && heittoVuoronPisteet !== 1) {    //Tarkistetaan, ovatko noppien luvut yhtä suuret,
            heittoVuoronPisteet = (heittoVuoronPisteet + heittoVuoronPisteet2) * 2;         //mutta kumpikaan ei ole 1.
            tuplat += 1;                        //Tarkkaillaan tuplaheittojen määrää
            if (tuplat === 3) {
                tuplatHeitetty = true;
                pelaajat["nimi" + n].kokonaispisteet += 0;
                document.getElementById("pisteet").innerHTML = "Pisteet: " + "0";
                document.getElementById("kierroksenpisteet").innerHTML = "Kierroksen pisteet: " + "0";
                document.getElementById("peliLaatikko").style.display = "block";
                document.getElementById("heittoPainike").style.display = "none";
                document.getElementById("luovutaVuoro").style.display = "none";
                document.getElementById("ok").style.display = "block";
                document.getElementById("otsikko").innerHTML = "Heitit kolmesti tuplat. Vuoro siirtyy seuraavalle pelaajalle.";
                document.getElementById("ok").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="seuraavaPelaaja()">:(</button>';
            }
        } else if ((heittoVuoronPisteet === heittoVuoronPisteet2) && heittoVuoronPisteet === 1) {   //Tarkistetaan, onko tuloksena
            heittoVuoronPisteet = 25;                                                               //kaksi ykköstä
        } else if ((heittoVuoronPisteet === 1) || (heittoVuoronPisteet2 === 1)) {       //Annetaan heittovuorolle pisteiksi 1, koska yhden
            heittoVuoronPisteet = 1;                                                    //pisteen heitto käsitellään myöhemmin.
        } else {
            heittoVuoronPisteet += heittoVuoronPisteet2;
        }
    }

    if (heittoVuoronPisteet === 1) {                                        //Käsitellään tilanne, missä yhden nopan silmäluku on 1.
        pelaajat["nimi" + n].kokonaispisteet += 0;                          //Rivit käsitellään myös kahden nopan pelissä.
        document.getElementById("pisteet").innerHTML = "Pisteet: " + "0";
        document.getElementById("kierroksenpisteet").innerHTML = "Kierroksen pisteet: " + "0";
        document.getElementById("peliLaatikko").style.display = "block";
        document.getElementById("heittoPainike").style.display = "none";
        document.getElementById("luovutaVuoro").style.display = "none";
        document.getElementById("ok").style.display = "block";
        document.getElementById("otsikko").innerHTML = "Heitit ykkösen. Parempi onni ensi kierroksella.";
        document.getElementById("ok").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="seuraavaPelaaja()">:(</button>';
    }

    if ((pelaajat["nimi" + n].kokonaispisteet + kierroksenPisteet + heittoVuoronPisteet) >= pisteRaja && heittoVuoronPisteet !== 1) {
        paataPeli();                            //Tarkkaillaan mahdollista voittotilannetta
    } else if (heittoVuoronPisteet !== 1) {
        kierroksenPisteet += heittoVuoronPisteet;
        document.getElementById("pisteet").innerHTML = "Pisteet: " + heittoVuoronPisteet;
        document.getElementById("kierroksenpisteet").innerHTML = "Kierroksen pisteet: " + kierroksenPisteet;
        if (pelaajat["nimi" + n].kokonaispisteet !== 0) {
            document.getElementById("kokonaispisteet").innerHTML = "Aiemmat pisteet: " + pelaajat["nimi" + n].kokonaispisteet;
        } else {
            document.getElementById("kokonaispisteet").innerHTML = "Aiemmat pisteet: " + "0";
        }
        haluatkoJatkaa();
    }
}


function haluatkoJatkaa() {
    if (!tuplatHeitetty) {      //Jos tuplia ei ole heitetty, annetaan mahdollisuus jatkaa, muuten viestilaatikkoon tulostuu ylempänä 
        document.getElementById("peliLaatikko").style.display = "block";        //määritelty viesti.
        document.getElementById("otsikko").innerHTML = "Sait " + heittoVuoronPisteet + " pistettä. Haluatko jatkaa?";
        document.getElementById("heittoPainike").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="animaatio()">Heitä!</button>';
        document.getElementById("luovutaVuoro").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="seuraavaPelaaja()">Luovuta vuoro</button>';
    }
}


function seuraavaPelaaja() {
    tuplat = 0;                                                     //Vuoron vaihtuessa tuplaluvun valvonta nollataan. Pelissä tarkkaillaan
    tuplatHeitetty = false;                                         //heittovuoron aikana saatuja tuplia, ei peräkkäisiä. Syynä kolmen 
    if (pelaajat["nimi" + n].kokonaispisteet < pisteRaja) {         //peräkkäisen tuplaluvun epätodennäköisyys.
        if (heittoVuoronPisteet !== 1) {
            pelaajat["nimi" + n].kokonaispisteet += kierroksenPisteet;
        }
    }

    n += 1;                                                         //n määrittelee seuraavan pelaajan.
    kierroksenPisteet = 0;
    document.getElementById("kierroksenpisteet").innerHTML = "Kierroksen pisteet: " + kierroksenPisteet;
    document.getElementById("ok").style.display = "none";
    document.getElementById("heittoPainike").style.display = "block";
    document.getElementById("luovutaVuoro").style.display = "block";
    if (n > pelaajienMaara) {                                       //Kun kierros on pelattu loppuun, n arvo palautetaan yhteen
        n = 1;                                                      //eli ensimmäiseen pelaajaan.
    }

    pelaaja = pelaajaLista["nimi" + n];
    document.getElementById("vuorossa").innerHTML = pelaaja;
    document.getElementById("peliLaatikko").style.display = "block";
    document.getElementById("pisteet").innerHTML = "Pisteet: " + heittoVuoronPisteet;

    if (pelaajat["nimi" + n].kokonaispisteet !== 0) {
        document.getElementById("kokonaispisteet").innerHTML = "Aiemmat pisteet: " + pelaajat["nimi" + n].kokonaispisteet;
    } else {
        document.getElementById("kokonaispisteet").innerHTML = "Aiemmat pisteet: " + "0";   //Tulostetaan aiempien heittojen paikka näytölle
    }                                                                                       //tilanteessa, jossa aiempia kertyneitä
                                                                                            //pisteitä ei ole.
    document.getElementById("otsikko").innerHTML = "Sinun vuorosi, " + pelaaja;             
    document.getElementById("pisteet").innerHTML = "Pisteet: " + "0";
    document.getElementById("heittoPainike").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="animaatio()">Heitä!</button>';
}


function paataPeli() {
    playFanfaari();
    document.getElementById("peliLaatikko").style.display = "block";
    document.getElementById("otsikko").innerHTML = "Voitit pelin, onneksi olkoon!";
    document.getElementById("ok").style.display = "block";
    document.getElementById("heittoPainike").style.display = "none";
    document.getElementById("luovutaVuoro").style.display = "none";
    document.getElementById("ok").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="peliLoppu()">JEE !!!</button>';
}


function peliLoppu() {
    document.getElementById("vuorossa").style.display = "none";
    document.getElementById("peliLaatikko").style.display = "none";
    document.getElementById("voittaja").innerHTML = pelaaja + " voitti pelin!";
    localStorage.clear();               //Lopuksi tyhjennetään localStorage ja annetaan mahdollisuus pelata uudelleen.
    document.getElementById("uusiPeli").innerHTML = '<button class="btn btn-primary mx-1 fontti" onclick="window.location.href=\'peli.html\'">Pelaa uudelleen</button>';
}