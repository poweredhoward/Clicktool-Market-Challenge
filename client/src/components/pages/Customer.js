import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Home from "./Home";
const { detect } = require('detect-browser');


class Customer extends React.Component{

    state ={
        item: {},
        clickCount: "",
        clickInfo: []
    }
    
    componentDidMount = () =>{
        const browser = detect();
        console.log(browser);

        // console.log(this.props);
        axios.get(`/api/${this.props.match.params.name}`)
        .then(returnedItem =>{


            console.log(returnedItem);
            this.setState({item: returnedItem.data});
            console.log(this.state.item);

            //Once page is returned, it should update click data
            axios.post("/api/click/"+returnedItem.data.id, {browser: browser})
            .then(countAndRows => {
                console.log(countAndRows);
                this.setState({
                    clickCount: countAndRows.data.count,
                    clickInfo: countAndRows.data.rows
                })
            })

        })
        // console.log(this.props.params);
    }

    render(){
        return(
            <div>
                {/* <h1>{this.props.match.params.name}</h1> */}
                <h1>{this.state.item.name}</h1>
                <h2>Description: {this.state.item.description}</h2>
                <h3>${this.state.item.price}</h3>
                <img src={this.state.item.image} />
                <details>
                    <summary>
                        See click data for this product
                    </summary>
                    <p>Clicked {this.state.clickCount} times</p>
                    <br />
                    <table>
                        <tr>
                            <th>IP</th>
                            <th>Browser</th>
                            <th>OS</th>
                            <th>Visited Time</th>
                        </tr>

                        {this.state.clickInfo.map((click, k) =>(
                            <tr key={k}>
                                <td>{click.ip}</td>
                                <td>{click.browser}</td>
                                <td>{click.os}</td>
                                <td>{click.createdAt}</td>
                            </tr>
                        ))}
                    </table>

                </details>
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