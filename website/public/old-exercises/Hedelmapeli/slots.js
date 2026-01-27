
//     ----- ALOITUSMUUTTUJAT -----

//Määritellään globaalit muuttujat sekä ladataan oletuskuvat näytölle sivun auetessa



const panosKympit = document.getElementById("panosEkaNro");                 //Muuttujat valmistelevat saldonäytön päivityksen
const panosYkkoset = document.getElementById("panosTokaNro");
const voittoSadat = document.getElementById("viimVoittoEkaNro");
const voittoKympit = document.getElementById("viimVoittoTokaNro");
const voittoYkkoset = document.getElementById("viimVoittoKolmasNro");
const voitotSadat = document.getElementById("voitotEkaNro");
const voitotKympit = document.getElementById("voitotTokaNro");
const voitotYkkoset = document.getElementById("voitotKolmasNro");
const varauksetKympit = document.getElementById("varauksetEkaNro");
const varauksetYkkoset = document.getElementById("varauksetTokaNro");


const numerot = {1: yksi = '<img src="img/Numerot/1.png" alt="yksi">',            //Lista sisältää saldonäytön numerokuvien polut
    2: '<img src="img/Numerot/2.png" alt="kaksi">',
    3: '<img src="img/Numerot/3.png" alt="kolme">',
    4: '<img src="img/Numerot/4.png" alt="neljä">',
    5: '<img src="img/Numerot/5.png" alt="viisi">',
    6: '<img src="img/Numerot/6.png" alt="kuusi">',
    7: '<img src="img/Numerot/7.png" alt="seitsemän">',
    8: '<img src="img/Numerot/8.png" alt="kahdeksan">',
    9: '<img src="img/Numerot/9.png" alt="yhdeksän">',
    0: '<img src="img/Numerot/0.png" alt="nolla">',
};


const kela1Paikka = document.getElementById("kela1");                               //Kelojen paikat
const kela2Paikka = document.getElementById("kela2");
const kela3Paikka = document.getElementById("kela3");
const kela4Paikka = document.getElementById("kela4");

let satunnainen1;                                       //Muut kelojen muuttujat
let satunnainen2;
let satunnainen3;
let satunnainen4;
                                                //Keloissa esitettävät kuvat

const rivit = {"luumu": ["img/Kelat/paarynaLUUMUappelsiini.png", "img/Kelat/paarynaLUUMUtahti.png", "img/Kelat/paarynaLUUMUrypale.png"],
    "appelsiini": ["img/Kelat/luumuAPPELSIINIpaaryna.png", "img/Kelat/meloniAPPELSIINItahti.png", "img/Kelat/paarynaAPPELSIINIrypale.png"],
    "rypale": ["img/Kelat/luumuRYPALEappelsiini.png", "img/Kelat/luumuRYPALEpaaryna.png", "img/Kelat/luumuRYPALEmeloni.png"],
    "paaryna": ["img/Kelat/meloniPAARYNArypale.png", "img/Kelat/rypalePAARYNAappelsiini.png", "img/Kelat/rypalePAARYNAluumu.png"],
    "tahti": ["img/Kelat/meloniTAHTIappelsiini.png", "img/Kelat/meloniTAHTIrypale.png", "img/Kelat/rypaleTAHTIluumu.png"],
    "kolmeTahtea": ["img/Kelat/meloniTAHTIappelsiini.png", "img/Kelat/meloniTAHTIrypale.png", "img/Kelat/rypaleTAHTIluumu.png"],
    "meloni": ["img/Kelat/paarynaMELONItahti.png", "img/Kelat/rypaleMELONIluumu.png", "img/Kelat/tahtiMELONIrypale.png"]
}


let panos = 1;                              //Alustetaan rahojen laskennassa käytettävät muuttujat
let panostusMahdollinen = true;
let edellinenPanos;
let viimVoitto = 0;
let voittoNaytolle = 0;
let voitot = 0;
let kokonaisvoitot = 0;
let voittosumma = 0;
let pelivaraukset = 10;
let koneeseenKadonnut = 10;
let saldo;

let lisaVoitto = false;
let voittoSaatu = false;
let jackPot = 1;                           //Jackpotin kerrointa kasvatetaan yhdellä jokaisen tyhjäksi arvotun rivin jälkeen.
let Jackpot = false;
let tahtiMaara = 0;

let vilkku1 = false;                       //Lukituspainikkeiden muuttujat
let vilkku2 = false;
let vilkku3 = false;
let vilkku4 = false;
let lukittu1 = false;
let lukittu2 = false;
let lukittu3 = false;
let lukittu4 = false;
let lukitusMahdollinen = false;
let lukitusKaytetty = false;
let kierros = 0;
let vilkku;

let isot = /[A-Z]{5,}/;                     //Muut pelin muuttujat
let pelinAlku = true;
let arvonta = false;
let voittorivi;
let kierrosValmis = false;
let tyhjarivi = 0;
let kelaStop = true;


window.onload = function() {                //Sivua avatessa päivitetään näytölle aloitussaldot sekä oletuskuvat
    if (pelinAlku) {
        paivitaSummat();
        kela1Paikka.innerHTML = '<img src=' + rivit["tahti"][0] + ' alt="Kela 1">';
        kela2Paikka.innerHTML = '<img src=' + rivit["tahti"][1] + ' alt="Kela 2">';
        kela3Paikka.innerHTML = '<img src=' + rivit["tahti"][2] + ' alt="Kela 3">';
        kela4Paikka.innerHTML = '<img src=' + rivit["tahti"][1] + ' alt="Kela 4">';
        document.getElementById("lukko1").innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 1">';
        document.getElementById("lukko2").innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 2">';
        document.getElementById("lukko3").innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 3">';
        document.getElementById("lukko4").innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 4">';
    }
}



