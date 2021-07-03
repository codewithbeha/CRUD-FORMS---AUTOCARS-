import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditOrigin extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/origin',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VIN:event.target.VIN.value,
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
            alert('Gabim gjate shtimit...');
        })
    }
    render(){
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
            Edit Origin
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="VIN">
                        <Form.Label>VIN</Form.Label>
                        <Form.Control type="text" name="VIN" required
                        defaultValue={this.props.vin} 
                        placeholder="VIN"/>
                    </Form.Group>

                    <Form.Group controlId="VehicleState">
                        <Form.Label>Vehicle State</Form.Label>
                        <Form.Control type="text" name="VehicleState" required 
                        defaultValue={this.props.vstate}
                        placeholder="VehicleState"/>
                    </Form.Group>

                    <Form.Group controlId="VehicleCity">
                        <Form.Label>VehicleCity</Form.Label>
                        <Form.Control type="text" name="VehicleCity" required 
                        defaultValue={this.props.vcity}
                        placeholder="VehicleCity"/>
                    </Form.Group>

                    <Form.Group controlId="VehicleZip">
                        <Form.Label>VehicleZip</Form.Label>
                        <Form.Control type="text" name="VehicleZip" required 
                        defaultValue={this.props.vzip}
                        placeholder="VehicleZip"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Origin
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