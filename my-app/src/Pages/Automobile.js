import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddAutoModal} from '../Models/AddAutoModal';
import {EditAutoModal} from '../Models/EditAutoModal';

export class Automobile extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/automobile')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(VIN){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/automobile/'+VIN,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {emps, VIN, brand, model, vyear, vprice, kilo,photofilename}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>VehicleYear</th>
                            <th>VehiclePrice</th>
                            <th>Kilometers</th>
                            <th>PhotoFileName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(auto=>
                            <tr key={auto.VIN}>
                                <td>{auto.VIN}</td>
                                <td>{auto.brand}</td>
                                <td>{auto.model}</td>
                                <td>{auto.vyear}</td>
                                <td>{auto.vprice}</td>
                                <td>{auto.kilo}</td>
                                <td>{auto.photofilename}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            VIN:auto.VIN,brand:auto.brand,moodel:auto.model,vyear:auto.vyear,vprice:auto.vprice, kilo:auto.kilo,photofilename:auto.photofilename})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(auto.VIN)}>
                                                Delete
                                            </Button>

                                            <EditAutoModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            VIN={VIN}
                                            brand={brand}
                                            model={model}
                                            vyear={vyear}
                                            vprice={vprice}
                                            kilo={kilo}
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
                        Add Auto
                    </Button>

                    <AddAutoModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddAutoModal>
                </ButtonToolbar>
            </div>
        )
    }
}