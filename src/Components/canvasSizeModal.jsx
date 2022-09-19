import React, { Component } from "react";
import { Modal, Button, Form, ButtonGroup } from "react-bootstrap";

class CanvasSizeModal extends Component {
    state = {
        
    }

    constructor(props) {
        super(props);        
    }

    render() {
        return(
            <>
                <Modal ref={this.canvasSizeModalReferenca}
                    size="lg"
                    show={this.props.data.state.prikaziCanvasSizeModal}
                    onHide={() => this.props.data.promjenaPrikazaCanvasSizeModala(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Choose canvas size
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Width:</Form.Label>
                                <Form.Control
                                    type="number" 
                                    placeholder="Enter width (%)" 
                                    value = {this.props.data.state.sirina}
                                    onChange={(event) => { this.props.data.promjenaSirine(event.target.value) }}
                                    isValid={this.props.data.state.validnaSirina}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Width has to be between 0 and 100</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Height:</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter height (%)"
                                    value = {this.props.data.state.visina}
                                    onChange={(event) => { this.props.data.promjenaVisine(event.target.value) }}
                                    isValid={this.props.data.state.validnaVisina}
                                    required
                                    />
                                <Form.Control.Feedback type="invalid">Height has to be between 0 and 100</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.props.data.promijeniVelicinuCanvasa(this.props.data.state.sirina, this.props.data.state.visina) }}>Change size</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CanvasSizeModal;