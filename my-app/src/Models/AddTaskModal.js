import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

export class AddTaskModal extends Component{
    constructor(props){
        super(props);
        this.state={emps:[],deps:[]};
        
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

    }

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:5000/api/tasks',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                //TaskId:event.target.TaskId.value,
                TaskName:event.target.TaskName.value,
                TaskDesc:event.target.TaskDesc.value,
                Employee:event.target.Employee.value,
                Department:event.target.Department.value,
                Done:event.target.Done.value
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
                Add Task
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="TaskName">
                            <Form.Label>TaskName</Form.Label>
                            <Form.Control type="text" name="TaskName" required
                            defaultValue={this.props.tname}
                            placeholder="TaskName"/>
                        </Form.Group>            

                        <Form.Group controlId="TaskDesc">
                            <Form.Label>TaskDesc</Form.Label>
                            <Form.Control type="text" name="TaskDesc" required
                            defaultValue={this.props.tdesc}
                            placeholder="TaskDesc"/>
                        </Form.Group>

                        <Form.Group controlId="Employee">
                            <Form.Label>Employee</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.temployee}>
                            {this.state.emps.map(emp=>
                                <option key = {emp.EmployeeId}>{emp.EmployeeName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Department">
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" 
                            defaultValue={this.props.tdepartment}>
                            {this.state.deps.map(dep=>
                                <option key = {dep.DepartmentId}>{dep.DepartmentName}</option>
                                )}
                            </Form.Control> 
                        </Form.Group>

                        <Form.Group controlId="Done">
                            <Form.Label>Done</Form.Label>
                            <Form.Control 
                            type="date"
                            name="Done"
                            required
                            placeholder="Done"
                            defaultValue={this.props.tdone}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Add Task
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