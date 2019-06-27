import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import SearchCliente from './SearchCliente';
import SearchParceiro from './SearchParceiro';
import axios from 'axios';
import qs from 'qs';
import { abstractError } from '../utils';
import CurrencyFormat from 'react-currency-format';


const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.token}`
    }
};

const inputStyle = {
    textTransform: 'uppercase'
};

const PRIMEIRA_PAGE = 1;

export default class NovaPrevenda extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            show_dados_prazo: false,
            id_venda: '',
            id_cliente: '',
            id_plano_pag_options: [],
            id_plano_pag: '',
            id_pos: '',
            mod_venda: '',
            vl_itens: '',
            vl_desconto: '',
            vl_acrescimo: '',
            vl_total: '',
            vl_entrada: '',
            parcelas: '',
            vl_parcela: '',
            tipo_entrega: '',
            data_entrega: '',
            id_end_entrega: '',
            id_obra: '',
            id_parceiro: '',
            obs: '',
            id_produto: '',
            preco: '',
            quantidade: '',
            itens: [],
            readOnly: false,
            id_tab_preco: '',
            tabs_preco: [],
            produtos_encontrados: [],
            showCodigo: true,
            showDescricao: false,
            showCodigoBarras: false,
            order: '',
            produto_selecionado_id: '',
            produto_selecionado: [],
            produto_alterar: [],
            pdesc: '',
        };
        this.childCliente = React.createRef();
        this.childParceiro = React.createRef();
        this.produto = React.createRef();
        this.id_venda = React.createRef();
        this.vl_total = React.createRef();
        this.vl_itens = React.createRef();
        this.preco = React.createRef();
        this.id_tab_preco = React.createRef();
        this.id = React.createRef();
    }

    triggerChildClienteSearch = () => {
        this.childCliente.current.searchCliente();
    }

    triggerChildParceiroSearch = () => {
        this.childParceiro.current.searchParceiro();
    }

    triggerProdutoSearch = () => {
        $("#modal").modal('hide');
        $("#modal-produto").modal('show');
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    changeHandlerChild = (field, value) => {
        this.setState({ [field]: value });
    }

    showDadosPrazo = (value) => {
        if (value == '003') {
            this.setState({ show_dados_prazo: true });
        } else {
            this.setState({ show_dados_prazo: false });
        }
    }

    handleSubmit = (e) => {

        e.preventDefault();

        let body = {
            id_venda: this.state.id_venda,
            id_cliente: this.state.id_cliente,
            id_plano_pag: this.state.id_plano_pag,
            id_pos: this.state.id_pos,
            mod_venda: this.state.mod_venda,
            vl_itens: parseFloat(this.state.vl_itens),
            vl_desconto: this.state.vl_desconto,
            vl_acrescimo: this.state.vl_acrescimo,
            vl_total: parseFloat(this.state.vl_total),
            vl_entrada: this.state.vl_entrada,
            parcelas: this.state.parcelas,
            vl_parcela: this.state.vl_parcela,
            tipo_entrega: this.state.tipo_entrega,
            data_entrega: this.state.data_entrega,
            id_end_entrega: this.state.id_end_entrega,
            id_obra: this.state.id_obra,
            id_parceiro: this.state.id_parceiro,
            obs: this.state.obs,
        }

        axios.post(`http://api.nortelink.com.br/api/v1/prevendas/`, qs.stringify(body), config)
        .then((res) => {
            swal("Pré-venda gerada com sucesso", {
                icon: "success",
                buttons: {
                    confirm: {
                        className: 'btn btn-success'
                    }
                },
            })
            .then(() => {
                window.location.href = '/pre-vendas/';
            })
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    addProduto = (e) => {
        let url = '';
        e.preventDefault();
        const list_soma = [];

        let body = {
            id_produto: this.state.id_produto,
            quantidade: this.state.quantidade,
            id_tab_preco: this.state.id_tab_preco,
            preco: this.state.preco,
            pdesc: this.state.pdesc,
        }

        if (this.state.id_venda == '') {
            url = `http://api.nortelink.com.br/api/v1/vendas/itens`;
        } else {
            url = `http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens`;
        }

        axios.post(url, qs.stringify(body), config)
        .then((res) => {
            this.id_venda.current.value = res.data.id_venda;
            this.setState({ id_venda: res.data.id_venda });
            axios.get(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/`, config)
            .then((res) => {
                this.setState({ itens: res.data.itens });
                $('#modal').modal('hide');
                document.getElementById('modal-form').reset();
                this.state.itens.map((item) => {
                    list_soma.push(item.vl_total);
                })
                let soma = list_soma.reduce((a, b) => a + b, 0);
                this.setState({ vl_itens: soma, vl_total: soma, produto_selecionado: [], produto_selecionado_id: '' });
                this.vl_itens.current.value = this.state.vl_itens;
                this.vl_total.current.value = this.state.vl_total;
                this.setState({ preco: '' });
            })
            .catch((error) => {
                abstractError(error);
            });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    excluirProduto = (id_item) => {
        const list_soma = [];
        axios.delete(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/${id_item}`, config)
        .then((res) => {
            swal("Item excluído com sucesso", {
                icon: "success",
                buttons: {
                    confirm: {
                        className: 'btn btn-success'
                    }
                },
            })
            .then(() => {
                axios.get(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/`, config)
                .then((res) => {
                    this.setState({ itens: res.data.itens });
                    this.state.itens.map((item) => {
                        list_soma.push(item.vl_total);
                    })
                    let soma = list_soma.reduce((a, b) => a + b, 0);
                    this.setState({ vl_itens: soma, vl_total: soma, });
                    this.vl_itens.current.value = this.state.vl_itens;
                    this.vl_total.current.value = this.state.vl_total;
                })
                .catch((error) => {
                    this.setState({ itens: [], vl_total: '', vl_itens: '', });
                    abstractError(error);
                });
            });
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    handleInput = () => {
        let tab_preco = this.id_tab_preco.current.value;
        let id_produto = this.produto.current.value;
        if (id_produto != '' && tab_preco != '') {
            axios.get(`http://api.nortelink.com.br/api/v1/produtos/${id_produto}/precos/${tab_preco}`, config)
            .then((res) => {
                this.setState({ preco: res.data.preco_venda });
                this.preco.current.value = res.data.preco_venda;
            })
            .catch((error) => {
                abstractError(error);
            })
        }
    }

    getTabPreco = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/produtos/tabprecos/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
            }
        })
        .then((res) => {
            this.setState({ tabs_preco: res.data });
        })
        .catch((error) => {
            abstractError(error);
        });
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
            this.setState({ id_plano_pag_options: res.data });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    renderProdutos = () => {
        if (this.state.itens.length > 0) {
            return(
                this.state.itens.map((item) =>
                    <tr key={item.id_item}>
                        <td>{item.id_produto}</td>
                        <td>{item.descricao}</td>
                        <td>{item.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.vl_total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        <td>
                            <button className="btn btn-danger mx-1 my-1" type="button" onClick={() => this.excluirProduto(item.id_item)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <button className="btn btn-primary mx-1 my-1" type="button" onClick={() => this.showModalAlterarProduto(item.id_item)}>
                                <i className="fas fa-pen"></i>
                            </button>
                        </td>
                    </tr>
                )
            )
        } else {
            return(
                <tr>
                    <td colSpan="6">Nenhum produto adicionado</td>
                </tr>
            )
        }
    }

    handleBlur = (e) => {
        if (e.target.value != '') {
            axios({
                url: `http://api.nortelink.com.br/api/v1/produtos/${e.target.value}`,
                method: `get`,
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                },
            })
            .then((res) => {
                this.setState({ produto_selecionado: [res.data] });
            })
            .catch((error) => {
                abstractError(error);
            });
        }
    }

    handleClickRadio = (e) => {
        $("#modal-produto").modal('hide');
        $("#modal").modal('show');
        let id_produto_selecionado = e.target.value;
        this.setState({ 
            produto_selecionado_id: e.target.value,
            id_produto: e.target.value,
            produtos_encontrados: [],
            showCodigo: true,
            showDescricao: false,
            showCodigoBarras: false,
            order: 'id'
        });
        $('#modal').find('#id_produto').val(id_produto_selecionado);
        document.getElementById('modal-produto-form').reset();
        this.handleBlur(e);
        this.handleInput();
    }

    renderProdutosEncontrados = () => {
        if (this.state.produtos_encontrados.length >= 1) {
            return(
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produtos_encontrados.map((produto)=>
                                <tr key={produto.id}>
                                    <td><input type="radio" name="produto_selecionado" onClick={this.handleClickRadio} value={produto.id} /></td>
                                    <td>{produto.id}</td>
                                    <td>{produto.descricao}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return(
                null
            );
        }
    }

    componentDidMount = () => {
        this.getTabPreco();
        this.getPlanosPag();
        /*$('#id_plano_pag').select2({
            theme: "bootstrap",
            width: '100%',
        });*/
        $('.select2-selection').css({
            'padding-top': '20px',
            'padding-bottom': '20px'
        });
    }

    changeDesejo = (e) => {
        if (e.target.value == 'id') {
            this.setState({
                showCodigo: true,
                showDescricao: false,
                showCodigoBarras: false,
                order: 'id'
            });
        } else if (e.target.value == 'descr') {
            this.setState({
                showCodigo: false,
                showDescricao: true,
                showCodigoBarras: false,
                order: 'descr'
            });
        } else {
            this.setState({
                showCodigo: false,
                showDescricao: false,
                showCodigoBarras: true,
                order: 'codbar'
            });

        }
    }

    renderOptionsBusca = () => {
        if (this.state.showCodigo) {
            return (
                <div className="form-group">
                    <label htmlFor="id">Código</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="codigo" id="codigo" className="form-control" required />
                </div>
            )
        } else if (this.state.showDescricao) {
            return (
                <div className="form-group">
                    <label htmlFor="id">Descrição</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="descricao" id="descricao" className="form-control value" style={inputStyle} required />
                </div>
            )
        } else {
            return (
                <div className="form-group">
                    <label htmlFor="id">Código de Barras</label>
                    <input type="text" placeholder="Insira aqui" ref={this.id} name="cod_barras" id="cod_barras" className="form-control value" required />
                </div>
            )
        }
    }

    handleProdutoSubmit = (e) => {
        e.preventDefault();
        if (this.state.showCodigo) {
            axios({
                url: `http://api.nortelink.com.br/api/v1/produtos/${this.id.current.value}`,
                method: `get`,
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                },
            })
            .then((res) => {
                this.setState({ produtos_encontrados: [res.data] });
            })
            .catch((error) => {
                abstractError(error);
            });
        } else {
            axios({
                url: `http://api.nortelink.com.br/api/v1/produtos/`,
                method: `get`,
                headers: {
                    'Authorization': `Bearer ${localStorage.token}`
                },
                params: {
                    page: PRIMEIRA_PAGE,
                    [this.state.order]: $('.value').val().toUpperCase(),
                }
            })
            .then((res) => {
                this.setState({ produtos_encontrados: res.data });
            })
            .catch((error) => {
                abstractError(error);
            });

        }
    }

    renderProdutoSelecionado = () => {
        if (this.state.produto_selecionado.length) {
            return(
                <div className="col-12">
                    <div className="form-group">
                        <input type="text" readOnly={true} value={this.state.produto_selecionado[0].descricao} className="form-control" />
                    </div>
                </div>
            );
        }
    }

    handleBlurTabPreco = (e) => {
        if ( this.state.itens.length > 0 ) {
            let body = {
                id_venda: this.state.id_venda,
                id_tab_preco: e.target.value,
            }
            axios.put(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/precos`, qs.stringify(body), config)
            .then((res) => {
                this.setState({ vl_itens: res.data.vl_total, vl_total: res.data.vl_total });
                this.vl_itens.current.value = res.data.vl_total;
                this.vl_total.current.value = res.data.vl_total;
                axios.get(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/`, config)
                .then((res) => {
                    this.setState({ itens: res.data.itens });
                })
                .catch((error) => {
                    let erro = '';
                    if (error.response.data.erros) {
                        erro = error.response.data.erros;
                    } else {
                        erro = error.response.data.message
                    }
                    swal("Erro!", `${erro}`, {
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
                })
            })
            .catch((error) => {
                abstractError(error);
            });
        }
    }

    showModalAlterarProduto = (id_item) => {
        $("#modal-alterar-produto").modal('show');
        axios.get(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/${id_item}`, config)
        .then((res) => {
            this.setState({ produto_alterar: res.data.item });
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    alterarProduto = (e) => {
        const list_soma = [];
        e.preventDefault();
        let body = {
            quantidade: $('#quantidade_alterada').val(),
            id_venda: this.state.produto_alterar.id_venda,
            id_item: this.state.produto_alterar.id_item,
            id_produto: this.state.produto_alterar.id_produto,
            preco: parseInt($('#preco_alterado').val().replace('R$', '').replace('.', '')),
            pdesc: $('#pdesc_alterado').val(),
        }
        axios.put(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/${this.state.produto_alterar.id_item}`, qs.stringify(body), config)
        .then((res) => {
            swal("Item alterado com sucesso", {
                icon: "success",
                buttons: {
                    confirm: {
                        className: 'btn btn-success'
                    }
                },
            })
            axios.get(`http://api.nortelink.com.br/api/v1/vendas/${this.state.id_venda}/itens/`, config)
            .then((res) => {
                this.setState({ itens: res.data.itens });
                this.state.itens.map((item) => {
                    list_soma.push(item.vl_total);
                })
                let soma = list_soma.reduce((a, b) => a + b, 0);
                this.setState({ vl_itens: soma, vl_total: soma, });
                $("#modal-alterar-produto").modal('hide');
                document.getElementById('modal-alterar-produto-form').reset();
                this.vl_itens.current.value = this.state.vl_itens;
                this.vl_total.current.value = this.state.vl_total;
            })
            .catch((error) => {
                abstractError(error);
            })
        })
        .catch((error) => {
            abstractError(error);
        })
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
                                        <h2 className="text-white pb-2 fw-bold">Cadastro de Pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode cadastrar uma nova pré-venda</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-12 justify-content-center">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row justify-content-center">
                                            <ul className="nav nav-pills nav-primary nav-pills-no-bd nav-pills-icons mb-3" id="pills-tab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" href="#produtos" role="tab" data-toggle="pill" aria-selected="true">
                                                        <i className="la flaticon-box-1"></i> Produtos
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#pre_venda" data-toggle="pill" role="tab" aria-selected="true">
                                                        <i className="flaticon-success"></i> Pré-vendas
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane active" id="produtos">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <div className="d-flex align-items-center">
                                                                    <h5 className="card-title">
                                                                        Adicione produtos à pré-venda
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_tab_preco" className="placeholder">Código da Tabela de Preço<span className="text-danger">*</span></label>
                                                                            <select name="id_tab_preco" id="id_tab_preco" ref={this.id_tab_preco} onInput={this.handleInput} onChange={this.changeHandler} onBlur={this.handleBlurTabPreco} className="form-control" required>
                                                                                <option value="">&nbsp;</option>
                                                                                {this.state.tabs_preco.map((tab_preco) =>
                                                                                    <option key={tab_preco.id} value={tab_preco.id}>{tab_preco.descricao}</option>
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                                        <button className="btn btn-nortelink btn-lg btn-block" data-toggle="modal" data-target="#modal" type="button"><i className="la flaticon-add"></i> Adicionar Produto</button>
                                                                    </div>
                                                                </div>
                                                                <div className="table-responsive mt-4">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Código</th>
                                                                                <th>Nome</th>
                                                                                <th>Preço da unidade</th>
                                                                                <th>Quantidade</th>
                                                                                <th>Preço da Venda</th>
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="pre_venda">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="card">
                                                            <div className="card-header">
                                                                <h5 className="card-title">
                                                                    Agora informe esses campos para finalizar sua pré-venda
                                                                </h5>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_venda" className="placeholder">Cód. da Venda Temporária <span className="text-danger">*</span></label>
                                                                            <input name="id_venda" id="id_venda" className="form-control" onChange={this.changeHandler} required ref={this.id_venda} readOnly={this.state.readOnly} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_cliente" className="placeholder">Cód. do Cliente <span className="text-danger">*</span></label>
                                                                            <div className="input-group">
                                                                                <SearchCliente name="id_cliente" id="id_cliente" ref={this.childCliente} onChange={this.changeHandlerChild} required={true} />
                                                                                <div className="input-group-append">
                                                                                    <button className="btn btn-nortelink" type="button" onClick={ this.triggerChildClienteSearch }><i className="fas fa-search"></i> Procurar</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_plano_pag" className="placeholder">Planos de pagamento <span className="text-danger">*</span></label>
                                                                            <select name="id_plano_pag" id="id_plano_pag" className="form-control" onChange={this.changeHandler}>
                                                                                <option value="">&nbsp;</option>
                                                                                {this.state.id_plano_pag_options.map((plano) =>
                                                                                    <option key={plano.id} value={plano.id}>{plano.nome}</option>
                                                                                )}
                                                                            </select>
                                                                            <div className="select2-input">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_pos" className="placeholder">Cód. da posição inicial</label>
                                                                            <input name="id_pos" id="id_pos" className="form-control" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="mod_venda" className="placeholder">Modalidade da venda <span className="text-danger">*</span></label>
                                                                            <select name="mod_venda" id="mod_venda" className="form-control" onChange={this.changeHandler} required>
                                                                                <option value="">&nbsp;</option>
                                                                                <option value="1">Normal</option>
                                                                                <option value="2">Futura</option>
                                                                                <option value="9">NFC-e</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_itens">Valor total dos prod.<span className="text-danger">*</span></label>
                                                                            <CurrencyFormat
                                                                                thousandSeparator={`.`}
                                                                                thousandSpacing={`3`}
                                                                                decimalSeparator={`,`}
                                                                                decimalScale={2}
                                                                                allowNegative={false}
                                                                                prefix={`R$ `}
                                                                                name="vl_itens"
                                                                                id="vl_itens"
                                                                                className="form-control"
                                                                                onChange={this.changeHandler}
                                                                                required
                                                                                readOnly={this.state.readOnly}
                                                                                ref={this.vl_itens}
                                                                                value={this.state.vl_itens}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_desconto">Desc. sobre os prod. <span className="text-danger">*</span></label>
                                                                            <CurrencyFormat
                                                                                thousandSeparator={`.`}
                                                                                thousandSpacing={`3`}
                                                                                decimalSeparator={`,`}
                                                                                decimalScale={2}
                                                                                allowNegative={false}
                                                                                prefix={`R$ `}
                                                                                name="vl_desconto"
                                                                                id="vl_desconto"
                                                                                className="form-control"
                                                                                onChange={this.changeHandler}
                                                                                required
                                                                                value={this.state.vl_desconto}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_acrescimo">Acréscimo sobre os prod. <span className="text-danger">*</span></label>
                                                                            <CurrencyFormat
                                                                                thousandSeparator={`.`}
                                                                                thousandSpacing={`3`}
                                                                                decimalSeparator={`,`}
                                                                                decimalScale={2}
                                                                                allowNegative={false}
                                                                                prefix={`R$ `}
                                                                                name="vl_acrescimo"
                                                                                id="vl_acrescimo"
                                                                                className="form-control"
                                                                                onChange={this.changeHandler}
                                                                                required
                                                                                value={this.state.vl_acrescimo}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_total">Valor total da venda <span className="text-danger">*</span></label>
                                                                            <CurrencyFormat
                                                                                thousandSeparator={`.`}
                                                                                thousandSpacing={`3`}
                                                                                decimalSeparator={`,`}
                                                                                decimalScale={2}
                                                                                allowNegative={false}
                                                                                prefix={`R$ `}
                                                                                name="vl_total"
                                                                                id="vl_total"
                                                                                className="form-control"
                                                                                onChange={this.changeHandler}
                                                                                required
                                                                                ref={this.vl_total}
                                                                                readOnly={this.state.readOnly}
                                                                                value={this.state.vl_total}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.show_dados_prazo ?
                                                                    <div className="row">
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="vl_entrada">Valor de entrada</label>
                                                                                <input type="number" id="vl_entrada" className="form-control" onChange={this.changeHandler} name="vl_entrada" min="0" step="0.01" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="parcelas">Quantidade de parcelas de pagamento</label>
                                                                                <input type="number" id="parcela" className="form-control" onChange={this.changeHandler} name="parcelas" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="vl_parcela">Valor da parcela de pagamento</label>
                                                                                <input type="number" id="vl_parcela" className="form-control" onChange={this.changeHandler} name="vl_parcela" min="0" step="0.01" />
                                                                            </div>
                                                                        </div>
                                                                    </div> : null
                                                                }
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="tipo_entrega">Tipo de entrega <span className="text-danger">*</span></label>
                                                                            <select name="tipo_entrega" id="tipo_entrega" className="form-control" required onChange={this.changeHandler}>
                                                                                <option value="">&nbsp;</option>
                                                                                <option value="0">Cliente retira</option>
                                                                                <option value="1">Loja entrega</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="data_entrega">Data de entrega dos prod.</label>
                                                                            <input type="date" className="form-control" id="data_entrega" name="data_entrega" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_end_entrega">Cód. do endereço de entrega</label>
                                                                            <input name="id_end_entrega" id="id_end_entrega" className="form-control" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_obra">Cód. da obra</label>
                                                                            <input name="id_obra" id="id_obra" className="form-control" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_parceiro">Cód. do Parceiro</label>
                                                                            <div className="input-group">
                                                                                <SearchParceiro name="id_parceiro" id="id_parceiro" ref={this.childParceiro} onChange={this.changeHandlerChild} />
                                                                                <div className="input-group-append">
                                                                                    <button className="btn btn-nortelink" type="button" onClick={ this.triggerChildParceiroSearch }><i className="fas fa-search"></i> Procurar</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="obs">Observações</label>
                                                                            <textarea name="obs" id="obs" cols="30" rows="10" className="form-control" onChange={this.changeHandler} ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                                        <button type="submit" className="btn btn-nortelink btn-round btn-lg btn-block"><i className="fas fa-save"></i> Salvar</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={this.addProduto} id="modal-form">
                                <div className="modal-header">
                                    <h5 className="modal-title">Informações sobre o Produto</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="id_produto" className="placeholder">Código<span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <input name="id_produto" id="id_produto" ref={this.produto} onChange={this.changeHandler} onInput={this.handleInput} onBlur={this.handleBlur} className="form-control" />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-nortelink" type="button" onClick={this.triggerProdutoSearch}><i className="fas fa-search"></i> Procurar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {this.renderProdutoSelecionado()}
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="preco">Preço unitário<span className="text-danger">*</span></label>
                                                <CurrencyFormat
                                                    thousandSeparator={`.`}
                                                    thousandSpacing={`3`}
                                                    decimalSeparator={`,`}
                                                    decimalScale={2}
                                                    allowNegative={false}
                                                    prefix={`R$ `}
                                                    name="preco"
                                                    id="preco"
                                                    className="form-control"
                                                    required
                                                    ref={this.preco}
                                                    value={this.state.preco}
                                                    onValueChange={(values) => {
                                                        const {formattedValue, value} = values;
                                                        this.setState({ preco: value })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="pdesc">Desconto (%)</label>
                                                <input type="number" name="pdesc" id="pdesc" className="form-control" min="0" step="0.01" onChange={this.changeHandler} defaultValue={0} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="quantidade">Quantidade vendida<span className="text-danger">*</span></label>
                                                <input type="number" name="quantidade" id="quantidade" className="form-control" required onChange={this.changeHandler} min="1" step="0.01" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-nortelink">Adicionar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modal-produto">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="modal-produto-form" onSubmit={this.handleProdutoSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Procurar Produto</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="desejo">Você deseja buscar produtos por</label>
                                                <select name="desejo" id="desejo" className="form-control" onChange={this.changeDesejo} required>
                                                    <option value="">&nbsp;</option>
                                                    <option value="id">Código</option>
                                                    <option value="descr">Descrição</option>
                                                    <option value="cod_barras">Código de barras</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.renderOptionsBusca()}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            {this.renderProdutosEncontrados()}
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-nortelink">Procurar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modal-alterar-produto">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form id="modal-alterar-produto-form" onSubmit={this.alterarProduto}>
                                <div className="modal-header">
                                    <h5 className="modal-title">ALTERAR PRODUTO {this.state.produto_alterar.descricao}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="quantidade">Quantidade vendida<span className="text-danger">*</span></label>
                                                <input type="number" name="quantidade_alterada" id="quantidade_alterada" className="form-control" required min="1" step="0.01" defaultValue={this.state.produto_alterar.quantidade || ''} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="pdesc">Desconto (%)</label>
                                                <input type="number" name="pdesc_alterado" id="pdesc_alterado" className="form-control" min="0" step="0.01" defaultValue={this.state.produto_alterar.pdesc || '0'} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="preco">Preço unitário<span className="text-danger">*</span></label>
                                                <CurrencyFormat
                                                    thousandSeparator={`.`}
                                                    thousandSpacing={`3`}
                                                    decimalSeparator={`,`}
                                                    decimalScale={2}
                                                    allowNegative={false}
                                                    prefix={`R$ `}
                                                    name="preco_alterado"
                                                    id="preco_alterado"
                                                    className="form-control"
                                                    onChange={this.changeHandler}
                                                    required
                                                    value={this.state.produto_alterar.preco || ''}
                                                    readOnly={false}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-nortelink">Alterar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}