import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {API} from '../../config';
import classes from './Create.module.css'

class Create extends Component {
    state = {
        carNo: '',
        model: '',
        name: '',
        phone: '',
        status: ''
    }

    inputChangeHandler = (event, name) => {
        //setValues({ ...values, error: false, [name]: event.target.value });
        
         const updatedControls = {
            ...this.state,
            [name]: event.target.value
        };
        this.setState(updatedControls)
        
    };

    clickSubmit = (event) => {
        event.preventDefault();
            var formData = new FormData()
            formData.set("CarNo", this.state.carNo)
            formData.set("OwnerContact", this.state.phone)
            formData.set("Model", this.state.model)
            formData.set("OwnerName", this.state.name)
            // Display the values
            fetch(`${API}/cases/create`,{
                method: "POST",
                body: formData
              })
            .then(response => {    
                console.log(response)
                response.json()
                this.setState({...this.state, status: response.status})
            })
            .then(response => {
                console.log(response)
                
            })
            .catch(err => {
                console.log(err)
            })
    }
    render(){
        return(
            <form>
                <h2>Register Case</h2>
                <p>
                    <label><h4>Car No.</h4></label>
                    <input type="text" required onChange={(event) => this.inputChangeHandler(event, "carNo")}></input>
                </p>
                <p>
                    <label><h4>Model</h4></label>
                    <input type="text" required onChange={(event) => this.inputChangeHandler(event, "model")}></input>
                </p>
                <p>
                    <label><h4>Owner Name</h4></label>
                    <input type="text" required onChange={(event) => this.inputChangeHandler(event, "name")}></input>
                </p>
                <p>
                    <label><h4>Owner Contact</h4></label>
                    <input type="tel" required onChange={(event) => this.inputChangeHandler(event, "phone")}></input>
                </p>
                <button type="submit" className={classes.submit} onClick={(event) => this.clickSubmit(event)}>Register</button>
                {this.state.status ? <Redirect to="/"></Redirect>:null}
            </form>
        )
    }
}

export default Create;