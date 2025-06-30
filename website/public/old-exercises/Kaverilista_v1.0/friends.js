const Kaverit = [];
const NimiKentta = document.getElementById('nimet');

function LisaaKaveri() {
  if (Kaverit.length < 10) {
    const Kaveri = document.getElementById('nimet').value;
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
    KaveriLaatikko.innerHTML = '<p class="koko">Kaverit:</p>';
    Kaverit.forEach((kaveri, index) => {
        const p = document.createElement('p');
        p.style.display = 'flex'
        p.innerHTML = `<span class="numerointi">${index + 1 + "."}</span><span class="nimi"; style="margin-left: 7vw">${kaveri}</span>`;
        kaveriSailo.appendChild(p);
    });
}


NimiKentta.addEventListener('keyup', function(tapahtuma) {
    if (tapahtuma.key === 'Enter') {
        LisaaKaveri();
    }
})