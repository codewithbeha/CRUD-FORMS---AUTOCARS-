import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';



export class AddOrigin extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/origin', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({              
                VehicleState:event.target.VehicleState.value,
                VehicleCity:event.target.VehicleCity.value,
                VehicleZip:event.target.VehicleZip.value
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
                            Add Origin
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

                                    <Form.Group controlI="VehicleState">
                                        <Form.Label>VehicleState</Form.Label>
                                        <Form.Control type="text" name="VehicleState" required
                                            placeholder="VehicleState" />
                                    </Form.Group>

                                    <Form.Group controlI="VehicleCity">
                                        <Form.Label>VehicleCity</Form.Label>
                                        <Form.Control type="text" name="VehicleCity" required
                                            placeholder="VehicleCity" />
                                    </Form.Group>

                                    <Form.Group controlI="VehicleZip">
                                        <Form.Label>VehicleZip</Form.Label>
                                        <Form.Control type="text" name="VehicleZip" required
                                            placeholder="VehicleZip" />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Origin
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