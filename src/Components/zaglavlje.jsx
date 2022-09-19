import React, { Component } from "react";
import { Row, Button, ButtonGroup } from "react-bootstrap";
import { daLiJeDesnoOd, daLiJeIspodOd, daLiJeUnutar, bubbleSort, daLiSePreklapaju, vratiSveOznaceneElemente } from "../dodatneFunkcije.js"
import { download, napraviCSS, napraviCSSBefore, napraviCSSAfter } from "../js/snimanjeFajlova";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import GalenModal from "./galenModal.jsx";
import CanvasSizeModal from "./canvasSizeModal.jsx";

class Zaglavlje extends Component {
    state = {
    }

    constructor(props) {
        super(props);

        this.ocitajSveUdaljenosti = this.ocitajSveUdaljenosti.bind(this);
        this.pozoviFunkciju = this.pozoviFunkciju.bind(this);        
        this.snimiCitavFajl = this.snimiCitavFajl.bind(this);
        this.promjenaNakonUploadFajla = this.promjenaNakonUploadFajla.bind(this);
        this.uploadFajl = this.uploadFajl.bind(this);
        this.snimiKaoPDF = this.snimiKaoPDF.bind(this);
        this.promjenaPrikazaGalenModala = this.promjenaPrikazaGalenModala.bind(this);
        this.razvrstajTestove = this.razvrstajTestove.bind(this);
        this.napisiGalen = this.napisiGalen.bind(this);
        this.promijeniVelicinuCanvasa = this.promijeniVelicinuCanvasa.bind(this);

        this.promjenaSirine = this.promjenaSirine.bind(this);
        this.promjenaVisine = this.promjenaVisine.bind(this);


        //refs
        //dodatne opcije refs
        this.importFajlaInput = React.createRef();


        //this.radioLabelaPrviIzKlaseReferenca = React.createRef();
    }

    state = {
        
        galenModal: null,
        prikaziGalenModal: false,
        galenModalContent: null,
        udaljenostiSvakogElementaXGlobalni: [],
        jedanUnutarDrugogGlobalni: [],
        jedanDesnoOdDvaGlobalni: [],
        jedanLijevoOdDvaGlobalni: [],
        jedanIspodDvaGlobalni: [],
        jedanIznadDvaGlobalni: [],
        udaljenostiOdRoditeljskihIvicaGlobalni: [],
        verzijaEkrana: "desktop",
        canvasSizeModal: null,
        prikaziCanvasSizeModal: false,
        sirinaEkrana: null,
        visinaEkrana: null,
        validnaSirina: false,
        validnaVisina: false
        //izabranaMjernaJedinica: ["px", "px", "px", "px"]

    }

    componentDidMount() {
        
    }

