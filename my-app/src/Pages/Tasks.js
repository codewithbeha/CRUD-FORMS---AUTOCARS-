import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import task from "../Pages/images/tasks.jpg";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddTaskModal} from '../Models/AddTaskModal';
import {EditTaskModal} from '../Models/EditTaskModal';

export class Tasks extends Component{

    constructor(props){
        super(props);
        this.state={tasks:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/tasks')
        .then(response=>response.json())
        .then(data=>{
            this.setState({tasks:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(tid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/tasks/'+tid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {tasks, tid, tname, tdesc, temployee, tdepartment, tdone}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                 <div id="body">
        <h1>Tasks</h1>
          <div id="content">
            <img src={task} alt=""/>
            </div>
            </div>
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
                        {tasks.map(tasks=>
                            <tr key={tasks.TaskId}>
                            <td>{tasks.TaskId}</td>
                            <td>{tasks.TaskName}</td>
                            <td>{tasks.TaskDesc}</td>
                            <td>{tasks.Employee}</td>
                            <td>{tasks.Department}</td>
                            <td>{tasks.Done}</td>

                           <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            tid:tasks.TaskId, tname:tasks.TaskName, tdesc:tasks.TaskDesc ,temployee:tasks.Employee,tdepartment:tasks.Department,tdone:tasks.Done})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(tasks.TaskId)}>
                                                Delete
                                            </Button>

                                        <EditTaskModal show={this.state.editModalShow}
                                           onHide={editModalClose}
                                           tid={tid}
                                           tname={tname}
                                           tdesc={tdesc}
                                           temployee={temployee}
                                           tdepartment={tdepartment}
                                           tdone={tdone}
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