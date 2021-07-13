import React, { Component } from "react";
import car from "../Pages/images/Showroom.jpg"
import './Auto.css'
import {Table} from 'react-bootstrap';
import {Image} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddVehicle} from '../Models/AddVehicle';
import {EditVehicle} from '../Models/EditVehicle';
// import { Link,NavLink } from 'react-router-dom';
// import AddVehicle from './AddVehicle.js';


 export class Auto extends Component {
  constructor(props){
    super(props);
    this.state={veh:[], addModalShow:false, editModalShow:false}
}

refreshList(){
    fetch('http://localhost:5000/api/automobile')
    .then(response=>response.json())
    .then(data=>{
        this.setState({veh:data});
    });
}

componentDidMount(){
    this.refreshList();
}

componentDidUpdate(){
    this.refreshList();
}

deleteVeh(vin){
    if(window.confirm('Are you sure?')){
        fetch('http://localhost:5000/api/automobile/'+vin,{
            method:'DELETE',
            header:{'Accept':'application/json',
        'Content-Type':'application/json'}
        })
    }
}
  render() {
    const {veh, vin,vbrand,vmodel,vyear,vprice,vkilometers,photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(  
         <div>
      <div id="body">
        <h1>Welcome to our car-showroom </h1>
          <div id="content">
            <img src={car} alt=""/>
            </div>
            </div>

    <Table className="mt-4" striped bordered hover size="sm">
        <thead>
            <tr>
            <th>VIN</th>
            <th>Brand</th>
            <th>Model</th>
            <th>VehicleYear</th>
            <th>VehiclePrice</th>
            <th>Kilometers</th>
            <th>Photo</th>
            <th>Options</th>
            </tr>
        </thead>
        <tbody>
            {veh.map(veh=>
                <tr key={veh.VIN}>
                    <td>{'XRKS'}{veh.VIN}</td>
                    <td>{veh.Brand}</td>
                    <td>{veh.Model}</td>
                    <td>{veh.VehicleYear}</td>
                    <td>{veh.VehiclePrice}{'€'}</td>
                    <td>{veh.Kilometers}{'KM'}</td>
                    <td>{ <Image width="300px" height="300px" 
                src={'http://localhost:5000/Images/'+veh.PhotoFileName}/>}</td>
                    <td>
<ButtonToolbar>
<Button className="mr-2" variant="info"
onClick={()=>this.setState({editModalShow:true,
vin:veh.VIN,vbrand:veh.Brand,vmodel:veh.Model,vyear:veh.VehicleYear,vprice:veh.VehiclePrice,vkilometers:veh.Kilometers,
photofilename:veh.PhotoFileName})}>
Edit
</Button>

<Button className="mr-2" variant="danger"
onClick={()=>this.deleteVeh(veh.VIN)}>
Delete
</Button>

<EditVehicle show={this.state.editModalShow}
onHide={editModalClose}
vin={vin}
vbrand={vbrand}
vmodel={vmodel}
vyear={vyear}
vprice={vprice}
vkilometers={vkilometers}
photofilename={photofilename}
/>
</ButtonToolbar>

                    </td>

                </tr>)}
        </tbody>

    </Table>

    <ButtonToolbar>
        <Button variant='primary'
        onClick={()=>this.setState({addModalShow:true})}>
        Add Vehicle</Button>

        <AddVehicle show={this.state.addModalShow}
        onHide={addModalClose}/>
    </ButtonToolbar>
</div>
)
}
}