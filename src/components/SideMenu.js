import React from 'react';
import {Link} from 'react-router-dom';

export default class SideMenu extends React.Component{

    render(){
        return(
            <div className="sidebar sidebar-style-2" data-background-color="white">
                <div className="sidebar-wrapper scrollbar scrollbar-inner">
                    <div className="sidebar-content">
                        <ul className="nav nav-primary">
                            <li className="nav-item">
                                <Link to="/clientes/">
                                    <div data-toggle="collapse" className="collapsed" aria-expanded="false">
                                        <i className="flaticon-users"></i>
                                        <p>Clientes</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/produtos/">
                                    <div data-toggle="collapse" className="collapsed" aria-expanded="false">
                                        <i className="la flaticon-box-1"></i>
                                        <p>Produtos</p>
                                    </div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/pre-vendas/">
                                    <div data-toggle="collapse" className="collapsed" aria-expanded="false">
                                        <i className="flaticon-success"></i>
                                        <p>Pré-vendas</p>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}