import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component{

    render(){
        return(
            <header className="main-header">
                <div className="logo-header" data-background-color="blue">
                    <a href="#" className="logo">
                        <img src="../../assets/images/logo.png" style={{ height: '35px', width: '108px' }} alt="navbar brand" className="navbar-brand" />
                    </a>
                    <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <i className="icon-menu"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more"><i className="icon-options-vertical"></i></button>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar">
                            <i className="icon-menu"></i>
                        </button>
                    </div>
                </div>
                <nav className="navbar navbar-header navbar-expand-lg" data-background-color="blue">
                    <div className="container-fluid">
                        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}