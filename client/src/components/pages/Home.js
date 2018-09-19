import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Customer from "../pages/Customer";
import Seller from "../pages/Seller";



class Home extends React.Component{

    state={
        allitems: []
    }

    styling={
        maxWidth: "300px",
        maxHeight: "300px"

    }

    componentDidMount =() =>{
 
        axios.get("/api/all/items").then( items => {
            console.log(items);
            this.setState({
                allitems: items.data
            })
        })
    }

    
    //May be able to get rid of this
    params = (item) =>{
        return {
            pathname:`/customer/${item.name}`,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
            // clickpoints: this.props.clickpoints,
        }
    }

    render(){
        return(
            <div>
                <h1>Welcome to the MERN Market!</h1>
                <h2>Post a new item:</h2>
                <button><Link to="/seller">New Item</Link></button>
                {this.state.allitems.map((item, i)=>(
                        <div key={i}>
                            <h4>{item.name}</h4>
                            <p>Description: {item.description}</p>
                            <p>${item.price}</p>
                            <img style={this.styling} src={item.image} />
                            <br />
                            
                            <Link to={this.params(item)} 
                            // item={item}
                            // clickpoints={this.state.clickpoints}
                            > 
                            See More </Link>
                            
                        </div>
                )
                )}
            </div>
        )
    }
}

export default Home;