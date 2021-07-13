import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import comp from "../Pages/images/comp.jpg";

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddRepModal} from '../Models/AddRepModal';
import {EditRepModal} from '../Models/EditRepModal';

export class Report extends Component{

    constructor(props){
        super(props);
        this.state={reps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('http://localhost:5000/api/report')
        .then(response=>response.json())
        .then(data=>{
            this.setState({reps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(repid){
        if(window.confirm('Are you sure?')){
            fetch('http://localhost:5000/api/report/'+repid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){

        const {reps, rid, remployee, rdepartment, rstatus, rdescription, rreportto, rdate}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div>
                <div id="body">
        <h1>Reports</h1>
          <div id="content">
            <img src={comp} alt=""/>
            </div>
            </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ReportId</th>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>ReportTo</th>
                            <th>DateOf</th>
                            <th>Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        {reps.map(reps=>
                            <tr key={reps.ReportId}>
                                 <td>{reps.ReportId}</td>
                                 <td>{reps.Employee}</td>
                                 <td>{reps.Department}</td>
                                 <td>{reps.Status}</td>
                                 <td>{reps.Description}</td>
                                 <td>{reps.ReportTo}</td>
                                 <td>{reps.DateOf}</td>
  
                                <td>
                                    <ButtonToolbar>
                                         <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            rid:reps.ReportId, remployee:reps.Employee,rdepartment:reps.Department,rstatus:reps.Status, rdescription:reps.Description,rreportto:reps.ReportTo,rdate:reps.DateOf})}>
                                                Edit     
                                            </Button>  
                                            
                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(reps.ReportId)}>
                                                Delete
                                            </Button>

                                            <EditRepModal show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            rid={rid}
                                            remployee={remployee}
                                            rdepartment={rdepartment}
                                            rstatus={rstatus}
                                            rdescription={rdescription}
                                            rreportto={rreportto}
                                            rdate={rdate} 

                                            />
                                    </ButtonToolbar>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add Report
                    </Button>

                    <AddRepModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddRepModal>
                </ButtonToolbar>
            </div>
        )
    }
}
            