import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBrandModal} from '../Models/AddBrandModal';
import {EditBrandModal} from '../Models/EditBrandModal';

export class Brand extends Component{
    
        constructor(props){
            super(props);
            this.state={deps:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/brand')
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
    
        deleteDep(bid){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/brand/'+bid,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
    
            const {deps, bid, bname}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>BrandId</th>
                                <th>BrandName</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deps.map(b=>
                                <tr key={b.BrandId}>
                                    <td>{b.BrandId}</td>
                                    <td>{b.BrandName}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                bid:b.BrandId,bname:b.BrandName})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteDep(b.BrandId)}>
                                                    Delete
                                                </Button>
    
                                                <EditBrandModal show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                bid={bid}
                                                bname={bname}/>
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Brand
                        </Button>
    
                        <AddBrandModal show={this.state.addModalShow}
                        onHide={addModalClose}></AddBrandModal>
                    </ButtonToolbar>
                </div>
            )
        }
    }