import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import user from "../Pages/images/users.jpg";


import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddUsersModal} from '../Models/AddUsersModal';
import {EditUsersModal} from '../Models/EditUsersModal';

export class Users extends Component{

    constructor(props){
        super(props);
        this.state={users:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/users')
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteUser(uid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/users/'+uid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {users, uid, uname, uemail, upassword, urole}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <div id="body">
        <h1>Users</h1>
          <div id="content">
            <img src={user} alt=""/>
            </div>
            </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(users=>
                            <tr key={users.UserId}>
                                <td>{users.UserId}</td>
                                <td>{users.Username}</td>
                                <td>{users.Email}</td>
                                <td>{users.Password}</td>
                                <td>{users.Role}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                         uid:users.UserId,uname:users.Username, uemail:users.Email ,upassword:users.Password, urole:users.Role})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteUser(users.UserId)}>
                                                Delete
                                            </Button>

                                            <EditUsersModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            uid={uid}
                                            uname={uname}
                                            uemail={uemail}
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