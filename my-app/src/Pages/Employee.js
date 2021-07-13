import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import emplo from "../Pages/images/employees.jpg";
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
            fetch('http://localhost:5000/api/employee/'+empid,{
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
                <div id="body">
        <h1>Employees</h1>
          <div id="content">
            <img src={emplo} alt=""/>
            </div>
            </div>
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
                        {emps.map(emps=>
                            <tr key={emps.EmployeeId}>
                                <td>{emps.EmployeeId}</td>
                                <td>{emps.EmployeeName}</td>
                                <td>{emps.Department}</td>
                                <td>{emps.Birthdate}</td>
                                <td>{emps.Country}</td>
                                <td>{emps.City}</td>
                                <td>{emps.Street}</td>
                                <td>{emps.Zip}</td>
                                <td>{emps.Phone}</td>
                                <td>{ <Image width="100px" height="100px" 
                src={'http://localhost:5000/Photos/'+emps.PhotoFileName}/>}</td>
                                <td>{emps.PhotoFileName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            empid:emps.EmployeeId, empname:emps.EmployeeName,empdep:emps.Department,empbday:emps.Birthdate, empcountry:emps.Country,empcity:emps.City,empstreet:emps.Street,empzip:emps.Zip,empphone:emps.Phone,photofilename:emps.PhotoFileName})}>
                                                Edit     
                                            </Button> 
                                            
                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(emps.EmployeeId)}>
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