import React, { Component } from 'react';

import 'interactjs'

import { daLiMuJeRoditeljDiv, offset } from "../dodatneFunkcije.js"

class MockupGlavni extends Component {
    state = {

    }

    constructor(props) {
        super(props);

        //funkcije
        this.kliknutoNaElementUGlavnom = this.kliknutoNaElementUGlavnom.bind(this);

        //refs
        this.glavniDioReferenca = React.createRef();
    }

    componentDidMount() {
        this.props.data.state.glavniDio = this.glavniDioReferenca.current;
    }

    kliknutoNaElementUGlavnom(e) {
        console.log("trenutno oznaceni element " + e.target.nodeName);
        this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "none";

        if (e.target && e.target.nodeName === "DIV" && e.target.id !== "glavni" && e.target.id !== "") {
            console.log('div node if');
            this.props.data.state.trenutnoOznaceniElement = e.target;
            let mjernaJedinica = [...this.props.data.state.izabranaMjernaJedinica];

            //POSTAVI VISINU I SIRINU elemenata u desnom toolbaru
            if (this.props.data.state.trenutnoOznaceniElement.dataset.sirinapikseli === 'false') { //uslov je promijenjen
                let parent = this.props.data.state.trenutnoOznaceniElement.offsetParent || this.props.data.state.trenutnoOznaceniElement;
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[0] = ((this.props.data.state.trenutnoOznaceniElement.offsetWidth / parent.offsetWidth) * 100).toFixed(0);
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                });
                mjernaJedinica[0] = '%';
            }
            else { //uslov promijenjen
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[0] = this.props.data.state.trenutnoOznaceniElement.offsetWidth;
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                });

                mjernaJedinica[0] = 'px'; //ovo je dodano
            }

            if (this.props.data.state.trenutnoOznaceniElement.dataset.visinapikseli === 'false') { //uslov promijenjen
                let parent = this.props.data.state.trenutnoOznaceniElement.offsetParent || this.props.data.state.trenutnoOznaceniElement;
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[1] = ((this.props.data.state.trenutnoOznaceniElement.offsetHeight / parent.offsetHeight) * 100).toFixed(0);
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                });

                mjernaJedinica[1] = '%'; //ovo je dodano
            }
            else { //uslov promijenjen
                let novaLista = this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal;
                novaLista[1] = this.props.data.state.trenutnoOznaceniElement.offsetHeight;
                this.props.data.setState({
                    vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal: novaLista
                });

                mjernaJedinica[1] = 'px'; //ovo je dodano
            }

            this.props.data.setState({
                izabranaMjernaJedinica: mjernaJedinica //ovo je dodano
            });

            //prikazivanje kontura elementa kad je element oznacen u divu glavni
            this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
            if (this.props.data.state.trenutnoOznaceniElement.parentNode.id !== "glavni") {
                this.props.data.state.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
            }

            //onemoguci inpute za horizontal i vertical
            this.props.data.state.vertikalnaUdaljenostOmogucen = false;
            this.props.data.state.vertikalnaUdaljenostSelectOmogucen = false;
            this.props.data.state.horizontalnaUdaljenostOmogucen = false;
            this.props.data.state.horizontalnaUdaljenostSelectOmogucen = false;
            this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[2] = "";
            this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal[3] = "";


            //prethodno oznaceni element
            if (this.props.data.state.prethodnoOznaceniElement !== null &&
                this.props.data.state.prethodnoOznaceniElement !== undefined &&
                this.props.data.state.prethodnoOznaceniElement !== this.props.data.state.trenutnoOznaceniElement) {
                if (window.event.shiftKey) {
                    this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
                    if (this.props.data.state.prethodnoOznaceniElement !== null &&
                        this.props.data.state.trenutnoOznaceniElement !== null) {
                        this.props.data.odrediUdaljenost();
                    }
                }
                else {
                    if (this.props.data.state.prethodnoOznaceniElement !== null &&
                        this.props.data.state.prethodnoOznaceniElement !== undefined) {
                        let svaDjeca = this.glavniDioReferenca.current.getElementsByTagName("div");
                        for (let i = 0; i < svaDjeca.length; i++) {
                            svaDjeca[i].style.boxShadow = "";
                        }
                        this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
                        if (this.props.data.state.trenutnoOznaceniElement.parentNode.id !== "glavni") {
                            this.props.data.state.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
                        }
                    }
                }
            }
            else {
                if (window.event.shiftKey) {
                    if (this.props.data.state.brojacOznacenih % 2 === 0) {
                        this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "";
                        this.props.data.odrediUdaljenost();
                        this.props.data.setState({
                            brojacOznacenih: this.props.data.state.brojacOznacenih + 1
                        })
                        //brojacOznacenih++;
                    }
                    else {
                        this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
                        this.props.data.odrediUdaljenost();
                        this.props.data.setState({
                            brojacOznacenih: 0
                        })
                    }
                }
            }
            this.props.data.state.prethodnoOznaceniElement = this.props.data.state.trenutnoOznaceniElement;
            console.log("Prethodno je oznacen " + this.props.data.state.prethodnoOznaceniElement);

            //uklanjanje prikaza streliceToolbara
            this.props.data.state.dodatneOpcijeElementi.strelicaToolbara.style.display = "none";

            //prikazi desni toolbar
            //this.props.data.state.desniToolbar.style.display = "flex";

            //console.log("Vertikalna lista ", this.props.data.state.dodatneOpcijeElementi);
            //prikazivanje opcija sa desne strane
            //this.props.data.state.dodatneOpcijeElementi.vertikalnaLista.style.display = "inline";
            //this.props.data.state.dodatneOpcijeElementi.vertikalnaLista.style.zIndex = this.props.data.state.zIndex + 1;


            //omoguci klik u desnom toolbaru
            this.props.data.onemoguciKlikUToolbaru(false);

            //upisi naziv odabranog predmeta
            this.props.data.state.dodatneOpcijeElementi.nazivOdabranogPredmeta.innerHTML = this.props.data.state.trenutnoOznaceniElement.title;
            if (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length !== 0) {
                this.props.data.state.dodatneOpcijeElementi.fontElementa.value = window.getComputedStyle(this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li")[0]).fontSize.slice(0, -2);
            }
            else if (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("td").length !== 0) {
                this.props.data.state.dodatneOpcijeElementi.fontElementa.value = window.getComputedStyle(this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("td")[0]).fontSize.slice(0, -2);
            }
            else {
                this.props.data.state.dodatneOpcijeElementi.fontElementa.value = window.getComputedStyle(this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("p")[0]).fontSize.slice(0, -2);
            }


            //prikaz id-a
            this.props.data.state.dodatneOpcijeElementi.id = this.props.data.state.trenutnoOznaceniElement.dataset.dodijeljeniid;
            //prikaz klase
            this.props.data.state.dodatneOpcijeElementi.klasa = this.props.data.state.trenutnoOznaceniElement.dataset.dodijeljenaklasa;

            this.props.data.state.dodatneOpcijeElementi.sekcijaOdnosSaRoditeljom.style.display = "none";
            //prikaz roditelja (polje je disabled, tj ne moze se editovati)
            if (this.props.data.state.trenutnoOznaceniElement.parentNode !== undefined &&
                this.props.data.state.trenutnoOznaceniElement.parentNode !== null &&
                this.props.data.state.trenutnoOznaceniElement.parentNode.id != "glavni") {
                this.props.data.state.dodatneOpcijeElementi.sekcijaOdnosSaRoditeljom.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.roditelj = this.props.data.state.trenutnoOznaceniElement.parentNode.dataset.dodijeljeniid;

                this.props.data.state.dodatneOpcijeElementi.topUdaljenostParent = offset(this.props.data.state.trenutnoOznaceniElement).top - offset(this.props.data.state.trenutnoOznaceniElement.parentNode).top;
                this.props.data.state.dodatneOpcijeElementi.leftUdaljenostParent = offset(this.props.data.state.trenutnoOznaceniElement).left - offset(this.props.data.state.trenutnoOznaceniElement.parentNode).left;
            }



            console.log("OFFSET je:", offset(this.props.data.state.trenutnoOznaceniElement));
            //prikaz udaljenosti od gornjeg i lijevog coska
            this.props.data.state.dodatneOpcijeElementi.topUdaljenost = offset(this.props.data.state.trenutnoOznaceniElement).top;
            this.props.data.state.dodatneOpcijeElementi.leftUdaljenost = offset(this.props.data.state.trenutnoOznaceniElement).left;

            //prikaz boje elementa            
            function componentToHex(c) {
                let hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }

            function rgbToHex(r, g, b) {
                return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
              }

            let boja = window.getComputedStyle(this.props.data.state.trenutnoOznaceniElement).getPropertyValue("background-color").toString();
            boja = boja.replace("rgb", "");
            boja = boja.replace("(", "");
            boja = boja.replace(")", "");
            
            let nizBoja = boja.split(/\s*,\s*/);
            this.props.data.state.bojaElementa = rgbToHex(parseInt(nizBoja[0]),parseInt(nizBoja[1]),parseInt(nizBoja[2]));

            //omogucavanje dodatnih elemenata Toolbara
            let sveDodatneOpcije = this.props.data.state.dodatneOpcijeElementi.listaDodatnihOpcija.getElementsByTagName("li");
            for (let i = 0; i < sveDodatneOpcije.length; i++) {
                sveDodatneOpcije[i].style.display = "none";
            }

            //ako je element TABELA
            if (this.props.data.state.trenutnoOznaceniElement.title === "Table") {
                this.props.data.state.dodatneOpcijeElementi.redovi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.kolone.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";

                let brojRedovaTabele = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("tr").length;
                this.props.data.state.dodatneOpcijeElementi.brojRedova = brojRedovaTabele;
                this.props.data.state.dodatneOpcijeElementi.brojKolona = (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("td").length + this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("th").length) / brojRedovaTabele;
            }
            //ako je element TAB
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Tabs") {
                this.props.data.state.dodatneOpcijeElementi.tabovi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.trenutnoOznaceniTab.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";
                this.props.data.state.dodatneOpcijeElementi.brojTabova = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length;

                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li")[i].getElementsByTagName('a')[0].className.includes('active')) {
                        this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogTaba = i + 1;
                        break;
                    }
                }
            }
            //ako je element RADIO BUTTON
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Radio Button") {
                this.props.data.state.dodatneOpcijeElementi.radioDugmadi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.trenutnoOznacenoRadioDugme.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";
                this.props.data.state.dodatneOpcijeElementi.brojOpcijaRadioDugmadi = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length;

                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li")[i].className === "oznacena") {
                        this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogRadioDugmeta = i + 1;
                        break;
                    }
                }
            }
            //ako je element CHECKBOX
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Checkbox") {
                this.props.data.state.dodatneOpcijeElementi.checkboxovi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.oznaceniCheckboxovi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.neoznaceniCheckboxovi.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";
                this.props.data.state.dodatneOpcijeElementi.brojOpcijaCheckboxova = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length;

                let trenutnoOznaceniCheckboxovi = [];
                for (let i = 0; i < this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length; i++) {
                    if (this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li")[i].className === "checkboxOznacena") {
                        trenutnoOznaceniCheckboxovi.push((i + 1).toString());
                    }
                }
                this.props.data.state.dodatneOpcijeElementi.sviOznaceniCheckboxovi = trenutnoOznaceniCheckboxovi;
                this.props.data.state.dodatneOpcijeElementi.brojTrenutnoOznacenogCheckboxa = parseInt(trenutnoOznaceniCheckboxovi[0]);
            }

            // ako je element VERTIKALNA LISTA
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Vertical List") {
                this.props.data.state.dodatneOpcijeElementi.vertikalnaLista.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";
                this.props.data.state.dodatneOpcijeElementi.brojOpcijaVertikalneListe = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length;
            }

            // ako je element HORIZONTALNA LISTA
            else if (this.props.data.state.trenutnoOznaceniElement.title === "Horizontal List") {
                this.props.data.state.dodatneOpcijeElementi.horizontalnaLista.style.display = "flex";
                this.props.data.state.dodatneOpcijeElementi.dodatneOpcijeLabela.style.display = "block";
                this.props.data.state.dodatneOpcijeElementi.brojOpcijaHorizontalneListe = this.props.data.state.trenutnoOznaceniElement.getElementsByTagName("li").length;
            }

            //namjesti poravnanje
            if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "lijevo") {
                document.getElementById("radioDugme1").click();
            }
            else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "centar") {
                document.getElementById("radioDugme2").click();
            }
            else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "desno") {
                document.getElementById("radioDugme3").click();
            }
            else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "justify") {
                document.getElementById("radioDugme4").click();
            }
        }

        else if (e.target && e.target.id !== "glavni") {
            console.log('div node else if');
            let roditelj = daLiMuJeRoditeljDiv(e.target);
            console.log("\nNasao sam roditelja\t" + roditelj);
            if (roditelj !== null) {
                this.props.data.state.trenutnoOznaceniElement = document.getElementById(roditelj);
                if (this.props.data.state.prethodnoOznaceniElement !== this.props.data.state.trenutnoOznaceniElement) {
                    if (window.event.shiftKey) {
                        this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
                        if (this.props.data.state.prethodnoOznaceniElement !== null &&
                            this.props.data.state.trenutnoOznaceniElement !== null) {
                            this.props.data.odrediUdaljenost();
                        }
                    }
                    else {
                        if (this.props.data.state.prethodnoOznaceniElement !== null && this.props.data.state.prethodnoOznaceniElement !== undefined) {
                            let svaDjeca = this.props.data.state.glavniDio.getElementsByTagName("div");
                            for (let i = 0; i < svaDjeca.length; i++) {
                                svaDjeca[i].style.boxShadow = "";
                            }
                            this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "0 0 0 2px #20c997";
                            if (this.props.data.state.trenutnoOznaceniElement.parentNode.id !== "glavni") {
                                this.props.data.state.trenutnoOznaceniElement.parentNode.style.boxShadow = "0 0 0 1px #6c727a";
                            }
                        }
                        //else {
                        this.props.data.state.trenutnoOznaceniElement.click();
                        //}
                    }
                }
                else {
                    if (window.event.shiftKey) {
                        if (this.props.data.state.trenutnoOznaceniElement.style.boxShadow === "rgb(32, 201, 151) 0px 0px 0px 2px") {
                            this.props.data.state.trenutnoOznaceniElement.style.boxShadow = "";
                            this.props.data.odrediUdaljenost();
                        }
                        else {
                            this.props.data.state.trenutnoOznaceniElement.click();
                            this.props.data.odrediUdaljenost();
                        }
                    }
                    else this.props.data.state.trenutnoOznaceniElement.click();
                }
                this.props.data.state.prethodnoOznaceniElement = this.props.data.state.trenutnoOznaceniElement;


                //namjesti poravnanje
                if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "lijevo") {
                    document.getElementById("radioDugme1").click();
                }
                else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "centar") {
                    document.getElementById("radioDugme2").click();
                }
                else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "desno") {
                    document.getElementById("radioDugme3").click();
                }
                else if (this.props.data.state.trenutnoOznaceniElement.dataset.poravnanje === "justify") {
                    document.getElementById("radioDugme4").click();
                }
            }
            else {
                this.props.data.state.trenutnoOznaceniElement = null;
                this.props.data.state.prethodnoOznaceniElement = null;
                //sakrij desni toolbar NOVI KOD
                //this.props.data.state.desniToolbar.style.display = "none";
            }
        }
        else {
            console.log('div node else');
            this.props.data.state.trenutnoOznaceniElement = null;
            this.props.data.state.vrijednostiUInputimaZaSirinuVisinuVerticalHorizontal = [0, 0, 0, 0];
            this.props.data.state.izabranaMjernaJedinica = ["px", "px", "px", "px"];
            this.props.data.state.dodatneOpcijeElementi.vertikalnaLista.style.display = "none";

            this.props.data.state.dodatneOpcijeElementi.vertikalnaUdaljenostOmogucen = false;
            this.props.data.state.dodatneOpcijeElementi.vertikalnaUdaljenostSelectOmogucen = false;
            this.props.data.state.dodatneOpcijeElementi.horizontalnaUdaljenostOmogucen = false;
            this.props.data.state.dodatneOpcijeElementi.horizontalnaUdaljenostSelectOmogucen = false;

            if (this.props.data.state.prethodnoOznaceniElement !== null &&
                this.props.data.state.prethodnoOznaceniElement !== undefined &&
                this.props.data.state.prethodnoOznaceniElement !== this.props.data.state.trenutnoOznaceniElement) {
                let svaDjeca = this.props.data.state.glavniDio.getElementsByTagName("div");
                for (let i = 0; i < svaDjeca.length; i++) {
                    svaDjeca[i].style.boxShadow = "";
                }
                this.props.data.state.prethodnoOznaceniElement.style.boxShadow = "";
            }
            this.props.data.state.prethodnoOznaceniElement = null;

            //prikazi strelicuToolbara
            this.props.data.promjenaPrikazaDesnogToolbara(false);
            this.props.data.state.dodatneOpcijeElementi.strelicaToolbara.style.display = "flex";
            //this.props.data.state.dodatneOpcijeElementi.strelicaToolbara.style.zIndex = this.props.data.state.vrijednostZ + 1;


            //sakrij desni toolbar NOVI KOD
            //this.props.data.state.desniToolbar.style.display = "none";
        }
        console.log("trenutno je oznacen ", this.props.data.state.trenutnoOznaceniElement);
    }

    render() {
        return (<div id="glavni" ref={this.glavniDioReferenca}
            onClick={async (e) => {
                await this.props.data.promjenaPrikazaDesnogToolbara(true);
                this.kliknutoNaElementUGlavnom(e)
            }}
            style={{ zIndex: 1 }}>
        </div>);
    }
}

export default MockupGlavni;