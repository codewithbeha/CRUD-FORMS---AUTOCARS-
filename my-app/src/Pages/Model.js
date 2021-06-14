import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddModModal} from '../Models/AddModModal';
import {EditModModal} from '../Models/EditModModal';

export class Model extends Component{
    
        constructor(props){
            super(props);
            this.state={mods:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/model')
            .then(response=>response.json())
            .then(data=>{
                this.setState({mods:data});
            });
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteDep(mid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/model/'+mid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
    
            const {mods, mid, mname}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ModelId</th>
                                <th>NameModel</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mods.map(m=>
                                <tr key={m.ModelId}>
                                    <td>{m.ModelId}</td>
                                    <td>{m.NameModel}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                mid:m.ModelId,mname:m.NameModel})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteDep(m.ModelId)}>
                                                    Delete
                                                </Button>
    
                                                <EditModModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                mid={mid}
                                                mname={mname}/>
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Model
                        </Button>
    
                        <AddModModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddModModal>
                    </ButtonToolbar>
                </div>
            )
        }
    }