import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Customer from "./pages/Customer";
import Seller from "./pages/Seller";
import Home from "./pages/Home";

class Main extends React.Component {
  

    render(){
    return(
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/customer/:name" component={Customer} />
                <Route exact path="/seller" component={Seller} />
             </div>
        </Router>
    )
    }
}

export default Main;