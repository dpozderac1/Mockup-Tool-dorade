//funkcija za odredjivanje da li je element2 desno od element1
function daLiJeDesnoOd(element1, element2, jedanUnutarDrugog) {
    if (element1[2] <= (element2[2] + element2[4]) && (element2[2]) <= (element1[2] + element1[4]) && !pretraziDaLiSuJedanUnutarDrugog(element1[5], element2[5], jedanUnutarDrugog) && element2[1] >= (element1[1] + element1[3])) {
        return true;
    }
    return false;
}

//funkcija za odredjivanje da li je element2 ispod od element1
function daLiJeIspodOd(element1, element2, jedanUnutarDrugog) {
    if (element1[2] <= (element2[2] + element2[3]) && (element2[2]) <= (element1[2] + element1[3]) && !pretraziDaLiSuJedanUnutarDrugog(element1[5], element2[5], jedanUnutarDrugog) && element2[1] >= (element1[1] + element1[4])) {
        return true;
    }
    return false;
}

//funkcija za odredjivanje da li je element2 unutar element1
function daLiJeUnutar(element1, element2) {
    if (element1[1] >= element2[1] && (element1[1] + element1[3]) <= (element2[1] + element2[3]) && element1[2] >= element2[2] && (element1[2] + element1[4]) <= (element2[2] + element2[4])) {
        return true;
    }
    return false;
}

//funkcija koja poredi date elemente sa nizom elemenata koji su jedan unutar drugog
function pretraziDaLiSuJedanUnutarDrugog(element1Id, element2Id, jedanUnutarDrugog) {
    for (var i = 0; i < jedanUnutarDrugog.length; i++) {
        if ((jedanUnutarDrugog[i][0] === element1Id && jedanUnutarDrugog[i][1] === element2Id) || (jedanUnutarDrugog[i][0] === element2Id && jedanUnutarDrugog[i][1] === element1Id)) {
            return true;
        }
    }
    return false;
}

function bubbleSort(list) {
    let swapped = false;
    let n = list.length - 1;
    do {
        swapped = false;
        for (let i = 0; i < n; i++) {
            // compare pairs of elements
            // if left element > right element, swap
            if (list[i][1] > list[i + 1][1]) {
                const temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
                swapped = true;
            }
        }
    }
    // continue swapping until sorted
    while (swapped);

    return list;
}

function daLiMuJeRoditeljDiv(dijete) {
    let node = dijete.parentNode;
    while (node !== null) {
        //console.log("OKURRRRRRRRRRRRRRRR\t\t" + node.id.substring(0, 3));
        if (node.id === "glavni") {
            return null;
        }
        else if (node.dataset.inicijalniid !== undefined && node.dataset.inicijalniid.substring(0, 3) === "div") {
            return node.id;
        }
        node = node.parentNode;
    }
    return null;
}

//funkcija koja provjerava da li se dva elementa preklapaju
function daLiSePreklapaju(element1, element2) {
    return !(element1.right < element2.left || 
        element1.left > element2.right || 
        element1.bottom < element2.top || 
        element1.top > element2.bottom);
}

//funkcija koja određuje offset elementa
function offset(el) {
    let rect = el.getBoundingClientRect(),
        f = document.getElementById('glavni').getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop - f.top, left: rect.left + scrollLeft - f.left }
}

//funkcija koja vraća sve označene elemente
function vratiSveOznaceneElemente() {
    let oznacenaDjeca = [];
    let sviElementi = document.getElementById('glavni').children;

    for (let i = 0; i < sviElementi.length; i++) {
        if (sviElementi[i].style.webkitBoxShadow === "rgb(32, 201, 151) 0px 0px 0px 2px") {
            oznacenaDjeca.push(sviElementi[i]);
        }
    }

    return oznacenaDjeca;
}

export {
    daLiJeDesnoOd,
    daLiJeIspodOd,
    daLiJeUnutar,
    pretraziDaLiSuJedanUnutarDrugog,
    bubbleSort,
    daLiMuJeRoditeljDiv,
    daLiSePreklapaju,
    offset,
    vratiSveOznaceneElemente
}