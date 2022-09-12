/*
import "../js/interact.js"
import varijableDiplomski from "../js/diplomski"
//import { glavniDio, brojacDivova, strelicaToolbara } from "../js/diplomski"
import "../js/evaluacija"
import { offset, bubbleSort, daLiJeUnutar } from "../js/galenDio"
import "../js/pdf"
import "../js/poravnanje"
import "../js/snimanjeFajlova"
import "../js/vertikalnaIHorizontalnaUdaljenost"

var trenutnoOznaceniElement;
var vrijednostZ = 1;

var widthTextBox = document.getElementById("unosSirineTextBox");
var heightTextBox = document.getElementById("unosVisineTextBox");

var posljednjeObrisaniElement;

var selectSirina = document.getElementById("sirina");
var inputElement = document.getElementById("unosSirineTextBox");

var selectVisina = document.getElementById("visina");
var inputElementVisina = document.getElementById("unosVisineTextBox");

//desne opcije
var desniToolbar = document.getElementById("desniToolbar");
var desniToolbarOpcije = document.getElementById("desniToolbarOpcije");
var naslovOpcija = document.getElementById("nazivOdabranogElementa");

var fontElementa = document.getElementById("fontElementa");

var redovi = document.getElementById("redovi");
var kolone = document.getElementById("kolone");
var tabovi = document.getElementById("tabovi");
var radioDugmadi = document.getElementById("radioDugmadi");
var trentunoOznaceniTab = document.getElementById("trenutnoOznaceniTab");
var trenutnoOznacenoRadioDugme = document.getElementById("trenutnoOznacenoRadioDugme");
var checkboxovi = document.getElementById("checkboxovi");
var oznaceniCheckboxovi = document.getElementById("oznaceniCheckboxovi");
var neoznaceniCheckboxovi = document.getElementById("neoznaceniCheckboxovi");
var vertikalnaLista = document.getElementById("vertikalnaLista");
var horizontalnaListaElemenata = document.getElementById("horizontalnaLista");
var listaOznacenih = [];

var unosIdTrenutnogElementa = document.getElementById("unosIdTrenutnogElementa");
var listaDodijeljenihId = [];

var roditeljPosljednjeObrisanogElementa = null;

var horizontalnaUdaljenost = document.getElementById("unosHorizontalneUdaljenosti");
var vertikalnaUdaljenost = document.getElementById("unosVertikalneUdaljenosti");
var horizontalnaUdaljenostSelect = document.getElementById("horizontalnaUdaljenostSelect");
var vertikalnaUdaljenostSelect = document.getElementById("vertikalnaUdaljenostSelect");

var unosKlaseTrenutnogElementa = document.getElementById("unosKlaseTrenutnogElementa");

var horizontalnaLista;

function obrisiElement() {
  if (trenutnoOznaceniElement != null) {
    posljednjeObrisaniElement = trenutnoOznaceniElement;
    roditeljPosljednjeObrisanogElementa = trenutnoOznaceniElement.parentNode;
    if (trenutnoOznaceniElement.parentNode.id != "glavni") {
      if (trenutnoOznaceniElement.parentNode.children.length == 1) {
        trenutnoOznaceniElement.parentNode.remove();
      }
      else {
        trenutnoOznaceniElement.remove();
      }
    }
    else {
      trenutnoOznaceniElement.remove();
    }
    varijableDiplomski.glavniDio.click();
  }
}

function staviIspred() {
  if (trenutnoOznaceniElement != null) {
    vrijednostZ = vrijednostZ + 1;
    trenutnoOznaceniElement.style.zIndex = vrijednostZ;
    desniToolbar.style.zIndex = vrijednostZ + 1;
    //modal.style.zIndex = vrijednostZ + 1;
    console.log(trenutnoOznaceniElement.style.zIndex);
  }
}

function staviIza() {
  if (trenutnoOznaceniElement != null) {
    vrijednostZ = vrijednostZ - 1;
    trenutnoOznaceniElement.style.zIndex = vrijednostZ;
    console.log(trenutnoOznaceniElement.style.zIndex);
  }
}

//ENTER na input polju za sirinu i visinu
inputElement.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    document.getElementById("apply").click();
  }
});

inputElementVisina.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    document.getElementById("apply").click();
  }
});

//ENTER na input polja za font, broj redova i kolona, broj tabova i broj opcija radioButtona
fontElementa.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

redovi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

kolone.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

tabovi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

trentunoOznaceniTab.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

radioDugmadi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

checkboxovi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

trenutnoOznacenoRadioDugme.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

oznaceniCheckboxovi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

neoznaceniCheckboxovi.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

vertikalnaLista.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

// NE ZNAM CEMU SLUZI, MOZDA SE TREBA ODKOMENTARISATI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/!*horizontalnaLista.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});*!/

unosIdTrenutnogElementa.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});

unosKlaseTrenutnogElementa.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    applyDesniDio();
  }
});


// MORA SE DRUGACIJE IMPLEMENTIRATI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//Promjena sirine elementa
/!*document.getElementById("sirina").addEventListener("click", function (event) {
  var izabrano = selectSirina.options[selectSirina.selectedIndex].value;
  if (izabrano == "px") {
    widthTextBox.value = trenutnoOznaceniElement.clientWidth;
    trenutnoOznaceniElement.dataset.sirinapikseli = true;
  }
  else if (izabrano == "%") {
    var parent = trenutnoOznaceniElement.offsetParent || trenutnoOznaceniElement;
    widthTextBox.value = ((trenutnoOznaceniElement.offsetWidth / parent.offsetWidth) * 100).toFixed(0);
    trenutnoOznaceniElement.dataset.sirinapikseli = false;
  }
});

//Promjena visine elementa
selectVisina.addEventListener("click", function (event) {
  var izabrano = selectVisina.options[selectVisina.selectedIndex].value;
  if (izabrano == "px") {
    heightTextBox.value = trenutnoOznaceniElement.clientHeight;
    trenutnoOznaceniElement.dataset.visinapikseli = true;
  }
  else if (izabrano == "%") {
    var parent = trenutnoOznaceniElement.offsetParent || trenutnoOznaceniElement;
    heightTextBox.value = ((trenutnoOznaceniElement.offsetHeight / parent.offsetHeight) * 100).toFixed(0);
    trenutnoOznaceniElement.dataset.visinapikseli = false;
  }
});*!/

//funkcija apply() za visinu i sirinu elementa
function apply() {
  if (inputElement.value == "" || inputElementVisina.value == "") {
    alert("Field cannot be empty!");
  }
  else {

    var izabrano = selectSirina.options[selectSirina.selectedIndex].value;
    if (inputElement.value != null && trenutnoOznaceniElement != null) {
      trenutnoOznaceniElement.style.width = inputElement.value + izabrano;
    }

    var izabrano1 = selectVisina.options[selectVisina.selectedIndex].value;
    if (inputElementVisina.value != null && trenutnoOznaceniElement != null) {
      trenutnoOznaceniElement.style.height = inputElementVisina.value + izabrano1;
    }

    //trenutnoOznaceniElement = null;
  }
}

//funkcija applyDesniDio() za opcije toolbara


function vratiPosljednjeObrisaniElement() {
  if (posljednjeObrisaniElement != null) {
    roditeljPosljednjeObrisanogElementa.appendChild(posljednjeObrisaniElement);
    posljednjeObrisaniElement = null;
  }
}

varijableDiplomski.strelicaToolbara.addEventListener("click", function (event) {
  varijableDiplomski.strelicaToolbara.style.display = "none";
  desniToolbar.style.display = "inline";
  onemoguciKlikUToolbaru(true);
})

function onemoguciKlikUToolbaru(onemogucen) {
  unosIdTrenutnogElementa.disabled = onemogucen;
  unosKlaseTrenutnogElementa.disabled = onemogucen;
  document.getElementById("deleteDugme").disabled = onemogucen;
  document.getElementById("bringToFrontDugme").disabled = onemogucen;
  document.getElementById("sendToBackDugme").disabled = onemogucen;
  document.getElementById("radio1").disabled = onemogucen;
  document.getElementById("radio2").disabled = onemogucen;
  document.getElementById("radio3").disabled = onemogucen;
  document.getElementById("radio4").disabled = onemogucen;
  fontElementa.disabled = onemogucen;
  inputElementVisina.disabled = onemogucen;
  inputElement.disabled = onemogucen;
  document.getElementById("visina").disabled = onemogucen;
  document.getElementById("sirina").disabled = onemogucen;
  document.getElementById("apply").disabled = onemogucen;
}

/!*export {
  obrisiElement, staviIspred, staviIza, apply, applyDesniDio, vratiPosljednjeObrisaniElement, onemoguciKlikUToolbaru,
  trenutnoOznaceniElement, vrijednostZ, widthTextBox, heightTextBox, posljednjeObrisaniElement, selectSirina,
  inputElement, selectVisina, inputElementVisina, desniToolbar, desniToolbarOpcije, naslovOpcija, fontElementa,
  redovi, kolone, tabovi, radioDugmadi, trentunoOznaceniTab, trenutnoOznacenoRadioDugme, checkboxovi, oznaceniCheckboxovi,
  neoznaceniCheckboxovi, vertikalnaLista, horizontalnaListaElemenata, listaOznacenih, unosIdTrenutnogElementa, listaDodijeljenihId,
  roditeljPosljednjeObrisanogElementa, horizontalnaUdaljenost, vertikalnaUdaljenost, horizontalnaUdaljenostSelect,
  vertikalnaUdaljenostSelect, unosKlaseTrenutnogElementa, horizontalnaLista
}*!/

export default {
  obrisiElement: obrisiElement,
  staviIspred: staviIspred,
  staviIza: staviIza,
  apply: apply,
  applyDesniDio: applyDesniDio,
  vratiPosljednjeObrisaniElement: vratiPosljednjeObrisaniElement,
  onemoguciKlikUToolbaru: onemoguciKlikUToolbaru,
  trenutnoOznaceniElement: trenutnoOznaceniElement,
  vrijednostZ: vrijednostZ,
  widthTextBox: widthTextBox,
  heightTextBox: heightTextBox,
  posljednjeObrisaniElement: posljednjeObrisaniElement,
  selectSirina: selectSirina,
  inputElement: inputElement,
  selectVisina: selectVisina,
  inputElementVisina: inputElementVisina,
  desniToolbar: desniToolbar,
  desniToolbarOpcije: desniToolbarOpcije,
  naslovOpcija: naslovOpcija,
  fontElementa: fontElementa,
  redovi: redovi,
  kolone: kolone,
  tabovi: tabovi,
  radioDugmadi: radioDugmadi,
  trentunoOznaceniTab: trentunoOznaceniTab,
  trenutnoOznacenoRadioDugme: trenutnoOznacenoRadioDugme,
  checkboxovi: checkboxovi,
  oznaceniCheckboxovi: oznaceniCheckboxovi,
  neoznaceniCheckboxovi: neoznaceniCheckboxovi,
  vertikalnaLista: vertikalnaLista,
  horizontalnaListaElemenata: horizontalnaListaElemenata,
  listaOznacenih: listaOznacenih,
  unosIdTrenutnogElementa: unosIdTrenutnogElementa,
  listaDodijeljenihId: listaDodijeljenihId,
  roditeljPosljednjeObrisanogElementa: roditeljPosljednjeObrisanogElementa,
  horizontalnaUdaljenost: horizontalnaUdaljenost,
  vertikalnaUdaljenost: vertikalnaUdaljenost,
  horizontalnaUdaljenostSelect: horizontalnaUdaljenostSelect,
  vertikalnaUdaljenostSelect: vertikalnaUdaljenostSelect,
  unosKlaseTrenutnogElementa: unosKlaseTrenutnogElementa,
  horizontalnaLista: horizontalnaLista
}
*/
