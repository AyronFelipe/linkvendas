import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';


export default class DetalheCliente extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cliente: '', carregaInfo: true };
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
                                        <h2 className="text-white pb-2 fw-bold">Detalhe de Produto</h2>
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
                                                        <div className="invoice-desc">
                                                            {this.state.cliente.endereco}, {this.state.cliente.numero_end}. {this.state.cliente.bairro}<br/>
                                                            {this.state.cliente.cep}<br/>
                                                            {this.state.cliente.cidade} - {this.state.cliente.uf}
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="separator-solid"></div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Tipo de Pessoa: J - pessoa jurídica ou F - pessoa física</h5>
                                                                <p>{this.state.cliente.pessoa}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Está ativo?</h5>
                                                                {
                                                                    this.state.cliente.ativo ?
                                                                    <p>Sim</p>
                                                                    :
                                                                    <p>Não</p>
                                                                }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Data de Cadastro</h5>
                                                                <p>{this.state.cliente.data_cad}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Data da Última Atualização</h5>
                                                                    <p>{this.state.cliente.data_atu}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código da Loja</h5>
                                                                <p>{this.state.cliente.id_loja}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código do Grupo</h5>
                                                                <p>{this.state.cliente.id_grupo}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">CPF ou CNPJ</h5>
                                                                <p>{this.state.cliente.cpf_cnpj}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Telefone</h5>
                                                                <p>{this.state.cliente.telefone}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Celular</h5>
                                                                <p>{this.state.cliente.celular}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor do limite de crédito do cliente para compras a prazo</h5>
                                                                <p>{this.state.cliente.limite_cred}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Planos</h5>
                                                                <p>{this.state.cliente.planos}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Tabelas</h5>
                                                                <p>{this.state.cliente.tabelas}</p>
                                                            </div>
                                                        </div>
                                                        <div class="separator-solid  mb-3"></div>
                                                        <h5>Financeiro</h5>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Maior número de dias de atraso do cliente</h5>
                                                                <p>{this.state.cliente.financeiro.dias_atraso}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor total dos débitos do cliente</h5>
                                                                <p>{this.state.cliente.financeiro.saldo_devedor}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor total dos acordos pendentes</h5>
                                                                <p>{this.state.cliente.financeiro.saldo_acordos}</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor total dos débitos em atraso</h5>
                                                                <p>{this.state.cliente.financeiro.debito_atraso}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor total dos cheques devolvidos</h5>
                                                                <p>{this.state.cliente.financeiro.cheques_devol}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Valor do limite disponível para compras a prazo</h5>
                                                                <p>{this.state.cliente.financeiro.limite_disp}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