//     ----- VIESTIFUNKTIOT -----



function ohjeet() {                                                         //Näytä ohjeruutu
    document.getElementById("ohjeLaatikko").style.display = "block";
}


function suljeOhje() {                                                      //Piilota ohjeruutu
    document.getElementById("ohjeLaatikko").style.display = "none";
}


function gameOver() {                                                       //Näyttää viestin rahojen loputtua
    lukitusMahdollinen = false;
    setTimeout(() => {
        gameOverAani();
        if (kokonaisvoitot > 0) {
            document.getElementById("peliLoppu").style.display = "block";
            document.getElementById("viesti").innerHTML = "Fyrkat finaalissa. Voitit kaikkiaan " + (kokonaisvoitot + koneeseenKadonnut - 10) + " markkaa, ja koneeseen meni sisään " + koneeseenKadonnut + " markkaa. <br><br> Pelataanko uudestaan?";
        } else {
            document.getElementById("peliLoppu").style.display = "block";
            document.getElementById("viesti").innerHTML = "Fyrkat finaalissa. Nyt ei mennyt edes kansanterveydelle, mutta ladataanko lompsasta lisää?";
        }
    }, 1500);
}


function voitonmaksu(painettu) {            //Viesti, kun peli päätetään voitonmaksupainikkeella. Funktio ottaa HTML-koodista parametrina
    let nappula = painettu;                 //viestikentässä painetun toimintopainikkeen arvon.

    document.getElementById("voittotalletusSulje").style.display = "none";      //Aluksi toimintopainikkeet on piilotettu. Painikkeet
    document.getElementById("voittotalletusUusiPeli").style.display ="none";    //tuodaan esiin pelitilanteen edellyttämällä tavalla.

    if ((voitot > 0) && (pelivaraukset === 0)) {    //Tilanne, jossa voittoja on, mutta pelivaraukset on käytetty.

        document.getElementById("voittotalletus").style.display = "block";
        if (kokonaisvoitot + voitot >= 10) {
            document.getElementById("maksuviesti").innerHTML = "Otit rahat talteen. Fiksu veto! <br> Voitit " + (voitot + kokonaisvoitot) + ' markkaa. <br> Jatketaanko nykyistä peliä vai lopetetaanko tähän? <br> Jos valitset "sulje", voitoistasi syötetään 10 mk <br> takaisin koneen uumeniin. <br><br> Alusta aloittamalla kokonaisvoitot nollataan.';
        } else {
            document.getElementById("maksuviesti").innerHTML = "Otit rahat talteen. Fiksu veto! <br> Voitit " + (voitot + kokonaisvoitot) + ' markkaa. <br> Jatketaanko nykyistä peliä vai lopetetaanko tähän? <br> Jos valitset "sulje", kaikki voittosi syötetään <br> takaisin koneen uumeniin. <br><br> Alusta aloittamalla kokonaisvoitot nollataan.';
        }
        document.getElementById("voittotalletusUusiPeli").style.display ="block";
        document.getElementById("voittotalletusSulje").style.display = "block";
    
        if (nappula === "alku") {                   //Sivu joko ladataan uudelleen, jolloin peli alkaa alusta,
            pankkiAani();                           //tai sitten vähennetään kokonaisvoitoista pelivarauksiin
            window.location.reload();               //syötettävä summa. Kokonaisvoitot päivitetään aina voitonmaksua
        } else if (nappula === "sulje") {           //painettaessa, mutta ei näytetä pelaajalle pelin aikana, vaan
            kokonaisvoitot += voitot;               //ainoastaan voitonmaksutapahtumassa ja pelin päättyessä (paitsi
            if (kokonaisvoitot >= 10) {             //rahojen loputtua, mikäli talletuksia ei ole tehty).
                koneeseenKadonnut += 10;
                kokonaisvoitot -= 10;
                voitot = 0;                         //Oikealla pelikoneella kokonaisvoitot-muuttujaa voisi ajatella
                panos = 1;                          //ikään kuin lompakkona; rahat ovat tallessa ja olemassa, mutta
                pelivaraukset = 10;                 //eivät ole koneessa sisällä.
            } else {                           
                voitot = 0;
                panos = 1;
                pelivaraukset = kokonaisvoitot;
                koneeseenKadonnut +=  pelivaraukset;
            }
            suljeTalletus();
        }
        paivitaSummat();
        
    } else if ((voitot === 0) && (pelivaraukset != 0)) {        //Tilanne, jossa voittoja ei ole, mutta pelivarauksia on jäljellä
        document.getElementById("voittotalletus").style.display = "block";
        document.getElementById("maksuviesti").innerHTML = "Tyhjästä on paha nyhjäistä, kerää ensin voittoja. <br> Pelivarauksia ei lahjoiteta.";
        document.getElementById("voittotalletusSulje").style.display = "block";
        if (nappula === "sulje") {
            suljeTalletus();
        }

    } else if ((voitot != 0) && (pelivaraukset != 0)) {         //Tilanne, jossa koneessa on sekä voittoja, että pelivarauksia.
        document.getElementById("voittotalletus").style.display = "block";
        document.getElementById("maksuviesti").innerHTML = "Voitot talletettu. <br> Talletit " + voitot + " markkaa. <br> Pelivarauksia ei lahjoiteta.";
        document.getElementById("voittotalletusSulje").style.display = "block";
        kokonaisvoitot += voitot;
        voitot = 0;                                             //Ansaitut voitot voidaan ottaa "lompakkoon", mutta
        if (panos > pelivaraukset) {                            //jäljellä olevat pelivaraukset on käytettävä loppuun.
            panos = 1;
        }
        if (nappula === "sulje") {
            suljeTalletus();
        }
        paivitaSummat();
    }
}


