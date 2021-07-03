import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form , Image} from 'react-bootstrap';

export class AddVehicle extends Component{
    constructor(props){
        super(props);
        this.state={veh:[]};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }
    photofilename = "test.png";
    imagesrc= 'http://localhost:5000/api/Images/'+this.photofilename;

    componentDidMount(){
        fetch('http://localhost:5000/api/automobile')
        .then(response=>response.json())
        .then(data=>{
            this.setState({veh:data});
            
        });
    } 

   

    handleSubmit(event){
        fetch('http://localhost:5000/api/automobile',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //VIN:event.target.VIN.value,
                Brand:event.target.Brand.value,
                Model:event.target.Model.value,
                VehicleYear:event.target.VehicleYear.value,
                VehiclePrice:event.target.VehiclePrice.value,
                Kilometers:event.target.Kilometers.value,
                PhotoFileName:this.photofilename

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert(error);
        })
    }
    handleFileSelected(event){
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );
        fetch('http://localhost:5000/api/automobile/savefile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc = 'http://localhost:5000/Images/' +result;
        },
        (error)=>{
            alert('Gabim gjatë shtimit...');
        })
        
    }
    render(){
        return(
            <div className="container">
                <Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Vehicle
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="Brand" required 
                        placeholder="Brand"/>
                    </Form.Group>

                    <Form.Group controlId="Model">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" name="Model" required 
                        placeholder="Model"/>
                    </Form.Group>

                    <Form.Group controlId="VehicleYear">
                        <Form.Label>VehicleYear</Form.Label>
                        <Form.Control 
                        type="date"
                        name="VehicleYear"
                        required
                        placeholder="VehicleYear"
                        />
                    </Form.Group>

                    <Form.Group controlId="VehiclePrice">
                        <Form.Label>VehiclePrice</Form.Label>
                        <Form.Control type="text" name="VehiclePrice" required 
                        placeholder="VehiclePrice"/>
                    </Form.Group>

                    <Form.Group controlId="Kilometers">
                        <Form.Label>Kilometers</Form.Label>
                        <Form.Control type="text" name="Kilometers" required 
                        placeholder="Kilometers"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Vehicle
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
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