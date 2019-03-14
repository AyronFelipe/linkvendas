import React from 'react';
import Header from './Header';

export default class Clientes extends React.Component{

    render(){
        return(
            <React.Fragment>
                <Header />
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-primary-gradient">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Gerenciamento de Clientes</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode buscar e cadastrar clientes</h5>
                                    </div>
                                    <div class="ml-md-auto py-2 py-md-0">
                                        <button className="btn btn-primary btn-round"><i class="la flaticon-add mr-2"></i> Cadastrar Cliente</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Tabela de Clientes</div>
                                        </div>
                                        <div className="card-body">
                                            <table className="table mt-3">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nome</th>
                                                        <th>E-mail</th>
                                                        <th>Celular</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}