function suljeTalletus() {
    document.getElementById("voittotalletus").style.display = "none";
}


function pankki() {                                                         //Viesti maksimivoitoilla
    pankkiAani();
    setTimeout(function () {
        document.getElementById("peliLoppu").style.display = "block";
        document.getElementById("viesti").innerHTML = "Räjäytit pankin! Ota rahat ja juokse! <br> (Tai aloita uusi peli. ;-D)";
    }, 4000);
}




//     ----- AANIFUNKTIOT -----


function panosAani() {
    const panosEfektit = ["Aanet/1.mp3", "Aanet/5.mp3", "Aanet/10.mp3", "Aanet/20.mp3"];
    if (panos === 1) {
        const aaniYksi = new Audio(panosEfektit[0]);
        aaniYksi.playbackRate = 3.0;
        aaniYksi.play();
    }
    if (panos === 5) {
        const aaniViisi = new Audio(panosEfektit[1]);
        aaniViisi.playbackRate = 3.0;
        aaniViisi.play();
    }
    if (panos === 10) {
        const aaniKymppi = new Audio(panosEfektit[2]);
        aaniKymppi.playbackRate = 3.0;
        aaniKymppi.play();
    }
    if (panos === 20) {
        const aaniKakskyt = new Audio(panosEfektit[3]);
        aaniKakskyt.playbackRate = 2.0;
        aaniKakskyt.play();
    }
}


function voittoAani() {                                             //Ääni soitetaan voiton osuessa. Jackpot-voiton
    if (!Jackpot) {                                                 //osuessa soitetaan eri ääni toisessa funktiossa.
        voittoEfekti = document.getElementById("voittoAani");
        voittoEfekti.play();
    }
    Jackpot = false;
}

function pankkiAani() {
    pankkiEfekti = document.getElementById("pankkiAani");
    pankkiEfekti.play();
}

function gameOverAani() {
    gameOverEfekti = document.getElementById("gameOverAani");
    gameOverEfekti.play();
}

function jackPotAani() {
    Jackpot = true;
    jackPotEfekti = document.getElementById("jackPotAani");
    jackPotEfekti.play();
}

function pam() {
    aani = document.getElementById("pam");
    aani.play();
}




//     ----- SALDONÄYTÖN FUNKTIO -----


function numerotKuviksi(kutsuva, sadat, kympit, ykkoset) {       //Funktio muuntaa kolikkosummien saldot tiedostopoluiksi
    if (kutsuva === "nvv") {                                     //ja vastaa summia vastaavien kuvien esittämisestä saldonäytössä.        
         voittoSadat.innerHTML = sadat;                          //Esimerkiksi mikäli viimeisimmän voiton satasien arvo on 1,
         voittoKympit.innerHTML = kympit;                        //haetaan objektin "numerot" oikeaa numeroa vastaava polku.
         voittoYkkoset.innerHTML = ykkoset;
     }                                                           //Funktio vastaanottaa myös parametrin kutsuvasta funktiosta.   
     if (kutsuva === "nv") {                                     //Näin saadaan samoilla muuttujilla päivitettyä oikeat arvot.
         voitotSadat.innerHTML = sadat;
         voitotKympit.innerHTML = kympit;
         voitotYkkoset.innerHTML = ykkoset;
     }
     if (kutsuva === "npv") {
         varauksetKympit.innerHTML = kympit;
         varauksetYkkoset.innerHTML = ykkoset;
     }
 }




//     ----- KELOJEN JA LUKITUSPAINIKKEIDEN FUNKTIOT -----


function naytaKelaPainikkeet() {                //Kelapainikkeet vilkkuvat kuten oikeassa pelikoneessa silloin, kun lukitus on
    clearInterval(vilkku);                      //mahdollinen. Lukitut painikkeet palavat. Mikäli lukitusta ei ole mahdollista
                                                //tehdä, lukituspainikkeet ovat himmeänä.
    if (lukitusMahdollinen) {
        vilkku = setInterval(function () {
            if (!vilkku1) {
                lukko1.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 1">';
            }
            if (!vilkku2) {
                lukko2.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 2">';
            }
            if (!vilkku3) {
                lukko3.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 3">';
            }
            if (!vilkku4) {
                lukko4.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 4">';
            }
            setTimeout(function () {
                if (lukitusMahdollinen) {
                    lukko1.innerHTML = '<img src="img/lukittu.png" alt="Lukitus kela 1">';
                }
                if (lukitusMahdollinen) {
                    lukko2.innerHTML = '<img src="img/lukittu.png" alt="Lukitus kela 2">';
                }
                if (lukitusMahdollinen) {
                    lukko3.innerHTML = '<img src="img/lukittu.png" alt="Lukitus kela 3">';
                }
                if (lukitusMahdollinen) {
                    lukko4.innerHTML = '<img src="img/lukittu.png" alt="Lukitus kela 4">';
                }
            }, 450);
        }, 900);
    } else {
        lukko1.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 1">';
        lukko2.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 2">';
        lukko3.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 3">';
        lukko4.innerHTML = '<img src="img/lukitsematta.png" alt="Lukitus kela 4">';
    }
}




