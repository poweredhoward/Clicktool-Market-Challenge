import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "./Home"

class NewSeller extends React.Component{

    state ={
        username : "",
        password : ""
    }

    handleInputChange = (event) =>{
        this.setState({
            [event.target.id] : event.target.value
        })
    };

    submitNewCredentials = (event) =>{
        event.preventDefault();
    }
    
    submitExistingCredentials = (event) =>{
        event.preventDefault();
    }
    
    render(){
        return(
            <div>
                <h1>Register New User</h1>
                <h2>To be able to sell a product, please login or create an account</h2>
                <form>
                    <label htmlFor="username">Username</label>
                    <input id="username"
                    type="text"
                    placeholder="Username" 
                    onChange={this.handleInputChange} />

                    <label htmlFor="password">Password</label>
                    <input id="password"
                    type="password"
                    placeholder="Password" 
                    onChange={this.handleInputChange} />

                    <button onClick={this.submitNewCredentials}>
                        New User
                    </button>

                    <button onClick={this.submitExistingCredentials}>
                        Returning User
                    </button>

                </form>
                <Link to="/">Home</Link>
            </div>
        )
    }
}
export default NewSeller;