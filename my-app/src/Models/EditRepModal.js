import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditRepModal extends Component{
    constructor(props){
        super(props);
        this.state={emps:[],deps:[],sts:[]};
        this.handleSubmit= this.handleSubmit.bind(this);

    }


    componentDidMount(){
        
        fetch('http://localhost:5000/api/employee')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            this.setState({...this.state, emps:data});
            
        });
        
        fetch('http://localhost:5000/api/department')
        .then(response=>response.json())
        .then(data=>{
            
            console.log(data);
            this.setState({...this.state,deps:data});
            
        });

        fetch('http://localhost:5000/api/status')
        .then(response=>response.json())
        .then(data=>{
            
            console.log(data);
            this.setState({...this.state,sts:data});
            
        });
    }


    handleSubmit(event){
        console.log("DEBUGGING");
        fetch('http://localhost:5000/api/report',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ReportId:event.target.ReportId.value,
                Employee:event.target.Employee.value,
                Department:event.target.Department.value,
                Status:event.target.Status.value,
                Description:event.target.Description.value,
                ReportTo:event.target.ReportTo.value,
                DateOf:event.target.DateOf.value

                
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Deshtoi...');
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
                            Edit Report
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
                            <Form.Control as="select" 
                            defaultValue={this.props.remployee}>
                            {this.state.emps.map(emps=>
                                <option key = {emps.EmployeeId}>{emps.EmployeeName}</option>
                                )}
                           </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.rdepartment}>
                            {this.state.deps.map(deps=>
                                <option key = {deps.DepartmentId}>{deps.DepartmentName}</option>
                                )}
                           </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Status">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.rstatus}>
                            {this.state.sts.map(sts=>
                                <option key = {sts.Id}>{sts.StatusName}</option>
                                )}
                           </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="Description" required
                            placeholder="Description"
                            defaultValue={this.props.rdescription}/>
                        </Form.Group>

                        <Form.Group controlId="ReportTo">
                            <Form.Label>ReportTo</Form.Label>
                            <Form.Control type="text" name="ReportTo" required
                            placeholder="ReportTo"
                            defaultValue={this.props.rreportto}/>
                        </Form.Group>

                        <Form.Group controlId="DateOf">
                            <Form.Label>DateOf</Form.Label>
                            <Form.Control 
                            type="date"
                            name="DateOf"
                            required
                            placeholder="DateOf"
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