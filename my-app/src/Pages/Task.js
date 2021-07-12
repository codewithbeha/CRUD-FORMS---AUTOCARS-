import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddTaskModal} from '../Models/AddTaskModal';
import {EditTaskModal} from '../Models/EditTaskModal';

export class Task extends Component{

    constructor(props){
        super(props);
        this.state={taskes:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/tasks')
        .then(response=>response.json())
        .then(data=>{
            this.setState({taskes:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(repid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/tasks'+repid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {taskes, tastaskid, tasname, tasdesc, tasemployee, tasdepartment, tasdone}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>TaskId</th>
                            <th>TaskName</th>
                            <th>TaskDesc</th>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Done</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {taskes.map(tas=>
                            <tr key={tas.TaskId}>
                                 <td>{tas.TaskId}</td>
                                 <td>{tas.TaskName}</td>
                                 <td>{tas.TaskDesc}</td>
                                 <td>{tas.Employee}</td>
                                 <td>{tas.Department}</td>
                                 <td>{tas.Done}</td>
  
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            tastaskid:tas.TaskId, tasname:tas.TaskName, tasdesc:tas.TaskDesc ,tasemployee:tas.Employee,tasdepartment:tas.Department,tasdone:tas.Done})}>
                                                Edit     
                                            </Button> 
                                            
                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(tas.TaskId)}>
                                                Delete
                                            </Button>

                                            <EditTaskModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            tastaskid={tastaskid}
                                            tasname={tasname}
                                            tasdesc={tasdesc}
                                            tasemployee={tasemployee}
                                            tasdepartment={tasdepartment}
                                            tasdone={tasdone}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Task
                    </Button>

                    <AddTaskModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddTaskModal>
                </ButtonToolbar>
            </div>
        )
    }
}
            