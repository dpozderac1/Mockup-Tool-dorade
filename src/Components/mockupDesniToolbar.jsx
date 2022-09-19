import React, { Component } from 'react';
import {
    Row, Col, Button, ButtonGroup, Label, InputGroupButtonDropdown, DropdownToggle,
    DropdownItem, DropdownMenu
} from "reactstrap";
import { daLiJeDesnoOd, daLiJeIspodOd, daLiJeUnutar, bubbleSort, daLiSePreklapaju, vratiSveOznaceneElemente } from "../dodatneFunkcije.js"
import { download, napraviCSS, napraviCSSBefore, napraviCSSAfter } from "../js/snimanjeFajlova";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FormControl, InputGroup, FormLabel, Container, DropdownButton, Dropdown, FormCheck } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import GalenModal from "./galenModal";

class MockupDesniToolbar extends Component {
    constructor(props) {
        super(props);

        //funkcije
        this.promijeniOznacenuPoziciju = this.promijeniOznacenuPoziciju.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
        this.promijeniMjernuJedinicu = this.promijeniMjernuJedinicu.bind(this);
        this.promijeniSirinuElementaIzInputa = this.promijeniSirinuElementaIzInputa.bind(this);
        this.promijeniVisinuElementaIzInputa = this.promijeniVisinuElementaIzInputa.bind(this);
        this.poravnajLijevo = this.poravnajLijevo.bind(this);
        this.centriraj = this.centriraj.bind(this);
        this.poravnajDesno = this.poravnajDesno.bind(this);
        this.justify = this.justify.bind(this);
        this.obrisiElement = this.obrisiElement.bind(this);
        this.staviIspred = this.staviIspred.bind(this);
        this.staviIza = this.staviIza.bind(this);
        this.vratiPosljednjeObrisaniElement = this.vratiPosljednjeObrisaniElement.bind(this);
        this.ocitajSveUdaljenosti = this.ocitajSveUdaljenosti.bind(this);
        this.pozoviFunkciju = this.pozoviFunkciju.bind(this);
        this.promijeniFontElementaIzInputa = this.promijeniFontElementaIzInputa.bind(this);
        this.vratiSveZIndexe = this.vratiSveZIndexe.bind(this);
        this.grupisiElemente = this.grupisiElemente.bind(this);
        this.snimiCitavFajl = this.snimiCitavFajl.bind(this);
        this.promjenaNakonUploadFajla = this.promjenaNakonUploadFajla.bind(this);
        this.uploadFajl = this.uploadFajl.bind(this);
        this.snimiKaoPDF = this.snimiKaoPDF.bind(this);
        this.mobilnaVerzija = this.mobilnaVerzija.bind(this);
        this.tabletVerzija = this.tabletVerzija.bind(this);
        this.desktopVerzija = this.desktopVerzija.bind(this);
        this.promjenaPrikazaGalenModala = this.promjenaPrikazaGalenModala.bind(this);
        this.razvrstajTestove = this.razvrstajTestove.bind(this);
        this.napisiGalen = this.napisiGalen.bind(this);
        this.promijeniVrijednostSirine = this.promijeniVrijednostSirine.bind(this);
        this.promijeniVrijednostVisine = this.promijeniVrijednostVisine.bind(this);



        //refs
        this.nazivOdabranogPredmetaReferenca = React.createRef();
        this.unosIdTrenutnogElementaReferenca = React.createRef();
        this.unosKlaseTrenutnogElementaReferenca = React.createRef();
        this.deleteDugmeReferenca = React.createRef();
        this.undoDugmeReferenca = React.createRef();
        this.bringToFrontDugmeReferenca = React.createRef();
        this.sendToBackDugmeReferenca = React.createRef();
        this.groupDugmeReferenca = React.createRef();
        this.fontElementaReferenca = React.createRef();

        this.poravnajLijevoDugme = React.createRef();
        this.centrirajDugme = React.createRef();
        this.poravnajDesnoDugme = React.createRef();
        this.justifyDugme = React.createRef();

        //top i left
        this.topUdaljenostReferenca = React.createRef();
        this.leftUdaljenostReferenca = React.createRef();

        //parent
        this.sekcijaOdnosSaRoditeljomReferenca = React.createRef();
        this.roditeljTrenutnogElementaReferenca = React.createRef();
        this.topUdaljenostParentReferenca = React.createRef();
        this.leftUdaljenostParentReferenca = React.createRef();
        console.log("Sekcija roditelj gore je: ", this.sekcijaOdnosSaRoditeljomReferenca);
        console.log("Roditelj gore je: ", this.roditeljTrenutnogElementaReferenca);

        this.listaDodatnihOpcijaReferenca = React.createRef();

        //dodatne opcije refs
        this.dodatneOpcijeLabela = React.createRef();
        this.redoviReferenca = React.createRef();
        this.brojRedovaReferenca = React.createRef();
        this.koloneReferenca = React.createRef();
        this.brojKolonaReferenca = React.createRef();
        this.taboviReferenca = React.createRef();
        this.trenutnoOznaceniTabReferenca = React.createRef();
        this.brojTabovaReferenca = React.createRef();
        this.brojTrenutnoOznacenogTabaReferenca = React.createRef();
        this.radioDugmadiReferenca = React.createRef();
        this.brojOpcijaRadioDugmadiReferenca = React.createRef();
        this.trenutnoOznacenoRadioDugmeReferenca = React.createRef();
        this.brojTrenutnoOznacenogRadioDugmetaReferenca = React.createRef();
        this.checkboxoviReferenca = React.createRef();
        this.brojOpcijaCheckboxovaReferenca = React.createRef();
        this.oznaceniCheckboxoviReferenca = React.createRef();
        this.brojTrenutnoOznacenogCheckboxaReferenca = React.createRef();
        this.neoznaceniCheckboxoviReferenca = React.createRef();
        this.brojTrenutnoNeoznacenogCheckboxaReferenca = React.createRef();
        this.vertikalnaListaReferenca = React.createRef();
        this.brojOpcijaVertikalneListeReferenca = React.createRef();
        this.horizontalnaListaReferenca = React.createRef();
        this.brojOpcijaHorizontalneListeReferenca = React.createRef();
        this.importFajlaInput = React.createRef();


        //this.radioLabelaPrviIzKlaseReferenca = React.createRef();
    }

    state = {
        oznacenaPozicija: 1,
        prethodniElementAlignment: null,
        dropdownOpen: [false, false, false, false],
        verzijaEkrana: 'desktop',
        galenModal: null,
        prikaziGalenModal: false,
        galenModalContent: null,
        udaljenostiSvakogElementaXGlobalni: [],
        jedanUnutarDrugogGlobalni: [],
        jedanDesnoOdDvaGlobalni: [],
        jedanLijevoOdDvaGlobalni: [],
        jedanIspodDvaGlobalni: [],
        jedanIznadDvaGlobalni: [],
        udaljenostiOdRoditeljskihIvicaGlobalni: []
        //izabranaMjernaJedinica: ["px", "px", "px", "px"]
    }

