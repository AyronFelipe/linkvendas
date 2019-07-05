import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { abstractError } from '../utils';
import BackButton from './BackButton';


export default class DetalheProduto extends React.Component {

    constructor(props){
        super(props);
        this.state = { produto: '', carregaInfo: true, readOnly: true };
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
            abstractError(error);
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
                            <BackButton />
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
                                                        <div className="invoice">
                                                            { this.state.produto.compl_descr }
                                                        </div>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="separator-solid"></div>
                                                        <h4>Informações</h4>
                                                        <div className="separator-solid"></div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Código</h5>
                                                                {this.state.produto.id == '' ? <input type="text" className="form-control" value="Não informado" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" value={this.state.produto.id} readOnly={this.state.readOnly} /> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Classificação</h5>
                                                                {this.state.produto.classificacao == '' ? <input type="text" className="form-control" value="Não informado" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" value={this.state.produto.classificacao} readOnly={this.state.readOnly} /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cód. de Barras</h5>
                                                                {this.state.produto.cod_barras == '' ? <input type="text" className="form-control" value="Não informado" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" value={this.state.produto.cod_barras} readOnly={this.state.readOnly} /> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cód. de integração</h5>
                                                                {this.state.produto.cod_integ == '' ? <input type="text" className="form-control" value="Não informado" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" value={this.state.produto.cod_integ} readOnly={this.state.readOnly} /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">% max de desconto</h5>
                                                                <input type="text" value={`${this.state.produto.desc_maximo} %`} className="form-control" readOnly={this.state.readOnly} />
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Embalagem fechada?</h5>
                                                                {this.state.produto.emb_fechada == 0 ? <input type="text" value="Não" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value="Sim" className="form-control" readOnly={this.state.readOnly} /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Espécie</h5>
                                                                {this.state.produto.especie == 'P' ? <input type="text" value="Produto" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value="Serviço" className="form-control" readOnly={this.state.readOnly} /> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Fabricante</h5>
                                                                {this.state.produto.fabricante == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value={this.state.produto.fabricante} className="form-control" readOnly={this.state.readOnly} /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cód. da Família</h5>
                                                                {this.state.produto.familia == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value={this.state.produto.familia} className="form-control" readOnly={ this.state.readOnly } /> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cód. da Loja</h5>
                                                                {this.state.produto.id_loja == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value={this.state.produto.id_loja} className="form-control" readOnly={ this.state.readOnly } /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Marca</h5>
                                                                {this.state.produto.marca == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value={this.state.produto.marca} className="form-control" readOnly={ this.state.readOnly } /> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Nome da Loja</h5>
                                                                {this.state.produto.nome_loja == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" value={this.state.produto.nome_loja} className="form-control" readOnly={ this.state.readOnly } /> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Peso Bruto</h5>
                                                                <input type="text" value={`${this.state.produto.peso_bruto} kg` } className="form-control" readOnly={this.state.readOnly} />
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Peso Líquido</h5>
                                                                <input type="text" value={`${this.state.produto.peso_liquido} kg` } className="form-control" readOnly={this.state.readOnly} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Preço de Promoção</h5>
                                                                <input type="text" value={this.state.produto.preco_promocao.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} readOnly={this.state.readOnly} className="form-control" />
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Preço de Venda</h5>
                                                                <input type="text" value={this.state.produto.preco_venda.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} readOnly={this.state.readOnly} className="form-control" />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Qnt. na emb. de venda</h5>
                                                                {this.state.produto.quant_emb == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.quant_emb} unidade`} ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${ this.state.produto.quant_emb } unidades`}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Frações das und. de venda</h5>
                                                                {this.state.produto.quant_fracoes == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.quant_fracoes} unidade`} ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.quant_fracoes} unidades`} ></input>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cod. de ref. do fornecedor</h5>
                                                                {this.state.produto.referencia == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.produto.referencia} ></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Disponível no depósito</h5>
                                                                {this.state.produto.saldo_dep == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_dep} unidade`} ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_dep} unidades`}></input>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Estoque em frações disp.</h5>
                                                                {this.state.produto.saldo_dep_frc == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_dep_frc} unidade`}></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_dep_frc} unidades`}></input>}
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Disponível para venda</h5>
                                                                {this.state.produto.saldo_loja == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_loja} unidade`}></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_loja} unidades`}></input>}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Frações disp. na loja</h5>
                                                                {this.state.produto.saldo_loja_frc == 1 ? <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_loja_frc} unidade`}></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={`${this.state.produto.saldo_loja_frc} unidades`}></input>}
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Status de venda</h5>
                                                                {this.state.produto.status == 'A' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Ativo" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value="Inativo"></input> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Cód. da tabela de tribut.</h5>
                                                                {this.state.produto.tabela_trib == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.produto.tabela_trib}></input> }
                                                            </div>
                                                            <div className="col-md-6 info-invoice">
                                                                <h5 className="sub">Tipo</h5>
                                                                {this.state.produto.tipo == 'Q' ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Quantidade" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value="Pesável" ></input> }
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Und. de venda da fração</h5>
                                                                {this.state.produto.und_fracao == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={this.state.produto.und_fracao} ></input> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Und. de venda</h5>
                                                                {this.state.produto.unidade == '' ? <input type="text" value="Não informado" className="form-control" readOnly={this.state.readOnly} /> : <input type="text" className="form-control" readOnly={this.state.readOnly} value={ this.state.produto.unidade }></input> }
                                                            </div>
                                                            <div className="col-md-4 info-invoice">
                                                                <h5 className="sub">Vendido em und. de fração?</h5>
                                                                {this.state.produto.venda_fracao ? <input type="text" className="form-control" readOnly={this.state.readOnly} value="Sim" ></input> : <input type="text" className="form-control" readOnly={this.state.readOnly} value="Não" ></input> }
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