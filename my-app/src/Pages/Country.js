import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCountryModal} from '../Models/AddCountryModal';
import {EditCountryModal} from '../Models/EditCountryModal';

export class Country extends Component{

    constructor(props){
        super(props);
        this.state={countries:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/country')
        .then(response=>response.json())
        .then(data=>{
            this.setState({countries:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteCountry(cid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/country'+cid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {countries, cid, cname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CountryId</th>
                            <th>CountryName</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.map(c=>
                            <tr key={c.CountryId}>
                                <td>{c.CountryId}</td>
                                <td>{c.CountryName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            cid:c.CountryId,cname:c.CountryName})}>
                                                Edit
                                            </Button>

                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteCountry(c.CountryId)}>
                                                Delete
                                            </Button>

                                            <EditCountryModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            cid={cid}
                                            cname={cname}/>
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Country
                    </Button>

                    <AddCountryModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddCountryModal>
                </ButtonToolbar>
            </div>
        )
    }
}