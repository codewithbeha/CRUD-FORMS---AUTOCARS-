import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

export class AddUsersModal extends Component {
    constructor(props) {
        super(props);
        this.stat={users:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:5000/api/users', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({              
                //UserId:event.target.UserId.value,
                Username:event.target.Username.value,
                Email:event.target.Email.value,
                Password:event.target.Password.value,
                Role:event.target.Role.value   
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
                            Add User
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    
                    <Form.Group controlId="Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="Username" required 
                        defaultValue={this.props.uname}
                        placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="Email" required 
                        defaultValue={this.props.uemail}
                        placeholder="Email"/>
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="text" name="Password" required 
                        defaultValue={this.props.upassword}
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group controlId="Role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" name="Role" required 
                        defaultValue={this.props.urole}
                        placeholder="Role"/>
                    </Form.Group>

            <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add User
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