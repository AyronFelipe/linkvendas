import React from 'react';

export default class SideMenu extends React.Component{

    render(){
        return(
            <div className="sidebar sidebar-style-2">
                <div className="sidebar-wrapper scrollbar scrollbar-inner">
                    <div className="sidebar-content">
                        <ul className="nav nav-primary">
                            <li className="nav-item">
                                <a data-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
                                    <i className="fas fa-home"></i>
                                    <p>Início</p>
                                    <span className="caret"></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}