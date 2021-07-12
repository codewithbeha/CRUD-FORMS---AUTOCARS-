import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

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
            fetch('http://localhost:5000/api/report'+repid,{
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
                        {reps.map(r=>
                            <tr key={r.ReportId}>
                                 <td>{r.ReportId}</td>
                                 <td>{r.Employee}</td>
                                 <td>{r.Department}</td>
                                 <td>{r.Status}</td>
                                 <td>{r.Description}</td>
                                 <td>{r.ReportTo}</td>
                                 <td>{r.DateOf}</td>
  
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                        onClick={()=>this.setState({editModalShow:true,
                                            rid:r.ReportId, remployee:r.Employee,rdepartment:r.Department,rstatus:r.Status, rdescription:r.Description,rreportto:r.ReportTo,rdate:r.DateOf})}>
                                                Edit     
                                            </Button> 
                                            
                                            <Button className="mr-2" variant="danger"
                                            onClick={()=>this.deleteEmp(r.ReportId)}>
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
            