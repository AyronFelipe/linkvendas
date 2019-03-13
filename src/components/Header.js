import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{

    render(){
        return(
            <header>
                <nav className="navbar navbar-light bg-primary justify-content-between">
                    <a className="navbar-brand">NorteLink</a>
                    <Link to="/login/">
                        <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Login</button>
                    </Link>
                </nav>
            </header>
        )
    }
}