    ocitajSveUdaljenosti() {
        console.log("Ocitaj udaljenosti")
        let div = this.props.data.state.glavniDio.getElementsByTagName('div');
        let udaljenostiSvakogElementaX = [], udaljenostiSvakogElementaY = [];

        let sviElementi = this.props.data.state.glavniDio.getElementsByTagName("*");
        let sveKlase = [];
        for (let i = 0; i < sviElementi.length; i++) {
            if (sviElementi[i].dataset.dodijeljenaklasa !== undefined && sviElementi[i].dataset.dodijeljenaklasa !== "") {
                sveKlase.push(sviElementi[i].dataset.dodijeljenaklasa);
            }
        }

        let skupKlasa = new Set(sveKlase);
        let nizKlasa = Array.from(skupKlasa);
        console.log("Niz klasa " + nizKlasa);

        let brojacTrenutneKlase = [];
        for (let i = 0; i < nizKlasa.length; i++) {
            brojacTrenutneKlase.push(1);
        }

        console.log("Brojac trenutne klase " + brojacTrenutneKlase);

        for (let i = 0; i < div.length; i++) {
            let dodijeliKlasu = "";
            if (div[i].dataset.inicijalniid !== undefined &&
                (div[i].dataset.dodijeljeniid !== "" ||
                    div[i].dataset.dodijeljenaklasa !== "")
            ) {
                let divOffset = this.props.data.offset(div[i]);
                if (div[i].dataset.dodijeljenaklasa !== undefined && div[i].dataset.dodijeljenaklasa !== "") {
                    for (let j = 0; j < nizKlasa.length; j++) {
                        if (div[i].dataset.dodijeljenaklasa === nizKlasa[j]) {
                            dodijeliKlasu = div[i].dataset.dodijeljenaklasa.replace(/\s+/g, '.') + "." + brojacTrenutneKlase[j].toString();
                            brojacTrenutneKlase[j]++;
                        }
                    }
                }
                //vrijednosti su (indeks,x-udaljenost,y-udaljenost,sirina,visina,id,sirinapikseli,visinapikseli,dodijeljeniid,dodijeljenaklasa)
                udaljenostiSvakogElementaX.push([i, divOffset.left, divOffset.top, div[i].offsetWidth, div[i].offsetHeight, div[i].id, div[i].dataset.sirinapikseli, div[i].dataset.visinapikseli, div[i].dataset.dodijeljeniid, dodijeliKlasu]);
                //vrijednosti su (indeks,y-udaljenost,x-udaljenost,sirina,visina,id,sirinapikseli,visinapikseli,dodijeljeniid,dodijeljenaklasa)
                udaljenostiSvakogElementaY.push([i, divOffset.top, divOffset.left, div[i].offsetWidth, div[i].offsetHeight, div[i].id, div[i].dataset.sirinapikseli, div[i].dataset.visinapikseli, div[i].dataset.dodijeljeniid, dodijeliKlasu]);
            }
        }

        udaljenostiSvakogElementaX = bubbleSort(udaljenostiSvakogElementaX);
        udaljenostiSvakogElementaY = bubbleSort(udaljenostiSvakogElementaY);

        let jedanUnutarDrugog = [];
        for (let i = 0; i < udaljenostiSvakogElementaX.length; i++) {
            for (let j = 0; j < udaljenostiSvakogElementaX.length; j++) {
                let unutar = daLiJeUnutar(udaljenostiSvakogElementaX[j], udaljenostiSvakogElementaX[i]);
                if (unutar && i !== j) {
                    let prviElement = null;
                    let drugiElement = null;
                    if (udaljenostiSvakogElementaX[j][8] !== "") {
                        prviElement = "#" + udaljenostiSvakogElementaX[j][8];
                    }
                    else if (udaljenostiSvakogElementaX[j][9] !== "") {
                        prviElement = "." + udaljenostiSvakogElementaX[j][9];
                    }

                    if (udaljenostiSvakogElementaX[i][8] !== "") {
                        drugiElement = "#" + udaljenostiSvakogElementaX[i][8];
                    }
                    else if (udaljenostiSvakogElementaX[i][9] !== "") {
                        drugiElement = "." + udaljenostiSvakogElementaX[i][9];
                    }
                    if (prviElement !== null && drugiElement !== null)
                        jedanUnutarDrugog.push([prviElement, drugiElement]);

                    //jedanUnutarDrugog.push([udaljenostiSvakogElementaX[j][5], udaljenostiSvakogElementaX[i][5]]);
                }
                //console.log("Element " + udaljenostiSvakogElementaX[j][5] + " " + unutar + " element " + udaljenostiSvakogElementaX[i][5]);
            }
        }
        //console.log("Prvi unutar drugog "+jedanUnutarDrugog);
        for (let i = 0; i < jedanUnutarDrugog.length; i++) {
            console.log(jedanUnutarDrugog[i][0] + " je unutar " + jedanUnutarDrugog[i][1] + "\n");
        }

        let jedanDesnoOdDva = [];
        let jedanIspodDva = [];

        for (let i = 0; i < udaljenostiSvakogElementaX.length; i++) {
            for (let j = i + 1; j < udaljenostiSvakogElementaX.length; j++) {
                let desno = daLiJeDesnoOd(udaljenostiSvakogElementaX[i], udaljenostiSvakogElementaX[j], jedanUnutarDrugog);
                if (desno) {
                    //novi kod
                    let prviElement = null;
                    let drugiElement = null;
                    if (udaljenostiSvakogElementaX[j][8] !== "") {
                        prviElement = "#" + udaljenostiSvakogElementaX[j][8];
                    }
                    else if (udaljenostiSvakogElementaX[j][9] !== "") {
                        prviElement = "." + udaljenostiSvakogElementaX[j][9];
                    }

                    if (udaljenostiSvakogElementaX[i][8] !== "") {
                        drugiElement = "#" + udaljenostiSvakogElementaX[i][8];
                    }
                    else if (udaljenostiSvakogElementaX[i][9] !== "") {
                        drugiElement = "." + udaljenostiSvakogElementaX[i][9];
                    }
                    if (prviElement !== null && drugiElement !== null)
                        jedanDesnoOdDva.push([prviElement, drugiElement]);

                    //jedanDesnoOdDva.push([udaljenostiSvakogElementaX[j][5], udaljenostiSvakogElementaX[i][5]]);
                }
                //console.log("U odnosu na element " + udaljenostiSvakogElementaX[i][5] + " " + desno + " element " + udaljenostiSvakogElementaX[j][5]);
            }
        }

        for (let i = 0; i < udaljenostiSvakogElementaY.length; i++) {
            for (let j = i + 1; j < udaljenostiSvakogElementaY.length; j++) {
                let ispod = daLiJeIspodOd(udaljenostiSvakogElementaY[i], udaljenostiSvakogElementaY[j], jedanUnutarDrugog);
                if (ispod) {
                    //novi kod
                    let prviElement = null;
                    let drugiElement = null;
                    if (udaljenostiSvakogElementaY[j][8] !== "") {
                        prviElement = "#" + udaljenostiSvakogElementaY[j][8];
                    }
                    else if (udaljenostiSvakogElementaY[j][9] !== "") {
                        prviElement = "." + udaljenostiSvakogElementaY[j][9];
                    }

                    if (udaljenostiSvakogElementaY[i][8] !== "") {
                        drugiElement = "#" + udaljenostiSvakogElementaY[i][8];
                    }
                    else if (udaljenostiSvakogElementaY[i][9] !== "") {
                        drugiElement = "." + udaljenostiSvakogElementaY[i][9];
                    }
                    if (prviElement !== null && drugiElement !== null)
                        jedanIspodDva.push([prviElement, drugiElement]);

                    //jedanIspodDva.push([udaljenostiSvakogElementaY[j][5], udaljenostiSvakogElementaY[i][5]]);
                }
                //console.log("U odnosu na element " + udaljenostiSvakogElementaY[i][5] + " " + ispod + " element " + udaljenostiSvakogElementaY[j][5]);
            }
        }

        let jedanLijevoOdDva = [];
        let jedanIznadDva = [];
        for (let i = 0; i < jedanDesnoOdDva.length; i++) {
            let prvi = jedanDesnoOdDva[i][0];
            let drugi = jedanDesnoOdDva[i][1];
            jedanLijevoOdDva.push([drugi, prvi]);
        }
        for (let i = 0; i < jedanIspodDva.length; i++) {
            let prvi = jedanIspodDva[i][0];
            let drugi = jedanIspodDva[i][1];
            jedanIznadDva.push([drugi, prvi]);
        }

        console.log("Prvi desno od drugog " + jedanDesnoOdDva);
        console.log("Prvi lijevo od drugog " + jedanLijevoOdDva);
        console.log("Prvi ispod drugog " + jedanIspodDva);
        console.log("Prvi iznad drugog " + jedanIznadDva);

        let udaljenostiOdRoditeljskihIvica = [];

        for (let i = 0; i < sviElementi.length; i++) {
            if (sviElementi[i].parentElement !== undefined && sviElementi[i].parentElement !== null &&
                (sviElementi[i].dataset.dodijeljeniid !== undefined || sviElementi[i].dataset.dodijeljenaklasa !== undefined) &&
                (sviElementi[i].dataset.dodijeljeniid !== "" || sviElementi[i].dataset.dodijeljenaklasa !== "")) {
                let roditeljMuJe = sviElementi[i].parentElement.dataset.dodijeljeniid !== undefined &&
                    sviElementi[i].parentElement.dataset.dodijeljeniid !== "" ? sviElementi[i].parentElement : this.props.data.state.glavniDio;
                let dijeteOffset = this.props.data.offset(sviElementi[i]);
                let roditeljOffset = this.props.data.offset(roditeljMuJe);
                udaljenostiOdRoditeljskihIvica.push({
                    "id": sviElementi[i].dataset.dodijeljeniid,
                    "klasa": sviElementi[i].dataset.dodijeljenaklasa,
                    "roditelj": sviElementi[i].parentElement.dataset.dodijeljeniid !== undefined &&
                                sviElementi[i].parentElement.dataset.dodijeljeniid !== "" && sviElementi[i].parentElement.id !== "glavni" ? sviElementi[i].parentElement.dataset.dodijeljeniid : "body",
                    //"lijevo": ((dijeteOffset.left - roditeljOffset.left) / roditeljMuJe.offsetWidth * 100).toFixed(0),
                    "lijevo": dijeteOffset.left - roditeljOffset.left,
                    "desno": (roditeljOffset.left + roditeljMuJe.offsetWidth) - (dijeteOffset.left + sviElementi[i].offsetWidth),
                    //"gore": ((dijeteOffset.top - roditeljOffset.top) / roditeljMuJe.offsetHeight * 100).toFixed(0),
                    "gore": dijeteOffset.top - roditeljOffset.top,
                    "dolje": (roditeljOffset.top + roditeljMuJe.offsetHeight) - (dijeteOffset.top + sviElementi[i].offsetHeight)
                })
            }
        }

        console.log("Udaljenosti od ivica roditeljskih elemenata: ", udaljenostiOdRoditeljskihIvica);
        
        this.pozoviFunkciju(jedanUnutarDrugog);
        this.razvrstajTestove(udaljenostiSvakogElementaX, jedanUnutarDrugog, jedanDesnoOdDva, jedanLijevoOdDva, jedanIspodDva, jedanIznadDva, udaljenostiOdRoditeljskihIvica);
    }

