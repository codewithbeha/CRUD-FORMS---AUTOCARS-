import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import sal from "../Pages/images/sales.jpg";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSales} from '../Models/AddSales';
import {EditSales} from '../Models/EditSales';

export class Sales extends Component{

    constructor(props){
        super(props);
        this.state={sales:[],veh:[],emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/automobile')
        .then(response=>response.json())
        .then(data=>{
            this.setState({veh:data});
        });

        fetch('http://localhost:5000/api/employee')
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

    deleteEmp(sid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/sales/'+sid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {sales, vin, semp, sprice, sdetail, sdos}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                 <div id="body">
        <h1>Tasks</h1>
          <div id="content">
            <img src={sal} alt=""/>
            </div>
            </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>Employee</th>
                            <th>Price</th>
                            <th>Details</th>
                            <th>DateOfSale</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sales=>
                            <tr key={sales.VIN}>
                            <td>{sales.VIN}</td>
                            <td>{sales.Employee}</td>
                            <td>{sales.Price}</td>
                            <td>{sales.Details}</td>
                            <td>{sales.DateOfSale}</td>

                           <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            vin:sales.VIN, semp:sales.Employee, sprice:sales.Price ,sdetail:sales.Details,sdos:sales.DateOfSale})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(sales.VIN)}>
                                                Delete
                                            </Button>

                                        <EditSales show={this.state.editModalShow}
                                           onHide={editModalClose}
                                           vin={vin}
                                           semp={semp}
                                           sprice={sprice}
                                           sdetail={sdetail}
                                           sdos={sdos}
                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Sale
                    </Button>

                    <AddSales show={this.state.addModalShow}
                    onHide={addModalClose}></AddSales>
                </ButtonToolbar>
            </div>
        )
    }
}