const CtoF = document.getElementById('CtoF');
const FtoC = document.getElementById('FtoC');

CtoF.onclick = function () {
    const pituudenTarkistus = document.getElementById('alkuLampo').value;
    if (pituudenTarkistus.length > 0) {
        const valittuDesimaali = document.querySelector('input[name="flexRadioDefault"]:checked').id;
        let Desimaali;
        if (valittuDesimaali === 'YksiDesi') {
            Desimaali = 1;
        } else if (valittuDesimaali === 'KaksiDesi') {
            Desimaali = 2;
        } else if (valittuDesimaali === 'KolmeDesi') {
            Desimaali = 3;
        }
        Fahrenheitiksi(Desimaali);
    } else {
        alert('Syötä muunnettava lämpötila!')
    }
};

FtoC.onclick = function () {
    const pituudenTarkistus = document.getElementById('alkuLampo').value;
    if (pituudenTarkistus.length > 0) {
        const valittuDesimaali = document.querySelector('input[name="flexRadioDefault"]:checked').id;
        let Desimaali;
        if (valittuDesimaali === 'YksiDesi') {
            Desimaali = 1;
        } else if (valittuDesimaali === 'KaksiDesi') {
            Desimaali = 2;
        } else if (valittuDesimaali === 'KolmeDesi') {
            Desimaali = 3;
        }
        Celsiukseksi(Desimaali);
    } else {
        alert('Syötä muunnettava lämpötila!')
    }
};

function Fahrenheitiksi(Desimaali) {
    const Celsius = false
    let alkuLampo = document.getElementById('alkuLampo').value;
    if (!isNaN(alkuLampo)) {
        alkuLampo = Number(alkuLampo);
        const mista = 'Celsiusta';
        const mihin = 'Fahrenheitin';
        let loppuLampo = (alkuLampo) * 1.8 + 32;
        loppuLampo = parseFloat(loppuLampo.toFixed(Desimaali));
        MuunnaAsteet(alkuLampo, mista, loppuLampo, mihin, Celsius);
    } else {
        alert('Syötteen täytyy olla numero!');
    }
}

function Celsiukseksi(Desimaali) {
    const Celsius = true
    let alkuLampo = document.getElementById('alkuLampo').value;
    if (!isNaN(alkuLampo)) {
        alkuLampo = Number(alkuLampo);
        const mista = 'Fahrenheitia';
        const mihin = 'Celsiuksen';
        let loppuLampo = (alkuLampo - 32) / 1.8;
        loppuLampo = parseFloat(loppuLampo.toFixed(Desimaali));
        MuunnaAsteet(alkuLampo, mista, loppuLampo, mihin, Celsius);
    } else {
        alert('Syötteen täytyy olla numero!');
    }
}

function MuunnaAsteet(alkuLampo, mista, loppuLampo, mihin, Celsius) {
    if (typeof alkuLampo === 'number') {
        const MuunnettuLampotila = document.getElementById('Tulos');
        MuunnettuLampotila.innerHTML = '';
        const Lampotila = document.createElement('div');
        Lampotila.className = 'muunnettu_lampotila';
        Lampotila.innerHTML = '<h3>Lämpötila:</h3>' + alkuLampo + ' ' + mista + ' on ' + loppuLampo + ' astetta ' + mihin + ' asteikolla.';
        MuunnettuLampotila.appendChild(Lampotila);
        document.getElementById('alkuLampo').value = '';
        if (loppuLampo < -273.15 && Celsius === true) {
            alert('Tulos on absoluuttista nollapistettä (-273,15 °C) pienempi!')
        } else if (loppuLampo < -459.67 && Celsius === false) {
            alert('Tulos on absoluuttista nollapistettä (-459.67 °F) pienempi!')
        }
    } else {
        alert('Syötteen täytyy olla numero!')
    }
}