function lukitse1() {                   //Seuraavat neljä funktiota asettavat lukituspainikkeiden
    if (lukitusMahdollinen) {           //arvon. Jos lukitus ei ole mahdollinen, ei tehdä mitään.
        if (!vilkku1) {                 //Funktioita kutsutaan sekä HTML-koodissa lukituspainiketta
            vilkku1 = true;             //painamalla, että tietyissä pelitilanteissa (esimerkiksi
            lukittu1 = true;            //voiton osuessa) kutsumalla.
        } else if (vilkku1) {
            vilkku1 = false;
            lukittu1 = false;
        }
    } else {
        lukittu1 = false;
    }
}

function lukitse2() {
    if (lukitusMahdollinen) {
        if (!vilkku2) {
            vilkku2 = true;
            lukittu2 = true;
        } else if (vilkku2) {
            vilkku2 = false;
            lukittu2 = false;
        }
    } else {
        vilkku2 = false;
        lukittu2 = false;
    }
}

function lukitse3() {
    if (lukitusMahdollinen) {
        if (!vilkku3) {
            vilkku3 = true;
            lukittu3 = true;
        } else if (vilkku3) {
            vilkku3 = false;
            lukittu3 = false;
        }
    } else {
        vilkku3 = false;
        lukittu3 = false;
    }
}

function lukitse4() {
    if (lukitusMahdollinen) {
        if (!vilkku4) {
            vilkku4 = true;
            lukittu4 = true;
        } else if (vilkku4) {
            vilkku4 = false;
            lukittu4 = false;
        }
    } else {
        vilkku4 = false;
        lukittu4 = false;
    }
}




function poistaLukitukset () {
    kelaStop = true;
    if (lukittu1) {                         //Jos kela on ollut lukittuna, funktiokutsu asettaa painikkeet
        lukitse1();                         //sammutetuiksi estäen kelan lukitsemisen uudelleen.
        lukitusMahdollinen = false;
        kierros = 0;
    }
    if (lukittu2) {
        lukitse2();
        lukitusMahdollinen = false;
        kierros = 0;
    }
    if (lukittu3) {
        lukitse3();
        lukitusMahdollinen = false;
        kierros = 0;
    }
    if (lukittu4) {
        lukitse4();
        lukitusMahdollinen = false;
        kierros = 0;
    }
}




//     ----- RAHASUMMIEN ESITYSFUNKTIOT -----


function naytaPanos() {                                             //Kutsuu panoksen summan pituuden mukaan listasta indeksillä
    if (panos === 1) {                                              //vastaavan kuvan. Jos panos on 1 tai 5, on merkkijonon pituus
        panosKympit.innerHTML = "";                                 //yksi eikä kymppejä näytetä. Koska panos on aina 1, 5, 10 tai
        panosYkkoset.innerHTML = numerot[panos.toString()[0]];      //20 eikä summia tarvitse laskea, voidaan kuvien esittäminen
    } else if (panos === 5) {                                       //tehdä tässä funktiossa suoraan innerHTML-kutsulla.
        panosKympit.innerHTML = "";
        panosYkkoset.innerHTML = numerot[panos.toString()[0]];
    } else if (panos === 10) {
        panosKympit.innerHTML = numerot[panos.toString()[0]];
        panosYkkoset.innerHTML = numerot[panos.toString()[1]];
    } else if (panos === 20) {
        panosKympit.innerHTML = numerot[panos.toString()[0]];
        panosYkkoset.innerHTML = numerot[panos.toString()[1]];
    }
}




function naytaViimeisinVoitto() {   
    if (viimVoitto != 0) { 
        voittoNaytolle = viimVoitto;
        viimVoitto = 0;
    }                                                               //Pilkotaan summa satasiin, kymppeihin ja ykkösiin ja numerot
    if (voittoNaytolle.toString().length === 3) {                   //tallennetaan erillisiin muuttujiin, joilla tulostetaan 
        sadat = numerot[voittoNaytolle.toString()[0]];              //numeroita vastaavat kuvat numerotKuviksi-funktiossa.
        kympit = numerot[voittoNaytolle.toString()[1]];             //Indeksit muuttuvat summan kasvaessa. Kolminumeroisissa summissa
        ykkoset = numerot[voittoNaytolle.toString()[2]];            //indeksi 0 vastaa satasia, kun taas yksinumeroisissa ykkösiä.
    } else if (voittoNaytolle.toString().length === 2) {            
        sadat = "";                                                 //Tarpeettomia numeroita eli etunollia ei näytetä.
        kympit = numerot[voittoNaytolle.toString()[0]];
        ykkoset = numerot[voittoNaytolle.toString()[1]];
    } else if (voittoNaytolle.toString().length === 1) {
        sadat = "";
        kympit = "";
        ykkoset = numerot[voittoNaytolle.toString()[0]];
    }                                                           //Kutsutaan numerotKuviksi-funktiota, ja kerrotaan samalla, mikä funktio
    numerotKuviksi("nvv", sadat, kympit, ykkoset);              //lähettää kutsun.
}                                    




function naytaVoitot() {                                        //Samaa yllämainittua logiikkaa käytetään kaikkien
    if (voitot.toString().length === 3) {                       //saldojen päivittämisessä...
        sadat = numerot[voitot.toString()[0]];
        kympit = numerot[voitot.toString()[1]];
        ykkoset = numerot[voitot.toString()[2]];
    } else if (voitot.toString().length === 2) {
        sadat = "";
        kympit = numerot[voitot.toString()[0]];
        ykkoset = numerot[voitot.toString()[1]];
    } else if (voitot.toString().length === 1) {
        sadat = "";
        kympit = "";
        ykkoset = numerot[voitot.toString()[0]];
    }
    if (voitot >= 999) {
        sadat = numerot[9];
        kympit = numerot[9];
        ykkoset = numerot[9];
        pankki();
    }
    numerotKuviksi("nv", sadat, kympit, ykkoset);
}




