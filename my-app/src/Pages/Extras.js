import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddExtras} from '../Models/AddExtras';
import {EditExtras} from '../Models/EditExtras';

export class Extras extends Component{
    
        constructor(props){
            super(props);
            this.state={extras:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/extras')
            .then(response=>response.json())
            .then(data=>{
                this.setState({extras:data});
            });
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteExtras(vin){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/extras/'+vin,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
            const {extras,vin,doors,color,trans,seats,cubic}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Number of doors</th>
                                <th>Color</th>
                                <th>Transmission</th>
                                <th>Number of seats</th>
                                <th>Cubic capacity</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {extras.map(extras=>
                                <tr key={extras.VIN}>
                                    <td>{extras.VIN}</td>
                                    <td>{extras.NumDoors}</td>
                                    <td>{extras.Color}</td>
                                    <td>{extras.Transmission}</td>
                                    <td>{extras.NumSeats}</td>
                                    <td>{extras.Cubic}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                vin:extras.VIN,doors:extras.NumDoors,color:extras.Color,
                                                trans:extras.Transmission,seats:extras.NumSeats,cubic:extras.Cubic})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteExtras(extras.VIN)}>
                                                    Delete
                                                </Button>
    
                                                <EditExtras show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                vin={vin}
                                                doors={doors}
                                                color={color}
                                                trans={trans}
                                                seats={seats}
                                                cubic={cubic}
                                               />
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Extras
                        </Button>
    
                        <AddExtras show={this.state.addModalShow}
                        onHide={addModalClose}/>
                    </ButtonToolbar>
                </div>
            )
        }
    }