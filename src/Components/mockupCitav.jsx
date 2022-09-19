import React, { Component } from 'react';
import MockupLijevo from "./mockupLijevo";
import MockupDesniToolbar from "./mockupDesniToolbar";
import MockupGlavni from "./glavni";
import "../css/diplomski.css"

import {
    Row,
    Col,
    Input,
    ButtonGroup,
    Button,
    Label,
    InputGroup,
    InputGroupButtonDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import "../js/interact.js"
import { vratiSveOznaceneElemente } from "../dodatneFunkcije";
import { odrediPozicijuElemenata, pomjeriElement } from "../js/vertikalnaIHorizontalnaUdaljenost";
import {
    kreirajNovuTabelu, kreirajNovuListuTabova, kreirajNovuListuRadioDugmadi, kreirajNovuListuCheckboxova,
    kreirajNovuVertikalnuListu, kreirajNovuHorizontalnuListu
} from "../js/kreiranjeElemenata";
import { FormControl, Offcanvas } from "react-bootstrap";
import Zaglavlje from './zaglavlje';

class MockupCitav extends Component {
    constructor() {
        super();

        //refs
        this.strelicaToolbaraReferenca = React.createRef();
        this.searchTextBoxReferenca = React.createRef();
        this.desniToolbarReferenca = React.createRef();

        //funkcije
        this.offset = this.offset.bind(this);
        this.kliknutoNaStrelicuToolbara = this.kliknutoNaStrelicuToolbara.bind(this);
        this.onemoguciKlikUToolbaru = this.onemoguciKlikUToolbaru.bind(this);
        this.search = this.search.bind(this);
        this.promjenaSearchTexta = this.promjenaSearchTexta.bind(this);
        this.promjenaVrijednostiZIndexa = this.promjenaVrijednostiZIndexa.bind(this);
        this.promjenaListeDodijeljenihId = this.promjenaListeDodijeljenihId.bind(this);
        this.promjenaVrijednostiBrojacaDivova = this.promjenaVrijednostiBrojacaDivova.bind(this);
        this.promjenaTrenutnoOznacenogElementa = this.promjenaTrenutnoOznacenogElementa.bind(this);
        this.odrediUdaljenost = this.odrediUdaljenost.bind(this);
        this.promijenitVertikalnuUdaljenost = this.promijenitVertikalnuUdaljenost.bind(this);
        this.promijenitHorizontalnuUdaljenost = this.promijenitHorizontalnuUdaljenost.bind(this);
        this.promjenaBrojaRedova = this.promjenaBrojaRedova.bind(this);
        this.promjenaBrojaKolona = this.promjenaBrojaKolona.bind(this);
        this.promjenaBrojaTabova = this.promjenaBrojaTabova.bind(this);
        this.promjenaTrenutnoOznacenogTaba = this.promjenaTrenutnoOznacenogTaba.bind(this);
        this.promjenaBrojaRadioDugmadi = this.promjenaBrojaRadioDugmadi.bind(this);
        this.promjenaTrenutnoOznacenogRadioDugmeta = this.promjenaTrenutnoOznacenogRadioDugmeta.bind(this);
        this.promjenaBrojaCheckboxova = this.promjenaBrojaCheckboxova.bind(this);
        this.promjenaTrenutnoOznacenogCheckboxa = this.promjenaTrenutnoOznacenogCheckboxa.bind(this);
        this.promjenaTrenutnoNeoznacenogCheckboxa = this.promjenaTrenutnoNeoznacenogCheckboxa.bind(this);
        this.promjenaBrojaElemenataVertikalneListe = this.promjenaBrojaElemenataVertikalneListe.bind(this);
        this.promjenaBrojaElemenataHorizontalneListe = this.promjenaBrojaElemenataHorizontalneListe.bind(this);
        this.promjenaPrikazaDesnogToolbara = this.promjenaPrikazaDesnogToolbara.bind(this);

        this.promjenaTopUdaljenosti = this.promjenaTopUdaljenosti.bind(this);
        this.promjenaLeftUdaljenosti = this.promjenaLeftUdaljenosti.bind(this);
    }

    state = {
        trenutnoOznaceniElement: null,
        glavniDio: null,
        brojacDivova: 0,
        listaDodijeljenihId: [],

        //redom su sirina, visina, vertical, horizontal
        izabranaMjernaJedinica: ["px", "px", "px", "px"],
        vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: [0, 0, 0, 0],

        vertikalnaUdaljenostOmogucen: false,
        vertikalnaUdaljenostSelectOmogucen: false,
        horizontalnaUdaljenostOmogucen: false,
        horizontalnaUdaljenostSelectOmogucen: false,

        unosVisineTextBoxOmogucen: false,
        unosVisineSelectOmogucen: false,
        unosSirineTextBoxOmogucen: false,
        unosSirineSelectOmogucen: false,

        prethodnoOznaceniElement: null,
        brojacOznacenih: 0,
        desniToolbar: null,
        //svi elementi koji se nalaze u dodatnim opcijama
        dodatneOpcijeElementi: {
            strelicaToolbara: null,
            nazivOdabranogPredmeta: null,

            unosIdTrenutnogElementa: null,
            unosKlaseTrenutnogElementa: null,
            deleteDugme: null,
            undoDugme: null,
            bringToFrontDugme: null,
            sendToBackDugme: null,
            fontElementa: null,
            id: null,
            klasa: null,

            unosTopUdaljenosti: null,
            unosLeftUdaljenosti: null,
            topUdaljenost: null,
            lefUdaljenost: null,

            sekcijaOdnosSaRoditeljom: null,
            roditeljTrenutnogElementa: null,
            unosTopUdaljenostiParenta: null,
            unosLeftUdaljenostiParenta: null,
            topUdaljenostParent: null,
            leftUdaljenostParent: null,


            redovi: null,
            brojRedova: null,
            kolone: null,
            brojKolona: null,
            tabovi: null,
            trenutnoOznaceniTab: null,
            brojTabova: null,
            brojTrenutnoOznacenogTaba: null,
            radioDugmadi: null,
            brojOpcijaRadioDugmadi: null,
            trenutnoOznacenoRadioDugme: null,
            brojTrenutnoOznacenogRadioDugmeta: null,
            checkboxovi: null,
            brojOpcijaCheckboxova: null,
            oznaceniCheckboxovi: null,
            brojTrenutnoOznacenogCheckboxa: null,
            sviOznaceniCheckboxovi: [],
            neoznaceniCheckboxovi: null,
            brojTrenutnoNeoznacenogCheckboxa: null,
            vertikalnaLista: null,
            brojOpcijaVertikalneListe: null,
            horizontalnaLista: null,
            brojOpcijaHorizontalneListe: null,

            listaDodatnihOpcija: null,

            alignmentRadioDugmadi: null,

            dodatneOpcijeLabela: null
        },
        vrijednostZIndexa: 1,
        //vrijednostZIza: 1,
        posljednjeObrisaniElement: null,
        roditeljPosljednjeObrisanogElementa: null,
        nizJedanUnutarDrugog: [],
        listaMockupa: null,
        searchBoxText: "",
        prikazDesnogToolbara: false,
        bojaElementa: null
    }

    componentDidMount() {
        let objekat = this.state.dodatneOpcijeElementi;
        objekat.strelicaToolbara = this.strelicaToolbaraReferenca.current;
        this.setState({
            dodatneOpcijeElementi: objekat,
            desniToolbar: this.desniToolbarReferenca.current
        })
    }

    promjenaVrijednostiZIndexa(novaVrijednost) {
        this.setState({
            vrijednostZIndexa: novaVrijednost
        });
    }

    offset(el) {
        let rect = el.getBoundingClientRect(),
            f = this.state.glavniDio.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop - f.top, left: rect.left + scrollLeft - f.left }
    }

    kliknutoNaStrelicuToolbara() {
        this.state.dodatneOpcijeElementi.strelicaToolbara.style.display = "none";
        this.setState({
            prikazDesnogToolbara: true
        });
        //this.state.desniToolbar.style.display = "inline";
        //this.onemoguciKlikUToolbaru(true);
    }

    onemoguciKlikUToolbaru(onemogucen) {
        this.state.dodatneOpcijeElementi.unosIdTrenutnogElementa.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.unosKlaseTrenutnogElementa.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.deleteDugme.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.bringToFrontDugme.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.sendToBackDugme.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.fontElementa.disabled = onemogucen;

        this.state.dodatneOpcijeElementi.unosTopUdaljenosti.disabled = onemogucen;
        this.state.dodatneOpcijeElementi.unosLeftUdaljenosti.disabled = onemogucen;

        this.state.unosVisineTextBoxOmogucen = !onemogucen;
        this.state.unosVisineSelectOmogucen = !onemogucen;
        this.state.unosSirineTextBoxOmogucen = !onemogucen;
        this.state.unosSirineSelectOmogucen = !onemogucen;
    }

    search(tekst) {
        //let tekst = this.state.searchBoxText;
        console.log("Tekst je: ", tekst);
        console.log("Sva djeca su: ", this.state.listaMockupa.childNodes);

        for (let i = 0; i < this.state.listaMockupa.childNodes.length; i++) {
            this.state.listaMockupa.childNodes[i].style.display = "flex";
        }

        for (let i = 0; i < this.state.listaMockupa.childNodes.length; i++) {
            //console.log("I je: ", i);
            //console.log("Djeca su: ", this.state.listaMockupa.childNodes[i]);
            //console.log("Title je: ", this.state.listaMockupa.childNodes[i].getElementsByTagName("div")[0].title);
            if (!this.state.listaMockupa.childNodes[i].getElementsByTagName("div")[0].title.toLowerCase().includes(tekst.toLowerCase())) {
                this.state.listaMockupa.childNodes[i].style.display = "none";
            }
        }
    }

    odrediUdaljenost() {
        let oznacenaDjeca = vratiSveOznaceneElemente();

        if (oznacenaDjeca.length === 2) {
            let pozicija = odrediPozicijuElemenata(oznacenaDjeca)
            let jedanIspodDva = pozicija.ispod;
            let jedanDesnoOdDva = pozicija.desno;

            if (jedanIspodDva.length !== 0) {
                let elementIspod = document.getElementById(jedanIspodDva[0][0]);
                let elementIznad = document.getElementById(jedanIspodDva[0][1]);
                let offsetIznad = this.offset(elementIznad);
                let offsetIspod = this.offset(elementIspod);

                this.setState({
                    vertikalnaUdaljenostOmogucen: true
                });
                this.setState({
                    vertikalnaUdaljenostSelectOmogucen: true
                });

                if (this.state.izabranaMjernaJedinica[2] === "px") {
                    let pocetnaIspod = (offsetIspod.top - offsetIznad.top - parseFloat(elementIznad.style.height)).toFixed(0);

                    this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2] = parseInt(pocetnaIspod);
                }
                else if (this.state.izabranaMjernaJedinica[2] === "%") {
                    let pomocna = offsetIspod.top - offsetIznad.top - parseFloat(elementIznad.style.height);
                    let pocetnaIspodPosto = ((pomocna / this.state.glavniDio.offsetHeight) * 100).toFixed(0);

                    this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2] = parseInt(pocetnaIspodPosto);
                }
            }
            else {
                this.setState({
                    vertikalnaUdaljenostOmogucen: false
                });
                this.setState({
                    vertikalnaUdaljenostSelectOmogucen: false
                });

                this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2] = "";
            }

            if (jedanDesnoOdDva.length !== 0) {
                let elementDesno = document.getElementById(jedanDesnoOdDva[0][0]);
                let elementLijevo = document.getElementById(jedanDesnoOdDva[0][1]);
                let offsetDesno = this.offset(elementDesno);
                let offsetLijevo = this.offset(elementLijevo);

                this.setState({
                    horizontalnaUdaljenostOmogucen: true
                });
                this.setState({
                    horizontalnaUdaljenostSelectOmogucen: true
                });

                if (this.state.izabranaMjernaJedinica[3] === "px") {
                    let pocetnaDesno = (offsetDesno.left - offsetLijevo.left - parseFloat(elementLijevo.style.width)).toFixed(0);
                    this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3] = parseInt(pocetnaDesno);
                }
                else if (this.state.izabranaMjernaJedinica[3] === "%") {
                    let pomocna = offsetDesno.left - offsetLijevo.left - parseFloat(elementLijevo.style.width);
                    let pocetnaDesnoPosto = ((pomocna / this.state.glavniDio.offsetWidth) * 100).toFixed(0);

                    this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3] = parseInt(pocetnaDesnoPosto);
                }
            }
            else {
                this.setState({
                    horizontalnaUdaljenostOmogucen: false
                });
                this.setState({
                    horizontalnaUdaljenostSelectOmogucen: false
                });
                this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3] = "";
            }
        }
        else {
            this.setState({
                vertikalnaUdaljenostOmogucen: false
            });
            this.setState({
                vertikalnaUdaljenostSelectOmogucen: false
            });
            this.setState({
                horizontalnaUdaljenostOmogucen: false
            });
            this.setState({
                horizontalnaUdaljenostSelectOmogucen: false
            });
            this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2] = "";
            this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3] = "";
        }
    }

    promjenaSearchTexta(e) {
        this.setState({
            searchBoxText: e.target.value
        })
        if (e.target.value === "") {
            this.search("");
        }
    }

    promjenaIdElementa(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                id: novaVrijednost
            }
        });
        this.state.trenutnoOznaceniElement.dataset.dodijeljeniid = novaVrijednost;
    }

    promjenaKlaseElementa(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                klasa: novaVrijednost
            }
        });
        this.state.trenutnoOznaceniElement.dataset.dodijeljenaklasa = novaVrijednost;
    }

    promjenaListeDodijeljenihId(staraListaDodijeljenihId, element) {
        this.setState({
            listaDodijeljenihId: [...staraListaDodijeljenihId, element]
        });
    }

    promjenaVrijednostiBrojacaDivova(novaVrijednost) {
        this.setState({
            brojacDivova: novaVrijednost
        });
    }

    promjenaTrenutnoOznacenogElementa(noviElement) {
        this.setState({
            trenutnoOznaceniElement: noviElement
        });
    }

    promijenitVertikalnuUdaljenost(novaVrijednost) {
        let noviNizVrijednosti = [...this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal];
        noviNizVrijednosti[2] = novaVrijednost;

        this.setState({
            vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: noviNizVrijednosti
        });

        pomjeriElement(novaVrijednost === '' ? 0 : novaVrijednost, this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3], this.state.izabranaMjernaJedinica[2], this.state.izabranaMjernaJedinica[3]);
    }

    promijenitHorizontalnuUdaljenost(novaVrijednost) {
        let noviNizVrijednosti = [...this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal];
        noviNizVrijednosti[3] = novaVrijednost;

        this.setState({
            vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: noviNizVrijednosti
        });

        pomjeriElement(this.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2], novaVrijednost === '' ? 0 : novaVrijednost, this.state.izabranaMjernaJedinica[2], this.state.izabranaMjernaJedinica[3]);
    }

    promjenaBrojaRedova(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojRedova: novaVrijednost
            }
        });
        kreirajNovuTabelu(this.state.trenutnoOznaceniElement, novaVrijednost, this.state.dodatneOpcijeElementi.brojKolona);
    }

    promjenaBrojaKolona(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojKolona: novaVrijednost
            }
        });
        kreirajNovuTabelu(this.state.trenutnoOznaceniElement, this.state.dodatneOpcijeElementi.brojRedova, novaVrijednost);
    }

    promjenaBrojaTabova(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojTabova: novaVrijednost
            }
        });
        kreirajNovuListuTabova(this.state.trenutnoOznaceniElement, novaVrijednost, this.state.dodatneOpcijeElementi.brojTrenutnoOznacenogTaba);
    }

    promjenaTrenutnoOznacenogTaba(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojTrenutnoOznacenogTaba: novaVrijednost
            }
        });
        kreirajNovuListuTabova(this.state.trenutnoOznaceniElement, this.state.dodatneOpcijeElementi.brojTabova, novaVrijednost);
    }

    promjenaBrojaRadioDugmadi(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojOpcijaRadioDugmadi: novaVrijednost
            }
        });
        kreirajNovuListuRadioDugmadi(this.state.trenutnoOznaceniElement, novaVrijednost, this.state.dodatneOpcijeElementi.brojTrenutnoOznacenogRadioDugmeta);
    }

    promjenaTrenutnoOznacenogRadioDugmeta(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojTrenutnoOznacenogRadioDugmeta: novaVrijednost
            }
        });
        kreirajNovuListuRadioDugmadi(this.state.trenutnoOznaceniElement, this.state.dodatneOpcijeElementi.brojOpcijaRadioDugmadi, novaVrijednost);
    }

    promjenaBrojaCheckboxova(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojOpcijaCheckboxova: novaVrijednost
            }
        });
        kreirajNovuListuCheckboxova(this.state.trenutnoOznaceniElement, novaVrijednost, null, null, this.state.dodatneOpcijeElementi.sviOznaceniCheckboxovi);
    }

    promjenaTrenutnoOznacenogCheckboxa(novaVrijednost) {
        let noviBrojSvihOznacenihCheckboxova = [...this.state.dodatneOpcijeElementi.sviOznaceniCheckboxovi];
        if (!noviBrojSvihOznacenihCheckboxova.includes(novaVrijednost))
            noviBrojSvihOznacenihCheckboxova.push(novaVrijednost);
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojTrenutnoOznacenogCheckboxa: novaVrijednost,
                sviOznaceniCheckboxovi: noviBrojSvihOznacenihCheckboxova
            }
        });
        kreirajNovuListuCheckboxova(this.state.trenutnoOznaceniElement, this.state.dodatneOpcijeElementi.brojOpcijaCheckboxova, novaVrijednost, null, noviBrojSvihOznacenihCheckboxova);
    }

    promjenaTrenutnoNeoznacenogCheckboxa(novaVrijednost) {
        let noviBrojSvihOznacenihCheckboxova = [...this.state.dodatneOpcijeElementi.sviOznaceniCheckboxovi];
        noviBrojSvihOznacenihCheckboxova = noviBrojSvihOznacenihCheckboxova.filter(element => {
            return element !== novaVrijednost;
        });
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojTrenutnoNeoznacenogCheckboxa: novaVrijednost,
                sviOznaceniCheckboxovi: noviBrojSvihOznacenihCheckboxova
            }
        });
        kreirajNovuListuCheckboxova(this.state.trenutnoOznaceniElement, this.state.dodatneOpcijeElementi.brojOpcijaCheckboxova, null, novaVrijednost, noviBrojSvihOznacenihCheckboxova);
    }

    promjenaBrojaElemenataVertikalneListe(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojOpcijaVertikalneListe: novaVrijednost
            }
        });
        kreirajNovuVertikalnuListu(this.state.trenutnoOznaceniElement, novaVrijednost);
    }

    promjenaBrojaElemenataHorizontalneListe(novaVrijednost) {
        this.setState({
            dodatneOpcijeElementi: {
                ...this.state.dodatneOpcijeElementi,
                brojOpcijaHorizontalneListe: novaVrijednost
            }
        });
        kreirajNovuHorizontalnuListu(this.state.trenutnoOznaceniElement, novaVrijednost);
    }

    promjenaPrikazaDesnogToolbara(novaVrijednost) {
        console.log('promjena: ');
        if (!novaVrijednost)
            this.state.dodatneOpcijeElementi.strelicaToolbara.style.display = "flex";
        this.setState({
            prikazDesnogToolbara: novaVrijednost
        });
    }

    promjenaTopUdaljenosti(novaVrijednost) {
        if (novaVrijednost === "") {
            alert("Field cannot be empty!");
        }

        else if (novaVrijednost < 0 || novaVrijednost > this.state.glavniDio.offsetHeight) {
            alert("Numbers between 1 and height of screen are allowed for this field");
        }
        else {
            if (novaVrijednost !== null && this.state.trenutnoOznaceniElement !== null) {
                let staraVrijednost = this.state.dodatneOpcijeElementi.topUdaljenost;

                this.setState({
                    dodatneOpcijeElementi: {
                        ...this.state.dodatneOpcijeElementi,
                        topUdaljenost: novaVrijednost,
                        topUdaljenostParent: this.state.dodatneOpcijeElementi.topUdaljenostParent + parseInt(novaVrijednost - staraVrijednost)
                    }
                });

                let vrijednostTranslacije = parseInt(this.state.trenutnoOznaceniElement.dataset.y) + (novaVrijednost - staraVrijednost);
                this.state.trenutnoOznaceniElement.dataset.y = vrijednostTranslacije;
                this.state.trenutnoOznaceniElement.style.transform = `translate(${this.state.trenutnoOznaceniElement.dataset.x}px, ${vrijednostTranslacije}px)`;
            }
        }
    }

    promjenaLeftUdaljenosti(novaVrijednost) {
        if (novaVrijednost === "") {
            alert("Field cannot be empty!");
        }

        else if (novaVrijednost < 0 || novaVrijednost > this.state.glavniDio.offsetWidth - 30) {
            alert("Numbers between 1 and width of screen are allowed for this field");
        }
        else {
            if (novaVrijednost !== null && this.state.trenutnoOznaceniElement !== null) {
                let staraVrijednost = this.state.dodatneOpcijeElementi.leftUdaljenost;

                this.setState({
                    dodatneOpcijeElementi: {
                        ...this.state.dodatneOpcijeElementi,
                        leftUdaljenost: novaVrijednost,
                        leftUdaljenostParent: this.state.dodatneOpcijeElementi.leftUdaljenostParent + parseInt(novaVrijednost - staraVrijednost)
                    }
                });

                let vrijednostTranslacije = parseInt(this.state.trenutnoOznaceniElement.dataset.x) + (novaVrijednost - staraVrijednost);
                this.state.trenutnoOznaceniElement.dataset.x = vrijednostTranslacije;
                this.state.trenutnoOznaceniElement.style.transform = `translate(${vrijednostTranslacije}px, ${this.state.trenutnoOznaceniElement.dataset.y}px)`;
            }
        }
    }

    promjenaTopUdaljenostiOdParenta(novaVrijednost) {
        if (novaVrijednost === "") {
            alert("Field cannot be empty!");
        }

        else if (novaVrijednost < 0 || novaVrijednost > this.state.trenutnoOznaceniElement.parentNode.offsetHeight) {
            alert("Numbers between 1 and height of screen are allowed for this field");
        }
        else {
            if (novaVrijednost !== null && this.state.trenutnoOznaceniElement !== null) {
                let staraVrijednost = this.state.dodatneOpcijeElementi.topUdaljenostParent;

                this.setState({
                    dodatneOpcijeElementi: {
                        ...this.state.dodatneOpcijeElementi,
                        topUdaljenostParent: novaVrijednost,
                        topUdaljenost: this.state.dodatneOpcijeElementi.topUdaljenost + parseInt(novaVrijednost - staraVrijednost)
                    }
                });

                let vrijednostTranslacije = parseInt(this.state.trenutnoOznaceniElement.dataset.y) + (novaVrijednost - staraVrijednost);
                this.state.trenutnoOznaceniElement.dataset.y = vrijednostTranslacije;
                this.state.trenutnoOznaceniElement.style.transform = `translate(${this.state.trenutnoOznaceniElement.dataset.x}px, ${vrijednostTranslacije}px)`;
            }
        }
    }

    promjenaLeftUdaljenostiOdParenta(novaVrijednost) {
        if (novaVrijednost === "") {
            alert("Field cannot be empty!");
        }

        else if (novaVrijednost < 0 || novaVrijednost > this.state.trenutnoOznaceniElement.parentNode.offsetWidth) {
            alert("Numbers between 1 and width of screen are allowed for this field");
        }
        else {
            if (novaVrijednost !== null && this.state.trenutnoOznaceniElement !== null) {
                let staraVrijednost = this.state.dodatneOpcijeElementi.leftUdaljenostParent;

                this.setState({
                    dodatneOpcijeElementi: {
                        ...this.state.dodatneOpcijeElementi,
                        leftUdaljenostParent: novaVrijednost,
                        leftUdaljenost: this.state.dodatneOpcijeElementi.leftUdaljenost + parseInt(novaVrijednost - staraVrijednost)
                    }
                });


                let vrijednostTranslacije = parseInt(this.state.trenutnoOznaceniElement.dataset.x) + (novaVrijednost - staraVrijednost);
                this.state.trenutnoOznaceniElement.dataset.x = vrijednostTranslacije;
                this.state.trenutnoOznaceniElement.style.transform = `translate(${vrijednostTranslacije}px, ${this.state.trenutnoOznaceniElement.dataset.y}px)`;

            }
        }
    }

    render() {
        return (<>
            <Row>
                <Col xs="3" style={{ padding: "0px", borderRight: "1px solid #ced4da" }}>
                    <Zaglavlje data={this}></Zaglavlje>
                    
                    <InputGroup className="p-3" style={{ borderBottom: "1px solid #ced4da", background: "#6c757d"}}>
                        <FormControl ref={this.searchTextBoxReferenca}
                            id="searchText"
                            placeholder="Search"
                            value={this.state.searchBoxText}
                            onChange={(e) => { this.promjenaSearchTexta(e) }}
                            type={'search'}
                            style={{marginLeft: "20px" }}
                        />
                        <Button variant="outline-secondary"
                            style={{ background: "#ced4da", borderColor: "#ced4da" }}
                            id="searchButton"
                            onClick={() => { this.search(this.state.searchBoxText) }}
                        >
                            <i className="bi bi-search"></i>
                        </Button>
                    </InputGroup>

                    <MockupLijevo data={this} />
                </Col>
                <Col xs="9" style={{ padding: "0px" }}>
                    <MockupGlavni data={this} />
                </Col>
                <div id="strelicaToolbara" ref={this.strelicaToolbaraReferenca} style={{ zIndex: 5 }}>
                    <button onClick={() => { this.kliknutoNaStrelicuToolbara() }}>
                        <i className="bi bi-chevron-double-left"></i>
                    </button>
                </div>
            </Row>

            <div id="desniToolbar" ref={this.desniToolbarReferenca}>
                <Offcanvas show={this.state.prikazDesnogToolbara}
                    onHide={() => { this.promjenaPrikazaDesnogToolbara(false) }}
                    placement={'end'}
                    backdrop={false}
                    scroll={true}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Options</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <MockupDesniToolbar data={this} />
                    </Offcanvas.Body>
                </Offcanvas>
            </div>


        </>);
    }
}

export default MockupCitav;