function naytaPelivaraukset() {
    if (pelivaraukset.toString().length === 2) {
        sadat = "";
        kympit = numerot[pelivaraukset.toString()[0]];
        ykkoset = numerot[pelivaraukset.toString()[1]];
    } else if (pelivaraukset.toString().length === 1) {
        sadat = "";
        kympit = "";
        ykkoset = numerot[pelivaraukset.toString()[0]];
    }
    numerotKuviksi("npv", sadat, kympit, ykkoset);              //...vain kutsuvan funktion tunnus muuttuu.
}




//     ----- SALDO- JA PANOSLASKURIT -----


function tarkistaSaldo() {
    if (saldo < panos && !voittoSaatu) {                //Panos putoaa, mikäli pelivarausten ja voittojen yhteenlaskettu saldo
        vanhaPanos = panos;                             //putoaa pienemmäksi kuin asetettu panos
        panos = 1;
        if (vanhaPanos > panos) {
            panosAani();
        }
        paivitaSummat();
    } else {
        paivitaSummat()
    }
    if (saldo === 0 && voittoSaatu) {                   //Tarkistetaan, tuliko saldovarojen loppuessa viimeisellä pelikierroksella voittoa.
        voittoPaivitys(voittosumma);
    } else if (saldo === 0 && !arvonta) {               //Peli päättyy, mikäli rahat loppuvat.
        paivitaSummat();
        gameOver();
    }
}




function asetaPanos() {                                             //Pelikoneen panospainike kutsuu HTML-koodissa tätä funktiota ja päivittää
    if ((!lukitusMahdollinen && !lukitusKaytetty) || voittoSaatu || panostusMahdollinen) {                  //panoksen arvoon 1, 5, 10 tai 20. 
        edellinenPanos = panos;
        if (panos === 1 && saldo >= 5) {
            panos = 5;
            panosAani(5);
            paivitaSummat();
        } else if (panos === 5 && saldo >= 10) {
            panos = 10;
            panosAani(10);
            paivitaSummat();
        } else if (panos === 10 && saldo >= 20) {
            panos = 20;
            panosAani(20);
            paivitaSummat();
        } else if (panos > saldo || panos === 20 || panos === 10 || panos === 5) {
            panos = 1;
            panosAani(1);
            paivitaSummat();
        }  else {
            paivitaSummat();
        }
    } else {                                                            //Panosta ei voida nostaa suuremmaksi, mikäli keloja on mahdollista
        if (panos === 1 && saldo >= 5 && panos < edellinenPanos) {      //lukita. Tällä estetään "kalastelu" pienellä panoksella
            panos = 5;                                                  //pelaamalla, kuten myös oikeissa pelikoneissa.
            panosAani(5);
            paivitaSummat();
        } else if (panos === 5 && saldo >= 10 && panos < edellinenPanos) {
            panos = 10;
            panosAani(10);
            paivitaSummat();
        } else if (panos === 10 && saldo >= 20 && panos < edellinenPanos) {
            panos = 20;
            panosAani(20);
            paivitaSummat();
        } else if (panos > saldo || panos === 20 || panos === 10 || panos === 5) {
            panos = 1;
            panosAani(1);
            paivitaSummat();
        }  else {
            paivitaSummat();
        }
    }
}




//     ----- KÄYNNISTYSFUNKTIO -----


function start() {
    if (kelaStop) {                             //Käynnistä-painiketta painaessa funktio laskee pelivarat, jotka muodostuvat pelin
        saldo = voitot + pelivaraukset;         //alun 10:stä markasta sekä mahdollisista pelivoitoista.
        edellinenPanos = panos;                 //Myös edellisen kierroksen panos tallennetaan "kalastelun" estämiseksi. Toisin sanoen
        pelinAlku = false;                      //panosta ei voi nostaa uuden arvotun kierroksen jälkeen, ainoastaan pienentää.
        voittorivi = "";                        //Arvonnan voi käynnistää ainoastaan, kun kelat ovat pysähtyneenä.
        if (kierros === 0) {
            lukitusKaytetty = false;
            lukitusMahdollinen = true;
        }
        kierros += 1;
        if (saldo >= panos) {
            if (pelivaraukset >= panos) {           
                pelivaraukset -= panos;
                paivitaSummat();
            } else if (saldo >= panos && pelivaraukset < panos) {
                vaje = panos - pelivaraukset;
                pelivaraukset = 0;
                voitot -= vaje;
                paivitaSummat();
            }
            arvoKelaYksi(voittorivi);                   //Käynnistetään ensimmäisen kelan arvonta.
            }
    }
}




//     ----- PÄIVITYSFUNKTIOT -----


function paivitaSummat() {                  //Kutsutaan kerralla kaikkia funktioita, jotka vastaavat
    saldo = voitot + pelivaraukset;         //pelin mm. saldotietojen näyttämisestä. Tätä funktiota kutsutaan
    naytaKelaPainikkeet();                  //tilanteen mukaan eri funktioista.
    naytaPanos();
    naytaPelivaraukset();
    naytaViimeisinVoitto();
    naytaVoitot();
}




function voittoPaivitys() {                 //Toimenpiteet voiton osuessa.
    voitot += voittosumma;
    voittosumma = 0;
    if (voittoSaatu) {
        tyhjarivi = 0;
        lukitusMahdollinen = false;
        paivitaSummat();
        voittoAani();
        ilotulitus();
    }
}




