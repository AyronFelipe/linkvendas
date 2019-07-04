import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { abstractError } from '../utils';
import SearchCliente from './SearchCliente';


const PRIMEIRA_PAGE = 1;

export default class Prevendas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            prevendas: [],
            carregaInfo: true,
            page: PRIMEIRA_PAGE,
            situacoes: [],
            planos_pag: [],
        };
        this.childCliente = React.createRef();
    }

    triggerChildClienteSearch = () => {
        this.childCliente.current.searchCliente();
    }

    changeHandlerChild = (field, value) => {
        this.setState({ [field]: value });
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
                    <tr key={prevenda.id_prevenda}>
                        <td>{prevenda.id_prevenda}</td>
                        <td>{prevenda.nome_cliente}</td>
                        <td>{prevenda.nome_plano_pag}</td>
                        <td>{prevenda.vl_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                        <td>
                            <Link to={`/pre-venda/${prevenda.numero}/detalhe/`}>
                                <button className="btn btn-small btn-nortelink"><i className="fas fa-ellipsis-v"></i></button>
                            </Link>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr>
                        <td colSpan="5">Nenhuma pré-venda encontrada</td>
                    </tr>
                );
            }
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

    getPlanosPag = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/planospag/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
            }
        })
        .then((res) => {
            this.setState({ planos_pag: res.data })
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    buscaPrevenda = (e) => {
        e.preventDefault();
        this.setState({ carregaInfo: true });
        let planos_pag = [];

        axios({
            url: `http://api.nortelink.com.br/api/v1/prevendas/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
                data_ini: $('#data_ini').val(),
                data_fim: $('#data_fim').val(),
                id_cliente: $('#id_cliente').val(),
                id_plano_pag: $('#id_plano_pag').val().join('|'),
                situacao: $('#situacao').val().join('|'),
            }
        })
        .then((res) => {
            this.setState({ prevendas: res.data, carregaInfo: false });
        })
        .catch((error) => {
            this.setState({ prevendas: '', carregaInfo: false });
            abstractError(error);
        });
    }

    defaultValueDate = () => {
        let today = new Date();
        $('.date-nortelink').val(today.toISOString().substr(0, 10));
    }

    componentDidMount(){
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
        this.getPrevendas();
        $('.select2').select2({
            theme: 'bootstrap'
        });
        this.getSituacoes();
        this.getPlanosPag();
        this.defaultValueDate();
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
                                            <button className="btn btn-nortelink btn-round"><i className="la flaticon-add mr-2"></i> Gerar Pré-venda</button>
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
                                            <form onSubmit={this.buscaPrevenda}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row">
                                                            <div className="col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="data_ini">Data Inicial</label>
                                                                    <input type="date" id="data_ini" className="form-control date-nortelink" placeholder="Insira aqui" name="data_ini" />
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6 col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="data_ini">Data Final</label>
                                                                    <input type="date" id="data_fim" className="form-control date-nortelink" placeholder="Insira aqui" name="data_fim" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="id_cliente">Código do Cliente</label>
                                                            <div className="input-group">
                                                                <SearchCliente name="id_cliente" id="id_cliente" ref={this.childCliente} onChange={this.changeHandlerChild} requi red={false} />
                                                                <div className="input-group-append">
                                                                    <button className="btn btn-nortelink" type="button" onClick={this.triggerChildClienteSearch}><i className="fas fa-search"></i> Buscar Cliente</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="id_plano_pag">Código do Plano de Pagamento</label>
                                                            <div className="select2-input">
                                                                <select name="id_plano_pag" id="id_plano_pag" className="form-control select2" multiple>
                                                                    <option value="">&nbsp;</option>
                                                                    {this.state.planos_pag.map((plano) => 
                                                                        <option value={plano.id} key={plano.id}>{plano.nome}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="situacao">Situação</label>
                                                            <div className="select2-input">
                                                                <select name="situacao" id="situacao" className="form-control select2" multiple>
                                                                    <option value="">&nbsp;</option>
                                                                    {this.state.situacoes.map((situacao) =>
                                                                        <option value={situacao.id} key={situacao.id}>{situacao.descricao}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
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
                                                            <th>Cliente</th>
                                                            <th>Plano de Pagamento</th>
                                                            <th>Valor Total</th>
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