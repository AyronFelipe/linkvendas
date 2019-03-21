import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import MainExternal from './MainExternal';
import Clientes from './Clientes';
import NovoCliente from './NovoCliente';
import Produtos from './Produtos';
import Prevendas from './Prevendas';
import NovaPrevenda from './NovaPrevenda';

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
                    <Route path='/clientes/' exact component={Clientes} />
                    <Route path='/novo-cliente/' component={NovoCliente} />
                    <Route path='/produtos/' exact component={Produtos} />
                    <Route path='/pre-vendas/' exact component={Prevendas} />
                    <Route path='/nova-pre-venda/' component={NovaPrevenda} />
                </div>
            </Router>
        )
    }
}
