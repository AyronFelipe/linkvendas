import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { verifyToken } from '../utils';
import MaskedInput from 'react-text-mask';


const PRIMEIRA_PAGE = 1;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class Clientes extends React.Component{

    constructor(props){
        super(props);
        this.id = React.createRef();
        this.state = { 
            clientes: [],
            carregaInfo: true,
            page: PRIMEIRA_PAGE,
            showCodigo: true,
            showCPFCNPJ: false,
            showNome: false,
        };
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
            this.setState({ carregaInfo: false });
            swal("Erro!", `${error.response.data.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: 'btn btn-danger'
                    }
                },
            })
            .then(() => {
                verifyToken(error.response.data.message);
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
            if (this.state.clientes.length >= 1) {
                return this.state.clientes.map((cliente) => 
                    <tr key={cliente.id}>
                        <td>{cliente.nome}</td>
                        <td>{cliente.cpf_cnpj}</td>
                        <td>
                            <Link to={`/cliente/${cliente.id}/detalhe/`}>
                                <button className="btn btn-small btn-nortelink"><i className="fas fa-ellipsis-v"></i></button>
                            </Link>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr>
                        <td colSpan="5">Nenhum cliente encontrado</td>
                    </tr>
                );
            }
        }
    }

    buscaCliente = (e) => {
        e.preventDefault();
        let order = '';
        let value = '';
        if (this.state.showCodigo) {
            order = 'id';
            value = this.id.current.value.toUpperCase();
        } else if (this.state.showCPFCNPJ) {
            order = 'cpf_cnpj';
            value = $('#cpf_cnpj').val().toUpperCase();
        } else {
            order = 'nome';
            value = this.id.current.value.toUpperCase();
        }
        this.setState({ carregaInfo: true });
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: this.state.page,
                order: order,
                value: value
            }
        })
        .then((res) => {
            this.setState({ clientes: res.data, carregaInfo: false });
        })
        .catch((error) => {
            this.setState({ clientes: '', carregaInfo: false });
            swal("Erro!", `${error.response.data.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: 'btn btn-danger'
                    }
                },
            }).then(() => {
                verifyToken(error.response.data.message);
            });
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

    changeDesejo = (e) => {
        if (e.target.value == 'id') {
            this.setState({
                showCodigo: true,
                showCPFCNPJ: false,
                showNome: false,
            });
            this.id.current.value = '';
        } else if (e.target.value == 'cpfcnpj') {
            this.setState({
                showCodigo: false,
                showCPFCNPJ: true,
                showNome: false,
            });
            this.id.current.value = '';
        } else {
            this.setState({
                showCodigo: false,
                showCPFCNPJ: false,
                showNome: true,
            });
            this.id.current.value = '';
        }
    }

    renderOptionsBusca = () => {
        if (this.state.showCodigo) {
            return (
                <div className="form-group">
                    <label htmlFor="id">Código do cliente</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="id" id="id" className="form-control" />
                </div>
            );
        } else if (this.state.showCPFCNPJ) {
            return (
                <div className="form-group">
                    <label htmlFor="id">CPF ou CNPJ do cliente (sem formatação)</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                        guide={false}
                        placeholder="Insira aqui"
                        className="form-control"
                        name="id"
                        id="cpf_cnpj"
                        required />
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <label htmlFor="id">Nome do cliente</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="id" id="id" className="form-control" style={inputStyle} />
                </div>
            );
        }
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
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <label htmlFor="desejo">Você deseja buscar cliente por</label>
                                                        <select name="desejo" id="desejo" onChange={this.changeDesejo} className="form-control">
                                                            <option value="">&nbsp;</option>
                                                            <option value="id">Código</option>
                                                            <option value="cpfcnpj">CPF ou CNPJ</option>
                                                            <option value="nome">Nome</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={this.buscaCliente}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        {this.renderOptionsBusca()}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button type="submit" className="btn btn-nortelink btn-round btn-lg btn-block"><i className="fas fa-search"></i> Buscar</button>
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