    pozoviFunkciju(unutarDrugog) {
        this.props.data.state.nizJedanUnutarDrugog = unutarDrugog;
    }

    razvrstajTestove(udaljenostiSvakogElementaX, jedanUnutarDrugog, jedanDesnoOdDva, jedanLijevoOdDva, jedanIspodDva, jedanIznadDva, udaljenostiOdRoditeljskihIvica) {
        let sviCheckboxovi = "";

        if (udaljenostiSvakogElementaX.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; text-decoration: underline;">Width</p>`;

        udaljenostiSvakogElementaX.forEach(element => {
            if (element[8] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>#` + element[8] + `<br>`;
            else if (element[9] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>.` + element[9] + `<br>`;
        });

        if (udaljenostiSvakogElementaX.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Height</p>`;

        udaljenostiSvakogElementaX.forEach(element => {
            if (element[8] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>#` + element[8] + `<br>`;
            else if (element[9] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>.` + element[9] + `<br>`;

        });

        if (jedanUnutarDrugog.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Inside</p>`;

        jedanUnutarDrugog.forEach(element => {
            sviCheckboxovi += `<input type="checkbox" checked>` + element[0] + ` <b>inside</b> ` + element[1] + `<br>`;
        });


        if (jedanLijevoOdDva.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Left</p>`;

        jedanLijevoOdDva.forEach(element => {
            sviCheckboxovi += `<input type="checkbox" checked>` + element[0] + ` <b>left of</b> ` + element[1] + `<br>`;
        });


        if (jedanDesnoOdDva.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Right</p>`;

        jedanDesnoOdDva.forEach(element => {
            sviCheckboxovi += `<input type="checkbox" checked>` + element[0] + ` <b>right of</b> ` + element[1] + `<br>`;
        });

        if (jedanIznadDva.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Above</p>`;

        jedanIznadDva.forEach(element => {
            sviCheckboxovi += `<input type="checkbox" checked>` + element[0] + ` <b>above</b> ` + element[1] + `<br>`;
        });

        if (jedanIspodDva.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Below</p>`;

        jedanIspodDva.forEach(element => {
            sviCheckboxovi += `<input type="checkbox" checked>` + element[0] + ` <b>below</b> ` + element[1] + `<br>`;
        });

        if (udaljenostiSvakogElementaX.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Visible</p>`;

        udaljenostiSvakogElementaX.forEach(element => {
            if (element[8] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>#` + element[8] + `<br>`;
            else if (element[9] !== "")
                sviCheckboxovi += `<input type="checkbox" checked>.` + element[9] + `<br>`;
        });

        //udaljenosti od roditeljskih ivica
        if (udaljenostiOdRoditeljskihIvica.length)
            sviCheckboxovi += `<p style="font-weight: bold; color: black; padding-top: 1rem; text-decoration: underline;">Inside partly</p>`;

        udaljenostiOdRoditeljskihIvica.forEach(element => {
            if (element.id !== "")
                sviCheckboxovi += `<input type="checkbox" checked>#` + element.id + ` <b>inside partly</b> #` + element.roditelj + `<br>`;
            else if (element.klasa !== "")
                sviCheckboxovi += `<input type="checkbox" checked>.` + element.klasa + ` <b>inside partly</b> #` + element.roditelj + `<br>`;
        });

        this.setState({
            galenModalContent: { __html: sviCheckboxovi }
        });
        this.setState({
            udaljenostiSvakogElementaXGlobalni: udaljenostiSvakogElementaX
        });
        this.setState({
            jedanUnutarDrugogGlobalni: jedanUnutarDrugog
        });
        this.setState({
            jedanDesnoOdDvaGlobalni: jedanDesnoOdDva
        });
        this.setState({
            jedanLijevoOdDvaGlobalni: jedanLijevoOdDva
        });
        this.setState({
            jedanIspodDvaGlobalni: jedanIspodDva
        });
        this.setState({
            jedanIznadDvaGlobalni: jedanIznadDva
        });

        this.setState({
            udaljenostiOdRoditeljskihIvicaGlobalni: udaljenostiOdRoditeljskihIvica
        });

    }

    napisiGalen() {
        let izuzeci = [];
        let sviCheckboxovi = this.state.galenModal.dialog.getElementsByClassName('sadrzajModala')[0].getElementsByTagName('input');

        let checkboxovi = [];
        for (let i = 0; i < sviCheckboxovi.length; i++) {
            checkboxovi.push(sviCheckboxovi[i]);
        }

        checkboxovi.forEach((checkbox, index) => {
            if (!checkbox.checked)
                izuzeci.push(index);
        });

        let ukupniBrojac = 0;
        let galen = "";
        let objekti = "@objects\n\tbody body\n";
        this.state.udaljenostiSvakogElementaXGlobalni.forEach(element => {
            if (element[8] !== "") {
                objekti += "\t" + element[8] + " #" + element[8] + "\n";
            }
            else if (element[9] !== "") {
                let razdvoji = element[9].split(".");
                let broj = razdvoji[razdvoji.length - 1];
                let ostatak = "";

                razdvoji.forEach((element1, index1) => {
                    ostatak += element1;
                    if (index1 !== (razdvoji.length - 2)) {
                        ostatak += " ";
                    }
                });

                objekti += "\t" + element[9] + " xpath //!*[@class=\'" + ostatak + "\'][" + broj + "]\n";
            }
        });

        let ispisi = true;
        let sekcije = "";
        let sekcijaSirine = "\n= Width section =\n";
        this.state.udaljenostiSvakogElementaXGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi) {
                if (element[6] === "true") {
                    if (element[8] !== "") {
                        sekcijaSirine += "\t" + element[8] + ":\n\t\twidth ~" + element[3] + "px\n";
                    }
                    else if (element[9] !== "") {
                        sekcijaSirine += "\t" + element[9] + ":\n\t\twidth ~" + element[3] + "px\n";
                    }

                }
                else if (element[6] === "false") {
                    let parent = document.getElementById(element[5]).offsetParent || document.getElementById(element[5]);
                    if (element[8] !== "") {
                        sekcijaSirine += "\t" + element[8] + ":\n\t\twidth " + (((element[3] / parent.offsetWidth) * 100 - 1).toFixed(0)) + " to " + (((element[3] / parent.offsetWidth) * 100 + 1).toFixed(0)) + " % of body/width\n";
                    }
                    else if (element[9] !== "") {
                        sekcijaSirine += "\t" + element[9] + ":\n\t\twidth " + (((element[3] / parent.offsetWidth) * 100 - 1).toFixed(0)) + " to " + (((element[3] / parent.offsetWidth) * 100 + 1).toFixed(0)) + " % of body/width\n";
                    }
                }
            }
            ukupniBrojac++;
        });

        sekcije += sekcijaSirine;

        let sekcijaVisine = "= Height section =\n";
        this.state.udaljenostiSvakogElementaXGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi) {
                if (element[7] === "true") {
                    if (element[8] !== "") {
                        sekcijaVisine += "\t" + element[8] + ":\n\t\theight ~" + element[4] + "px\n";
                    }
                    else if (element[9] !== "") {
                        sekcijaVisine += "\t" + element[9] + ":\n\t\theight ~" + element[4] + "px\n";
                    }
                }
                else if (element[7] === "false") {
                    let parent = document.getElementById(element[5]).offsetParent || document.getElementById(element[5]);
                    if (element[8] !== "") {
                        sekcijaVisine += "\t" + element[8] + ":\n\t\theight " + (((element[4] / parent.offsetHeight) * 100 - 1).toFixed(0)) + " to " + (((element[4] / parent.offsetHeight) * 100 + 1).toFixed(0)) + " % of body/height\n";
                    }
                    else if (element[9] !== "") {
                        sekcijaVisine += "\t" + element[9] + ":\n\t\theight " + (((element[4] / parent.offsetHeight) * 100 - 1).toFixed(0)) + " to " + (((element[4] / parent.offsetHeight) * 100 + 1).toFixed(0)) + " % of body/height\n";
                    }
                }
            }

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaVisine;

        let sekcijaUnutar = "= Inside section =\n";
        this.state.jedanUnutarDrugogGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi)
                sekcijaUnutar += "\t" + element[0].substring(1) + ":\n\t\tinside " + element[1].substring(1) + "\n";

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaUnutar;

        let sekcijaLijevo = "= Left of section =\n";
        this.state.jedanLijevoOdDvaGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi)
                sekcijaLijevo += "\t" + element[0].substring(1) + ":\n\t\tleft-of " + element[1].substring(1) + "\n";

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaLijevo;

        let sekcijaDesno = "= Right of section =\n";
        this.state.jedanDesnoOdDvaGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi)
                sekcijaDesno += "\t" + element[0].substring(1) + ":\n\t\tright-of " + element[1].substring(1) + "\n";

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaDesno;

        let sekcijaIznad = "= Above section =\n";
        this.state.jedanIznadDvaGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi)
                sekcijaIznad += "\t" + element[0].substring(1) + ":\n\t\tabove " + element[1].substring(1) + "\n";

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaIznad;

        let sekcijaIspod = "= Below section =\n";
        this.state.jedanIspodDvaGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi)
                sekcijaIspod += "\t" + element[0].substring(1) + ":\n\t\tbelow " + element[1].substring(1) + "\n";

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaIspod;

        let sekcijaVisible = "= Visible section =\n";
        this.state.udaljenostiSvakogElementaXGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi) {
                if (element[8] !== "") {
                    sekcijaVisible += "\t" + element[8] + ":\n\t\tvisible\n";
                }
                else if (element[9] !== "") {
                    sekcijaVisible += "\t" + element[9] + ":\n\t\tvisible\n";
                }
            }

            ukupniBrojac++;
        });

        sekcije += sekcijaVisible;


        let sekcijaUnutarPartly = "= Inside partly section =\n";
        this.state.udaljenostiOdRoditeljskihIvicaGlobalni.forEach(element => {
            ispisi = true;
            izuzeci.forEach(izuzetak => {
                if (izuzetak === ukupniBrojac) {
                    ispisi = false;
                }
            });
            if (ispisi) {
                sekcijaUnutarPartly += "\t" + element.id + ":\n\t\tinside partly " + element.roditelj + " ~" + Math.round(element.lijevo) + "px left, ~" + Math.round(element.gore) + "px top\n";
            }

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaUnutarPartly;

        galen = objekti + sekcije;
        console.log(galen);

        download(galen, 'galenTests.gspec', "txt");

        

    }

    snimiCitavFajl() {
        let fajl = `<!DOCTYPE html><html><head></head><meta charset="utf-8"><body>`;
        let sviElementi = this.props.data.state.glavniDio.getElementsByTagName("*");
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
        }
        fajl += `<style>[data-oznacen="1"]{
                    background: #3D5A75 !important;
                 }\n`+ stil + `</style>`;
        fajl += this.props.data.state.glavniDio.innerHTML;
        fajl += `</body></html>`;

        download(fajl, "mockup.html", ".html");
    }

    uploadFajl(event, callback) {
        let file = event.target.files[0];
        let reader = new FileReader();

        reader.onload = function (e) {
            let content = reader.result;
            let prviDio = content.split("</style>")[1];
            let procitaniFajl = prviDio.split("</body>")[0];

            callback(procitaniFajl);
        }

        reader.readAsText(file);
    }

    promjenaNakonUploadFajla(procitaniFajl) {
        this.props.data.state.glavniDio.innerHTML = procitaniFajl;

        let sviElementi = this.props.data.state.glavniDio.getElementsByTagName("*");
        let sviZIndexi = [];
        let noviBrojacDivova = [];

        this.props.data.state.listaDodijeljenihId = [];
        for (let i = 0; i < sviElementi.length; i++) {
            let id = sviElementi[i].dataset.dodijeljeniid;

            if (id != null && id !== "") {
                sviZIndexi.push(parseInt(sviElementi[i].style.zIndex));
                noviBrojacDivova.push(parseInt(id.substring(3, id.length)));
                this.props.data.promjenaListeDodijeljenihId(this.props.data.state.listaDodijeljenihId, id);
            }
        }

        if (!noviBrojacDivova.length)
            noviBrojacDivova = [-1];
        if (!sviZIndexi.length)
            sviZIndexi = [1];

        this.props.data.promjenaVrijednostiBrojacaDivova(Math.max(...noviBrojacDivova) + 1);
        this.props.data.promjenaVrijednostiZIndexa(Math.max(...sviZIndexi));
    }

    snimiKaoPDF(quality = 1) {
        let filename = 'mockup.pdf';
        let verzijaEkrana = this.state.verzijaEkrana;

        html2canvas(this.props.data.state.glavniDio, { scale: quality }).then(function (canvas) {
            let pdf = new jsPDF('landscape');
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();

            if (verzijaEkrana === 'desktop')
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
            else
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);

            pdf.save(filename);
        });
    }

    promjenaPrikazaGalenModala(novaVrijednost) {
        if (novaVrijednost)
            this.ocitajSveUdaljenosti();

        this.setState({
            prikaziGalenModal: novaVrijednost
        });
    }

    promjenaPrikazaCanvasSizeModala(novaVrijednost) {
        this.setState({
            prikaziCanvasSizeModal: novaVrijednost
        });
    }

    promijeniVelicinuCanvasa(width, height) {
        let validnostSirine = true;
        let validnostVisine = true;

        if(width===undefined || width===null || width<=0 || width>100){
            validnostSirine = false;
        }

        if(height===undefined || height===null || height<=0 || height>100){
            validnostVisine = false;
        }

        let verzija = this.state.verzija;
        let prikaziCanvas = this.state.prikaziCanvasSizeModal;
        
        if(validnostSirine && validnostVisine){

            let el = this.props.data.state.glavniDio;

            el.style.height = height + "%";
            el.style.width = width + "%"
            el.style.cssFloat = "left"
            el.style.overflow = "hidden";
            el.style.border = "thick solid #E8E8E8";
            el.style.borderRadius = 50 + "px";

            

            if(width<=25){
                verzija = 'mobile';
            }

            else if(width>25 && width<=50){
                verzija = 'tablet';
            }

            else{
                verzija = 'desktop';
            }

            prikaziCanvas = false;
        }

        this.setState({
            validnaSirina: validnostSirine,
            validnaVisina: validnostVisine,
            verzijaEkrana: verzija,
            prikaziCanvasSizeModal: prikaziCanvas
        })
    }

    promjenaSirine(number){
        this.setState({sirina:number})
    }

    promjenaVisine(number){
        this.setState({visina:number})
    }

    render() {
        return(
            <>
                <h2 style={{textAlign: "Center", backgroundColor: "#2c3e50", color: "white", marginBottom: "0px", padding:"10px", paddingBottom:"20px"}}>Mockup Tool</h2>
                <hr style={{margin: "0px", backgroundColor:"white"}}></hr>
                <Row style={{ }}>
                    <ButtonGroup>
                        {/*<Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="ocitavanjeUdaljenosti"
                            onClick={(e) => { this.ocitajSveUdaljenosti() }}
                            title="Read the distance"
                        >
                            <i className="bi bi-file-earmark-text"></i>
        </Button>*/}
                        <Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="promjenaVelicineEkrana"
                            onClick={(e) => { this.promjenaPrikazaCanvasSizeModala(true) }}
                            title="Change canvas size"
                            >
                                <i class="bi bi-aspect-ratio"></i>
                        </Button>
                        <Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="snimanjeFajlaDugme"
                            onClick={(e) => { this.snimiCitavFajl() }}
                            title="Save File"
                        >
                            <i className="bi bi-file-earmark-arrow-down"></i>
                        </Button>
                        <Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="snimanjeFajlaKaoPDF"
                            title="Save as PDF"
                            onClick={(e) => { this.snimiKaoPDF() }}
                        >
                            <i className="bi bi-file-earmark-pdf"></i>
                        </Button>
                        <Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="otvoriModalDugme"
                            title="Choose test"
                            disabled={!this.props.data.state.glavniDio}
                            onClick={() => { this.promjenaPrikazaGalenModala(true) }}
                        >
                            <i className="bi bi-file-earmark-code"></i>
                        </Button>
                        <Button variant="secondary" style={{backgroundColor:"#2c3e50"}}
                            id="importFajlaDugme"
                            title="Open"
                            onClick={() => { this.importFajlaInput.current.click() }}
                        >
                            <input
                                type="file"
                                id="importFajlaInput"
                                ref={this.importFajlaInput}
                                onChange={(e) => { this.uploadFajl(e, this.promjenaNakonUploadFajla) }}
                                accept="text/html"
                                style={{ display: "none" }}
                            />
                            <i className="bi bi-file-earmark-arrow-up"></i>
                        </Button>
                    </ButtonGroup>
                </Row>
                <hr style={{margin: "0px", backgroundColor:"white"}}></hr>
                <GalenModal data={this} />

                <CanvasSizeModal data={this}/>
            </>
        );
    }
}

export default Zaglavlje;