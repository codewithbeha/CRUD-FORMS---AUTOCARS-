import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddSales extends Component{
    constructor(props){
        super(props);
        this.state={veh:[],emps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/automobile')
        .then(response=>response.json())
        .then(data=>{
            this.setState({veh:data});     
        });
        fetch('http://localhost:5000/api/employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});     
        });

    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/sales',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                VIN:event.target.VIN.value,
                Employee:event.target.Employee.value,
                Price:event.target.Price.value,
                Details:event.target.Details.value,
                DateOfSale:event.target.DateOfSale.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Procesi Deshtoi...');
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

        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Sale
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

                    <Form.Group controlId="Employee">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.semp}>
                            {this.state.emps.map(emps=>
                                <option key = {emps.EmployeeId}>{emps.EmployeeName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                    <Form.Group controlId="Price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text" name="Price" required
                            defaultValue={this.props.sprice}
                            placeholder="Price"/>
                        </Form.Group>            

                        <Form.Group controlId="Details">
                            <Form.Label>Details</Form.Label>
                            <Form.Control type="text" name="Details" required
                            defaultValue={this.props.sdetail}
                            placeholder="Details"/>
                        </Form.Group>

                        <Form.Group controlId="DateOfSale">
                            <Form.Label>DateOfSale</Form.Label>
                            <Form.Control 
                            type="date"
                            name="DateOfSale"
                            required
                            placeholder="DateOfSale"
                            defaultValue={this.props.sdos}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Sale
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