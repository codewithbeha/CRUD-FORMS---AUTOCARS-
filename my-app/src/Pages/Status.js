import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddStatusModal} from '../Models/AddStatusModal';
import {EditStatusModal} from '../Models/EditStatusModal';

export class Status extends Component{
    
        constructor(props){
            super(props);
            this.state={sts:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/status')
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
    
        deleteDep(sid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/status/'+sid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
    
            const {sts, sid, sname}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>StatusId</th>
                                <th>StatusName</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sts.map(sts=>
                                <tr key={sts.Id}>
                                    <td>{sts.Id}</td>
                                    <td>{sts.StatusName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                sid:sts.Id,sname:sts.StatusName})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteDep(sts.Id)}>
                                                    Delete
                                                </Button>
    
                                                <EditStatusModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                sid={sid}
                                                sname={sname}/>
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Status
                        </Button>
    
                        <AddStatusModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddStatusModal>
                    </ButtonToolbar>
                </div>
            )
        }
    }