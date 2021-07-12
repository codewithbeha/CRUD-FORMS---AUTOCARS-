import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Image} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from '../Models/AddEmpModal';
import {EditEmpModal} from '../Models/EditEmpModal';

export class Employee extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/employee'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {emps, empid, empname, empdep ,empbday, empcountry, empcity, empstreet,empzip,empphone,photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeeName</th>
                            <th>Department</th>
                            <th>Birthdate</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Street</th>
                            <th>Zip</th>
                            <th>Phone</th>
                            <th>PhotoFileName</th>
                            <th></th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=>
                            <tr key={emp.EmployeeId}>
                                <td>{emp.EmployeeId}</td>
                                <td>{emp.EmployeeName}</td>
                                <td>{emp.Department}</td>
                                <td>{emp.Birthdate}</td>
                                <td>{emp.Country}</td>
                                <td>{emp.City}</td>
                                <td>{emp.Street}</td>
                                <td>{emp.Zip}</td>
                                <td>{emp.Phone}</td>
                                <td>{ <Image width="100px" height="100px" 
                src={'http://localhost:5000/Photos/'+emp.PhotoFileName}/>}</td>
                                <td>{emp.PhotoFileName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            empid:emp.EmployeeId, empname:emp.EmployeeName,empdep:emp.Department,empbday:emp.Birthdate, empcountry:emp.Country,empcity:emp.City,empstreet:emp.Street,empzip:emp.Zip,empphone:emp.Phone,photofilename:emp.PhotoFileName})}>
                                                Edit     
                                            </Button> 
                                            
                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(emp.EmployeeId)}>
                                                Delete
                                            </Button>

                                            <EditEmpModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            empid={empid}
                                            empname={empname}
                                            empdep={empdep}
                                            empbday={empbday}
                                            empcountry={empcountry}
                                            empcity={empcity}
                                            empstreet={empstreet}
                                            empzip={empzip}
                                            empphone={empphone}
                                            photofilename={photofilename}

                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Employee
                    </Button>

                    <AddEmpModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddEmpModal>
                </ButtonToolbar>
            </div>
        )
    }
}