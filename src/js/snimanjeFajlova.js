//funkcija za download datoteke
function download(data, filename, type) {
  let file = new Blob([data], { type: type });
  if (window.navigator.msSaveOrOpenBlob) // IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  else { // Others
    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

//funkcija za download cijelog html-a
/*function snimiCitavFajl() {
  //document.getElementById("glavni").click();
  let fajl = `<!DOCTYPE html><html><head></head><meta charset="utf-8"><body>`;
  let sviElementi = document.getElementById("glavni").getElementsByTagName("*");
  let stil = ``;
  let element = ``;
  for (let i = 0; i < sviElementi.length; i++) {
    if (sviElementi[i].id !== "") {
      stil += `#` + sviElementi[i].id + ` {` + napraviCSS(sviElementi[i], true) + `}\n`;
      stil += `#` + sviElementi[i].id + `::after {` + napraviCSSAfter(sviElementi[i]) + `}\n`;
      stil += `#` + sviElementi[i].id + `::before {` + napraviCSSBefore(sviElementi[i]) + `}\n`;
      if (sviElementi[i].tagName !== "LI") {
        element = sviElementi[i];
      }
    }
    else if (sviElementi[i].className !== "") {
      let klasa = sviElementi[i].className.split(" ")[0];
      stil += `.` + klasa + ` {` + napraviCSS(sviElementi[i], true) + `}\n`;
      stil += `.` + klasa + `::after {` + napraviCSSAfter(sviElementi[i]) + `}\n`;
      stil += `.` + klasa + `::before {` + napraviCSSBefore(sviElementi[i]) + `}\n`;
    }
    else {
      let nazivTaga = sviElementi[i].tagName;
      stil += `#` + element.id + ` ` + nazivTaga + ` {` + napraviCSS(sviElementi[i], false) + `}\n`;
      stil += `#` + element.id + ` ` + nazivTaga + `::after {` + napraviCSSAfter(sviElementi[i]) + `}\n`;
      stil += `#` + element.id + ` ` + nazivTaga + `::before {` + napraviCSSBefore(sviElementi[i]) + `}\n`;
    }
    /!*else{
      stil+=`#`+element.id+` `+sviElementi[i].tagName+` {`+napraviCSS(sviElementi[i])+`}\n`;
      stil+=`#`+element.id+` `+sviElementi[i].tagName+`::after {`+napraviCSSAfter(sviElementi[i])+`}\n`;
      stil+=`#`+element.id+` `+sviElementi[i].tagName+`::before {`+napraviCSSBefore(sviElementi[i])+`}\n`;
    }*!/
  }
  fajl += `<style>[data-oznacen="1"]{
    background: #3D5A75 !important;
  }\n`+ stil + `</style>`;
  fajl += document.getElementById("glavni").innerHTML;
  fajl += `</body></html>`;
  //let naziv = document.getElementById("nepotrebniPDF").getAttribute("name");
  download(fajl,  "mockup.html", ".html");

  /!*var fajl=`<!DOCTYPE html><html>`;
  fajl+=`<head></head><body>`;
  fajl+=glavniDio.innerHTML;
  fajl+=`</body></html>`;
  download(fajl,"nekiFajl.html",".html");*!/
}*/

function napraviCSS(element, vazno) {
  let s = '';
  let o = getComputedStyle(element);
  for (let i = 0; i < o.length; i++) {
    if (vazno) {
      s += o[i] + ':' + o.getPropertyValue(o[i]) + ' !important;';
    }
    else
      s += o[i] + ':' + o.getPropertyValue(o[i]) + ';';
  }
  return s;
}

function napraviCSSAfter(element) {
  let s = '';
  let o = getComputedStyle(element, "::after");
  for (let i = 0; i < o.length; i++) {
    s += o[i] + ':' + o.getPropertyValue(o[i]) + ';';
  }
  return s;
}

function napraviCSSBefore(element) {
  let s = '';
  let o = getComputedStyle(element, "::before");
  for (let i = 0; i < o.length; i++) {
    s += o[i] + ':' + o.getPropertyValue(o[i]) + ';';
  }
  return s;
}

/*function otvoriFajl() {
  document.getElementById("glavni").click();
  //document.getElementById("importFajlaInput").click();

  let sviElementi = document.getElementById("glavni").getElementsByTagName("*");
  let noviZ = 1;
  for (let i = 0; i < sviElementi.length; i++) {
    if (parseInt(sviElementi[i].style.zIndex) > noviZ) {
      noviZ = parseInt(sviElementi[i].style.zIndex);
    }
  }
  vrijednostZ = noviZ;
  desniToolbar.style.zIndex = vrijednostZ + 1;

  listaDodijeljenihId = [];
  let sviElementi = document.getElementById("glavni").getElementsByTagName("*");
  for (var i = 0; i < sviElementi.length; i++) {
    if (sviElementi[i].dataset.dodijeljeniid != null && sviElementi[i].dataset.dodijeljeniid !== "") {
      listaDodijeljenihId.push(sviElementi[i].dataset.dodijeljeniid);
    }
  }
}*/

export { download, napraviCSS, napraviCSSBefore, napraviCSSAfter };
