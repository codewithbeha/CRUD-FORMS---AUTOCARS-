import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';



export class AddDetails extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/details', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({              
                Tyres:event.target.Tyres.value,
                AirCon:event.target.AirCon.value,
                Interior:event.target.Interior.value,
                Sensors:event.target.Sensors.value,
                Headlight:event.target.Headlight.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Gabim gjatë shtimit...');
        })
    }

    render() {
        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="VIN">
                               <Form.Label>VIN</Form.Label>
                                <Form.Control type="text" name="VIN" required 
                                placeholder="VIN"
                                disabled
                                defaultValue={this.props.vin}/>
                                </Form.Group>

                                    <Form.Group controlI="Tyres">
                                        <Form.Label>Tyres</Form.Label>
                                        <Form.Control type="text" name="Tyres" required
                                            placeholder="Tyres" />
                                    </Form.Group>

                                    <Form.Group controlI="AirCon">
                                        <Form.Label>AirConditon</Form.Label>
                                        <Form.Control type="text" name="AirCon" required
                                            placeholder="AirCondition" />
                                    </Form.Group>

                                    <Form.Group controlI="Interior">
                                        <Form.Label>Interior</Form.Label>
                                        <Form.Control type="text" name="Interior" required
                                            placeholder="Interior" />
                                    </Form.Group>

                                    <Form.Group controlI="Sensors">
                                        <Form.Label>Sensors</Form.Label>
                                        <Form.Control type="text" name="Sensors" required
                                            placeholder="Sensors" />
                                    </Form.Group>

                                    <Form.Group controlI="Headlight">
                                        <Form.Label>Headlight</Form.Label>
                                        <Form.Control type="text" name="Headlight" required
                                            placeholder="Headlight" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Details
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        )
    }

}