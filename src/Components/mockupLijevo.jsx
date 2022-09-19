import React, { Component } from 'react';
import { TabContent, TabPane, NavItem, NavLink, Nav } from "reactstrap";

class MockupLijevo extends Component {
    state = {}

    constructor(props) {
        super(props);

        //funkcije
        this.kliknutoNaElementLijevo = this.kliknutoNaElementLijevo.bind(this);

        //refs
        this.listaMockupaReferenca = React.createRef();
    }

    componentDidMount() {
        this.props.data.state.listaMockupa = this.listaMockupaReferenca.current;
        console.log("Mockup lijevo: ", this.props.data.state);
    }

    kliknutoNaElementLijevo(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("Kliknut je   " + e.target.nodeName);
        //console.log("Dimenzije su OKURRRRRRRR: ", this.props.data.state.glavniDio.getBoundingClientRect());

        if (e.target && e.target.nodeName === "DIV") {
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
            let rect = this.props.data.state.glavniDio.getBoundingClientRect();

            //pozicioniranje Mockupa
            e2.style.position = "absolute";
            e2.style.left = rect.left;
            e2.style.top = rect.top;

            e2.style.width = e.target.offsetWidth + "px";
            e2.style.height = e.target.offsetHeight + "px";

            //Omogucavanje editovanja paragrafa na dupliClick
            if (e2.getElementsByTagName("p")[0] != null) {
                for (let i = 0; i < e2.getElementsByTagName("p").length; i++) {
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
                for (let i = 0; i < e2.getElementsByTagName("li").length; i++) {
                    e2.getElementsByTagName("li")[i].setAttribute("onclick", "this.contentEditable=false;");
                    e2.getElementsByTagName("li")[i].setAttribute("ondblclick", "this.contentEditable=true;this.focus();");
                    e2.getElementsByTagName("li")[i].style.pointerEvents = "auto";
                }
            }

            //pretrazi sve id-eve
            let sviIdKojiImajuDiv = [];
            for (let i = 0; i < this.props.data.state.glavniDio.getElementsByTagName("div").length; i++) {
                if (this.props.data.state.glavniDio.getElementsByTagName("div")[i].id != null &&
                    this.props.data.state.glavniDio.getElementsByTagName("div")[i].id.substring(0, 3) === "div") {

                    let citavId = this.props.data.state.glavniDio.getElementsByTagName("div")[i].id;
                    if (citavId.substring(3, citavId.length) === parseInt(citavId.substring(3, citavId.length), 10))
                        sviIdKojiImajuDiv.push(citavId.substring(3, citavId.length));
                }
            }

            //sortiraj brojeve
            sviIdKojiImajuDiv.sort((a, b) => { return a - b });
            for (let i = 0; i < sviIdKojiImajuDiv.length; i++) {
                if (this.props.data.state.brojacDivova === sviIdKojiImajuDiv[i]) {
                    this.props.data.state.brojacDivova = this.props.data.state.brojacDivova + 1;
                }
            }


            let noviZIndex = this.props.data.state.vrijednostZIndexa + 1;
            e2.style.zIndex = noviZIndex;
            this.props.data.promjenaVrijednostiZIndexa(noviZIndex);

            //console.log("z", e2.style.zIndex);
            e2.setAttribute("id", "div" + this.props.data.state.brojacDivova);
            //dodatni atribut data-inicijalniId
            e2.setAttribute("data-inicijalniid", "div" + this.props.data.state.brojacDivova);
            e2.setAttribute("data-dodijeljeniid", "div" + this.props.data.state.brojacDivova);
            this.props.data.state.listaDodijeljenihId.push("div" + this.props.data.state.brojacDivova);
            this.props.data.state.brojacDivova = this.props.data.state.brojacDivova + 1;

            //Alignenment elementa
            e2.setAttribute("data-poravnanje", "centar");
            //Dodavanje title kloniranom elementu
            e2.title = e.target.title;
            //console.log("OVO JE      " + e2.title);

            e2.setAttribute("data-visinapikseli", true);
            e2.setAttribute("data-sirinapikseli", true);
            e2.setAttribute("data-dodijeljenaklasa", "");

            //Dodavanje kloniranog elementa glavnom divu
            this.props.data.state.glavniDio.appendChild(e2);
        }
        console.log("OKURRRRRR: ", this.props.data.state.trenutnoOznaceniElement);
    }

    render() {
        return (
            <div id="lijevo" onClick={(e) => { this.kliknutoNaElementLijevo(e) }}>
                <ul id="listaMockupa" ref={this.listaMockupaReferenca}>
                    <li className='li-first'>
                        <h4 className='hr-text'><span>Containers</span></h4>
                    </li>

                    <li id="divLi">
                        <div id="divElement" className="divElementKlasa" title="Div">
                            <p>Div</p>
                        </div>
                    </li>
                    <li id="tabDio" className='li-first'>
                        {/*<div id="tab" className="tabKlasa" title="Tabs">
                            
                            <ul id="tabLista" className="tabListaKlasa">
                                <li id="prviLiUTabu" data-oznacen="1">Tab1</li>
                                <li data-oznacen="0">Tab2</li>
                                <li data-oznacen="0">Tab3</li>
                            </ul>
                            
                            <div id="unutrasnji"></div>
                        </div>*/}
                        <TabContent id="tab" title="Tabs">
                            <Nav tabs style={{ flexWrap: "nowrap", pointerEvents: "none" }}>
                                <NavItem>
                                    <NavLink className="active tabElement">
                                        Tab1
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="tabElement">
                                        Tab2
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="tabElement">
                                        Tab3
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent>
                                <TabPane tabId="1">
                                </TabPane>
                                <TabPane tabId="2">
                                </TabPane>
                                <TabPane tabId="3">
                                </TabPane>
                            </TabContent>
                        </TabContent>
                    </li>
            
                    
                    <li className='li-first'>
                        <h4 className='hr-text'><span>Buttons</span></h4>
                    </li>

                    <li>
                        <div id="dugme" className="dugmeKlasa" title="Button">
                            <p style={{ marginTop: "1rem" }}>Button</p>
                        </div>
                    </li>                    
                    <li>
                        <div id="radioButton" className="radioButtonKlasa" title="Radio Button">
                            <ul id="radioButtonLista" className="radioButtonListaKlasa">
                                <li className="neoznacena">
                                    option1
                                </li>
                                <li className="oznacena">
                                    option2
                                </li>
                            </ul>
                        </div>
                    </li>


                    <li className='li-first'>
                        <h4 className='hr-text'><span>Input</span></h4>
                    </li>

                    <li>
                        <div id="inputText" className="inputKlasa" title="Input">
                            <p id="pInputText">Input</p>
                        </div>
                    </li>
                    <li>
                        <div id="spinner" className="spinnerKlasa" title="Number spinner">
                            <p id="pSpinner">Number spinner</p>
                            <div id="spinnerLi">
                                <div id="spinnerStrelicaGoreDiv">
                                    <span id="spinnerStrelicaGoreSpan">▴</span>
                                </div>
                                <div id="spinnerStrelicaDoljeDiv">
                                    <span id="spinnerStrelicaDoljeSpan">▾</span>
                                </div>
                            </div>
                        </div>
                    </li>                    
                    <li>
                        <div id="dropdown" className="dropdownKlasa" title="Dropdown">
                            <p id="pDropdown">Dropdown</p>
                            <div id="dropdownStrelicaDoljeDiv">
                                <span id="dropdownStrelicaDoljeSpan">▾</span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div id="checkbox" className="checkboxKlasa" title="Checkbox">
                            <ul id="checkboxLista" className="checkboxListaKlasa">
                                <li className="checkboxNeoznacena">
                                    option1
                                </li>
                                <li className="checkboxOznacena">
                                    option2
                                </li>
                            </ul>
                        </div>
                    </li>


                    <li className='li-first'>
                        <h4 className='hr-text'><span>Text elements</span></h4>
                    </li>

                    <li>
                        <div id="labela" className="labelaKlasa" title="Label">
                            <p id="pLabela">Label</p>
                        </div>
                    </li>
                    <li>
                        <div id="link" className="linkKlasa" title="Link">
                            <p id="pLink">Link</p>
                        </div>
                    </li>
                    <li>
                        <div id="naslov" className="naslovKlasa" title="Headline">
                            <p id="pNaslov">Headline</p>
                        </div>
                    </li>
                    <li id="parLi">
                        <div id="paragraf" className="paragrafKlasa" title="Paragraph">
                            <p id="pParagraf">Paragraph</p>
                        </div>
                    </li>


                    <li className='li-first'>
                        <h4 className='hr-text'><span>Lists</span></h4>
                    </li>

                    <li>
                        <div id="verticalList" className="listKlasa" title="Vertical List">
                            <div id="unutarListe">
                                <ul className="verticalListKlasa">
                                    <li className="elementListeV">VL element 1</li>
                                    <li className="elementListeV">VL element 2</li>
                                    <li className="elementListeV">VL element 3</li>
                                </ul>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div id="horizontalList" className="hListKlasa" title="Horizontal List">
                            <div id="unutarHorizontalneListe">
                                <ul className="horizontalListKlasa">
                                    <li className="elementListeH">HL element 1</li>
                                    <li className="elementListeH">HL element 2</li>
                                </ul>
                            </div>
                        </div>
                    </li>



                    <li className='li-first'>
                        <h4 className='hr-text'><span>Other elements</span></h4>
                    </li>

                    <li id="slikaLi">
                        <div id="slika" className="slikaKlasa" title="Image">
                            <p id="pSlika">Image</p>
                            <p>
                                <img id="ikonaZaSliku" src="/ikonice/insert-picture-icon.png" alt="Insert" />
                            </p>
                        </div>
                    </li>

                    
                    <li id="noteLi">
                        <div id="note" className="noteKlasa" title="Note">
                            <p id="pNote">Note</p>
                        </div>
                    </li>
                    
                    <li id="tabelaLi">
                        <div id="tabela" className="tabelaKlasa" title="Table">
                            <table id="tabelaElement" className="tabelaElementKlasa">
                                <thead>
                                    <tr className="prviRedTabeleKlasa">
                                        <th>Header 1</th>
                                        <th>Header 2</th>
                                        <th>Header 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Cell 1</td>
                                        <td>Cell 2</td>
                                        <td>Cell 3</td>
                                    </tr>
                                    <tr>
                                        <td>Cell 4</td>
                                        <td>Cell 5</td>
                                        <td>Cell 6</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>   

                    <li id="slikaLi">
                        <div id="slika" className="slikaKlasa" title="Image">
                            <p id="pSlika">Image</p>
                            <p>
                                <img id="ikonaZaSliku" src="/ikonice/insert-picture-icon.png" alt="Insert" />
                            </p>
                        </div>
                    </li>            

                    <li id="audioLi">
                        <div id="audioPlayer" className="audioPlayerKlasa" title="Audio player">
                            <p>
                                <img id="ikonaZaAudioPlayer" src="/ikonice/audio-player.png" alt="Audio player" style={{padding:"20px 20px 0px 20px"}} />
                            </p>                            
                        </div>
                    </li>

                    <li id="videoLi">
                        <div id="videoPlayer" className="videoPlayerKlasa" title="Video player">
                            <p>
                                <img id="ikonaZaVideoPlayer" src="/ikonice/video-player.png" alt="Video player" style={{padding:"20px 20px 0px 20px"}}/>
                            </p>
                        </div>
                    </li>

                               
                </ul>
            </div>
        );
    }
}

export default MockupLijevo;