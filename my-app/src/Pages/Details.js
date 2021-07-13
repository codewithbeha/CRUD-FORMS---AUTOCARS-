import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import car from "../Pages/images/Details.png"

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddDetails} from '../Models/AddDetails';
import {EditDetails} from '../Models/EditDetails';

export class Details extends Component{
    
        constructor(props){
            super(props);
            this.state={det:[], addModalShow:false, editModalShow:false}
        }
    
        refreshList(){
            fetch('http://localhost:5000/api/details')
            .then(response=>response.json())
            .then(data=>{
                this.setState({det:data});
            });
        }
    
        componentDidMount(){
            this.refreshList();
        }
    
        componentDidUpdate(){
            this.refreshList();
        }
    
        deleteDetails(vin){
            if(window.confirm('A jeni i sigurtë?')){
                fetch('http://localhost:5000/api/details/'+vin,{
                    method:'DELETE',
                    header:{'Accept':'application/json',
                'Content-Type':'application/json'}
                })
            }
        }
    
        render(){
            const {det,vin,tyres,air,inter,sen,head}=this.state;
            let addModalClose=()=>this.setState({addModalShow:false});
            let editModalClose=()=>this.setState({editModalShow:false});
            return (
                <div>
                         <div id="body">
        <h1>Details of vehicle</h1>
          <div id="content">
            <img src={car} alt=""/>
            </div>
            </div>
                    <Table className="mt-4" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Tyres</th>
                                <th>Air-Condition</th>
                                <th>Interior</th>
                                <th>Sensors</th>
                                <th>Headlight</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {det.map(det=>
                                <tr key={det.VIN}>
                                    <td>{'XRKS'}{det.VIN}</td>
                                    <td>{det.Tyres}</td>
                                    <td>{det.AirCon}</td>
                                    <td>{det.Interior}</td>
                                    <td>{det.Sensors}</td>
                                    <td>{det.Headlight}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button className="mr-2" variant="info"
                                            onClick={()=>this.setState({editModalShow:true,
                                                vin:det.VIN,tyres:det.Tyres,air:det.AirCon,
                                                inter:det.Interior,sen:det.Sensors,head:det.Headlight})}>
                                                    Edit
                                                </Button>
    
                                                <Button className="mr-2" variant="danger"
                                                onClick={()=>this.deleteDetails(det.VIN)}>
                                                    Delete
                                                </Button>
    
                                                <EditDetails show={this.state.editModalShow}
                                                onHide={editModalClose}
                                                vin={vin}
                                                tyres={tyres}
                                                air={air}
                                                inter={inter}
                                                sen={sen}
                                                head={head}
                                               />
                                        </ButtonToolbar>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
    
                    <ButtonToolbar>
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                            Add Details
                        </Button>
    
                        <AddDetails show={this.state.addModalShow}
                        onHide={addModalClose}/>
                    </ButtonToolbar>
                </div>
            )
        }
    }