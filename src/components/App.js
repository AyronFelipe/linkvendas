import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import MainExternal from './MainExternal';
import Clientes from './Clientes';
import NovoCliente from './NovoCliente';
import Produtos from './Produtos';
import Prevendas from './Prevendas';
import NovaPrevenda from './NovaPrevenda';
import MainInterno from './MainInterno';
import PrivateRoute from './PrivateRoute';
import DetalheProduto from './DetalheProduto';
import DetalheCliente from './DetalheCliente';
import DetalhePrevenda from './DetalhePrevenda';
import EditarCliente from './EditarCliente';
import EditarPrevenda from './EditarPrevenda';
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
                    <PrivateRoute authenticated={this.state.authenticated} path='/nova-pre-venda/' component={NovaPrevenda} />
                    <Route path='/' exact component={Initial} />
                    <Route path='/login/' component={Login} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/main/' exact component={MainInterno} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/clientes/' exact component={Clientes} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/novo-cliente/' component={NovoCliente} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/produtos/' exact component={Produtos} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/pre-vendas/' exact component={Prevendas} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/produto/:id/detalhe/' component={DetalheProduto} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/cliente/:id/detalhe/' component={DetalheCliente} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/pre-venda/:id/detalhe/' component={DetalhePrevenda} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/cliente/:id/editar/' component={EditarCliente} />
                    <PrivateRoute authenticated={this.state.authenticated} path='/pre-venda/:id/editar/' component={EditarPrevenda} />
                </div>
            </Router>
        )
    }
}
