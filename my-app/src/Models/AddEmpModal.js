import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form , Image} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[],cities:[],countries:[]};
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
    }
    photofilename = "anonymous.png";
    imagesrc= 'http://localhost:5000/api/Photos/'+this.photofilename;

    

    componentDidMount(){
        
        fetch('http://localhost:5000/api/city')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({...this.state, cities:data});
            
        });
        fetch('http://localhost:5000/api/country')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({...this.state,countries:data});
            
        });
        fetch('http://localhost:5000/api/department')
        .then(response=>response.json())
        .then(data=>{
            
            console.log(data);
            this.setState({...this.state,deps:data});
            
        });
    }

    handleSubmit(event){
        console.log("DEBUGGING");
        fetch('http://localhost:5000/api/employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
            //EmployeeId:event.target.EmployeeId.value,   
                EmployeeName:event.target.EmployeeName.value,
                Department:event.target.Department.value,
                Birthdate:event.target.Birthdate.value,
                Country:event.target.Country.value,
                City:event.target.City.value,
                Street:event.target.Street.value,
                Zip:event.target.Zip.value,
                Phone:event.target.Phone.value,
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
        fetch('http://localhost:5000/api/employee/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc = 'http://localhost:5000/Photos/' +result;
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
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Employee
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                        <Form.Group controlId="EmployeeName">
                            <Form.Label>EmployeeName</Form.Label>
                            <Form.Control type="text" name="EmployeeName" required
                            defaultValue={this.props.empname}
                            placeholder="EmployeeName"/>
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.empdep}>
                            {this.state.deps.map(deps=>
                                <option key = {deps.DepartmentId}>{deps.DepartmentName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Birthdate">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control 
                            type="date"
                            name="Birthdate"
                            required
                            placeholder="Birthdate"
                            defaultValue={this.props.empbday}
                            />
                        </Form.Group>

                        <Form.Group controlId="Country">
                            <Form.Label>Country</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.empcountry}>
                            {this.state.countries.map(countries=>
                                <option key = {countries.CountryId}>{countries.CountryName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="City">
                            <Form.Label>City</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.empcity}>
                            {this.state.cities.map(cities=>
                                <option key = {cities.CityId}>{cities.CityName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Street">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" name="Street" required
                            defaultValue={this.props.empstreet}
                            placeholder="Street"/>
                        </Form.Group>

                        <Form.Group controlId="Zip">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="text" name="Zip" required
                            defaultValue={this.props.empzip}
                            placeholder="Zip"/>
                        </Form.Group>

                        <Form.Group controlId="Phone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" name="Phone" required
                            defaultValue={this.props.empphone}
                            placeholder="Phone"/>
                        </Form.Group>

                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Employee
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm={6}>
                                <Image width="250px" height="320px" src={this.imagesrc}/>
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