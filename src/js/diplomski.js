/*
import "../js/interact.js"
import varijableDesniToolbar from "../js/desniToolbar"
import "../js/evaluacija"
import { offset, ocitajSveUdaljenosti } from "../js/galenDio"
import "../js/pdf"
import "../js/poravnanje"
import "../js/snimanjeFajlova"
//import { odrediUdaljenost } from "../js/vertikalnaIHorizontalnaUdaljenost"

console.log("Tu sam");
var xOse = [];
var yOse = [];
function ocitajSveOse(trenutniDiv) {
  var sviDivovi = document.getElementById("glavni").getElementsByTagName("div");
  xOse = [];
  yOse = [];
  for (var i = 0; i < sviDivovi.length; i++) {
    if (sviDivovi[i].id != trenutniDiv.id) {
      var divOffset = offset(sviDivovi[i]);
      //vrijednosti su (indeks,x-udaljenost,y-udaljenost,sirina,visina,id) [i, divOffset.left, divOffset.top, div[i].offsetWidth, div[i].offsetHeight, div[i].id]
      xOse.push(divOffset.left);
      xOse.push(divOffset.left + sviDivovi[i].offsetWidth);

      yOse.push(divOffset.top);
      yOse.push(divOffset.top + sviDivovi[i].offsetHeight);
    }
  }
}

var trenutniMisX = 0;
var trenutniMisY = 0;
var xMis = 0;
var yMis = 0;

document.getElementById("glavni").addEventListener("mousemove", function (event) {
  xMis = event.clientX;
  yMis = event.clientY;
});

document.getElementById("glavni").addEventListener("mousedown", function (event) {
  if (event.target.id != "glavni") {
    trenutniMisX = xMis;
    trenutniMisY = yMis;
  }
  console.log("Klinut je " + event.target.id);
  console.log(trenutniMisX);
});

var brojacDivova = 0;
var glavniDio = document.getElementById("glavni");
glavniDio.classList.add("dropzone");

var searchText = document.getElementById("searchText");
var listaMockupa = document.getElementById("listaMockupa");

var prethodnoOznaceniElement = null;

var strelicaToolbara = document.getElementById("strelicaToolbara");

var oznaceniElementi = [];

var brojacOznacenih = 0;

//EventListener na elementima diva glavni
glavniDio.addEventListener("click", function (e) {
  console.log("trenutno oznaceni element " + e.target.nodeName);
  if (e.target && e.target.nodeName == "DIV" && e.target.id != "glavni" && e.target.id != "") {
    varijableDesniToolbar.trenutnoOznaceniElement = e.target;
    if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.sirinapikseli == "true") {
      varijableDesniToolbar.selectSirina.value = varijableDesniToolbar.selectSirina.options[0].value;
    }
    else {
      varijableDesniToolbar.selectSirina.value = varijableDesniToolbar.selectSirina.options[1].value;
    }

    if (varijableDesniToolbar.selectSirina.options[varijableDesniToolbar.selectSirina.selectedIndex].value == "%") {
      var parent = varijableDesniToolbar.trenutnoOznaceniElement.offsetParent || varijableDesniToolbar.trenutnoOznaceniElement;
      varijableDesniToolbar.widthTextBox.value = ((varijableDesniToolbar.trenutnoOznaceniElement.offsetWidth / parent.offsetWidth) * 100).toFixed(0);

    }
    else if (varijableDesniToolbar.selectSirina.options[varijableDesniToolbar.selectSirina.selectedIndex].value == "px") {
      varijableDesniToolbar.widthTextBox.value = varijableDesniToolbar.trenutnoOznaceniElement.clientWidth;
    }


    if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.visinapikseli == "true") {
      varijableDesniToolbar.selectVisina.value = varijableDesniToolbar.selectVisina.options[0].value;
    }
    else {
      varijableDesniToolbar.selectVisina.value = varijableDesniToolbar.selectVisina.options[1].value;
    }

    if (varijableDesniToolbar.selectVisina.options[varijableDesniToolbar.selectVisina.selectedIndex].value == "%") {
      var parent = varijableDesniToolbar.trenutnoOznaceniElement.offsetParent || varijableDesniToolbar.trenutnoOznaceniElement;
      varijableDesniToolbar.heightTextBox.value = ((varijableDesniToolbar.trenutnoOznaceniElement.offsetHeight / parent.offsetHeight) * 100).toFixed(0);
    }
    else if (varijableDesniToolbar.selectVisina.options[varijableDesniToolbar.selectVisina.selectedIndex].value == "px") {
      varijableDesniToolbar.heightTextBox.value = varijableDesniToolbar.trenutnoOznaceniElement.clientHeight;
    }

    //prikazivanje kontura elementa kad je element oznacen u divu glavni
    varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
    if (varijableDesniToolbar.trenutnoOznaceniElement.parentNode.id != "glavni") {
      varijableDesniToolbar.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
    }
    varijableDesniToolbar.vertikalnaUdaljenost.disabled = true;
    varijableDesniToolbar.vertikalnaUdaljenostSelect.disabled = true;
    varijableDesniToolbar.horizontalnaUdaljenost.disabled = true;
    varijableDesniToolbar.horizontalnaUdaljenostSelect.disabled = true;
    varijableDesniToolbar.horizontalnaUdaljenost.value = "";
    varijableDesniToolbar.vertikalnaUdaljenost.value = "";

    //varijableDesniToolbar.trenutnoOznaceniElement.style.border="dashed #20c997";

    //prethodno oznaceni element
    if (/!*prethodnoOznaceniElement != null && prethodnoOznaceniElement != undefined &&*!/ prethodnoOznaceniElement != varijableDesniToolbar.trenutnoOznaceniElement) {
      if (window.event.shiftKey) {
        varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
        if (prethodnoOznaceniElement != null && varijableDesniToolbar.trenutnoOznaceniElement != null) {
          //odrediUdaljenost();
        }
      }
      else {
        if (prethodnoOznaceniElement != null && prethodnoOznaceniElement != undefined) {
          //var svaDjeca = document.getElementById("glavni").childNodes;
          var svaDjeca = document.getElementById("glavni").getElementsByTagName("div");
          for (var i = 0; i < svaDjeca.length; i++) {
            svaDjeca[i].style.boxShadow = "";
          }
          varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
          if (varijableDesniToolbar.trenutnoOznaceniElement.parentNode.id != "glavni") {
            varijableDesniToolbar.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
          }
        }
      }
    }
    else {
      if (window.event.shiftKey) {
        if (brojacOznacenih % 2 == 0) {
          varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "";
          //odrediUdaljenost();
          brojacOznacenih++;
        }
        else {
          varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
          //odrediUdaljenost();
          brojacOznacenih = 0;
        }
      }
    }
    prethodnoOznaceniElement = varijableDesniToolbar.trenutnoOznaceniElement;
    console.log("Prethodno je oznacen " + prethodnoOznaceniElement);

    //uklanjanje prikaza streliceToolbara
    strelicaToolbara.style.display = "none";

    //prikazivanje opcija sa desne strane
    varijableDesniToolbar.vertikalnaLista.style.display = "inline";
    varijableDesniToolbar.vertikalnaLista.style.zIndex = varijableDesniToolbar.vrijednostZ + 1;
    varijableDesniToolbar.onemoguciKlikUToolbaru(false);
    varijableDesniToolbar.naslovOpcija.innerHTML = varijableDesniToolbar.trenutnoOznaceniElement.title;
    if (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length != 0) {
      varijableDesniToolbar.fontElementa.value = window.getComputedStyle(varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[0]).fontSize.slice(0, -2);
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("td").length != 0) {
      varijableDesniToolbar.fontElementa.value = window.getComputedStyle(varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("td")[0]).fontSize.slice(0, -2);
    }
    else {
      varijableDesniToolbar.fontElementa.value = window.getComputedStyle(varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("p")[0]).fontSize.slice(0, -2);
    }

    //prikaz id-a
    varijableDesniToolbar.unosIdTrenutnogElementa.value = varijableDesniToolbar.trenutnoOznaceniElement.dataset.dodijeljeniid;
    varijableDesniToolbar.unosKlaseTrenutnogElementa.value = varijableDesniToolbar.trenutnoOznaceniElement.dataset.dodijeljenaklasa;

    //omogucavanje dodatnih elemenata Toolbara
    var sveDodatneOpcije = document.getElementById("listaDodatnihOpcija").getElementsByTagName("li");
    for (var i = 0; i < sveDodatneOpcije.length; i++) {
      sveDodatneOpcije[i].style.display = "none";
    }
    if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Table") {
      varijableDesniToolbar.redovi.style.display = "block";
      varijableDesniToolbar.kolone.style.display = "block";
      var brojRedovaTabele = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("tr").length;
      document.getElementById("brojRedova").value = brojRedovaTabele;
      document.getElementById("brojKolona").value = (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("td").length + varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("th").length) / brojRedovaTabele;
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Tabs") {
      //varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[1].setAttribute("data-oznacen","1");
      //console.log(varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[1].dataset.oznacen);
      varijableDesniToolbar.tabovi.style.display = "block";
      varijableDesniToolbar.trentunoOznaceniTab.style.display = "block";
      document.getElementById("brojTabova").value = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length;
      for (var i = 0; i < varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
        if (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[i].dataset.oznacen == "1") {
          document.getElementById("brojTrenutnoOznacenogTaba").value = i + 1;
          break;
        }
      }
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Radio Button") {
      radioDugmadi.style.display = "block";
      varijableDesniToolbar.trenutnoOznacenoRadioDugme.style.display = "block";
      document.getElementById("brojOpcijaRadioDugmadi").value = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length;
      for (var i = 0; i < varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
        if (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[i].className == "oznacena") {
          document.getElementById("brojTrenutnoOznacenogRadioDugmeta").value = i + 1;
          break;
        }
      }
    }

    else if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Checkbox") {
      varijableDesniToolbar.checkboxovi.style.display = "block";
      varijableDesniToolbar.oznaceniCheckboxovi.style.display = "block";
      varijableDesniToolbar.neoznaceniCheckboxovi.style.display = "block";
      document.getElementById("brojOpcijaCheckboxova").value = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length;
      for (var i = 0; i < varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
        if (varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li")[i].className == "checkboxOznacena") {
          document.getElementById("brojTrenutnoOznacenogCheckboxa").value = i + 1;
          break;
        }
      }
    }

    else if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Vertical List") {
      varijableDesniToolbar.vertikalnaLista.style.display = "block";
      document.getElementById("brojOpcijaVertikalneListe").value = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length;
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.title == "Horizontal List") {
      horizontalnaListaElemenata.style.display = "block";
      document.getElementById("brojOpcijaHorizontalneListe").value = varijableDesniToolbar.trenutnoOznaceniElement.getElementsByTagName("li").length;
    }

    //namjesti poravnanje
    if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "lijevo") {
      document.getElementById("radio1").click();
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "centar") {
      document.getElementById("radio2").click();
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "desno") {
      document.getElementById("radio3").click();
    }
    else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "justify") {
      document.getElementById("radio4").click();
    }
  }
  else if (e.target && e.target.id != "glavni") {
    var roditelj = daLiMuJeRoditeljDiv(e.target);
    console.log("\nNasao sam roditelja\t" + roditelj);
    if (roditelj != null) {
      varijableDesniToolbar.trenutnoOznaceniElement = document.getElementById(roditelj);
      if (prethodnoOznaceniElement != varijableDesniToolbar.trenutnoOznaceniElement) {
        if (window.event.shiftKey) {
          varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
          if (prethodnoOznaceniElement != null && varijableDesniToolbar.trenutnoOznaceniElement != null) {
            //odrediUdaljenost();
          }
        }
        else {
          if (prethodnoOznaceniElement != null && prethodnoOznaceniElement != undefined) {
            var svaDjeca = document.getElementById("glavni").getElementsByTagName("div");
            for (var i = 0; i < svaDjeca.length; i++) {
              svaDjeca[i].style.boxShadow = "";
            }
            varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
            if (varijableDesniToolbar.trenutnoOznaceniElement.parentNode.id != "glavni") {
              varijableDesniToolbar.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
            }
          }
          //else {
          varijableDesniToolbar.trenutnoOznaceniElement.click();
          //}
        }
      }
      else {
        if (window.event.shiftKey) {
          if (varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow == "rgb(32, 201, 151) 0px 0px 0px 2px") {
            varijableDesniToolbar.trenutnoOznaceniElement.style.boxShadow = "";
            //odrediUdaljenost();
          }
          else {
            varijableDesniToolbar.trenutnoOznaceniElement.click();
            //odrediUdaljenost();
          }
        }
        else varijableDesniToolbar.trenutnoOznaceniElement.click();
      }
      prethodnoOznaceniElement = varijableDesniToolbar.trenutnoOznaceniElement;


      //namjesti poravnanje
      if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "lijevo") {
        document.getElementById("radio1").click();
      }
      else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "centar") {
        document.getElementById("radio2").click();
      }
      else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "desno") {
        document.getElementById("radio3").click();
      }
      else if (varijableDesniToolbar.trenutnoOznaceniElement.dataset.poravnanje == "justify") {
        document.getElementById("radio4").click();
      }
    }
    else {
      varijableDesniToolbar.trenutnoOznaceniElement = null;
      prethodnoOznaceniElement = null;
    }
  }
  else {
    varijableDesniToolbar.trenutnoOznaceniElement = null;
    varijableDesniToolbar.inputElement.value = "";
    varijableDesniToolbar.inputElementVisina.value = "";
    varijableDesniToolbar.selectSirina.value = varijableDesniToolbar.selectSirina.options[0].value;
    varijableDesniToolbar.selectVisina.value = varijableDesniToolbar.selectVisina.options[0].value;
    varijableDesniToolbar.vertikalnaLista.style.display = "none";
    varijableDesniToolbar.horizontalnaUdaljenost.disabled = true;
    varijableDesniToolbar.horizontalnaUdaljenostSelect.disabled = true;
    varijableDesniToolbar.vertikalnaUdaljenost.disabled = true;
    varijableDesniToolbar.vertikalnaUdaljenostSelect.disabled = true;
    varijableDesniToolbar.horizontalnaUdaljenost.value = "";
    varijableDesniToolbar.vertikalnaUdaljenost.value = "";
    if (prethodnoOznaceniElement != null && prethodnoOznaceniElement != undefined && prethodnoOznaceniElement != varijableDesniToolbar.trenutnoOznaceniElement) {
      var svaDjeca = document.getElementById("glavni").getElementsByTagName("div");
      for (var i = 0; i < svaDjeca.length; i++) {
        svaDjeca[i].style.boxShadow = "";
      }
      prethodnoOznaceniElement.style.boxShadow = "";
    }
    prethodnoOznaceniElement = null;
    //prikazi strelicuToolbara
    strelicaToolbara.style.display = "flex";
    strelicaToolbara.style.zIndex = varijableDesniToolbar.vrijednostZ + 1;
  }
  console.log("trenutno je oznacen " + varijableDesniToolbar.trenutnoOznaceniElement);
}, false);

//funkcija koja provjerava da li roditelj ima id "div" i vraca id roditelja
function daLiMuJeRoditeljDiv(dijete) {
  var node = dijete.parentNode;
  while (node != null) {
    console.log("OKURRRRRRRRRRRRRRRR\t\t" + node.id.substring(0, 3));
    if (node.id == "glavni") {
      return null;
    }
    else if (node.dataset.inicijalniid != undefined && node.dataset.inicijalniid.substring(0, 3) == "div") {
      return node.id;
    }
    node = node.parentNode;
  }
  return null;
}


//Klik na element liste Mockupa sa lijeve stranu (tj. u divu lijevo)
document.getElementById("listaMockupa").addEventListener("click", function (e) {

  e.stopPropagation();
  e.preventDefault();
  console.log("Kliknut je   " + e.target);


  if (e.target && e.target.nodeName == "BUTTON") {
    if (e.target.getAttribute("id") == "searchButton") {
      search();
    }
    else if (e.target.getAttribute("id") == "deleteButton") {
      deleteSearchText();
    }

  }

  else if (e.target && e.target.nodeName == "DIV") {
    //Dupliciranje elementa liste
    let e2 = e.target.cloneNode(true);
    //Dodavanje mogucnosti drag and drop na element liste kako bi ga bilo moguce pomjerati u glavnom divu
    e2.classList.add("resize-drag");

    //Pokusaj drag and dropa
    //e2.classList.add("draggable");
    //Ovo sam dodao jer je izbacivalo neki warning ali ne pravi nikakvu razliku, valjda je ovo vezano za touch-screen dislay
    e2.setAttribute("style", "touch-action:none;");
    e2.setAttribute("style", "margin-left:0px;margin-top:0px;margin-bottom:0px");

    //Dimenzije glavnog diva
    var rect = glavniDio.getBoundingClientRect();

    //pozicioniranje Mockupa
    e2.style.position = "absolute";
    e2.style.left = rect.left;
    e2.style.top = rect.top;

    e2.style.width = e.target.offsetWidth + "px";
    e2.style.height = e.target.offsetHeight + "px";

    //Omogucavanje editovanja paragrafa na dupliClick
    if (e2.getElementsByTagName("p")[0] != null) {
      for (var i = 0; i < e2.getElementsByTagName("p").length; i++) {
        //e2.getElementsByTagName("p")[i].contentEditable = "true";
        e2.getElementsByTagName("p")[i].setAttribute("onclick", "this.contentEditable=false;");
        e2.getElementsByTagName("p")[i].setAttribute("ondblclick", "this.contentEditable=true;this.focus();");
        e2.getElementsByTagName("p")[i].style.pointerEvents = "auto";
      }
    }

    //Omogucavanje editovanja tabele na dupliClick
    if (e2.getElementsByTagName("table")[0] != null) {
      e2.getElementsByTagName("table")[0].setAttribute("onclick", "this.contentEditable=false;");
      e2.getElementsByTagName("table")[0].setAttribute("ondblclick", "this.contentEditable=true;this.focus();");
      e2.getElementsByTagName("table")[0].style.pointerEvents = "auto";
    }

    //Omogucavanje editovanja li na dupliClick
    if (e2.getElementsByTagName("li")[0] != null) {
      for (var i = 0; i < e2.getElementsByTagName("li").length; i++) {
        e2.getElementsByTagName("li")[i].setAttribute("onclick", "this.contentEditable=false;");
        e2.getElementsByTagName("li")[i].setAttribute("ondblclick", "this.contentEditable=true;this.focus();");
        e2.getElementsByTagName("li")[i].style.pointerEvents = "auto";
      }
    }

    //pretrazi sve id-eve
    var sviIdKojiImajuDiv = [];
    for (var i = 0; i < glavniDio.getElementsByTagName("div").length; i++) {
      if (glavniDio.getElementsByTagName("div")[i].id != null && glavniDio.getElementsByTagName("div")[i].id.substring(0, 3) == "div") {
        var citavId = glavniDio.getElementsByTagName("div")[i].id;
        if (citavId.substring(3, citavId.length) == parseInt(citavId.substring(3, citavId.length), 10))
          sviIdKojiImajuDiv.push(citavId.substring(3, citavId.length));
      }
    }
    sviIdKojiImajuDiv.sort(sortirajBroj);
    for (var i = 0; i < sviIdKojiImajuDiv.length; i++) {
      if (brojacDivova == sviIdKojiImajuDiv[i]) {
        brojacDivova = brojacDivova + 1;
      }
    }


    e2.style.zIndex = 1;
    //console.log("z", e2.style.zIndex);
    e2.setAttribute("id", "div" + brojacDivova);
    //dodatni atribut data-inicijalniId
    e2.setAttribute("data-inicijalniid", "div" + brojacDivova);
    e2.setAttribute("data-dodijeljeniid", "div" + brojacDivova);
    varijableDesniToolbar.listaDodijeljenihId.push("div" + brojacDivova);
    brojacDivova = brojacDivova + 1;

    //Alignenment elementa
    e2.setAttribute("data-poravnanje", "centar");
    //Dodavanje title kloniranom elementu
    e2.title = e.target.title;
    //console.log("OVO JE      " + e2.title);

    e2.setAttribute("data-visinapikseli", true);
    e2.setAttribute("data-sirinapikseli", true);
    e2.setAttribute("data-dodijeljenaklasa", "");

    //Dodavanje kloniranog elementa glavnom divu
    glavniDio.appendChild(e2);
  }
}, true);

//funkcija za sortiranje brojeva u rastuci poredak
function sortirajBroj(a, b) {
  return a - b;
}

//Brisanje oznacenog elementa pritiskom na tipku DELETE
document.addEventListener("keydown", function (event) {
  if (window.event.keyCode == 46) {
    if (varijableDesniToolbar.trenutnoOznaceniElement != null && varijableDesniToolbar.trenutnoOznaceniElement.nodeName != "P") {
      varijableDesniToolbar.posljednjeObrisaniElement = varijableDesniToolbar.trenutnoOznaceniElement;
      varijableDesniToolbar.roditeljPosljednjeObrisanogElementa = varijableDesniToolbar.trenutnoOznaceniElement.parentNode;
      if (varijableDesniToolbar.trenutnoOznaceniElement.parentNode.id != "glavni") {
        if (varijableDesniToolbar.trenutnoOznaceniElement.parentNode.children.length == 1) {
          varijableDesniToolbar.trenutnoOznaceniElement.parentNode.remove();
        }
        else {
          varijableDesniToolbar.trenutnoOznaceniElement.remove();
        }
      }
      else {
        varijableDesniToolbar.trenutnoOznaceniElement.remove();
      }

      glavniDio.click();
    }
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key == 90 && event.ctrlKey) {
    if (varijableDesniToolbar.posljednjeObrisaniElement != null) {
      varijableDesniToolbar.roditeljPosljednjeObrisanogElementa.appendChild(varijableDesniToolbar.posljednjeObrisaniElement);
      varijableDesniToolbar.posljednjeObrisaniElement = null;
    }
  }
});


//Search mockup elemenata
function search() {
  var tekst = document.getElementById("searchText").value;

  for (var i = 3; i < listaMockupa.childNodes.length; i = i + 2) {
    listaMockupa.childNodes[i].style.display = "block";
  }

  for (var i = 3; i < listaMockupa.childNodes.length; i = i + 2) {
    if (!listaMockupa.childNodes[i].getElementsByTagName("div")[0].title.toLowerCase().includes(tekst.toLowerCase())) {
      listaMockupa.childNodes[i].style.display = "none";
    }
  }
}

//Enter nad searchText
document.getElementById("searchText").addEventListener("keyup", function (event) {
  if (event.key == 13) {
    search();
  }
});

//Brisanje iz searchText

function deleteSearchText() {
  searchText.value = "";
  for (var i = 3; i < listaMockupa.childNodes.length; i = i + 2) {
    listaMockupa.childNodes[i].style.display = "block";
  }
}


//funkcija koja pita da li je korisnik siguran da zeli napustiti stranicu
/!*window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = 'Are you sure you want to leave? ' + 'Some of the changes you made might not be saved.';

  (e || window.event).returnValue = confirmationMessage; //Gecko + IE
  return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});*!/
var modal;
function prikaziModal() {
  modal = document.getElementById("modal");
  modal.style.zIndex = varijableDesniToolbar.vrijednostZ + 1;
  modal.style.display = "block";
  console.log("Prikazi modal");
  ocitajSveUdaljenosti();
}

// When the user clicks on <span> (x), close the modal
function zatvoriModal() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Event Listener nad inputom za import
document.getElementById("importFajlaInput").addEventListener("input", function (event) {
  console.log("Desilo se");
  var importFajla = document.getElementById("importFajlaInput");
  console.log(importFajla.files[0]);
  var file = importFajla.files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var content = reader.result;
    //console.log(content.split("</style>")[1]);
    var prviDio = content.split("</style>")[1];
    console.log(prviDio.split("</body>")[0]);
    var procitaniFajl = prviDio.split("</body>")[0];
    if (procitaniFajl != "") {
      document.getElementById("glavni").innerHTML = procitaniFajl;
      var sviElementi = document.getElementById("glavni").getElementsByTagName("*");
      var noviZ = 1;
      for (var i = 0; i < sviElementi.length; i++) {
        if (parseInt(sviElementi[i].style.zIndex) > noviZ) {
          noviZ = parseInt(sviElementi[i].style.zIndex);
        }
      }
      varijableDesniToolbar.vrijednostZ = noviZ;
      varijableDesniToolbar.vertikalnaLista.style.zIndex = varijableDesniToolbar.vrijednostZ + 1;

      varijableDesniToolbar.listaDodijeljenihId = [];
      var sviElementi = document.getElementById("glavni").getElementsByTagName("*");
      for (var i = 0; i < sviElementi.length; i++) {
        if (sviElementi[i].dataset.dodijeljeniid != null && sviElementi[i].dataset.dodijeljeniid != "") {
          varijableDesniToolbar.listaDodijeljenihId.push(sviElementi[i].dataset.dodijeljeniid);
        }
      }
    }
  }
  reader.readAsText(file);
});


export default {
  glavniDio: glavniDio,
  xOse: xOse,
  yOse: yOse,
  trenutniMisX: trenutniMisX,
  trenutniMisY: trenutniMisY,
  xMis: xMis,
  yMis: yMis,
  brojacDivova: brojacDivova,
  searchText: searchText,
  listaMockupa: listaMockupa,
  prethodnoOznaceniElement: prethodnoOznaceniElement,
  strelicaToolbara: strelicaToolbara,
  oznaceniElementi: oznaceniElementi,
  brojacOznacenih: brojacOznacenih
};

/!*export {
  glavniDio, xOse, yOse, trenutniMisX, trenutniMisY, xMis, yMis,
  brojacDivova, searchText, listaMockupa, prethodnoOznaceniElement,
  strelicaToolbara, oznaceniElementi, brojacOznacenih
};*!/
*/
