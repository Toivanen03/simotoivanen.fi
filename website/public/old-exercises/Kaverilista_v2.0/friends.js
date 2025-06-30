const Kaverit = [];
const NimiKentta = document.getElementById('nimet');
const Poisto = document.getElementById('poista');
const Lajittelu = document.getElementById('jarjesta')
Poisto.onclick = PoistaKaveri;
Lajittelu.onclick = LajitteleKaverit;

function LisaaKaveri() {
    const Kaveri = document.getElementById('nimet').value;
    if (Kaverit.length < 10) {
        if (Kaveri) {
            Kaverit.push(Kaveri);
            document.getElementById('nimet').value = '';
            NaytaKaverit();
    }
  } else {
        alert('Voit lisätä enintään 10 kaveria.');
  }
}

function NaytaKaverit() {
    const kaveriSailo = document.getElementById('KaveriLaatikko');
    KaveriLaatikko.innerHTML = '<h3>Kaverit:</h3>';
    Kaverit.forEach((kaveri, index) => {
        const p = document.createElement('p');
        p.style.display = 'flex'
        p.innerHTML = `<span class="numerointi">${index + 1 + "."}</span><span class="nimi"; style="margin-left: 7vw">${kaveri}</span>`;
        kaveriSailo.appendChild(p);
    });
}

function PoistaKaveri() {
    const Kaveri = document.getElementById('nimet').value;
    const indeksi = Kaverit.indexOf(Kaveri);
    if (indeksi !== -1) {
        Kaverit.splice(indeksi, 1);
        NaytaKaverit();
    } else {
        alert('Nimeä ei löydy kaverilistasta. Tarkista nimi.');
    }
}

function LajitteleKaverit() {
    Kaverit.sort();
    NaytaKaverit();
}

NimiKentta.addEventListener('keyup', function(tapahtuma) {
    if (tapahtuma.key === 'Enter') {
        LisaaKaveri();
    }
})