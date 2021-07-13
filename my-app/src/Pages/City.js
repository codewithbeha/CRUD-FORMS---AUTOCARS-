import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import citie from "../Pages/images/cities.jpg";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCityModal} from '../Models/AddCityModal';
import {EditCityModal} from '../Models/EditCityModal';

export class City extends Component{
    
    constructor(props){
        super(props);
        this.state={cities:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/city')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cities:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCity(ciid){
        if(window.confirm('A jeni i sigurtë?')){
            fetch('http://localhost:5000/api/city/'+ciid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {cities, ciid, ciname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                      <div id="body">
        <h1>Cities</h1>
          <div id="content">
            <img src={citie} alt=""/>
            </div>
            </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CityId</th>
                            <th>CityName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map(ci=>
                            <tr key={ci.CityId}>
                                <td>{ci.CityId}</td>
                                <td>{ci.CityName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            ciid:ci.CityId,ciname:ci.CityName})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteCity(ci.CityId)}>
                                                Delete
                                            </Button>

                                            <EditCityModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            ciid={ciid}
                                            ciname={ciname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add City
                    </Button>

                    <AddCityModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddCityModal>
                </ButtonToolbar>
            </div>
        )
    }
}