import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form,Image} from 'react-bootstrap';

export class AddRepModal extends Component{
    constructor(props){
        super(props);
        this.state={empss:[],deps:[],sts:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
 
    }

   

    componentDidMount(){
        fetch('http://localhost:5000/api/employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});     
        });
        fetch('http://localhost:5000/api/department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});     
        });
        fetch('http://localhost:5000/api/status')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sts:data});     
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/report',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //ReportId:event.target.ReportId.value,   
                Employee:event.target.Employee.value,
                Department:event.target.Department.value,
                Status:event.target.Status.value,
                Description:event.target.Description.value,
                ReportTo:event.target.ReportTo.value,
                DateOf:event.target.DateOf.value,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
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
                Add Report
                   </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={6}>
                    
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="ReportId">
                            <Form.Label>ReportId</Form.Label>
                            <Form.Control type="text" name="ReportId" required
                            placeholder="ReportId"
                            disabled
                            defaultValue={this.props.rid}/>
                        </Form.Group>

                        <Form.Group controlId="Employee">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.empname}>
                            {this.state.emps.map(emp=>
                                <option key = {emp.EmployeeId}>{emp.EmployeetName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.depname}>
                            {this.state.deps.map(dep=>
                                <option key = {dep.DepartmentId}>{dep.DepartmentName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.stsname}>
                            {this.state.sts.map(s=>
                                <option key = {s.StatusId}>{s.StatusName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="Description" required
                            defaultValue={this.props.rdescription}
                            placeholder="Description"/>
                        </Form.Group>

                        <Form.Group controlId="ReportTo">
                            <Form.Label>ReportTo</Form.Label>
                            <Form.Control type="text" name="ReportTo" required
                            defaultValue={this.props.rreportto}
                            placeholder="ReportTo"/>
                        </Form.Group>

                        <Form.Group controlId="DateOf">
                            <Form.Label>DateOf</Form.Label>
                            <Form.Control 
                            type="date"
                            name="DateOf"
                            required
                            placeholder="DateOfReport"
                            defaultValue={this.props.rdate}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Update Report
                            </Button>
                        </Form.Group>

                    </Form>
                </Col>

                <Col sm={6}>
                    <Image width="200px"  src={this.imagesrc}/>
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