import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import MainExternal from './MainExternal';
import Clientes from './Clientes';
import NovoCliente from './NovoCliente';
import Produtos from './Produtos';
import Prevendas from './Prevendas';
import NovaPrevenda from './NovaPrevenda';
import Vendas from './Vendas';
import NovaVenda from './NovaVenda';
import MainInterno from './MainInterno';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from '../auth';

class Initial extends React.Component{

    render(){
        return(
            <MainExternal />
        )
    }
}

export default class App extends React.Component{

    constructor(props){
        super(props)
        this.state = {authenticated: isAuthenticated()}
    }

    render(){
        return(
            <Router>
                <div className="wrapper">
                    <Route path='/' exact component={Initial} />
                    <Route path='/login/' component={Login} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/main/' exact component={MainInterno} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/clientes/' exact component={Clientes} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/vendas/' exact component={Vendas} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/novo-cliente/' component={NovoCliente} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/produtos/' exact component={Produtos} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/pre-vendas/' exact component={Prevendas} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/nova-pre-venda/' component={NovaPrevenda} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/nova-venda/' component={NovaVenda} />
                </div>
            </Router>
        )
    }
}
