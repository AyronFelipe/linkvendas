import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { abstractError, fillWithZeros, scroll } from '../utils';
import BackButton from './BackButton';

const PRIMEIRA_PAGE = 1;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class Produtos extends React.Component{

    constructor(props){
        super(props);
        this.id = React.createRef();
        this.state = { 
            produtos: [],
            carregaInfo: true,
            page: PRIMEIRA_PAGE,
            order: '',
            showCodigo: true,
            showDescricao: false,
            showCodigoBarras: false,
        }
    }

    getProdutos = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/produtos/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: this.state.page,
            }
        })
        .then((res) => {
            this.setState({produtos: res.data, carregaInfo: false});
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    buscaProduto = (e) => {
        e.preventDefault();
        this.setState({ carregaInfo: true });
        if (this.state.showCodigo) {
            if (this.id.current.value == '') {
                this.getProdutos();
            } else {
                axios({
                    url: `http://api.nortelink.com.br/api/v1/produtos/${this.id.current.value}`,
                    method: `get`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    },
                })
                .then((res) => {
                    this.setState({ produtos: [res.data], carregaInfo: false });
                })
                .catch((error) => {
                    this.setState({ produtos: '', carregaInfo: false, });
                    abstractError(error);
                });
            }
        } else {
            if (this.id.current.value == '') {
                this.getProdutos();
            } else {
                axios({
                    url: `http://api.nortelink.com.br/api/v1/produtos/`,
                    method: `get`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.token}`
                    },
                    params: {
                        page: this.state.page,
                        [this.state.order]: this.id.current.value.toUpperCase(),
                    }
                })
                .then((res) => {
                    this.setState({ produtos: res.data, carregaInfo: false });
                })
                .catch((error) => {
                    this.setState({ produtos: '', carregaInfo: false, });
                    abstractError(error);
                });
            }
        }
        scroll('card-produtos');
    }

    renderProdutos = () => {
        if (this.state.carregaInfo) {
            return <tr>
                <td colSpan="5">
                    <div className="loader loader-lg"></div>
                </td>
            </tr>
        } else {
            if (this.state.produtos.length >= 1) {
                return this.state.produtos.map((produto) =>
                    <tr key={produto.id}>
                        <td>{produto.id}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.saldo_loja == 1 ? `${produto.saldo_loja} unidade` : `${produto.saldo_loja} unidades`}</td>
                        <td>{produto.preco_venda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        <td>
                            <Link to={`/produto/${produto.id}/detalhe/`}>
                                <button className="btn btn-small btn-nortelink"><i className="fas fa-ellipsis-v"></i></button>
                            </Link>
                        </td>
                    </tr>
                )
            } else {
                return(
                    <tr>
                        <td colSpan="5">Nenhum produto encontrado</td>
                    </tr>
                )
            }
        }
    }

    changeDesejo = (e) => {
        if (e.target.value == 'id') {
            this.setState({
                showCodigo: true,
                showDescricao: false,
                showCodigoBarras: false,
                order: 'id'
            });
            this.id.current.value = '';
        } else if (e.target.value == 'descr') {
            this.setState({
                showCodigo: false,
                showDescricao: true,
                showCodigoBarras: false,
                order: 'descr'
            });
            this.id.current.value = '';
        } else {
            this.setState({
                showCodigo: false,
                showDescricao: false,
                showCodigoBarras: true,
                order: 'codbar'
            });
            this.id.current.value = '';

        }
    }

    renderOptionsBusca = () => {
        if (this.state.showCodigo) {
            return(
                <div className="form-group">
                    <label htmlFor="id">Código</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="id" id="id" className="form-control" onBlur={this.fillSpace} />
                </div>
            )
        } else if (this.state.showDescricao) {
            return(
                <div className="form-group">
                    <label htmlFor="id">Descrição</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="id" id="id" className="form-control" style={inputStyle} />
                </div>
            )
        } else {
            return(
                <div className="form-group">
                    <label htmlFor="id">Código de Barras</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="id" id="id" className="form-control" />
                </div>
            )
        }
    }

    fillSpace = (e) => {
        let fill = fillWithZeros(e.target.value, 5);
        $('#id').val(fill);
    }

    componentDidMount() {
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
        this.getProdutos();
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
                                        <h2 className="text-white pb-2 fw-bold">Listagem de Produtos</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode buscar produtos</h5>
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
                                                        <label htmlFor="desejo">Você deseja buscar produtos por</label>
                                                        <select name="desejo" id="desejo" className="form-control" onChange={this.changeDesejo}>
                                                            <option value="id">Código</option>
                                                            <option value="descr">Descrição</option>
                                                            <option value="cod_barras">Código de barras</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <form onSubmit={this.buscaProduto}>
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
                                    <div className="card" id="card-produtos">
                                        <div className="card-header">
                                            <div className="card-title">Tabela de Produtos</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table mt-3">
                                                    <thead>
                                                        <tr>
                                                            <th>Código</th>
                                                            <th>Descrição</th>
                                                            <th>Estoque</th>
                                                            <th>Preço</th>
                                                            <th>Ações</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderProdutos()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <BackButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}