    componentDidMount() {
        console.log("mockup desni: ", this.centrirajDugme.current);
        this.setState({
            prethodniElementAlignment: this.centrirajDugme.current
        });
        let objekat = {
            strelicaToolbara: this.props.data.state.dodatneOpcijeElementi.strelicaToolbara,
            nazivOdabranogPredmeta: this.nazivOdabranogPredmetaReferenca.current,

            unosIdTrenutnogElementa: this.unosIdTrenutnogElementaReferenca.current,
            unosKlaseTrenutnogElementa: this.unosKlaseTrenutnogElementaReferenca.current,
            deleteDugme: this.deleteDugmeReferenca.current,
            undoDugme: this.undoDugmeReferenca.current,
            bringToFrontDugme: this.bringToFrontDugmeReferenca.current,
            sendToBackDugme: this.sendToBackDugmeReferenca.current,
            fontElementa: this.fontElementaReferenca.current,

            unosTopUdaljenosti: this.topUdaljenostReferenca.current,
            unosLeftUdaljenosti: this.leftUdaljenostReferenca.current,

            sekcijaOdnosSaRoditeljom: this.sekcijaOdnosSaRoditeljomReferenca.current,
            roditeljTrenutnogElementa: this.roditeljTrenutnogElementaReferenca.current,
            unosTopUdaljenostiParenta: this.topUdaljenostReferenca.current,
            unosLeftUdaljenostiParenta: this.leftUdaljenostReferenca.current,

            redovi: this.redoviReferenca.current,
            brojRedova: this.brojRedovaReferenca.current,
            kolone: this.koloneReferenca.current,
            brojKolona: this.brojKolonaReferenca.current,
            tabovi: this.taboviReferenca.current,
            trenutnoOznaceniTab: this.trenutnoOznaceniTabReferenca.current,
            brojTabova: this.brojTabovaReferenca.current,
            brojTrenutnoOznacenogTaba: this.brojTrenutnoOznacenogTabaReferenca.current,
            radioDugmadi: this.radioDugmadiReferenca.current,
            brojOpcijaRadioDugmadi: this.brojOpcijaRadioDugmadiReferenca.current,
            trenutnoOznacenoRadioDugme: this.trenutnoOznacenoRadioDugmeReferenca.current,
            brojTrenutnoOznacenogRadioDugmeta: this.brojTrenutnoOznacenogRadioDugmetaReferenca.current,
            checkboxovi: this.checkboxoviReferenca.current,
            brojOpcijaCheckboxova: this.brojOpcijaCheckboxovaReferenca.current,
            oznaceniCheckboxovi: this.oznaceniCheckboxoviReferenca.current,
            brojTrenutnoOznacenogCheckboxa: this.brojTrenutnoOznacenogCheckboxaReferenca.current,
            neoznaceniCheckboxovi: this.neoznaceniCheckboxoviReferenca.current,
            brojTrenutnoNeoznacenogCheckboxa: this.brojTrenutnoNeoznacenogCheckboxaReferenca.current,
            vertikalnaLista: this.vertikalnaListaReferenca.current,
            brojOpcijaVertikalneListe: this.brojOpcijaVertikalneListeReferenca.current,
            horizontalnaLista: this.horizontalnaListaReferenca.current,
            brojOpcijaHorizontalneListe: this.brojOpcijaHorizontalneListeReferenca.current,

            listaDodatnihOpcija: this.listaDodatnihOpcijaReferenca.current,

            alignmentRadioDugmadi: document.getElementById("buttonGroupAlignment"),

            dodatneOpcijeLabela: this.dodatneOpcijeLabela.current
        };
        console.log("TU SAM ", objekat);
        this.props.data.state.dodatneOpcijeElementi = objekat;
        this.props.data.onemoguciKlikUToolbaru(true);
    }


    promijeniOznacenuPoziciju(e, novaPozicija) {
        if (this.state.prethodniElementAlignment !== null) {
            console.log("Usao: ", this.state.prethodniElementAlignment);
            let porav = this.state.prethodniElementAlignment;
            //porav.style.pointerEvents = "all"
            this.setState({
                prethodniElementAlignment: porav
            })
            //this.state.prethodniElementAlignment.style.pointerEvents = "all"
        }
        //e.currentTarget.style.pointerEvents = "none"
        this.setState({
            oznacenaPozicija: novaPozicija,
            prethodniElementAlignment: e.currentTarget
        });
        if (novaPozicija === 0) {
            this.poravnajLijevo();
        }
        else if (novaPozicija === 1) {
            this.centriraj();
        }
        else if (novaPozicija === 2) {
            this.poravnajDesno();
        }
        else {
            this.justify();
        }
    }

    toggleDropDown(pozicija) {
        let dd = [...this.state.dropdownOpen];
        dd[pozicija] = !dd[pozicija];
        console.log('toggle', dd);
        this.state.dropdownOpen = dd;
        /*this.setState({
            dropdownOpen: dd
        })*/
        console.log('state', this.state.dropdownOpen);
    }

    promijeniMjernuJedinicu(pozicija, jedinica) {
        let mj = this.props.data.state.izabranaMjernaJedinica;

        mj[pozicija] = jedinica;
        this.props.data.state.izabranaMjernaJedinica = mj;
        if (pozicija === 0)
            this.promijeniVrijednostSirine();
        else if (pozicija === 1)
            this.promijeniVrijednostVisine();
        else
            this.props.data.odrediUdaljenost();
    }

    promijeniVrijednostSirine() {
        let izabrano = this.props.data.state.izabranaMjernaJedinica[0];
        let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
        let vrijednost = '';

        if (izabrano === "px") {
            vrijednost = this.props.data.state.trenutnoOznaceniElement.offsetWidth;
            this.props.data.state.trenutnoOznaceniElement.dataset.sirinapikseli = true;
        }
        else if (izabrano === "%") {
            let parent = this.props.data.state.trenutnoOznaceniElement.offsetParent || this.props.data.state.trenutnoOznaceniElement;
            vrijednost = ((this.props.data.state.trenutnoOznaceniElement.offsetWidth / parent.offsetWidth) * 100).toFixed(0);
            this.props.data.state.trenutnoOznaceniElement.dataset.sirinapikseli = false;
        }

        novaLista[0] = parseInt(vrijednost);
        this.props.data.setState({
            vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
        })
    }

    promijeniVrijednostVisine() {
        let izabrano = this.props.data.state.izabranaMjernaJedinica[1];
        let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
        let vrijednost = '';

        if (izabrano === "px") {
            vrijednost = this.props.data.state.trenutnoOznaceniElement.offsetHeight;
            this.props.data.state.trenutnoOznaceniElement.dataset.visinapikseli = true;
        }
        else if (izabrano === "%") {
            let parent = this.props.data.state.trenutnoOznaceniElement.offsetParent || this.props.data.state.trenutnoOznaceniElement;
            vrijednost = ((this.props.data.state.trenutnoOznaceniElement.offsetHeight / parent.offsetHeight) * 100).toFixed(0);
            this.props.data.state.trenutnoOznaceniElement.dataset.visinapikseli = false;
        }

        novaLista[1] = parseInt(vrijednost);
        this.props.data.setState({
            vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
        })
    }

