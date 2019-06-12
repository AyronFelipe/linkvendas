import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { abstractError } from '../utils';


const PRIMEIRA_PAGE = 1;

export default class Prevendas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            prevendas: [],
            carregaInfo: true,
            page: PRIMEIRA_PAGE,
            showData: false,
            showCliente: false,
            showPlanoPag: false,
            showSituacao: false,
            situacoes: [],
        };
    }

    getPrevendas = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/prevendas/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
                data_ini: new Date(),
                data_fim: new Date(),
            }
        })
        .then((res) => {
            this.setState({ prevendas: res.data, carregaInfo: false });
        })
        .catch((error) => {
            this.setState({ carregaInfo: false });
            //abstractError(error);
        });
    }

    renderPrevendas = () => {
        if (this.state.carregaInfo) {
            return <tr>
                <td colSpan="5">
                    <div className="loader loader-lg"></div>
                </td>
            </tr>
        } else {
            if (this.state.prevendas.length >= 1) {
                return this.state.prevendas.map((prevenda) =>
                    <tr key={prevenda.id}>
                        <td>{prevenda.id}</td>
                        <td>{prevenda.descricao}</td>
                        <td>
                            <Link to={`/pre-venda/${prevenda.id}/detalhe/`}>
                                <button className="btn btn-small btn-nortelink"><i class="fas fa-ellipsis-v"></i></button>
                            </Link>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr>
                        <td colSpan="5">Nenhuma pré-venda cadastrada</td>
                    </tr>
                );
            }
        }
    }

    renderOptionsBusca = () => {
        if (this.state.showData) {
            return(
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="data_ini">Data Inicial</label>
                            <input type="date" id="data_ini" className="form-control" placeholder="Insira aqui" name="data_ini" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="data_ini">Data Final</label>
                            <input type="date" id="data_fim" className="form-control" placeholder="Insira aqui" name="data_fim" />
                        </div>
                    </div>
                </div>
            ); 
        } else if (this.state.showCliente) {
            return(
                <div className="form-group">
                    <label htmlFor="id_cliente">Código do Cliente</label>
                    <input type="text" placeholder="Insira aqui" name="id_cliente" id="id_cliente" className="form-control" />
                </div>
            );
        } else if (this.state.showPlanoPag) {
            return (
                <div className="form-group">
                    <label htmlFor="id_plano_pag">Código do Plano de Pagamento</label>
                    <input type="text" placeholder="Insira aqui" name="id_plano_pag" id_plano_pag="id_plano_pag" className="form-control" />
                </div>
            );
        } else if (this.state.showSituacao) {
            return (
                <div className="form-group">
                    <label htmlFor="situacao">Situação</label>
                    <div className="select2-input">
                        <select name="situacao" id="situacao" className="form-control">
                            <option value="">&nbsp;</option>
                            {this.state.situacoes.map((situacao) => 
                                <option value={situacao.id} key={situacao.id}>{situacao.descricao}</option>
                            )}
                        </select>
                    </div>
                </div>
            );
        }
    }

    getSituacoes = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/ofsituacoes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
            }
        })
        .then((res) => {
            this.setState({ situacoes: res.data })
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    changeDesejo = (e) => {
        if (e.target.value == 'data') {
            this.setState({
                showCliente: false,
                showData: true,
                showPlanoPag: false,
                showSituacao: false,
            })
        } else if (e.target.value == 'cliente') {
            this.setState({
                showCliente: true,
                showData: false,
                showPlanoPag: false,
                showSituacao: false,
            })
        } else if (e.target.value == 'plano_pagamento') {
            this.setState({
                showCliente: false,
                showData: false,
                showPlanoPag: true,
                showSituacao: false,
            })
        } else if (e.target.value == 'situacao') {
            this.setState({
                showCliente: false,
                showData: false,
                showPlanoPag: false,
                showSituacao: true,
            })
        }
    }

    buscaPrevenda = () => {
        e.preventDefault();
        if (this.state.showCliente) {
            params = {
                page: PRIMEIRA_PAGE,
                id_cliente: $('#id_cliente').val(),
            }
        } else if (this.state.showData) {
            params = {
                page: PRIMEIRA_PAGE,
                data_ini: $('#data_ini').val(),
                data_fim: $('#data_fim').val(),
            }
        } else if (this.state.showPlanoPag) {
            params = {
                page: PRIMEIRA_PAGE,
                id_plano_pag: $('#id_plano_pag').val(),
            }
        } else if (this.state.showSituacao) {
            params = {
                page: PRIMEIRA_PAGE,
                situacao: $('#situacao').val(),
            }
        }
        this.setState({ carregaInfo: true });
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: params
        })
        .then((res) => {
            this.setState({ prevendas: res.data, carregaInfo: false });
        })
        .catch((error) => {
            this.setState({ prevendas: '', carregaInfo: false });
            abstractError(error);
        });
    }

    componentDidMount(){
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
        this.getPrevendas();
        $('#situacao').select2({
            theme: 'bootstrap'
        });
        $('.select2-selection').css({
            'padding-top': '20px',
            'padding-bottom': '20px'
        });
        this.getSituacoes();
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
                                        <h2 className="text-white pb-2 fw-bold">Gerenciamento de Pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode buscar e cadastrar suas pré-vendas</h5>
                                    </div>
                                    <div className="ml-md-auto py-2 py-md-0">
                                        <Link to="/nova-pre-venda/">
                                            <button className="btn btn-nortelink btn-round"><i className="la flaticon-add mr-2"></i> Cadastrar Pré-venda</button>
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
                                                        <label htmlFor="numero">Você deseja buscar pré-venda por</label>
                                                        <select name="desejo" id="desejo" onChange={this.changeDesejo} className="form-control">
                                                            <option value="">&nbsp;</option>
                                                            <option value="data">Data de Início e Data de Fim</option>
                                                            <option value="cliente">Código de Cliente</option>
                                                            <option value="plano_pagamento">Código de Plano de Pagamento</option>
                                                            <option value="situacao">Situação</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={this.buscaPrevenda}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        {this.renderOptionsBusca()}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button type="submit" className="btn btn-nortelink btn-round btn-lg btn-block" onClick={this.buscaCliente}><i className="fas fa-search"></i> Buscar</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Pré-vendas</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table mt-3">
                                                    <thead>
                                                        <tr>
                                                            <th>Número</th>
                                                            <th>Período</th>
                                                            <th>Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderPrevendas()}
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