import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { verifyToken } from '../utils';


const PRIMEIRA_PAGE = 1;

export default class Prevendas extends React.Component{

    constructor(props) {
        super(props);
        this.state = { prevendas: [], carregaInfo: true, page: PRIMEIRA_PAGE };
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
            /*
            swal("Atenção!", `${error.response.data.message}`, {
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
            */
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
            if (this.state.prevendas.length) {
                return this.state.prevendas.map((prevenda) =>
                    <tr key={prevenda.id}>
                        <td>{prevenda.id}</td>
                        <td>{prevenda.descricao}</td>
                        <td><button className="btn btn-small btn-nortelink"><i class="fas fa-ellipsis-v"></i></button></td>
                    </tr>
                )
            } else {
                return(
                    <tr>
                        <td colSpan="5">Nenhuma pré-venda cadastrada</td>
                    </tr>
                );
            }
        }
    }

    buscaPrevenda = () => {
        return true;
    }

    componentDidMount(){
        $('#basic-datatables').DataTable({
            "language": {
                "url": '//cdn.datatables.net/plug-ins/1.10.19/i18n/Portuguese-Brasil.json'
            }
        });
        this.getPrevendas();
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
                                            <button className="btn btn-nortelink btn-round"><i className="la flaticon-add mr-2"></i> Cadastrar Pré-venda</button>
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
                                            <form>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="numero">Número da pré-venda</label>
                                                            <input type="text" ref={this.numero} name="numero" id="numero" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="data_ini">Data inicial do período</label>
                                                            <input type="date" ref={this.data_ini} name="data_ini" id="data_ini" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="data_fim">Data final do período</label>
                                                            <input type="date" ref={this.data_fim} name="data_fim" id="data_fim" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="id_cliente">Código do Cliente</label>
                                                            <input type="text" ref={this.id_cliente} name="id_cliente" id="id_cliente" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="id_plano_pag">Código do plano de pagamento</label>
                                                            <input type="text" ref={this.id_plano_pag} name="id_plano_pag" id="id_plano_pag" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="situacao">Situação da Pré-venda</label>
                                                            <input type="text" ref={this.situacao} name="situacao" id="situacao" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="id_posicao">Código da posição da pré-venda</label>
                                                            <input type="text" ref={this.id_posicao} name="id_posicao" id="id_posicao" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button type="button" className="btn btn-nortelink btn-round btn-lg btn-block" onClick={this.buscaCliente}><i className="fas fa-search"></i> Buscar</button>
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
                                                            <th>Período</th>
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