    promijeniSirinuElementaIzInputa(vrijednost) {
        if (vrijednost === "") {
            alert("Field cannot be empty!");
        }
        else {
            let izabrano = this.props.data.state.izabranaMjernaJedinica[0];
            if (vrijednost !== null && this.props.data.state.trenutnoOznaceniElement !== null) {
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[0] = parseInt(vrijednost);
                this.props.data.state.trenutnoOznaceniElement.style.width = vrijednost + izabrano;
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                })
                //widthTextBox.value = trenutnoOznaceniElement.clientWidth;
                //trenutnoOznaceniElement.dataset.sirinapikseli = true;
            }
        }
    }

    promijeniVisinuElementaIzInputa(vrijednost) {
        if (vrijednost === "") {
            alert("Field cannot be empty!");
        }
        else {
            let izabrano = this.props.data.state.izabranaMjernaJedinica[1];
            if (vrijednost != null && this.props.data.state.trenutnoOznaceniElement !== null) {
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[1] = parseInt(vrijednost);
                this.props.data.state.trenutnoOznaceniElement.style.height = vrijednost + izabrano;
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                })
                //widthTextBox.value = trenutnoOznaceniElement.clientWidth;
                //trenutnoOznaceniElement.dataset.sirinapikseli = true;
            }
        }
    }

    //poravnavanje teksta
    poravnajLijevo() {
        if (this.props.data.state.trenutnoOznaceniElement !== null) {
            this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje = "lijevo";
            if (this.props.data.state.trenutnoOznaceniElement.title === "Table") {
                for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells.length; j++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style.textAlign = "left";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style["padding-left"] = 4 + "px";
                }
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows.length; i++) {
                    for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells.length; j++) {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style.textAlign = "left";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style["padding-left"] = 4 + "px";
                    }
                }
            }
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Vertical List" || this.props.data.state.trenutnoOznaceniElement.title === "Horizontal List") {
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes.length; i++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style.textAlign = "left";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style["padding-left"] = 10 + "px";
                }
            }
            else {
                let indeks = "";
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes.length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.childNodes[i].nodeName === "P") indeks = i;
                    if (indeks !== "") {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style.textAlign = "left";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style["padding-left"] = 10 + "px";
                    }
                }
            }
        }
    }

    poravnajDesno() {
        if (this.props.data.state.trenutnoOznaceniElement !== null) {
            this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje = "desno";
            if (this.props.data.state.trenutnoOznaceniElement.title === "Table") {
                for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells.length; j++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style.textAlign = "right";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style["padding-right"] = 4 + "px";
                }
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows.length; i++) {
                    for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells.length; j++) {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style.textAlign = "right";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style["padding-right"] = 4 + "px";
                    }
                }
            }
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Vertical List" || this.props.data.state.trenutnoOznaceniElement.title === "Horizontal List") {
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes.length; i++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style.textAlign = "right";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style["padding-right"] = 10 + "px";
                }
            }
            else {
                let indeks = "";
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes.length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.childNodes[i].nodeName === "P") indeks = i;
                    if (indeks !== "") {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style.textAlign = "right";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style["padding-right"] = 10 + "px";
                    }
                }
            }
        }
    }

    centriraj() {
        if (this.props.data.state.trenutnoOznaceniElement !== null) {
            this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje = "centar";
            if (this.props.data.state.trenutnoOznaceniElement.title === "Table") {
                for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells.length; j++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style.textAlign = "center";

                }

                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows.length; i++) {
                    for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells.length; j++) {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style.textAlign = "center";
                    }
                }
            }
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Vertical List" || this.props.data.state.trenutnoOznaceniElement.title === "Horizontal List") {
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes.length; i++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style.textAlign = "center";
                }

            }
            else {
                let indeks = "";
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes.length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.childNodes[i].nodeName === "P") indeks = i;
                    if (indeks !== "") {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style.textAlign = "center";
                    }
                }
            }
        }
    }

    justify() {
        if (this.props.data.state.trenutnoOznaceniElement !== null) {
            this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje = "justify";
            if (this.props.data.state.trenutnoOznaceniElement.title === "Table") {
                for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells.length; j++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style.textAlign = "justify";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].rows[0].cells[j].style["padding-left"] = 4 + "px";
                }

                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows.length; i++) {
                    for (let j = 0; j < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells.length; j++) {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style.textAlign = "justify";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[1].rows[i].cells[j].style["padding-left"] = 4 + "px";
                    }
                }
            }
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Vertical List" || this.props.data.state.trenutnoOznaceniElement.title === "Horizontal List") {
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes.length; i++) {
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style.textAlign = "justify";
                    this.props.data.state.trenutnoOznaceniElement.childNodes[0].childNodes[0].childNodes[i].style["padding-left"] = 10 + "px";
                }
            }
            else {
                let indeks = "";
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.childNodes.length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.childNodes[i].nodeName === "P") indeks = i;
                    if (indeks !== "") {
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style.textAlign = "justify";
                        this.props.data.state.trenutnoOznaceniElement.childNodes[indeks].style["padding-left"] = 10 + "px";
                    }
                }
            }
        }
    }

    obrisiElement() {
        console.log("Usao istina je: ", this.props.data.state.trenutnoOznaceniElement.parentNode.id !== "glavni");
        if (this.props.data.state.trenutnoOznaceniElement !== null) {
            this.props.data.state.posljednjeObrisaniElement = this.props.data.state.trenutnoOznaceniElement;
            this.props.data.state.roditeljPosljednjeObrisanogElementa = this.props.data.state.trenutnoOznaceniElement.parentNode;
            if (this.props.data.state.trenutnoOznaceniElement.parentNode.id !== "glavni") {
                if (this.props.data.state.trenutnoOznaceniElement.parentNode.children.length === 1) {
                    this.props.data.state.trenutnoOznaceniElement.parentNode.remove();
                }
                else {
                    this.props.data.state.trenutnoOznaceniElement.remove();
                }
            }
            else {
                this.props.data.state.trenutnoOznaceniElement.remove();
            }
            this.props.data.state.glavniDio.click();
        }
    }

    staviIspred() {
        let sviZIndexi = this.vratiSveZIndexe();
        let noviZIndex = Math.max(...sviZIndexi) + 1;

        this.props.data.state.trenutnoOznaceniElement.style.zIndex = noviZIndex;

        if (noviZIndex > this.props.data.state.vrijednostZIndexa)
            this.props.data.promjenaVrijednostiZIndexa(noviZIndex);
    }

    staviIza() {
        let sviZIndexi = this.vratiSveZIndexe();
        let noviZIndex = Math.min(...sviZIndexi) - 1;

        if (noviZIndex === 0)
            noviZIndex++;

        this.props.data.state.trenutnoOznaceniElement.style.zIndex = noviZIndex;
    }

    vratiSveZIndexe() {
        let oznaceni = this.props.data.state.trenutnoOznaceniElement;
        let sviZIndexi = [];

        for (let i = 0; i < this.props.data.state.glavniDio.children.length; i++) {
            let trenutniElement = this.props.data.state.glavniDio.children[i];
            if (oznaceni !== trenutniElement && daLiSePreklapaju(oznaceni.getBoundingClientRect(), trenutniElement.getBoundingClientRect())) {
                sviZIndexi.push(parseInt(trenutniElement.style.zIndex));
            }
        }

        return sviZIndexi;
    }

    vratiPosljednjeObrisaniElement() {
        if (this.props.data.state.posljednjeObrisaniElement !== null) {
            this.props.data.state.roditeljPosljednjeObrisanogElementa.appendChild(this.props.data.state.posljednjeObrisaniElement);
            this.props.data.state.posljednjeObrisaniElement = null;
        }
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

        //let dodaj = [];
        //saveText( dodaj , "filename.txt" );

        // treba vidjeti kako implementirati !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        this.pozoviFunkciju(jedanUnutarDrugog);
        this.razvrstajTestove(udaljenostiSvakogElementaX, jedanUnutarDrugog, jedanDesnoOdDva, jedanLijevoOdDva, jedanIspodDva, jedanIznadDva, udaljenostiOdRoditeljskihIvica);
        //this.napisiGalen(udaljenostiSvakogElementaX,udaljenostiSvakogElementaY,jedanUnutarDrugog,jedanDesnoOdDva,jedanLijevoOdDva,jedanIspodDva,jedanIznadDva);
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

        /*sviCheckboxovi+=`<p>Parent</p>`;
        for(var i=0;i<nizParenta.length;i++){
          sviCheckboxovi+=`<input type="checkbox" checked>`+nizParenta[i][0]+` is parent of `+nizParenta[i][1]+`<br>`;
        }*/

        /*sviCheckboxovi+=`<p>Child</p>`;
        for(var i=0;i<nizDjece.length;i++){
          sviCheckboxovi+=`<input type="checkbox" checked>`+nizDjece[i][0]+` is child of `+nizDjece[i][1]+`<br>`;
        }*/

        /*sviCheckboxovi+=`<p>Z-index</p>`;
        for(var i=0;i<nizZKoordinata.length;i++){
          sviCheckboxovi+=`<input type="checkbox" checked>`+nizZKoordinata[i][0]+` is on `+nizZKoordinata[i][1]+`<br>`;
        }*/

        /* modal.innerHTML = sviCheckboxovi + `<p style="text-decoration:none">&nbsp;</p><button onclick="napisiGalen();" title="Creates and saves Galen tests on local computer">Save tests</Button>`;
 
         jedanRoditeljDvaGlobalni = nizParenta;
         jedanDijeteDvaGlobalni = nizDjece;
         zKoordinataGlobalni = nizZKoordinata;*/
        //console.log("Globalni"+udaljenostiSvakogElementaX);
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
                /*let lijevo = parseInt(element.lijevo);
                let gore = parseInt(element.gore);
                sekcijaUnutarPartly += "\t" + element.id + ":\n\t\tinside partly " + element.roditelj + " " + (lijevo - 1) + "% to " + (lijevo + 1) + "% left, " + (gore - 1) + "% to " + (gore + 1) + "% top\n";*/
            }

            ukupniBrojac++;
        });

        sekcije += "\n" + sekcijaUnutarPartly;

        galen = objekti + sekcije;
        console.log(galen);

        download(galen, 'galenTests.gspec', "txt");

        /*var sekcijaContains="= Contains section =\n\tglavni:\n\t\tcontains ";
        for(var i=0;i<udaljenostiSvakogElementaX.length;i++){
            sekcijaContains+=udaljenostiSvakogElementaX[i][5];
            if(i!=udaljenostiSvakogElementaX.length-1){
                sekcijaContains+=", ";
            }
        }
        sekcije+=sekcijaContains;*/

        /*var nizParenta = ocitajJeLiParent();
        var sekcijaParent="= Roditelj section =\n";
        for(var i=0;i<nizParenta.length;i++){
            ispisi=true;
            for(var j=0;j<izuzeci.length;j++){
                if(izuzeci[j]==ukupniBrojac){
                    ispisi=false;
                }
            }
            if(ispisi)
                sekcijaParent+="\t"+nizParenta[i][0]+":\n"+"\t\tparent of "+ nizParenta[i][1]+"\n";
            ukupniBrojac++;
        }
        sekcije+="\n"+sekcijaParent;*/

        /*var nizDjece = ocitajJeLiDijete();
        var sekcijaDjece="= Dijete i roditelj section =\n";
        for(var i=0;i<nizDjece.length;i++){
            ispisi=true;
            for(var j=0;j<izuzeci.length;j++){
                if(izuzeci[j]==ukupniBrojac){
                    ispisi=false;
                }
            }
            if(ispisi)
                sekcijaDjece+="\t"+nizDjece[i][0]+":\n"+"\t\tinside parent "+ nizDjece[i][1]+"\n";
            ukupniBrojac++;
        }
        sekcije+="\n"+sekcijaDjece;*/

        /*var nizZKoordinata = odrediZKoordinatu();
        var sekcijaKoordinata="= Z koordinata section =\n";
        for(var i=0;i<nizZKoordinata.length;i++){
            ispisi=true;
            for(var j=0;j<izuzeci.length;j++){
                if(izuzeci[j]==ukupniBrojac){
                    ispisi=false;
                }
            }
            if(ispisi)
                sekcijaKoordinata+="\t"+nizZKoordinata[i][0]+":\n"+"\t\ton "+ nizZKoordinata[i][1]+"\n";
            ukupniBrojac++;
        }
        sekcije+="\n"+sekcijaKoordinata;*/

    }

    promijeniFontElementaIzInputa(e) {
        if (e.target.value === "") {
            alert("Field cannot be empty!");
        }

        else if (e.target.value < 0 || e.target.value > 50) {
            alert("Numbers between [1,50] are allowed for this field");
        }
        else {
            if (e.target.value !== null && this.props.data.state.trenutnoOznaceniElement !== null) {
                this.props.data.state.trenutnoOznaceniElement.style.fontSize = e.target.value + "px";
            }
        }
    }

    /*promijeniUdaljenostTopIzInputa(e) {
        if (e.target.value === "") {
            alert("Field cannot be empty!");
        }

        else if (e.target.value < 0 || e.target.value > this.props.data.state.glavniDio.offsetHeight) {
            alert("Numbers between 1 and height of screen are allowed for this field");
        }
        else {
            if (e.target.value !== null && this.props.data.state.trenutnoOznaceniElement !== null) {
                this.props.data.state.trenutnoOznaceniElement.dataset.y = e.target.value;
                this.props.data.state.trenutnoOznaceniElement.style.transform = `translate(${this.props.data.state.trenutnoOznaceniElement.dataset.x}px, ${e.target.value}px)`;
                this.props.data.state.dodatneOpcijeElementi.topUdaljenost = e.target.value;
            }
        }
    }

    promijeniUdaljenostLeftIzInputa(e) {
        if (e.target.value === "") {
            alert("Field cannot be empty!");
        }

        else if (e.target.value < 0 || e.target.value > this.props.data.state.glavniDio.offsetWidth) {
            alert("Numbers between 1 and width of screen are allowed for this field");
        }
        else {
            if (e.target.value !== null && this.props.data.state.trenutnoOznaceniElement !== null) {
                this.props.data.state.trenutnoOznaceniElement.dataset.x = e.target.value;
                this.props.data.state.trenutnoOznaceniElement.style.transform = `translate(${e.target.value}px, ${this.props.data.state.trenutnoOznaceniElement.dataset.y}px)`;
                this.props.data.state.dodatneOpcijeElementi.leftUdaljenost = e.target.value;
            }
        }
    }*/

    grupisiElemente() {
        let glavni = this.props.data.state.glavniDio;
        let roditeljGroup = document.createElement("div");
        let nizMinLeft = [];
        let nizMinTop = [];
        let minLeft = 0;
        let minTop = 0;
        let maxLeft = 0;
        let maxTop = 0;
        let nizObjekata = [];
        let offsetBottom = [];
        let offsetRight = [];
        let zIndex = [];
        let oznaceniElementi = vratiSveOznaceneElemente();

        roditeljGroup.style.background = "transparent"
        roditeljGroup.classList.add("resize-drag");

        if (oznaceniElementi.length === 1) {
            alert("It is not possible to group only one element!");
        }
        else {
            let udaljenostiSvakogElementaX = [];

            oznaceniElementi.forEach((element, index) => {
                let divOffset = this.props.data.offset(element);
                udaljenostiSvakogElementaX.push([index, divOffset.left, divOffset.top, element.offsetWidth, element.offsetHeight, element.id]);
            });

            udaljenostiSvakogElementaX = bubbleSort(udaljenostiSvakogElementaX);

            let jedanUnutarDrugog = [];
            udaljenostiSvakogElementaX.forEach((element1, index1) => {
                udaljenostiSvakogElementaX.forEach((element2, index2) => {
                    if (index1 !== index2 && daLiJeUnutar(element2, element1)) {
                        jedanUnutarDrugog.push([element2[5], element1[5]]);
                    }
                });
            });

            jedanUnutarDrugog.forEach(element => {
                let roditelj = document.getElementById(element[1]);
                let dijete = document.getElementById(element[0]);
                let offsetDijete = this.props.data.offset(dijete);
                let offsetRoditelj = this.props.data.offset(roditelj);

                dijete.style.position = "absolute";
                dijete.style.left = (offsetDijete.left - offsetRoditelj.left) + "px";
                dijete.style.top = (offsetDijete.top - offsetRoditelj.top) + "px";
                dijete.style.setProperty("transform", "none");

                /*dijete.style.left = "0px";
                dijete.style.top = "0px";
                dijete.style.setProperty("transform", "translate(0px,0px)");*/
                dijete.dataset.x = "0";
                dijete.dataset.y = "0";
                dijete.style.boxShadow = "";

                roditelj.appendChild(dijete);
            });

            oznaceniElementi = vratiSveOznaceneElemente();

            if (oznaceniElementi.length > 1) {
                oznaceniElementi.forEach(element => {
                    let offset = this.props.data.offset(element);

                    nizObjekata.push({ top: offset.top, left: offset.left, lik: element });
                    nizMinLeft.push(offset.left);
                    nizMinTop.push(offset.top);
                    zIndex.push(parseInt(element.style.zIndex));

                    element.parentNode.insertBefore(roditeljGroup, element);
                    roditeljGroup.appendChild(element);
                });

                minLeft = Math.min(...nizMinLeft);
                minTop = Math.min(...nizMinTop);

                roditeljGroup.style.position = "absolute";
                roditeljGroup.style.left = minLeft + "px";
                roditeljGroup.style.top = minTop + "px";

                oznaceniElementi.forEach(element => {
                    let offsetGlavni = this.props.data.offset(roditeljGroup);
                    let offset = this.props.data.offset(element);

                    element.style.position = "absolute";
                    element.style.left = (offset.left - offsetGlavni.left - offsetGlavni.left) + "px";
                    element.style.top = (offset.top - offsetGlavni.top - offsetGlavni.top) + "px";
                    element.style.setProperty("transform", "none");

                    /*element.style.setProperty("transform", "translate(0px,0px)");
                    element.style.left = "0px";
                    element.style.top = "0px";*/

                    element.dataset.x = "0";
                    element.dataset.y = "0";
                    element.style.boxShadow = "";

                    offset = this.props.data.offset(element);
                    offsetBottom.push(parseFloat(offset.top) - parseFloat(offsetGlavni.top) + parseFloat(element.style.height));
                    offsetRight.push(parseFloat(offset.left) - parseFloat(offsetGlavni.left) + parseFloat(element.style.width));
                });

                maxLeft = Math.max(...offsetRight);
                maxTop = Math.max(...offsetBottom);

                roditeljGroup.style.width = maxLeft + "px";
                roditeljGroup.style.height = maxTop + "px";
                roditeljGroup.style.boxShadow = "0 0 0 2px #20c997";
                roditeljGroup.style.overflow = "hidden";
                roditeljGroup.style.zIndex = Math.max(...zIndex).toString();
                roditeljGroup.setAttribute("id", "div" + this.props.data.state.brojacDivova);
                roditeljGroup.setAttribute("data-inicijalniid", "div" + this.props.data.state.brojacDivova);
                roditeljGroup.setAttribute("data-dodijeljeniid", "div" + this.props.data.state.brojacDivova);
                roditeljGroup.setAttribute("data-dodijeljenaklasa", "");

                //dodaj da mu je roditelj trenutni element
                /*oznaceniElementi.forEach((element, index) => {
                    element.setAttribute("data-roditelj", "div" + this.props.data.state.brojacDivova);
                });*/

                this.props.data.promjenaListeDodijeljenihId(this.props.data.state.listaDodijeljenihId, "div" + this.props.data.state.brojacDivova);
                this.props.data.promjenaVrijednostiBrojacaDivova(this.props.data.state.brojacDivova + 1);
                this.props.data.promjenaTrenutnoOznacenogElementa(roditeljGroup);

                glavni.appendChild(roditeljGroup);
            }
        }
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

    mobilnaVerzija() {
        let el = this.props.data.state.glavniDio;

        el.style.height = 70 + "%";
        el.style.width = 25 + "%"
        el.style.cssFloat = "left"
        el.style.overflow = "hidden";
        el.style.border = "thick solid #E8E8E8";
        el.style.borderRadius = 50 + "px";

        this.setState({
            verzijaEkrana: 'mobile'
        });
    }

    tabletVerzija() {
        let el = this.props.data.state.glavniDio;

        el.style.height = 79 + "%";
        el.style.width = 50 + "%"
        el.style.cssFloat = "left"
        el.style.overflow = "hidden";
        el.style.border = "thick solid #E8E8E8";
        el.style.borderRadius = 50 + "px";

        this.setState({
            verzijaEkrana: 'tablet'
        });
    }

    desktopVerzija() {
        let el = this.props.data.state.glavniDio;

        el.style.height = 100 + "%";
        el.style.width = 100 + "%";
        el.style.cssFloat = "right"
        el.style.overflow = "scroll";
        el.style.border = "none";
        el.style.borderRadius = 0 + "px";

        this.setState({
            verzijaEkrana: 'desktop'
        });
    }

    promjenaPrikazaGalenModala(novaVrijednost) {
        if (novaVrijednost)
            this.ocitajSveUdaljenosti();

        this.setState({
            prikaziGalenModal: novaVrijednost
        });
    }

    promijeniBojuElementa(vrijednost) {
        console.log("PROMJENA BOJE", vrijednost);
        if (vrijednost === "") {
            alert("Field cannot be empty!");
        }
        else {
            if (vrijednost !== null && this.props.data.state.trenutnoOznaceniElement !== null) {
                this.props.data.state.trenutnoOznaceniElement.style.backgroundColor = vrijednost;
                this.props.data.setState({
                    bojaElementa: vrijednost
                })
                //widthTextBox.value = trenutnoOznaceniElement.clientWidth;
                //trenutnoOznaceniElement.dataset.sirinapikseli = true;
            }
        }
    }

    render() {
        return (
            <Container id="desniToolbarOpcije">
                <Row style={{ paddingLeft: "0.4rem" }}>
                    <FormLabel id="nazivOdabranogElementa"
                        column="lg"
                        ref={this.nazivOdabranogPredmetaReferenca}
                    />
                </Row>
                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Id</InputGroup.Text>
                        <FormControl aria-label="Id"
                            aria-describedby="inputGroup-sizing-sm"
                            id="unosIdTrenutnogElementa"
                            ref={this.unosIdTrenutnogElementaReferenca}
                            value={this.props.data.state.dodatneOpcijeElementi.id}
                            onChange={(event) => { this.props.data.promjenaIdElementa(event.target.value) }}
                        />
                    </InputGroup>
                </Row>
                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Class</InputGroup.Text>
                        <FormControl aria-label="Class"
                            aria-describedby="inputGroup-sizing-sm"
                            id="unosKlaseTrenutnogElementa"
                            ref={this.unosKlaseTrenutnogElementaReferenca}
                            value={this.props.data.state.dodatneOpcijeElementi.klasa}
                            onChange={(event) => { this.props.data.promjenaKlaseElementa(event.target.value) }}
                        />
                    </InputGroup>
                </Row>





                <Row style={{ paddingTop: "0.5rem" }}>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="secondary"
                            id="deleteDugme"
                            onClick={() => { this.obrisiElement() }}
                            title="Delete"
                            ref={this.deleteDugmeReferenca}
                        >
                            <i className="bi bi-trash"></i>
                        </Button>
                        <Button variant="secondary"
                            id="undoDugme"
                            onClick={() => { this.vratiPosljednjeObrisaniElement() }}
                            title="Undo"
                            ref={this.undoDugmeReferenca}
                        >
                            <i className="bi bi-reply-fill"></i>
                        </Button>
                        <Button variant="secondary"
                            id="bringToFrontDugme"
                            onClick={() => { this.staviIspred() }}
                            title="Bring to Front"
                            ref={this.bringToFrontDugmeReferenca}
                        >
                            <i className="bi bi-front"></i>
                        </Button>
                        <Button variant="secondary"
                            id="sendToBackDugme"
                            onClick={() => { this.staviIza() }}
                            title="Send to Back"
                            ref={this.sendToBackDugmeReferenca}
                        >
                            <i className="bi bi-back"></i>
                        </Button>
                        <Button variant="secondary"
                            id="Group"
                            title="Group"
                            onClick={() => { this.grupisiElemente() }}
                            ref={this.groupDugmeReferenca}
                        >
                            <i className="bi bi-columns-gap"></i>
                        </Button>
                    </ButtonGroup>
                </Row>
                <Row style={{ paddingTop: "1rem" }}>
                    <FormLabel style={{ fontWeight: "bold" }}>Alignment</FormLabel>
                    <ButtonGroup id="buttonGroupAlignment">
                        <Button variant="secondary"
                            id="radioDugme1"
                            ref={this.poravnajLijevoDugme}
                            onClick={(e) => { this.promijeniOznacenuPoziciju(e, 0) }}
                        >
                            <i className="bi bi-text-left"></i>
                        </Button>
                        <Button variant="secondary"
                            id="radioDugme2"
                            ref={this.centrirajDugme}
                            onClick={(e) => { this.promijeniOznacenuPoziciju(e, 1) }}
                        >
                            <i className="bi bi-text-center"></i>
                        </Button>
                        <Button variant="secondary"
                            id="radioDugme3"
                            ref={this.poravnajDesnoDugme}
                            onClick={(e) => { this.promijeniOznacenuPoziciju(e, 2) }}
                        >
                            <i className="bi bi-text-right"></i>
                        </Button>
                        <Button variant="secondary"
                            id="radioDugme4"
                            ref={this.justifyDugme}
                            onClick={(e) => { this.promijeniOznacenuPoziciju(e, 3) }}
                        >
                            <i className="bi bi-justify"></i>
                        </Button>
                    </ButtonGroup>
                </Row>
                <Row style={{ paddingTop: "2rem" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Font
                        </InputGroup.Text>
                        <FormControl ref={this.fontElementaReferenca}
                            onChange={(e) => { this.promijeniFontElementaIzInputa(e) }}
                            type={'number'}
                        />
                    </InputGroup>
                </Row>
                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Width
                        </InputGroup.Text>
                        <FormControl id="unosSirineTextBox"
                            type={'number'}
                            value={this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[0]}
                            onChange={(e) => { this.promijeniSirinuElementaIzInputa(e.target.value) }}
                            disabled={!this.props.data.state.unosSirineTextBoxOmogucen}
                        />
                        <Dropdown onToggle={() => { this.toggleDropDown(0) }} defaultShow={this.state.dropdownOpen[0]}>
                            <Dropdown.Toggle id="dropdown-autoclose-true"
                                variant="outline-secondary"
                                disabled={!this.props.data.state.unosSirineSelectOmogucen}
                            >
                                {this.props.data.state.izabranaMjernaJedinica[0]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu defaultShow={this.state.dropdownOpen[0]}
                                popperConfig={{ strategy: "fixed" }}
                            >
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(0, "px") }}>px</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(0, "%") }}>%</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </Row>
                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Height
                        </InputGroup.Text>
                        <FormControl id="unosVisineTextBox"
                            type={'number'}
                            value={this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[1]}
                            onChange={(e) => { this.promijeniVisinuElementaIzInputa(e.target.value) }}
                            disabled={!this.props.data.state.unosVisineTextBoxOmogucen}
                        />
                        <Dropdown onToggle={() => { this.toggleDropDown(1) }} defaultShow={this.state.dropdownOpen[1]}>
                            <Dropdown.Toggle id="dropdown-autoclose-true"
                                variant="outline-secondary"
                                disabled={!this.props.data.state.unosVisineSelectOmogucen}
                            >
                                {this.props.data.state.izabranaMjernaJedinica[1]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu defaultShow={this.state.dropdownOpen[1]}
                                popperConfig={{ strategy: "fixed" }}
                            >
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(1, "px") }}>px</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(1, "%") }}>%</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </Row>
                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Vertical
                        </InputGroup.Text>
                        <FormControl id="unosVertikalneUdaljenosti"
                            type={'number'}
                            value={this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2]}
                            onChange={(e) => { this.props.data.promijenitVertikalnuUdaljenost(e.target.value) }}
                            disabled={!this.props.data.state.vertikalnaUdaljenostOmogucen}
                        />
                        <Dropdown onToggle={() => { this.toggleDropDown(2) }} defaultShow={this.state.dropdownOpen[2]}>
                            <Dropdown.Toggle id="dropdown-autoclose-true"
                                variant="outline-secondary"
                                disabled={!this.props.data.state.vertikalnaUdaljenostSelectOmogucen}
                            >
                                {this.props.data.state.izabranaMjernaJedinica[2]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu defaultShow={this.state.dropdownOpen[2]}
                                popperConfig={{ strategy: "fixed" }}
                            >
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(2, "px") }}>px</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(2, "%") }}>%</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </Row>

                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Horizontal
                        </InputGroup.Text>
                        <FormControl id="unosHorizontalneUdaljenosti"
                            type={'number'}
                            value={this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3]}
                            onChange={(e) => { this.props.data.promijenitHorizontalnuUdaljenost(e.target.value) }}
                            disabled={!this.props.data.state.horizontalnaUdaljenostOmogucen}
                        />
                        <Dropdown onToggle={() => { this.toggleDropDown(3) }} defaultShow={this.state.dropdownOpen[3]}>
                            <Dropdown.Toggle id="dropdown-autoclose-true"
                                variant="outline-secondary"
                                disabled={!this.props.data.state.horizontalnaUdaljenostSelectOmogucen}
                            >
                                {this.props.data.state.izabranaMjernaJedinica[3]}
                            </Dropdown.Toggle>
                            <Dropdown.Menu defaultShow={this.state.dropdownOpen[3]}
                                popperConfig={{ strategy: "fixed" }}
                            >
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(3, "px") }}>px</Dropdown.Item>
                                <Dropdown.Item onClick={() => { this.promijeniMjernuJedinicu(3, "%") }}>%</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </InputGroup>
                </Row>


                {/*Dio sa udaljenosti od gornje i lijeve ivice canvasa*/}
                <Row style={{ paddingTop: "1rem" }}>
                    <FormLabel style={{ fontWeight: "bold" }}>Position</FormLabel>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Top
                        </InputGroup.Text>
                        <FormControl ref={this.topUdaljenostReferenca}
                            onChange={(event) => { this.props.data.promjenaTopUdaljenosti(event.target.value) }}
                            value={Math.round(this.props.data.state.dodatneOpcijeElementi.topUdaljenost)}
                            type={'number'}
                        />
                    </InputGroup>
                </Row>

                <Row style={{ paddingTop: "5px" }}>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm"
                        >
                            Left
                        </InputGroup.Text>
                        <FormControl ref={this.leftUdaljenostReferenca}
                            onChange={(event) => { this.props.data.promjenaLeftUdaljenosti(event.target.value) }}
                            value={Math.round(this.props.data.state.dodatneOpcijeElementi.leftUdaljenost)}
                            type={'number'}
                        />
                    </InputGroup>
                </Row>

                {/*Odnos sa elementom roditelj*/}
                <div ref={this.sekcijaOdnosSaRoditeljomReferenca}>
                    <Row style={{ paddingTop: "1rem" }} >
                        <Row style={{ paddingTop: "5px", paddingRight: "0px" }} >
                            <FormLabel style={{ fontWeight: "bold" }}>Relationship with parent</FormLabel>
                            <InputGroup size="sm" className="mb-3" style={{ paddingRight: "0px" }}>
                                <InputGroup.Text id="inputGroup-sizing-sm">Parent</InputGroup.Text>
                                <FormControl aria-label="Parent"
                                    aria-describedby="inputGroup-sizing-sm"
                                    id="unosKlaseTrenutnogElementa"
                                    ref={this.roditeljTrenutnogElementaReferenca}
                                    value={this.props.data.state.dodatneOpcijeElementi.roditelj}
                                    disabled
                                />
                            </InputGroup>
                        </Row>
                        <Row style={{ paddingTop: "5px", paddingRight: "0px" }} >
                            <InputGroup size="sm" className="mb-3" style={{ paddingRight: "0px" }}>
                                <InputGroup.Text id="inputGroup-sizing-sm"
                                >
                                    Top
                                </InputGroup.Text>
                                <FormControl ref={this.topUdaljenostParentReferenca}
                                    onChange={(event) => { this.props.data.promjenaTopUdaljenostiOdParenta(event.target.value) }}
                                    value={Math.round(this.props.data.state.dodatneOpcijeElementi.topUdaljenostParent)}
                                    type={'number'}
                                />
                            </InputGroup>
                        </Row>
                        <Row style={{ paddingTop: "5px", paddingRight: "0px" }} >
                            <InputGroup size="sm" className="mb-3" style={{ paddingRight: "0px" }}>
                                <InputGroup.Text id="inputGroup-sizing-sm"
                                >
                                    Left
                                </InputGroup.Text>
                                <FormControl ref={this.leftUdaljenostReferencaParent}
                                    onChange={(event) => { this.props.data.promjenaLeftUdaljenostiOdParenta(event.target.value) }}
                                    value={Math.round(this.props.data.state.dodatneOpcijeElementi.leftUdaljenostParent)}
                                    type={'number'}
                                />
                            </InputGroup>
                        </Row>
                    </Row>
                </div>

                <Row style={{ paddingTop: "1rem" }}>
                    <FormLabel style={{ fontWeight: "bold" }}>Element color</FormLabel>
                    <input type="color" defaultValue="#ffffff"
                    value={this.props.data.state.bojaElementa}
                    onChange={(e) => { this.promijeniBojuElementa(e.target.value) }}></input>

                </Row>


                <Row style={{ paddingTop: "1rem", borderBottom: "1px solid #ced4da" }}>
                    <ul id="listaDodatnihOpcija" ref={this.listaDodatnihOpcijaReferenca}>
                        <FormLabel id="dodatneOpcijeLabela" ref={this.dodatneOpcijeLabela} style={{ fontWeight: "bold" }}>Additional options</FormLabel>
                        <InputGroup as={"li"} id="redovi" ref={this.redoviReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Rows
                            </InputGroup.Text>
                            <FormControl ref={this.brojRedovaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojRedova"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojRedova}
                                onChange={(e) => { this.props.data.promjenaBrojaRedova(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="kolone" ref={this.koloneReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Columns
                            </InputGroup.Text>
                            <FormControl ref={this.brojKolonaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojKolona"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojKolona}
                                onChange={(e) => { this.props.data.promjenaBrojaKolona(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="tabovi" ref={this.taboviReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Number of tabs
                            </InputGroup.Text>
                            <FormControl ref={this.brojTabovaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojTabova"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojTabova}
                                onChange={(e) => { this.props.data.promjenaBrojaTabova(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="trenutnoOznaceniTab" ref={this.trenutnoOznaceniTabReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Currently selected tab
                            </InputGroup.Text>
                            <FormControl ref={this.brojTrenutnoOznacenogTabaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojTrenutnoOznacenogTaba"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogTaba}
                                onChange={(e) => { this.props.data.promjenaTrenutnoOznacenogTaba(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="radioDugmadi" ref={this.radioDugmadiReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Number of options in radio button
                            </InputGroup.Text>
                            <FormControl ref={this.brojOpcijaRadioDugmadiReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojOpcijaRadioDugmadi"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojOpcijaRadioDugmadi}
                                onChange={(e) => { this.props.data.promjenaBrojaRadioDugmadi(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="trenutnoOznacenoRadioDugme" ref={this.trenutnoOznacenoRadioDugmeReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Currently selected radio button
                            </InputGroup.Text>
                            <FormControl ref={this.brojTrenutnoOznacenogRadioDugmetaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojTrenutnoOznacenogRadioDugmeta"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogRadioDugmeta}
                                onChange={(e) => { this.props.data.promjenaTrenutnoOznacenogRadioDugmeta(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="checkboxovi" ref={this.checkboxoviReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Number of options in checkbox
                            </InputGroup.Text>
                            <FormControl ref={this.brojOpcijaCheckboxovaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojOpcijaCheckboxova"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojOpcijaCheckboxova}
                                onChange={(e) => { this.props.data.promjenaBrojaCheckboxova(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="oznaceniCheckboxovi" ref={this.oznaceniCheckboxoviReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Select checkbox
                            </InputGroup.Text>
                            <FormControl ref={this.brojTrenutnoOznacenogCheckboxaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojTrenutnoOznacenogCheckboxa"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogCheckboxa}
                                onChange={(e) => { this.props.data.promjenaTrenutnoOznacenogCheckboxa(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="neoznaceniCheckboxovi" ref={this.neoznaceniCheckboxoviReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Unselect checkbox
                            </InputGroup.Text>
                            <FormControl ref={this.brojTrenutnoNeoznacenogCheckboxaReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojTrenutnoNeoznacenogCheckboxa"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojTrenutnoNeoznacenogCheckboxa}
                                onChange={(e) => { this.props.data.promjenaTrenutnoNeoznacenogCheckboxa(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="vertikalnaLista" ref={this.vertikalnaListaReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Number of elements in vertical list
                            </InputGroup.Text>
                            <FormControl ref={this.brojOpcijaVertikalneListeReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojOpcijaVertikalneListe"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojOpcijaVertikalneListe}
                                onChange={(e) => { this.props.data.promjenaBrojaElemenataVertikalneListe(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                        <InputGroup as={"li"} id="horizontalnaLista" ref={this.horizontalnaListaReferenca} size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm"
                            >
                                Number of elements in horizontal list
                            </InputGroup.Text>
                            <FormControl ref={this.brojOpcijaHorizontalneListeReferenca}
                                style={{ height: "auto", border: "1px solid #ced4da", borderRadius: "0 0.25rem 0.25rem 0" }}
                                id="brojOpcijaHorizontalneListe"
                                min="1"
                                max="20"
                                value={this.props.data.state.dodatneOpcijeElementi.brojOpcijaHorizontalneListe}
                                onChange={(e) => { this.props.data.promjenaBrojaElemenataHorizontalneListe(e.target.value) }}
                                type={'number'}
                            />
                        </InputGroup>
                    </ul>
                </Row>
                
                {/*<Row style={{ paddingTop: "1rem" }}>
                    <ButtonGroup>
                        <Button variant="secondary"
                            id="ocitavanjeUdaljenosti"
                            onClick={(e) => { this.ocitajSveUdaljenosti() }}
                            title="Read the distance"
                        >
                            <i className="bi bi-file-earmark-text"></i>
                        </Button>
                        <Button variant="secondary"
                            id="snimanjeFajlaDugme"
                            onClick={(e) => { this.snimiCitavFajl() }}
                            title="Save File"
                        >
                            <i className="bi bi-file-earmark-arrow-down"></i>
                        </Button>
                        <Button variant="secondary"
                            id="snimanjeFajlaKaoPDF"
                            title="Save as PDF"
                            onClick={(e) => { this.snimiKaoPDF() }}
                        >
                            <i className="bi bi-file-earmark-pdf"></i>
                        </Button>
                        <Button variant="secondary"
                            id="otvoriModalDugme"
                            title="Choose test"
                            disabled={!this.props.data.state.glavniDio.children.length}
                            onClick={() => { this.promjenaPrikazaGalenModala(true) }}
                        >
                            <i className="bi bi-file-earmark-code"></i>
                        </Button>
                        <Button variant="secondary"
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
                <Row style={{ paddingTop: "1rem" }}>
                    <FormLabel style={{ fontWeight: "bold" }}>Different sizes of canvas</FormLabel>
                    <ButtonGroup>
                        <Button variant="secondary"
                            id="mobitel"
                            onClick={(e) => { this.mobilnaVerzija() }}
                            title="Mobile"
                        >
                            <i className="bi bi-phone"></i>
                        </Button>
                        <Button variant="secondary"
                            id="tablet"
                            onClick={(e) => { this.tabletVerzija() }}
                            title="Tablet"
                        >
                            <i className="bi bi-tablet"></i>
                        </Button>
                        <Button variant="secondary"
                            id="desktop"
                            title="Desktop"
                            onClick={(e) => { this.desktopVerzija() }}
                        >
                            <i className="bi bi-display"></i>
                        </Button>
                    </ButtonGroup>
        </Row>*/}
        

                <GalenModal data={this} />

            </Container>
        );
    }
}

export default MockupDesniToolbar;