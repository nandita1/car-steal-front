import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {API} from '../../config';
import classes from './Cases.module.css'

class Cases extends Component {
    state = {
        cases: []
    }

    componentDidMount(){
        fetch(`${API}/cases`, {
            method: "GET",
          })
            .then((response) => {
                console.log(response)
              return response.json()
            })
            .then((response) => {
                this.setState({cases: response})
            })
            .catch((err) => {
              console.log(err)
            });
    }

    resolve = (id) =>{
        fetch(`${API}/cases/resolve/${id}`, {
            method: "GET",
          })
            .then((response) => {
                console.log(response)
              return response.json()
            })
            .then((response) => {
                let newCases = []
                fetch(`${API}/cases`, {
                    method: "GET",
                  })
                    .then((response) => {
                        console.log(response)
                      return response.json()
                    })
                    .then((response) => {
                        for(let cases of response){
                            if(cases._id === id){
                                cases.status = 'resolved'
                            }
                            newCases.push(cases)
                        }
                        this.setState({...this.state, cases: [...newCases]})
                    })
                    .catch((err) => {
                      console.log(err)
                    });
                
            })
            .catch((err) => {
              console.log(err)
            });
    }

    render(){
        return(
            <div className={classes.container}>
                <button className={classes.register}><Link className={classes.link} to='/cases/create'>Register a case</Link></button>
                {this.state.cases.map((cases, i)=>(
                    <div className={classes.row} key={i}>
                        <h3>Model: {cases.Model}</h3>
                        <h3>Owner Name: {cases.OwnerName}</h3>
                        <p>Vehicle No.: {cases.CarNo}</p>
                        <p>Phone No.: {cases.OwnerContact}</p>
                        {cases.OfficerAssigned ? (<p>Officer Assigned:{cases.OfficerAssigned.name}</p>):null}
                        <p>Status: {cases.status}</p>
                        {cases.status === "assigned" ? <button className={classes.resolve} onClick={() => this.resolve(cases._id)}>Resolve</button> : null}
                    </div>
                ))}
            </div>
        )
    }
}

export default Cases;