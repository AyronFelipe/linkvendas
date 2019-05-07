import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import SearchCliente from './SearchCliente';
import SearchPlanoPagamento from './SearchPlanoPagamento';
import SearchParceiro from './SearchParceiro';
import axios from 'axios';
import qs from 'qs';
import { verifyToken } from '../utils';


const wizardStyle = {
    width: '50%'
}

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
            obs: ''
        };
        this.childCliente = React.createRef();
        this.childPlanoPagamento = React.createRef();
        this.childParceiro = React.createRef();
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

    componentDidMount(){
        var $validator = $('.wizard-container form').validate({
            validClass: "success",
            highlight: function (element) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            success: function (element) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            }
        });
    }

    handleSubmit = (e) => {

        e.preventDefault();

        let body = {
            id_venda: this.state.id_venda,
            id_cliente: this.state.id_cliente,
            id_plano_pag: this.state.id_plano_pag,
            id_pos: this.state.id_pos,
            mod_venda: this.state.mod_venda,
            vl_itens: this.state.vl_itens,
            vl_desconto: this.state.vl_desconto,
            vl_acrescimo: this.state.vl_acrescimo,
            vl_total: this.state.vl_total,
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

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.token}`
            }
        };

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
                                <div className="wizard-container wizard-round col-12">
                                    <div className="wizard-header text-center">
                                        <h3 className="wizard-title"><b>Cadastrar</b> Nova Pré-venda</h3>
                                    </div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="wizard-body">
                                            <div className="row">
                                                <ul className="wizard-menu nav nav-pills nav-primary">
                                                    <li className="step" style={wizardStyle}>
                                                        <a className="nav-link active" href="#produtos" data-toggle="tab" aria-expanded="true"><i className="la flaticon-box-1"></i> Produtos</a>
                                                    </li>
                                                    <li className="step" style={wizardStyle}>
                                                        <a className="nav-link" href="#pre_venda" data-toggle="tab"><i className="flaticon-success"></i> Pré-vendas</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="produtos">
                                                    <h4 className="info-text">Adicione os produtos da pré-venda </h4>
                                                    <div className="row">
                                                        <div className="col-12"></div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane" id="pre_venda">
                                                    <h4 className="info-text">Agora informe esses campos para finalizar sua pré-venda </h4>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col-sm-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label htmlFor="id_venda" className="placeholder">Código da Venda Temporária <span className="text-danger">*</span></label>
                                                                        <input name="id_venda" id="id_venda" className="form-control" onChange={this.changeHandler} required />
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
                                                                        <input type="text" name="vl_itens" id="vl_itens" className="form-control" onChange={this.changeHandler} required />
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
                                                                        <input type="text" id="vl_total" name="vl_total" className="form-control" onChange={this.changeHandler} required />
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
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}