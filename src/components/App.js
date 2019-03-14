import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import MainExternal from './MainExternal';
import Clientes from './Clientes';

class Initial extends React.Component{

    render(){
        return(
            <MainExternal />
        )
    }
}

export default class App extends React.Component{

    render(){
        return(
            <Router>
                <div className="wrapper">
                    <Route path='/' exact component={Initial} />
                    <Route path='/login/' component={Login} />
                    <Route path='/clientes/' component={Clientes} />
                </div>
            </Router>
        )
    }
}
