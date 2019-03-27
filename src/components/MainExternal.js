import React from 'react';
import { Link } from 'react-router-dom';

export default class MainExternal extends React.Component{
    
    render(){
        return(
            <div className="login">
                <div className="wrapper wrapper-login wrapper-login-full p-0">
                    <div className="login-aside w-50 d-flex flex-column align-items-center justify-content-center text-center bg-white">
                        <img src="../../assets/images/logo.png" className="img-fluid d-none d-sm-block" alt="Logo Responsive" />
                        <Link to="/login/">
                            <button className="btn btn-nortelink btn-lg mt-5 d-none d-sm-block"><i className="icon-login mr-2"></i> Login</button>
                        </Link>
                    </div>
                    <div className="login-aside w-50 d-flex align-items-center justify-content-center bg-nortelink">
                        <div className="container container-login container-transparent animated fadeIn">
                            <h1 className="text-center text-white page-title"><i className="fas fa-cog"></i> Gerenciamento de Pré-vendas</h1>
                            <div className="row">
                                <div className="col-md-6 col-sm-12">
                                    <div className="card card-stats card-primary card-round">
                                        <Link to="/clientes/">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="icon-big text-center">
                                                            <i className="flaticon-users"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-stats">
                                                        <div className="numbers">
                                                            <p className="card-category">Clientes</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="card card-stats card-info card-round">
                                        <Link to="/produtos/">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="icon-big text-center">
                                                            <i className="la flaticon-box-1"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-stats">
                                                        <div className="numbers">
                                                            <p className="card-category">Produtos</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="card card-stats card-success card-round">
                                        <div className="card-body ">
                                            <div className="row">
                                                <div className="col-5">
                                                    <div className="icon-big text-center">
                                                        <i className="flaticon-analytics"></i>
                                                    </div>
                                                </div>
                                                <div className="col-7 col-stats">
                                                    <div className="numbers">
                                                        <p className="card-category">Vendas</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <div className="card card-stats card-secondary card-round">
                                        <Link to="/pre-vendas/">
                                            <div className="card-body ">
                                                <div className="row">
                                                    <div className="col-5">
                                                        <div className="icon-big text-center">
                                                            <i className="flaticon-success"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-7 col-stats">
                                                        <div className="numbers">
                                                            <p className="card-category">Pré-vendas</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}