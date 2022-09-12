function kreirajNovuTabelu(trenutnoOznaceniElement, noviBrojRedova, noviBrojKolona) {
    if (noviBrojRedova === "" || noviBrojKolona === "") {
        alert("Field cannot be empty!");
    } else if (parseInt(noviBrojRedova) < 1 || parseInt(noviBrojKolona) < 1 || parseInt(noviBrojRedova) > 20 || parseInt(noviBrojKolona) > 20) {
        alert("Only numbers between [1,20] are allowed for this field!");
    } else {
        trenutnoOznaceniElement.getElementsByTagName("table")[0].remove();
        let redoviKolone = "";
        for (let i = 0; i < noviBrojRedova; i++) {
            if (i === 0) {
                redoviKolone += `<thead>`;
            } else if (i === 1) {
                redoviKolone += `<tbody>`;
            }
            redoviKolone += `<tr>`;
            for (let j = 0; j < noviBrojKolona; j++) {
                if (i === 0) {
                    let broj = j + 1;
                    redoviKolone += `<th class="prviRedTabeleKlasa">Header ` + broj + `</th>`;
                } else {
                    let broj = (i - 1) * noviBrojKolona + j + 1;
                    redoviKolone += `<td>Cell ` + broj + `</td>`
                }
            }
            redoviKolone += `</tr>`;
            if (i === 0) {
                redoviKolone += `</thead>`;
            } else if (i === noviBrojRedova - 1) {
                redoviKolone += `</tbody>`;
            }
        }
        trenutnoOznaceniElement.innerHTML = `<table class="tabelaElementKlasa" onclick="this.contentEditable=false;" ondblclick="this.contentEditable=true;this.focus();" contentEditable="false" style="pointer-events: auto;">` + redoviKolone + `</table>`;
    }
}

function kreirajNovuListuTabova(trenutnoOznaceniElement, noviBrojTabova, noviBrojTrenutnoOznacenogTaba) {
    if (noviBrojTabova === "" || noviBrojTrenutnoOznacenogTaba === "") {
        alert("Field cannot be empty!");
    } else if (parseInt(noviBrojTabova) < 1 || parseInt(noviBrojTabova) > 20) {
        alert("Only numbers between [1,20] are allowed for this field!");
    } else if (parseInt(noviBrojTrenutnoOznacenogTaba) < 1 || parseInt(noviBrojTrenutnoOznacenogTaba) > parseInt(noviBrojTabova)) {
        alert("Number must be in range between 1 and number inserted into \"Number of tabs\" field!")
    } else {
        let listaTabova = trenutnoOznaceniElement.getElementsByTagName("ul")[0];
        let izgledListe = "";
        if (listaTabova != null) {
            listaTabova.remove();
            izgledListe += `<ul class="nav nav-tabs" style="flex-wrap: nowrap; pointer-events: none;">`;
            for (var i = 0; i < noviBrojTabova; i++) {
                if (i === noviBrojTrenutnoOznacenogTaba - 1) {
                    izgledListe += `<li class="nav-item"><a class="active tabElement nav-link">Tab` + (i + 1) + `</a></li>`;
                } else {
                    izgledListe += `<li class="nav-item"><a class="tabElement nav-link">Tab` + (i + 1) + `</a></li>`;
                }
            }
            izgledListe += `</ul>`;

            trenutnoOznaceniElement.innerHTML = izgledListe;
        }
    }
}

function kreirajNovuListuRadioDugmadi(trenutnoOznaceniElement, noviBrojRadioDugmadi, noviBrojTrenutnoOznacenogRadioDugmeta) {
    if (noviBrojRadioDugmadi === "" || noviBrojTrenutnoOznacenogRadioDugmeta === "") {
        alert("Field cannot be empty!");
    } else if (parseInt(noviBrojRadioDugmadi) < 1 || parseInt(noviBrojRadioDugmadi) > 20) {
        alert("Only numbers between [1,20] are allowed for this field!");
    } else if (parseInt(noviBrojTrenutnoOznacenogRadioDugmeta) < 1 || parseInt(noviBrojTrenutnoOznacenogRadioDugmeta) > parseInt(noviBrojRadioDugmadi)) {
        alert("Number must be in range between 1 and number inserted into \"Number of options in radio button\" field!")
    } else {
        let listaRadioDugmadi = trenutnoOznaceniElement.getElementsByTagName("ul")[0];
        let izgledRadioDugmeta = "";
        if (listaRadioDugmadi != null) {
            listaRadioDugmadi.remove();
            izgledRadioDugmeta += `<ul class="radioButtonListaKlasa">`;
            for (let i = 0; i < noviBrojRadioDugmadi; i++) {
                if (i === noviBrojTrenutnoOznacenogRadioDugmeta - 1) {
                    izgledRadioDugmeta += `<li class=\"oznacena\">option` + (i + 1) + `</li>`;
                } else {
                    izgledRadioDugmeta += `<li class=\"neoznacena\">option` + (i + 1) + `</li>`;
                }
            }
            izgledRadioDugmeta += `</ul>`;
            trenutnoOznaceniElement.innerHTML = izgledRadioDugmeta;
        }
    }
}

