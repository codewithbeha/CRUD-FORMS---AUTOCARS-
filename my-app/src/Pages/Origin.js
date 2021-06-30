import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import car from "./Factory.jpg"
import {Image} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddOrigin} from '../Models/AddOrigin';
import {EditOrigin} from '../Models/EditOrigin';

export class Origin extends Component{
    
        constructor(props){
            super(props);
            this.state={origin:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/origin')
            .then(response=>response.json())
            .then(data=>{
                this.setState({origin:data});
            });
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteOrigin(vin){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/origin/'+vin,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
            const {origin,vin,vstate,vcity,vzip}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <div id="body">
        <h1>Origin of vehicle</h1>
          <div id="content">
            <img src={car} alt="image"/>
            </div>
            </div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>VehicleState</th>
                                <th>VehicleCity</th>
                                <th>VehicleZip</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {origin.map(origin=>
                                <tr key={origin.VIN}>
                                    <td>{origin.VIN}</td>
                                    <td>{origin.VehicleState}</td>
                                    <td>{origin.VehicleCity}</td>
                                    <td>{origin.VehicleZip}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                vin:origin.VIN,vstate:origin.VehicleState,vcity:origin.VehicleCity,vzip:origin.VehicleZip})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteOrigin(origin.VIN)}>
                                                    Delete
                                                </Button>
    
                                                <EditOrigin show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                vin={vin}
                                                vstate={vstate}
                                                vcity={vcity}
                                                vzip={vzip}
                                               />
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Origin
                        </Button>
    
                        <AddOrigin show={this.state.addModalShow}
                        onHide={addModalClose}/>
                    </ButtonToolbar>
                </div>
            )
        }
    }