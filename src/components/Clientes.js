import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import {Link} from 'react-router-dom';
import axios from 'axios';


const PRIMEIRA_PAGE = 1;

export default class Clientes extends React.Component{

    constructor(props){
        super(props);
        this.id = React.createRef();
        this.state = { clientes: [], carregaInfo: true, page: PRIMEIRA_PAGE};
    }

    getClientes = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: this.state.page,
            }
        })
        .then((res) => {
            this.setState({clientes: res.data, carregaInfo: false});
        })
        .catch((error) => {
            swal("Erro!", `${error.response.data.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: 'btn btn-danger'
                    }
                },
            });
        });
    }

    renderClientes = () => {
        if (this.state.carregaInfo) {
            return <tr>
                <td colSpan="5">
                    <div className="loader loader-lg"></div>
                </td>
            </tr>
        } else {
            return this.state.clientes.map((cliente) => 
                <tr key={cliente.id}>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf_cnpj}</td>
                    <td><button className="btn btn-small btn-nortelink"><i className="fas fa-ellipsis-v"></i></button></td>
                </tr>
            )
        }
    }

    buscaCliente = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                id: this.id.current.value,
                page: PRIMEIRA_PAGE
            }
        })
        .then((res) => {
            this.setState({ clientes: res.data });
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    componentDidMount() {
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
        this.getClientes();
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
                                            <div className="card-title">Busca</div>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="id">Código ou CPF ou CNPJ do cliente sem formatação</label>
                                                            <input type="text" ref={this.id} name="id" id="id" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button type="button" className="btn btn-nortelink btn-round btn-lg btn-block" onClick={this.buscaCliente}><i className="fas fa-search"></i> Buscar</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Tabela de Clientes</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table mt-3">
                                                    <thead>
                                                        <tr>
                                                            <th>Nome</th>
                                                            <th>CPF / CNPJ</th>
                                                            <th>Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderClientes()}
                                                    </tbody>
                                                </table>
                                                <nav>
                                                    <ul className="pagination justify-content-end">
                                                        {this.state.page != PRIMEIRA_PAGE ?
                                                            <li className="page-item">
                                                                <a className="page-link" href="#" tabindex="-1">Anterior</a>
                                                            </li> 
                                                        :
                                                            <React.Fragment>
                                                                <li className="page-item"><a className="page-link" href="#">{this.state.page}</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">{this.state.page + 1}</a></li>
                                                                <li className="page-item"><a className="page-link" href="#">{this.state.page + 2}</a></li>
                                                                <li className="page-item">
                                                                    <a className="page-link" href="#">Próxima</a>
                                                                </li>
                                                            </React.Fragment>
                                                        }
                                                    </ul>
                                                </nav>
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