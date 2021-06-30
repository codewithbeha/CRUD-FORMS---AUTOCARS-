import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditDetails extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/details',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VIN:event.target.VIN.value,
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
            Edit Details
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="VIN">
                        <Form.Label>VIN</Form.Label>
                        <Form.Control type="text" name="VIN" required
                        disabled
                        defaultValue={this.props.vin} 
                        placeholder="VIN"/>
                    </Form.Group>

                    <Form.Group controlId="Tyres">
                        <Form.Label>Tyres</Form.Label>
                        <Form.Control type="text" name="Tyres" required 
                        defaultValue={this.props.tyres}
                        placeholder="Tyres"/>
                    </Form.Group>

                    <Form.Group controlId="AirCon">
                        <Form.Label>AirCondition</Form.Label>
                        <Form.Control type="text" name="AirCon" required 
                        defaultValue={this.props.air}
                        placeholder="AirCondition"/>
                    </Form.Group>

                    <Form.Group controlId="Interior">
                        <Form.Label>Interior</Form.Label>
                        <Form.Control type="text" name="Interior" required 
                        defaultValue={this.props.inter}
                        placeholder="Interior"/>
                    </Form.Group>

                    <Form.Group controlId="Sensors">
                        <Form.Label>Sensors</Form.Label>
                        <Form.Control type="text" name="Sensors" required 
                        defaultValue={this.props.sen}
                        placeholder="Sensors"/>
                    </Form.Group>

                    <Form.Group controlId="Headlight">
                        <Form.Label>Headlight</Form.Label>
                        <Form.Control type="text" name="Headlight" required 
                        defaultValue={this.props.head}
                        placeholder="Headlight"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Details
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