function ilotulitus() {             //Voiton osuessa näytetään animoitu .gif pelikoneen päällä määrätyn ajan.
    setTimeout(function () {
        if (window.innerWidth <= 1023) {
            document.getElementById("winMobiili").innerHTML = '<img src="img/win.gif" alt="ilotulitus">';
        } else {
            document.getElementById("win").innerHTML = '<img src="img/win.gif" alt="ilotulitus">';
        }
        setTimeout(function () {
            if (window.innerWidth <= 1023) {
                document.getElementById("winMobiili").innerHTML = "";
            } else {
                document.getElementById("win").innerHTML = "";
            }
        }, 2400);
    }, 800);
}




//     ----- PELIN ARVONTAFUNKTIOT -----


function arvoKelaYksi(voittorivi, tahtiMaara) {             //Kaikki kelat arvotaan yksitellen, erilaisella ajastuksella. Ensimmäisen kelan
    let kuva = Math.floor(Math.random() * 3);               //arvonta kutsuu toista kelaa, jne.
    kelaStop = false;
    if (lisaVoitto) {                       //Tilanne, jossa tulee "lisävoitto", tästä alempana.
        let yksiVaihdettu = false;
        setTimeout(function () {
            if (tahtiMaara < 3 && tulosEkaKuva != voittorivi) {                                     //Lisävoittofunktion kutsuessa asetetaan kuvat
                kela1Paikka.innerHTML = '<img src=' + rivit[voittorivi][kuva] + ' alt="Kela 1">';   //satunnaisesti TAI määrätysti.
                yksiVaihdettu = true;
            } else if (tahtiMaara === 3 && tulosEkaKuva != "tahti") {

            } else if (tahtiMaara === 4 && tulosEkaKuva != "tahti") {
                kela1Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 1">';
                yksiVaihdettu = true;
            }
            if (tulosEkaKuva != voittorivi && yksiVaihdettu) {           //Kuvat vaihdetaan ja tehosteääni toistetaan vain, jos voittolinjalla
                pam();                                                   //on siihen sopimaton kuva.
            }
            kelaStop = true;
        }, 2400);
        arvoKelaKaksi(voittorivi, tahtiMaara);              //Kutsutaan seuraavan kelan arvontaa.
    } else {
        if (!lukittu1) {                                                                    //Uuden kierroksen arvonta.
            arvonta = true;
            index1 = 0;
            let arvontaAjastus = setInterval(function () {
                let avaimet = Object.keys(rivit);
                satunnainen1 = avaimet[Math.floor(Math.random() * avaimet.length)];
                if (index1 === Object.keys(rivit).length * 2) {                            //Ajastuksella määritellään kuvien vaihto keloissa.
                    clearInterval(arvontaAjastus);
                    arvonta = false;
                }
            index1++;
            kela1Paikka.innerHTML = '<img src=' + rivit[satunnainen1][Object.keys(rivit[satunnainen1])[kuva]] + ' alt="Kela 1">';
            }, 20);
            arvoKelaKaksi(voittorivi);
        } else {                                                                            //Jos kela on ollut lukittuna, kuvia ei vaihdeta.
            lukitusKaytetty = true;
            arvoKelaKaksi(voittorivi);
        }
    }
}




function arvoKelaKaksi(voittorivi, tahtiMaara) {
    let kuva = Math.floor(Math.random() * 3);
    if (lisaVoitto) {
        let kaksiVaihdettu = false;
        setTimeout(function () {
            if (tahtiMaara < 3 && tulosTokaKuva != voittorivi) {
                kela2Paikka.innerHTML = '<img src=' + rivit[voittorivi][kuva] + ' alt="Kela 2">';
                kaksiVaihdettu = true;
            } else if ((tahtiMaara === 4) && tulosTokaKuva != voittorivi) {
                kela2Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 2">';
                kaksiVaihdettu = true;
            } else if (tahtiMaara === 3 && tulosTokaKuva != "tahti" && (tulosEkaKuva != "tahti" || tulosNeljasKuva != "tahti")) {
                kela2Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 2">';
                kaksiVaihdettu = true;
            }
            if (tulosTokaKuva != voittorivi && kaksiVaihdettu) {
                pam();
            }
        }, 1600);
        arvoKelaKolme(voittorivi, tahtiMaara);
    } else {
        if (!lukittu2) {
            arvonta = true;
            let kuva = [Math.floor(Math.random() * 3)];
            index2 = 0;
            let arvontaAjastus = setInterval(function () {
                let avaimet = Object.keys(rivit);
                satunnainen2 = avaimet[Math.floor(Math.random() * avaimet.length)];
                if (index2 === Object.keys(rivit).length * 4) {
                    clearInterval(arvontaAjastus);
                    arvonta = false;
                }
            index2++;
            kela2Paikka.innerHTML = '<img src=' + rivit[satunnainen2][Object.keys(rivit[satunnainen2])[kuva]] + ' alt="Kela 2">';
            }, 20);
            arvoKelaKolme(voittorivi);
        } else {
            lukitusKaytetty = true;
            arvoKelaKolme(voittorivi);
        }
    }
}




