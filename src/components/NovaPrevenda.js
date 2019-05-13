import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import SearchCliente from './SearchCliente';
import SearchPlanoPagamento from './SearchPlanoPagamento';
import SearchParceiro from './SearchParceiro';
import SearchProduto from './SearchProduto';
import SearchTabPreco from './SearchTabPreco';
import axios from 'axios';
import qs from 'qs';
import { verifyToken } from '../utils';

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.token}`
    }
};

export default class NovaPrevenda extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            show_dados_prazo: false,
            id_venda: '',
            id_cliente: '',
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
            produtos: [],
            itens: [],
            readOnly: false,
            id_tab_preco: '',
        };
        this.childCliente = React.createRef();
        this.childPlanoPagamento = React.createRef();
        this.childParceiro = React.createRef();
        this.childProduto = React.createRef();
        this.childTabPreco = React.createRef();
        this.id_venda = React.createRef();
        this.vl_total = React.createRef();
        this.vl_itens = React.createRef();
        this.preco = React.createRef();
    }

    triggerChildClienteSearch = () => {
        this.childCliente.current.searchCliente();
    }

    triggerChilPlanoPagamentoSearch = () => {
        this.childPlanoPagamento.current.searchPlanoPagamento();
    }

    triggerChildParceiroSearch = () => {
        this.childParceiro.current.searchParceiro();
    }

    triggerChildProdutoSearch = () => {
        this.childProduto.current.searchProduto();
    }

    triggerChildTabPrecoSearch = () => {
        this.childTabPreco.current.searchTabPreco();
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
            console.log(res);
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
                        list_soma.push(item.preco * item.quantidade);
                    })
                    let soma = list_soma.reduce((a, b) => a + b, 0);
                    this.setState({ vl_itens: soma, vl_total: soma });
                    this.vl_itens.current.value = this.state.vl_itens;
                    this.vl_total.current.value = this.state.vl_total;
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
                });
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
        });
    }

    excluirProduto = (id_item) => {
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
                })
                .catch((error) => {
                    let erro = '';
                    if (error.response.data.erros) {
                        erro = error.response.data.erros;
                    } else {
                        erro = error.response.data.message
                    }
                    this.id_venda.current.value = '';
                    this.vl_total.current.value = '';
                    this.setState({ itens: [], id_venda: res.data.id_venda, vl_total: res.data.vl_total });
                    swal("Atenção!", `${erro}`, {
                        icon: "warning",
                        buttons: {
                            confirm: {
                                className: 'btn btn-warning'
                            }
                        },
                    })
                    .then(() => {
                        verifyToken(error.response.data.message);
                    });
                });
            });
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
    }

    handleInput = () => {
        if (this.state.id_produto != '' && this.state.id_tab_preco != '') {
            axios.get(`http://api.nortelink.com.br/api/v1/produtos/${this.state.id_produto}/precos/${this.state.id_tab_preco}`, config)
            .then((res) => {
                this.setState({ preco: res.data.preco_venda });
                this.preco.current.value = res.data.preco_venda;
            })
            .catch((error) => {
                let erro = '';
                if (error.response.data.erros) {
                    erro = error.response.data.erros;
                } else {
                    erro = error.response.data.message;
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
        }
    }

    renderProdutos = () => {
        if (this.state.itens.length > 0) {
            return(
                this.state.itens.map((item) =>
                    <tr key={item.id_item}>
                        <td>{item.id_produto}</td>
                        <td>{item.descricao}</td>
                        <td>{item.preco}</td>
                        <td>{item.quantidade}</td>
                        <td><button className="btn btn-danger" type="button" onClick={() => this.excluirProduto(item.id_item)}><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                )
            )
        } else {
            return(
                <tr>
                    <td colSpan="5">Nenhum produto adicionado</td>
                </tr>
            )
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
                                                                    <button className="btn btn-nortelink btn-lg ml-auto" data-toggle="modal" data-target="#modal" type="button"><i className="la flaticon-add"></i> Adicionar Produto</button>
                                                                </div>
                                                            </div>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-3">
                                                                    </div>
                                                                </div>
                                                                <div className="table-responsive">
                                                                    <table className="table">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Código</th>
                                                                                <th>Nome</th>
                                                                                <th>Preço da unidade</th>
                                                                                <th>Quantidade</th>
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
                                                                            <label htmlFor="id_venda" className="placeholder">Código da Venda Temporária <span className="text-danger">*</span></label>
                                                                            <input name="id_venda" id="id_venda" className="form-control" onChange={this.changeHandler} required ref={this.id_venda} readOnly={this.state.readOnly} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_cliente" className="placeholder">Código do Cliente <span className="text-danger">*</span></label>
                                                                            <div className="input-group">
                                                                                <SearchCliente name="id_cliente" id="id_cliente" ref={this.childCliente} onChange={this.changeHandlerChild} />
                                                                                <div className="input-group-append">
                                                                                    <button className="btn btn-nortelink" type="button" onClick={ this.triggerChildClienteSearch }><i className="fas fa-search"></i> Procurar</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_plano_pag" className="placeholder">Código do plano de pagamento <span className="text-danger">*</span></label>
                                                                            <div className="input-group">
                                                                                <SearchPlanoPagamento name="id_plano_pag" id="id_plano_pag" ref={this.childPlanoPagamento} onChange={this.changeHandlerChild} onBlur={this.showDadosPrazo} />
                                                                                <div className="input-group-append">
                                                                                    <button className="btn btn-nortelink" type="button" onClick={ this.triggerChilPlanoPagamentoSearch }><i className="fas fa-search"></i> Procurar</button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_pos" className="placeholder">Código da posição inicial da pré-venda </label>
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
                                                                            <label htmlFor="vl_itens">Valor total dos produtos <span className="text-danger">*</span></label>
                                                                            <input type="number" name="vl_itens" id="vl_itens" className="form-control" onChange={this.changeHandler} required readOnly={this.state.readOnly} ref={this.vl_itens} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_desconto">Valor do desconto sobre os produtos <span className="text-danger">*</span></label>
                                                                            <input type="text" name="vl_desconto" id="vl_desconto" className="form-control" onChange={this.changeHandler} required />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_acrescimo">Valor do acréscimo sobre os produtos <span className="text-danger">*</span></label>
                                                                            <input type="text" name="vl_acrescimo" id="vl_acrescimo" className="form-control" onChange={this.changeHandler} required />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-3">
                                                                        <div className="form-group">
                                                                            <label htmlFor="vl_total">Valor total da venda <span className="text-danger">*</span></label>
                                                                            <input type="number" id="vl_total" name="vl_total" className="form-control" ref={this.vl_total} onChange={this.changeHandler} required readOnly={this.state.readOnly} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {
                                                                    this.state.show_dados_prazo ?
                                                                    <div className="row">
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="vl_entrada">Valor de entrada</label>
                                                                                <input type="text" id="vl_entrada" className="form-control" onChange={this.changeHandler} name="vl_entrada" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="parcelas">Quantidade de parcelas de pagamento</label>
                                                                                <input type="text" id="parcelas" className="form-control" onChange={this.changeHandler} name="parcelas" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-12 col-md-4">
                                                                            <div className="form-group">
                                                                                <label htmlFor="vl_parcela">Valor da parcela de pagamento</label>
                                                                                <input type="text" id="vl_parcela" className="form-control" onChange={this.changeHandler} name="vl_parcela" />
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
                                                                            <label htmlFor="data_entrega">Data de entrega dos produtos</label>
                                                                            <input type="date" className="form-control" id="data_entrega" name="data_entrega" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_end_entrega">Código do endereço de entrega do cliente</label>
                                                                            <input name="id_end_entrega" id="id_end_entrega" className="form-control" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_obra">Código da obra</label>
                                                                            <input name="id_obra" id="id_obra" className="form-control" onChange={this.changeHandler} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-12 col-md-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor="id_parceiro">Código do parceiro</label>
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
                                                                            <label htmlFor="obs">Observações referentes à venda</label>
                                                                            <textarea name="obs" id="obs" cols="30" rows="10" className="form-control" onChange={this.changeHandler} ></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                                        <button className="btn btn-nortelink btn-round btn-lg btn-block"><i className="fas fa-save"></i> Salvar</button>
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
                                                <label htmlFor="id_produto" className="placeholder">Código do Produto <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <SearchProduto name="id_produto" id="id_produto" ref={this.childProduto} onChange={this.changeHandlerChild} onInput={this.handleInput} />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-nortelink" type="button" onClick={this.triggerChildProdutoSearch}><i className="fas fa-search"></i> Procurar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="id_tab_preco" className="placeholder">Código da Tabela de Preço do Produto <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <SearchTabPreco name="id_tab_preco" id="id_tab_preco" ref={this.childTabPreco} onChange={this.changeHandlerChild} onInput={this.handleInput} />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-nortelink" type="button" onClick={this.triggerChildTabPrecoSearch}><i className="fas fa-search"></i> Procurar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="preco">Preço unitário do produto <span className="text-danger">*</span></label>
                                                <input type="number" name="preco" id="preco" className="form-control" required onChange={this.changeHandler} ref={this.preco} readOnly={this.state.readOnly} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="quantidade">Quantidade vendida do produto <span className="text-danger">*</span></label>
                                                <input type="number" name="quantidade" id="quantidade" className="form-control" required onChange={this.changeHandler} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-nortelink">Adicionar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}