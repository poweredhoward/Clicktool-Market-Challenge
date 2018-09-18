import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "./Home"

class Customer extends React.Component{

    state ={
        item: {}
    }
    
    componentDidMount = () =>{
        console.log(this.props);
        axios.get(`/api/${this.props.match.params.name}`)
        .then(returnedItem =>{
            console.log(returnedItem);
            this.setState({item: returnedItem.data});
            console.log(this.state.item);
        })
        // console.log(this.props.params);
    }
    render(){
    return(
        <div>
            {/* <h1>{this.props.match.params.name}</h1> */}
            <h1>{this.state.item.name}</h1>
            {/* <h2>{this.props.location.clickpoints}</h2> */}
            {/* <h2>{this.props.location.description}</h2> */}
            <Link to="/">Home</Link>
        </div>
    )
}
}

// const Customer = (props) =>{
//     console.log(props);
//     return(
//         <h1>{props.match.params}</h1>
//     )
// }

export default Customer;