function arvoKelaKolme(voittorivi, tahtiMaara) {
    let kuva = Math.floor(Math.random() * 3);
    if (lisaVoitto) {
        let kolmeVaihdettu = false;
        setTimeout(function () {
            if (tahtiMaara < 3 && tulosKolmasKuva != voittorivi) {
                kela3Paikka.innerHTML = '<img src=' + rivit[voittorivi][kuva] + ' alt="Kela 3">';
                kolmeVaihdettu = true;
            } else if ((tahtiMaara === 4) && tulosKolmasKuva != voittorivi) {
                kela3Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 3">';
                kolmeVaihdettu = true;
            } else if (tahtiMaara === 3 && tulosKolmasKuva != "tahti" && (tulosEkaKuva != "tahti" || tulosTokaKuva != "tahti")) {
                kela3Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 3">';
                kolmeVaihdettu = true;
            }
            if (tulosKolmasKuva != voittorivi && kolmeVaihdettu) {
                pam();
            }
        }, 800);
        arvoKelaNelja(voittorivi, tahtiMaara);
    } else {
        if (!lukittu3) {
            arvonta = true;
            let kuva = [Math.floor(Math.random() * 3)];
            index3 = 0;
            let arvontaAjastus = setInterval(function () {
                let avaimet = Object.keys(rivit);
                satunnainen3 = avaimet[Math.floor(Math.random() * avaimet.length)];
                if (index3 === Object.keys(rivit).length * 7) {
                    clearInterval(arvontaAjastus);
                    arvonta = false;
                }
            index3++;
            kela3Paikka.innerHTML = '<img src=' + rivit[satunnainen3][Object.keys(rivit[satunnainen3])[kuva]] + ' alt="Kela 3">';
            }, 20);
            arvoKelaNelja(voittorivi);
        } else {
            lukitusKaytetty = true;
            arvoKelaNelja(voittorivi);
        }
    }
}




function arvoKelaNelja(voittorivi, tahtiMaara) {
    let kuva = Math.floor(Math.random() * 3);
    if (lisaVoitto) {
        if (tahtiMaara < 3 && tulosNeljasKuva != voittorivi) {
            kela4Paikka.innerHTML = '<img src=' + rivit[voittorivi][kuva] + ' alt="Kela 4">';
        } else if ((tahtiMaara === 3 || tahtiMaara === 4) && tulosNeljasKuva != voittorivi) {
            kela4Paikka.innerHTML = '<img src=' + rivit["tahti"][kuva] + ' alt="Kela 4">';
        }
        kierrosValmis = true;       //Arvontalogiikka on kaikissa keloissa sama, mutta neljännen kelan arvonnan jälkeen
        lisaVoitto = false;         //suoritetaan tarkistustoimenpiteet.
        tarkistaTulos();
    } else {
        if (!lukittu4) {
            arvonta = true;
            let kuva = [Math.floor(Math.random() * 3)];
            index4 = 0;
            let arvontaAjastus = setInterval(function () {
                let avaimet = Object.keys(rivit);
                satunnainen4 = avaimet[Math.floor(Math.random() * avaimet.length)];
                if (index4 === Object.keys(rivit).length * 13) {
                    clearInterval(arvontaAjastus);
                    arvonta = false;
                    kierrosValmis = true;               //Päivitetään muuttujat, jotka kertovat arvonnan päättyneen.
                    kelaStop = true;                    //Näitä hyödynnetään mm. lukitus- ja panostuslogiikassa.
                }
            index4++;
            kela4Paikka.innerHTML = '<img src=' + rivit[satunnainen4][Object.keys(rivit[satunnainen4])[kuva]] + ' alt="Kela 4">';
            }, 20);
            tarkistaTulos();
        } else {
            let odotus = setInterval(function() {
                kierrosValmis = true;
                lukitusKaytetty = true;
                clearInterval(odotus);
                tarkistaTulos();
            }, 1000);
        }
    }
}




function lisaVoittoMahdollisuus() {                     //Funktiossa arvotaan lisävoiton mahdollisuus. Voittavien rivien
    let voittorivi = "";                                //esiintymistodennäköisyyksiä voi muuttaa lukuja säätämällä.
    let voittoLuumut = Math.random() < 0.12;            //Näillä asetuksilla pieniä voittoja tulee suuria todennäköisemmin.
    let voittoPaarynat = Math.random() < 0.09;
    let voittoKolmeTahtea = Math.random() < 0.06;       //Funktio arpoo voiton tai tyhjän, mutta ei arvo keloja paikalleen.
    let voittoMelonit = Math.random() < 0.08;           //Arvonta suoritetaan kaikissa tilanteissa samoissa kelafunktioissa
    let voittoAppelsiinit = Math.random() < 0.05;       //if-lauseiden ja lisaVoitto-muuttujan avulla. Kun kelat ovat pysähtyneet
    let voittoTahdet = Math.random() < 0.04;            //ja lisävoitto osuu kohdalle, kelojen arvontafunktioissa asetetaan lisä-
    let voittoRypaleet = Math.random() < 0.02;          //voittorivin mukaiset kuvat keloihin takaperoisessa järjestyksessä.

    if (voittoLuumut) {                                 //Voittosummat ja voittavat rivit määritellään if-lohkossa.
        voittorivi = "luumu";
        viimVoitto = (panos * 3);
    } else if (voittoPaarynat) {
        voittorivi = "paaryna";
        viimVoitto = (panos * 4);
    } else if (voittoKolmeTahtea) {
        voittorivi = "kolmeTahtea";
        tahtiMaara = 3;
        viimVoitto = (panos * 5);
    } else if (voittoMelonit) {
        voittorivi = "meloni";
        viimVoitto = (panos * 5);
    } else if (voittoAppelsiinit) {
        voittorivi = "appelsiini";
        viimVoitto = (panos * 6)
    } else if (voittoTahdet) {
        voittorivi = "tahti";
        tahtiMaara = 4;
        viimVoitto = (panos * 10);
    } else if (voittoRypaleet) {                    //Jackpot
        voittorivi = "rypale";
        if (jackPot > 1) {
            viimVoitto = (panos * jackPot);
        } else {
            viimVoitto = panos * 2;                 //Jos rypäleet osuvat kahdesti peräkkäin, annetaan
        }                                           //jälkimmäisestä osumasta panos tuplana takaisin.    
        Jackpot = true;
    } else {
        voittoSaatu = false;
        voittorivi = "";
        jackPot += 1;                               //Jokainen tyhjäksi arvottu rivi kasvattaa Jackpotin kerrointa yhdellä.
        voittosumma = 0;
    }
    if (Jackpot) {                                  //Rypälevoiton arvot palautetaan seuraavaa arvontakierrosta varten
        jackPot = 1;                                //tilanteessa, jossa Jackpot osuu kohdalle.
        jackPotAani();
    }
    voittosumma = viimVoitto;

    if (voittorivi != "") {
        voittoSaatu = true;
        poistaLukitukset();
        lisaVoitto = true;
        arvoKelaYksi(voittorivi, tahtiMaara);
    } else {
        tarkistaSaldo();
    }
    return voittorivi;
}




