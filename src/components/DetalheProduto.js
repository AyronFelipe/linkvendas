import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { verifyToken } from '../utils';


export default class DetalheProduto extends React.Component {

    constructor(props){
        super(props);
        this.state = { produto: '', carregaInfo: true };
    }

    getProduto = () => {
        let pathname = window.location.pathname;
        let produto_id = pathname.split('/')[2];
        axios({
            url: `http://api.nortelink.com.br/api/v1/produtos/${produto_id}`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then((res) => {
            this.setState({ produto: res.data, carregaInfo: false });
        })
        .catch((error) => {
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

    componentDidMount = () => {
        this.getProduto();
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
                                                                { this.state.produto.descricao }
                                                            </h3>
                                                            <div className="invoice-logo">
                                                                <img src="/static/images/logo.png" alt="Logo Responsive"/>
                                                            </div>
                                                        </div>
                                                        <div className="invoice-desc">
                                                            { this.state.produto.compl_descr }
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="separator-solid"></div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código de Barras</h5>
                                                                { this.state.produto.cod_barras == '' ? <p>Não informado</p> : <p>{this.state.produto.cod_barras}</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código de integração com outros aplicativos</h5>
                                                                { this.state.produto.cod_integ == '' ? <p>Não informado</p> : <p>{ this.state.produto.cod_integ }</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Percentual máximo de desconto no preço de venda</h5>
                                                                <p>{this.state.produto.desc_maximo} %</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Produto vendido somente em embalagem fechada?</h5>
                                                                { this.state.produto.emb_fechada == 0 ? <p>Não</p> : <p>Sim</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Espécie</h5>
                                                                { this.state.produto.especie == 'P' ? <p>Produto</p> : <p>Serviço</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Fabricante</h5>
                                                                { this.state.produto.fabricante == '' ? <p className="text-default">Não informado</p> : <p>{ this.state.produto.fabricante }</p> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código da Família do Produto</h5>
                                                                {this.state.produto.familia == '' ? <p className="text-default">Não informado</p> : <p>{ this.state.produto.familia }</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código da Loja</h5>
                                                                { this.state.produto.id_loja == '' ? <p className="text-default">Não informado</p> : <p>{ this.state.produto.id_loja }</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Marca</h5>
                                                                {this.state.produto.marca == '' ? <p className="text-default">Não informado</p> : <p>{ this.state.produto.marca }</p> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Nome da Loja</h5>
                                                                { this.state.produto.nome_loja == '' ? <p>Não informado</p> : <p>{ this.state.produto.nome_loja }</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Peso Bruto</h5>
                                                                <p>{this.state.produto.peso_bruto} kg</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Peso Líquido</h5>
                                                                <p>{this.state.produto.peso_liquido} kg</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Preço de Promoção</h5>
                                                                <p>{this.state.produto.preco_promocao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Preço de Venda</h5>
                                                                <p>{this.state.produto.preco_venda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Quantidade na embalagem de venda</h5>
                                                                {this.state.produto.quant_emb == 1 ? <p>{this.state.produto.quant_emb} unidade</p> : <p>{ this.state.produto.quant_emb } unidades</p> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Quantidade de unidades de frações contidas na unidade de venda</h5>
                                                                {this.state.produto.quant_fracoes == 1 ? <p>{this.state.produto.quant_fracoes} unidade</p> : <p>{this.state.produto.quant_fracoes} unidades</p>}
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código de referência do fornecedor</h5>
                                                                { this.state.produto.referencia == '' ? <p>Não informado</p> : <p>{ this.state.produto.referencia }</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Saldo de estoque disponível no depósito</h5>
                                                                <p>{this.state.produto.saldo_dep }</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Saldo de estoque em frações disponivel na loja</h5>
                                                                <p>{this.state.produto.saldo_dep_frc }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Saldo de estoque disponivel para venda</h5>
                                                                <p>{this.state.produto.saldo_loja }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Saldo de estoque em frações disponivel na loja</h5>
                                                                <p>{this.state.produto.saldo_loja_frc }</p>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Status de venda</h5>
                                                                { this.state.produto.status == 'A' ? <p>Ativo</p> : <p>Inativo</p> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Código da tabela de tributação</h5>
                                                                <p>{this.state.produto.tabela_trib }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Tipo do produto</h5>
                                                                { this.state.produto.tipo == 'Q' ? <p>Quantidade</p> : <p>Pesável</p> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Unidade de venda da fração do produto</h5>
                                                                <p>{this.state.produto.und_fracao }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Unidade de venda do produto</h5>
                                                                <p>{this.state.produto.unidade }</p>
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">O produto pode ser vendido em unidades de fração?</h5>
                                                                <p>{ this.state.produto.venda_fracao }</p>
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