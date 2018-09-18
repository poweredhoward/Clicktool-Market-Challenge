import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "./Home"

class Seller extends React.Component{

    state ={
        itemname: "",
        itemdescription: "",
        itemprice: ""
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }
    
    postItem = (event) =>{
        event.preventDefault();
        axios.post("/api/item", this.state)
        .then(res =>{
            console.log(res);
        })
    }

    render(){
    return(
        <div>
            <h1>Post a New Item</h1>
            <form>
                <label htmlFor="itemname">Product Name</label>
                <input id="itemname" 
                type="text"  
                onChange={this.handleInputChange} 
                placeholder="Name"/>

                <label htmlFor="itemdescription">Item Description</label>
                <input id="itemdescription"
                type="text"
                onChange={this.handleInputChange}
                placeholder="Description" />

                <label htmlFor="itemprice">Item Description</label>
                <input id="itemprice"
                type="number"
                onChange={this.handleInputChange}
                placeholder="Price" />

                <button onClick={this.postItem}>Post</button>
                
            </form>
            <Link to="/">Home</Link>
        </div>
    )
}
}

// const Seller = (props) =>{
//     console.log(props);
//     return(
//         <h1>{props.match.params}</h1>
//     )
// }

export default Seller;