function kreirajNovuListuCheckboxova(trenutnoOznaceniElement, noviBrojCheckboxova, noviBrojTrenutnoOznacenogCheckboxa, noviBrojTrenutnoOdselektovanogCheckboxa, listaOznacenih) {
    if (noviBrojCheckboxova === "") {
        alert("Field cannot be empty!");
    } else if (parseInt(noviBrojCheckboxova) < 1 || parseInt(noviBrojCheckboxova) > 20) {
        alert("Only numbers between [1,20] are allowed for this field!");
    } else if (noviBrojTrenutnoOznacenogCheckboxa && (parseInt(noviBrojTrenutnoOznacenogCheckboxa) < 1 || parseInt(noviBrojTrenutnoOznacenogCheckboxa) > parseInt(noviBrojCheckboxova))) {
        alert("Number must be in range between 1 and number inserted into \"Number of options in checkbox\" field!")
    } else if (noviBrojTrenutnoOdselektovanogCheckboxa && (parseInt(noviBrojTrenutnoOdselektovanogCheckboxa) < 1 || parseInt(noviBrojTrenutnoOdselektovanogCheckboxa) > parseInt(noviBrojCheckboxova))) {
        alert("Number must be in range between 1 and number inserted into \"Number of options in checkbox\" field!")
    } else {
        let oznaceniCHCH = [];
        for (let s = 0; s < noviBrojCheckboxova; s++) {
            oznaceniCHCH.push(0);
        }

        listaOznacenih.forEach(element1 => {
            oznaceniCHCH[element1 - 1] = 1;
        });

        let listaCheckboxova = trenutnoOznaceniElement.getElementsByTagName("ul")[0];
        let izgledCheckboxa = "";
        if (listaCheckboxova != null) {
            listaCheckboxova.remove();
            izgledCheckboxa += `<ul class="checkboxListaKlasa">`;
            for (let i = 0; i < noviBrojCheckboxova; i++) {
                if (oznaceniCHCH[i] === 1) {
                    izgledCheckboxa += `<li class=\"checkboxOznacena\">option` + (i + 1) + `</li>`;
                } else {
                    izgledCheckboxa += `<li class=\"checkboxNeoznacena\">option` + (i + 1) + `</li>`;
                }
            }
            izgledCheckboxa += `</ul>`;
            trenutnoOznaceniElement.innerHTML = izgledCheckboxa;
        }
    }
}

function kreirajNovuVertikalnuListu(trenutnoOznaceniElement, noviBrojElemenataVertikalneListe) {
    if (noviBrojElemenataVertikalneListe === "") {
        alert("Field cannot be empty!");
    } else {
        let listaElemenataVertikalno = trenutnoOznaceniElement.getElementsByTagName("ul")[0];
        let izgledVertikalneListe = "";
        if (listaElemenataVertikalno != null) {
            listaElemenataVertikalno.remove();
            izgledVertikalneListe += `<div id="unutarListe"><ul class="verticalListKlasa">`;
            for (let i = 0; i < noviBrojElemenataVertikalneListe; i++) {
                izgledVertikalneListe += `<li class=\"elementListeV\">List element ` + (i + 1) + `</li>`;
            }
            izgledVertikalneListe += `</ul></div>`;
            trenutnoOznaceniElement.innerHTML = izgledVertikalneListe;
        }
    }
}

function kreirajNovuHorizontalnuListu(trenutnoOznaceniElement, noviBrojElemenataHorizontalneListe) {
    if (noviBrojElemenataHorizontalneListe === "") {
        alert("Field cannot be empty!");
    } else {
        let listaElemenataHorizontalno = trenutnoOznaceniElement.getElementsByTagName("ul")[0];
        let izgledHorizontalneListe = "";

        if (listaElemenataHorizontalno != null) {
            listaElemenataHorizontalno.remove();
            izgledHorizontalneListe += `<div id="unutarHorizontalneListe"><ul class="horizontalListKlasa">`;

            for (let i = 0; i < noviBrojElemenataHorizontalneListe; i++) {
                izgledHorizontalneListe += `<li class=\"elementListeH\">List element ` + (i + 1) + `</li>`;
            }

            izgledHorizontalneListe += `</ul></div>`;

            trenutnoOznaceniElement.innerHTML = izgledHorizontalneListe;
        }
    }
}

export {
    kreirajNovuTabelu,
    kreirajNovuListuTabova,
    kreirajNovuListuRadioDugmadi,
    kreirajNovuListuCheckboxova,
    kreirajNovuVertikalnuListu,
    kreirajNovuHorizontalnuListu
}