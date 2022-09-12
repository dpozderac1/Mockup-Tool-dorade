import {
  offset,
  bubbleSort,
  daLiJeDesnoOd,
  daLiJeIspodOd,
  daLiJeUnutar
} from "../dodatneFunkcije"

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length)
    return false;
  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i])
      return false;
  }
  return true;
}

//funkcija za određivanje gdje se jedan element nalazi u odnosu na drugi
function odrediPozicijuElemenata(oznacenaDjeca) {
  let udaljenostiSvakogElementaX = [];
  let udaljenostiSvakogElementaY = [];

  for (let i = 0; i < oznacenaDjeca.length; i++) {
    let divOffset = offset(oznacenaDjeca[i]);

    //vrijednosti su (indeks,x-udaljenost,y-udaljenost,sirina,visina,id)
    udaljenostiSvakogElementaX.push([i, divOffset.left, divOffset.top, oznacenaDjeca[i].offsetWidth, oznacenaDjeca[i].offsetHeight, oznacenaDjeca[i].id]);

    //vrijednosti su (indeks,y-udaljenost,x-udaljenost,sirina,visina,id)
    udaljenostiSvakogElementaY.push([i, divOffset.top, divOffset.left, oznacenaDjeca[i].offsetWidth, oznacenaDjeca[i].offsetHeight, oznacenaDjeca[i].id]);
  }

  udaljenostiSvakogElementaX = bubbleSort(udaljenostiSvakogElementaX);
  udaljenostiSvakogElementaY = bubbleSort(udaljenostiSvakogElementaY);

  let jedanUnutarDrugog = [];
  udaljenostiSvakogElementaX.forEach((element1, index1) => {
    udaljenostiSvakogElementaX.forEach((element2, index2) => {
      if (index1 !== index2 && daLiJeUnutar(element2, element1)) {
        jedanUnutarDrugog.push([element2[5], element1[5]])
      }
    });
  });

  let jedanDesnoOdDva = [];
  let jedanIspodDva = [];
  for (let i = 0; i < udaljenostiSvakogElementaX.length; i++) {
    for (let j = i + 1; j < udaljenostiSvakogElementaX.length; j++) {
      if (daLiJeDesnoOd(udaljenostiSvakogElementaX[i], udaljenostiSvakogElementaX[j], jedanUnutarDrugog)) {
        jedanDesnoOdDva.push([udaljenostiSvakogElementaX[j][5], udaljenostiSvakogElementaX[i][5]]);
      }
    }
  }

  for (let i = 0; i < udaljenostiSvakogElementaY.length; i++) {
    for (let j = i + 1; j < udaljenostiSvakogElementaY.length; j++) {
      if (daLiJeIspodOd(udaljenostiSvakogElementaY[i], udaljenostiSvakogElementaY[j], jedanUnutarDrugog)) {
        jedanIspodDva.push([udaljenostiSvakogElementaY[j][5], udaljenostiSvakogElementaY[i][5]]);
      }
    }
  }

  return { ispod: jedanIspodDva, desno: jedanDesnoOdDva };
}

