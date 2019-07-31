import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { abstractError } from '../utils';
import BackButton from './BackButton';


export default class DetalhePrevenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = { prevenda: '', carregaInfo: true }
    }

    getPrevenda = () => {
        let pathname = window.location.pathname;
        let numero = pathname.split('/')[2];
        axios({
            url: `http://api.nortelink.com.br/api/v1/prevendas/${numero}`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then((res) => {
            this.setState({ prevenda: res.data, carregaInfo: false });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    componentDidMount = () => {
        this.getPrevenda();
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
                                        <h2 className="text-white pb-2 fw-bold">Detalhes da Pré-venda</h2>
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
                                        <div className="col-12">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h4 className="page-title">Pré-venda #{this.state.prevenda.numero}</h4>
                                                </div>
                                            </div>
                                            <div className="page-divider"></div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="card card-invoice">
                                                        <div className="card-header">
                                                            <div className="invoice-header">
                                                                <h3 className="invoice-tile">
                                                                    {this.state.prevenda.id_prevenda}
                                                                </h3>
                                                                <div className="invoice-logo">
                                                                    <img src="/static/images/logo.png" alt="Logo Responsive" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="separator-solid"></div>
                                                            <div className="row">
                                                                <div className="col-md-4 info-invoice">
                                                                    <h5 className="sub">Data</h5>
                                                                    <p>{this.state.prevenda.data}</p>
                                                                </div>
                                                                <div className="col-md-4 info-invoice">
                                                                    <h5 className="sub">Número da Pré-venda</h5>
                                                                    <p>{this.state.prevenda.numero}</p>
                                                                </div>
                                                                <div className="col-md-4 info-invoice">
                                                                    <h5 className="sub">Nome do Vendedor</h5>
                                                                    <p>{this.state.prevenda.nome_vendedor}</p>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="invoice-detail">
                                                                        <div className="invoice-top">
                                                                            <h3 className="title"><strong>Itens</strong></h3>
                                                                        </div>
                                                                        <div className="invoice-item">
                                                                            <div className="table-responsive">
                                                                                <table className="table table-striped">
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <td><strong>Item</strong></td>
                                                                                            <td className="text-center"><strong>Preço Unitário</strong></td>
                                                                                            <td className="text-center"><strong>Quantidade</strong></td>
                                                                                            <td className="text-right"><strong>Total</strong></td>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {this.state.prevenda.itens.map((item) => {
                                                                                            return(
                                                                                                <tr key={item.id_item}>
                                                                                                    <td>{item.descricao}</td>
                                                                                                    <td>{item.preco.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                                                                                                    <td>{item.quantidade}</td>
                                                                                                    <td>{item.vl_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                                                                                                </tr>
                                                                                            )
                                                                                        })}
                                                                                        <tr>
                                                                                            <td></td>
                                                                                            <td></td>
                                                                                            <td className="text-center">TOTAL</td>
                                                                                            <td className="text-right">{this.state.prevenda.vl_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="separator-solid  mb-3"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-footer">
                                                            <div className="row">
                                                                <div className="col-sm-7 col-md-5 mb-3 mb-md-0 transfer-to">
                                                                    <h5 className="sub">Informações</h5>
                                                                    <div className="account-transfer">
                                                                        <div><span>Nome do Cliente:</span><span>{this.state.prevenda.nome_cliente}</span></div>
                                                                        <div><span>Plano de Pagamento:</span><span>{this.state.prevenda.nome_plano_pag}</span></div>
                                                                        {this.state.prevenda.parcelas > 0 ? <div><span>Parcelas:</span><span>{this.state.parcelas}</span></div> : null}
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-5 col-md-7 transfer-total">
                                                                    <h5 className="sub">Total</h5>
                                                                    <div className="price">{this.state.prevenda.vl_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</div>
                                                                </div>
                                                            </div>
                                                            <div className="separator-solid"></div>
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