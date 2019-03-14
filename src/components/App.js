import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';
import MainExternal from './MainExternal';

class Initial extends React.Component{

    render(){
        return(
            <div className="wrapper">
                <MainExternal />
            </div>
        )
    }
}

export default class App extends React.Component{

    render(){
        return(
            <Router>
                <React.Fragment>
                    <Route path='/' exact component={Initial} />
                    <Route path='/login/' component={Login} />
                </React.Fragment>
            </Router>
        )
    }
}
