import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';



export class AddStatusModal extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/status', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({              
                StatusName:event.target.StatusName.value
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
                            Add Department
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="StatusName">
                        <Form.Label>StatusName</Form.Label>
                        <Form.Control type="text" name="StatusName" required 
                        defaultValue={this.props.sname}
                        placeholder="StatusName"/>
                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Status
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