//funkcija koja pomjera element na željenu udaljenost
function pomjeriElement(vertikalnaUdaljenost, horizontalnaUdaljenost, vertikalnaUdaljenostMjernaJedinica, horizontalnaUdaljenostMjernaJedinica) {
  let brojacZaPocetni = 0;
  let pocetnaUdaljenost = 0;
  let pocetnaUdaljenostPosto = 0;
  let brojacZaPocetniDesno = 0;
  let pocetnaUdaljenostDesno = 0;
  let pocetnaUdaljenostPostoDesno = 0;
  let oznacenaDjecaPamti = [];
  let x1 = 0;
  let y1 = 0;
  let x11 = 0;
  let y11 = 0;
  let oznacenaDjeca = [];
  let glavni = document.getElementById('glavni');
  let sviElementi = glavni.children;

  for (let i = 0; i < sviElementi.length; i++) {
    if (sviElementi[i].style.webkitBoxShadow === "rgb(32, 201, 151) 0px 0px 0px 2px") {
      oznacenaDjeca.push(sviElementi[i]);

      if (brojacZaPocetni === 0 && brojacZaPocetniDesno === 0) {
        oznacenaDjecaPamti.push(sviElementi[i]);

        x1 = oznacenaDjecaPamti[0].dataset.x;
        y1 = oznacenaDjecaPamti[0].dataset.y;

        if (i === 1) {
          x11 = oznacenaDjecaPamti[1].dataset.x;
          y11 = oznacenaDjecaPamti[1].dataset.y;
          x1 = (Math.round(parseFloat(x1) * 100) / 100);
          y1 = (Math.round(parseFloat(y1) * 100) / 100);
          x11 = (Math.round(parseFloat(x11) * 100) / 100);
          y11 = (Math.round(parseFloat(y11) * 100) / 100);
        }
      }
    }
  }

  if (arraysEqual(oznacenaDjeca, oznacenaDjecaPamti)) {
    let x = oznacenaDjeca[0].dataset.x;
    let y = oznacenaDjeca[0].dataset.y;
    let xx = oznacenaDjeca[1].dataset.x;
    let yy = oznacenaDjeca[1].dataset.y;

    if ((Math.round(parseFloat(x) * 100) / 100) !== x1) {
      if (vertikalnaUdaljenost !== "") {
        brojacZaPocetni = 0;
      }
      else if (horizontalnaUdaljenost !== "") {
        brojacZaPocetniDesno = 0;
      }
      x1 = (Math.round(parseFloat(x) * 100) / 100);
    }
    if ((Math.round(parseFloat(xx) * 100) / 100) !== x11) {
      if (vertikalnaUdaljenost !== "") {
        brojacZaPocetni = 0;
      }
      else if (horizontalnaUdaljenost !== "") {
        brojacZaPocetniDesno = 0;
      }
      x11 = (Math.round(parseFloat(xx) * 100) / 100);
    }
    if ((Math.round(parseFloat(y) * 100) / 100) !== y1) {
      if (horizontalnaUdaljenost !== "") {
        brojacZaPocetniDesno = 0;
      }
      else if (vertikalnaUdaljenost !== "") {
        brojacZaPocetni = 0;
      }
      y1 = (Math.round(parseFloat(y) * 100) / 100);
    }
    if ((Math.round(parseFloat(yy) * 100) / 100) !== y11) {
      if (horizontalnaUdaljenost !== "") {
        brojacZaPocetniDesno = 0;
      }
      else if (vertikalnaUdaljenost !== "") {
        brojacZaPocetni = 0;
      }
      y11 = (Math.round(parseFloat(yy) * 100) / 100);
    }
  }

  if (!arraysEqual(oznacenaDjeca, oznacenaDjecaPamti)) {
    brojacZaPocetni = 0;
    brojacZaPocetniDesno = 0;
    oznacenaDjecaPamti = [];

    for (let i = 0; i < oznacenaDjeca.length; i++) {
      oznacenaDjecaPamti.push(oznacenaDjeca[i]);
      x1 = oznacenaDjecaPamti[0].dataset.x;
      y1 = oznacenaDjecaPamti[0].dataset.y;

      if (i === 1) {
        x11 = oznacenaDjecaPamti[1].dataset.x;
        y11 = oznacenaDjecaPamti[1].dataset.y;
        x1 = (Math.round(parseFloat(x1) * 100) / 100);
        y1 = (Math.round(parseFloat(y1) * 100) / 100);
        x11 = (Math.round(parseFloat(x11) * 100) / 100);
        y11 = (Math.round(parseFloat(y11) * 100) / 100);
      }
    }
  }

  if (oznacenaDjeca.length === 2) {
    let pozicija = odrediPozicijuElemenata(oznacenaDjeca);
    let jedanIspodDva = pozicija.ispod;
    let jedanDesnoOdDva = pozicija.desno;

    if (jedanIspodDva.length !== 0) {
      let elementIspod = document.getElementById(jedanIspodDva[0][0]);
      let elementIznad = document.getElementById(jedanIspodDva[0][1]);

      if (brojacZaPocetni === 0) {
        pocetnaUdaljenost = (parseFloat(elementIspod.dataset.y) - parseFloat(elementIznad.dataset.y) - parseFloat(elementIznad.style.height) - 4).toFixed(0);
        pocetnaUdaljenostPosto = ((pocetnaUdaljenost / glavni.offsetHeight) * 100).toFixed(0);
        brojacZaPocetni++;
      }
      if (vertikalnaUdaljenostMjernaJedinica === "px") {
        elementIspod.style.top = parseFloat(vertikalnaUdaljenost) - parseFloat(pocetnaUdaljenost) + "px";
      }
      else if (vertikalnaUdaljenostMjernaJedinica === "%") {
        elementIspod.style.top = parseFloat(vertikalnaUdaljenost) - parseFloat(pocetnaUdaljenostPosto) + "%";
      }
    }
    if (jedanDesnoOdDva.length !== 0) {
      let elementDesno = document.getElementById(jedanDesnoOdDva[0][0]);
      let elementLijevo = document.getElementById(jedanDesnoOdDva[0][1]);

      if (brojacZaPocetniDesno === 0) {
        pocetnaUdaljenostDesno = (parseFloat(elementDesno.dataset.x) - parseFloat(elementLijevo.dataset.x) - parseFloat(elementLijevo.style.width) - 5).toFixed(0);
        pocetnaUdaljenostPostoDesno = ((pocetnaUdaljenostDesno / glavni.offsetWidth) * 100).toFixed(0);
        brojacZaPocetniDesno++;
      }
      if (horizontalnaUdaljenostMjernaJedinica === "px") {
        elementDesno.style.left = parseFloat(horizontalnaUdaljenost) - parseFloat(pocetnaUdaljenostDesno) + "px";
      }
      else if (horizontalnaUdaljenostMjernaJedinica === "%") {
        elementDesno.style.left = parseFloat(horizontalnaUdaljenost) - parseFloat(pocetnaUdaljenostPostoDesno) + "%";
      }
    }
  }
}

export { odrediPozicijuElemenata, pomjeriElement }