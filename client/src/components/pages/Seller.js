import React from "react";
import axios, { post } from 'axios';
import { Link } from "react-router-dom";
import Home from "./Home"

class Seller extends React.Component{

    state ={
        itemname: "",
        itemdescription: "",
        itemprice: "",
        image: ""
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }

    handleImageChange = (event) => {
        this.setState({file:event.target.files[0]})
    }

    //Post item information, including image
    itemPost = (event) => {
        event.preventDefault();
        console.log(this.props.classroomId)
        const url = "/api/upload/image";
        const formData = new FormData();
        formData.append('file',this.state.file);
        formData.append("itemname", this.state.itemname);
        formData.append("itemdescription", this.state.itemdescription);
        formData.append("itemprice", this.state.itemprice);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData,config)
      }
    
    
    // postItem = (event) =>{
    //     event.preventDefault();
    //     axios.post("/api/item", this.state)
    //     .then(res =>{
    //         console.log(res);
    //         this.fileUpload();
    //     })
    // }

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
                <br/>

                <label htmlFor="itemdescription">Item Description</label>
                <input id="itemdescription"
                type="text"
                onChange={this.handleInputChange}
                placeholder="Description" />
                <br/>

                <label htmlFor="itemprice">Item Description</label>
                <input id="itemprice"
                type="number"
                onChange={this.handleInputChange}
                placeholder="Price" />
                <br/>

                <label htmlFor="image">Include Image</label>
                <input type="file"
                onChange={this.handleImageChange} />

                <button onClick={this.itemPost}>Post</button>
                
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