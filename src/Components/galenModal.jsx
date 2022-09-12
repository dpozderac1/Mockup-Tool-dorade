import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class GalenModal extends Component {
    state = {
    }

    constructor(props) {
        super(props);

        this.galenModalReferenca = React.createRef();
    }

    componentDidMount() {
        this.props.data.state.galenModal = this.galenModalReferenca.current;
    }

    render() {
        return(
            <>
                <Modal ref={this.galenModalReferenca}
                    size="lg"
                    show={this.props.data.state.prikaziGalenModal}
                    onHide={() => this.props.data.promjenaPrikazaGalenModala(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Choose tests
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='sadrzajModala'
                             dangerouslySetInnerHTML={this.props.data.state.galenModalContent}
                             style={{ textAlign: "center" }}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.props.data.napisiGalen() }}>Save tests</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default GalenModal;