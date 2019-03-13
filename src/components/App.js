import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login';

class Initial extends React.Component{

    render(){
        return(
            <Header />
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