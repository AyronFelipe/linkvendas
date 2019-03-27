import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import {Link} from 'react-router-dom';

export default class Clientes extends React.Component{

    componentDidMount() {
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <SideMenu />
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-nortelink">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Gerenciamento de Clientes</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode buscar e cadastrar clientes</h5>
                                    </div>
                                    <div className="ml-md-auto py-2 py-md-0">
                                        <Link to="/novo-cliente/">
                                            <button className="btn btn-nortelink btn-round"><i className="la flaticon-add mr-2"></i> Cadastrar Cliente</button>
                                        </Link>
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
                                            <div className="table-responsive">
                                                <table className="table mt-3" id="basic-datatables">
                                                    <thead>
                                                        <tr>
                                                            <th>Nome</th>
                                                            <th>CPF / CNPJ</th>
                                                            <th>Ações</th>
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
                </div>
            </React.Fragment>
        )
    }
}