//     ----- PELITULOKSEN TARKISTUS- JA LASKENTAFUNKTIOT -----


function tarkistaTulos() {
    let odotus = setInterval(function() {           //Tarkkaillaan pelitilanteen tulosta, eli voittolinjalle jääviä kuvioita.
        if (kierrosValmis && !lisaVoitto) {
            clearInterval(odotus);
            kierrosValmis = false;

            tulosEkaKuva = (kela1Paikka.innerHTML.match(isot)?.[0]).toLowerCase();      //Tulkitaan voittolinjalle jääneet kuvat 
            tulosTokaKuva = (kela2Paikka.innerHTML.match(isot)?.[0]).toLowerCase();     //tiedostonimestä. Kelakuvien tiedostonimet ovat
            tulosKolmasKuva = (kela3Paikka.innerHTML.match(isot)?.[0]).toLowerCase();   //muotoa "tahtiRYPALEluumu.png", "luumuMELONItahti.png"
            tulosNeljasKuva = (kela4Paikka.innerHTML.match(isot)?.[0]).toLowerCase();   //jne. eli voittolinjalle jäävä kuva on isoin kirjaimin.

            tahtiMaara = 0;
            const tulos = [tulosEkaKuva, tulosTokaKuva, tulosKolmasKuva, tulosNeljasKuva];

            for (let i = 0; i < tulos.length; i++) {        //Lasketaan keloihin osuneiden tähtien lukumäärä.
                if (tulos[i] === "tahti") {
                    tahtiMaara++;
                }
            }
            tarkistaVoitto(tulosEkaKuva, tulosTokaKuva, tulosKolmasKuva, tulosNeljasKuva);
            }
    }, 100);
}




function tarkistaVoitto(tulosEkaKuva, tulosTokaKuva, tulosKolmasKuva, tulosNeljasKuva) {
    if (tahtiMaara === 3) {
        voittoSaatu = true;                 //Tässä funktiossa tarkistetaan, onko voittolinjalle osunut voiton antava rivi.
        voittorivi = "kolmeTahtea";
    } else if (tahtiMaara === 4) {
        voittoSaatu = true;
        voittorivi = "tahti"
    }

    if (tulosEkaKuva === tulosTokaKuva && tulosTokaKuva === tulosKolmasKuva && tulosKolmasKuva === tulosNeljasKuva && tulosEkaKuva != undefined) {
        voittoSaatu = true;
        voittorivi = tulosEkaKuva;
    }
    if (voittoSaatu) {
        laskeVoitto(voittorivi);
    } else if (!voittoSaatu && lukitusKaytetty) {
        tarkistaSaldo();
    } else {
        if (!lisaVoitto && !lukitusKaytetty) {              //Lisävoittoarvontaa kutsutaan vain uudella kierroksella, ei tilanteessa,
            voittorivi = lisaVoittoMahdollisuus();          //jossa keloja on ollut lukittuina.
        }
    }
    if (voittorivi === "") {                        //If-lauseita ja tyhjarivi- sekä panostusMahdollinen -muuttujia käytetään apuna lukitus-
        tyhjarivi += 1;                             //ja panostustoimintojen ohjaamiseen. Panoksen vaihtaminen suuremmaksi on sallittua
        panostusMahdollinen = false;                //voitto-osuman jälkeen, sekä joka toisella tyhjällä kierroksella.
    }
             
    if (tyhjarivi === 2 || voittoSaatu) {
        if (voittoSaatu) {
            panostusMahdollinen = true;
        } else if (lukitusKaytetty) {
            panostusMahdollinen = true;
        } else {
            lukitusMahdollinen = false;
            tyhjarivi = 0;
        }
    }
    kierros = 0;
    if (lukitusKaytetty) {
        poistaLukitukset();
    }
}




function laskeVoitto(voittorivi) {                      //Lasketaan voittosummat.
    if (voittorivi === "meloni") {
        viimVoitto = (panos * 5);
    } else if (voittorivi === "paaryna") {
        viimVoitto = (panos * 4);
    } else if (voittorivi === "tahti") {
        viimVoitto = (panos * 10);
    } else if (voittorivi === "kolmeTahtea") {
        viimVoitto = (panos * 5);
    } else if (voittorivi === "luumu") {
        viimVoitto = (panos * 3); 
    } else if (voittorivi === "appelsiini") {
        viimVoitto = (panos * 6);
    } else if (voittorivi === "rypale") {
        if (jackPot > 1) {
            viimVoitto = (panos * jackPot);
        } else {
            viimVoitto = panos * 2;
        }
        Jackpot = true;
    } else {
        voittoSaatu = false;
        jackPot += 1;
        voittosumma = 0;
    }
    if (Jackpot) {
        jackPot = 1;
        jackPotAani();
    }

    voittosumma = viimVoitto;
    tarkistaSaldo();
    voittoPaivitys();
}