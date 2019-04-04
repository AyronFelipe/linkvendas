import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';

const PRIMEIRA_PAGE = 1;

export default class Produtos extends React.Component{

    constructor(props){
        super(props);
        this.id = React.createRef();
        this.descr = React.createRef();
        this.codbar = React.createRef();
        this.ref = React.createRef();
        this.parcial = React.createRef();
        this.state = { produtos: [], carregaInfo: true, page: PRIMEIRA_PAGE };
    }

    getProdutos = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/produtos/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PRIMEIRA_PAGE,
            }
        })
        .then((res) => {
            this.setState({produtos: res.data, carregaInfo: false});
        })
        .catch((error) => {
            console.log(error.response.data);
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

    buscaProduto = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/produtos/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                id: this.id.current.value,
                descr: this.descr.current.value,
                codbar: this.codbar.current.value,
                ref: this.ref.current.value,
                parcial: this.parcial.current.value,
                page: PRIMEIRA_PAGE
            }
        })
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    renderProdutos = () => {
        if (this.state.carregaInfo) {
            return <tr>
                <td colSpan="5">
                    <div className="loader loader-lg"></div>
                </td>
            </tr>
        } else {
            return this.state.produtos.map((produto) =>
                <tr key={produto.id}>
                    <td>{produto.id}</td>
                    <td>{produto.descricao}</td>
                    <td><button className="btn btn-small btn-nortelink"><i className="fas fa-ellipsis-v"></i></button></td>
                </tr>
            )
        }
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
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="id">Código do Produto</label>
                                                            <input type="text" ref={this.id} name="id" id="id" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="descr">Descrição do produto</label>
                                                            <input type="text" ref={this.descr} name="descr" id="descr" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="codbar">Código de barras do produto</label>
                                                            <input type="text" ref={this.codbar} name="codbar" id="codbar" className="form-control" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="ref">Referência do produto</label>
                                                            <input type="text" ref={this.ref} name="ref" id="ref" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="parcial">Descrição parcial do produto</label>
                                                            <input type="text" ref={this.parcial} name="parcial" id="parcial" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button type="button" className="btn btn-nortelink btn-round btn-lg btn-block" onClick={this.buscaProduto}><i className="fas fa-search"></i> Buscar</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="card">
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
                    </div>
                </div>
                <h1>OI</h1>
            </React.Fragment>
        )
    }
}