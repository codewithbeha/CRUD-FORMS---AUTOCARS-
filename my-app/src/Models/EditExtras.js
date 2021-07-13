import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditExtras extends Component{
    constructor(props){
        super(props);
        this.state={veh:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        
        fetch('http://localhost:5000/api/automobile')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({...this.state, veh:data});
            
        });
        
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/extras',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VIN:event.target.VIN.value,
                NumDoors:event.target.NumDoors.value,
                Color:event.target.Color.value,
                Transmission:event.target.Transmission.value,
                NumSeats:event.target.NumSeats.value,
                Cubic:event.target.Cubic.value
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
            Edit Extras
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="VIN">
                            <Form.Label>VIN</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.vin}>
                            {this.state.veh.map(veh=>
                                <option key = {veh.VIN}>{veh.VIN}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                    <Form.Group controlId="NumDoors">
                        <Form.Label>NumDoors</Form.Label>
                        <Form.Control type="text" name="NumDoors" required 
                        defaultValue={this.props.doors}
                        placeholder="NumDoors"/>
                    </Form.Group>

                    <Form.Group controlId="Color">
                        <Form.Label>Color</Form.Label>
                        <Form.Control type="text" name="Color" required 
                        defaultValue={this.props.color}
                        placeholder="Color"/>
                    </Form.Group>

                    <Form.Group controlId="Transmission">
                        <Form.Label>Transmission</Form.Label>
                        <Form.Control type="text" name="Transmission" required 
                        defaultValue={this.props.trans}
                        placeholder="Transmission"/>
                    </Form.Group>

                    <Form.Group controlId="NumSeats">
                        <Form.Label>NumSeats</Form.Label>
                        <Form.Control type="text" name="NumSeats" required 
                        defaultValue={this.props.seats}
                        placeholder="NumSeats"/>
                    </Form.Group>

                    <Form.Group controlId="Cubic">
                        <Form.Label>Cubic</Form.Label>
                        <Form.Control type="text" name="Cubic" required 
                        defaultValue={this.props.cubic}
                        placeholder="Cubic"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Extras
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