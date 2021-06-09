import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddUsersModal} from '../Models/AddUsersModal';
import {EditUsersModal} from '../Models/EditUsersModal';

export class Users extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/users')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(uid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/users/'+uid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {deps, uid, uname, upassword, urole}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(u=>
                            <tr key={u.UserId}>
                                <td>{u.UserId}</td>
                                <td>{u.Username}</td>
                                <td>{u.Password}</td>
                                <td>{u.Role}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                         uid:u.UserId,uname:u.Username,upassword:u.Password, urole:u.Role})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(u.UserId)}>
                                                Delete
                                            </Button>

                                            <EditUsersModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            uid={uid}
                                            uname={uname}
                                            upassword={upassword}
                                            urole={urole}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add User
                    </Button>

                    <AddUsersModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddUsersModal>
                </ButtonToolbar>
            </div>
        )
    }
}