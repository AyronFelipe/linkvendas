import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { abstractError } from '../utils';
import BackButton from './BackButton';


export default class DetalheCliente extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cliente: '', carregaInfo: true, readOnly: true };
    }

    getCliente = () => {
        let pathname = window.location.pathname;
        let cliente_id = pathname.split('/')[2];
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/${cliente_id}`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then((res) => {
            this.setState({ cliente: res.data, carregaInfo: false });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    componentDidMount = () => {
        this.getCliente();
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
                                        <h2 className="text-white pb-2 fw-bold">Detalhes do Cliente</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row justify-content-center">
                                {
                                    this.state.carregaInfo ?
                                    <div className="loader loader-lg"></div>
                                    :
                                    <div className="col-12 col-lg-10 col-xl-9">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card card-invoice">
                                                    <div className="card-header">
                                                        <div className="invoice-header">
                                                            <h3 className="invoice-tile">
                                                                {this.state.cliente.nome}
                                                            </h3>
                                                            <div className="invoice-logo">
                                                                <img src="/static/images/logo.png" alt="Logo Responsive" />
                                                            </div>
                                                        </div>
                                                        <div className="invoice">
                                                            {this.state.cliente.endereco}, {this.state.cliente.numero_end}. {this.state.cliente.bairro}<br/>
                                                            {this.state.cliente.cep}<br/>
                                                            {this.state.cliente.cidade} - {this.state.cliente.uf}
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="separator-solid"></div>
                                                        <h4>Informações</h4>
                                                        <div className="separator-solid"></div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Código</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.id}></input>
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">CPF ou CNPJ</h5>
                                                                {this.state.cliente.cpf_cnpj == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.cpf_cnpj}></input> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Telefone</h5>
                                                                {this.state.cliente.telefone == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.telefone}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Celular</h5>
                                                                {this.state.cliente.celular == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.celular}></input> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Está ativo?</h5>
                                                                {this.state.cliente.ativo ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Sim" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não" ></input>}
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Código da Loja</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.id_loja} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Código do Grupo</h5>
                                                                {this.state.cliente.id_grupo == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.id_grupo}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Valor do limite de crédito</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.limite_cred.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} ></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Planos</h5>
                                                                {this.state.cliente.planos == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.planos}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Tabelas</h5>
                                                                {this.state.cliente.tabelas == '' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não informado" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.tabelas}></input> }
                                                            </div>
                                                        </div>
                                                        <div className="separator-solid  mb-3"></div>
                                                        <h4>Financeiro</h4>
                                                        <div className="separator-solid  mb-3"></div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Max núm. de dias de atraso</h5>
                                                                {this.state.cliente.financeiro.dias_atraso == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.cliente.financeiro.dias_atraso}`} ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.cliente.financeiro.dias_atraso}`}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Tot. dos débitos</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.financeiro.saldo_devedor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Tot. dos acord. pend.</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.financeiro.saldo_acordos.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}></input>
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Tot. dos déb. em atraso</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.financeiro.debito_atraso.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                    <h5 className="sub">Tot. dos cheques dev.</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.financeiro.cheques_devol.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}></input>
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Limite disponível</h5>
                                                                <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.cliente.financeiro.limite_disp.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <BackButton />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
