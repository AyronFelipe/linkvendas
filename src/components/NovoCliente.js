import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import qs from 'qs';
import { verifyToken } from '../utils';

const CEP_LENGTH = 8;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class NovoCliente extends React.Component{

    constructor(props){
        super(props);
        this.endereco = React.createRef();
        this.bairro = React.createRef();
        this.cidade = React.createRef();
        this.id_municipio = React.createRef();
        this.uf = React.createRef();
        this.state = {
            show_pessoa_juridica: false, 
            show_pessoa_fisica: false,
            nome: '',
            pessoa: '',
            insc_estadual: '',
            cpf_cnpj: '',
            cep: '',
            endereco: '',
            numero_end: '',
            bairro: '',
            cidade: '',
            id_municipio: '',
            uf: '',
            ponto_ref: '',
            telefone: '',
            celular: '',
            email: '',
            data_nasc: '',
            sexo: '',
            consumidor: false
        }
    }

    showPessoa = (event) => {
        if ( event.target.value == 'J' ) {
            this.setState({ show_pessoa_juridica: true });
        } else {
            this.setState({ show_pessoa_juridica: false });
        }

        if ( event.target.value == 'F' ) {
            this.setState({ show_pessoa_fisica: true });
        } else {
            this.setState({ show_pessoa_fisica: false });
        }
    }

    carregaInfoCep = (event) => {
        if (event.target.value.length == CEP_LENGTH) {
            axios.get(`https://viacep.com.br/ws/${event.target.value}/json/`)
            .then(res => {
                if (res.data.erro) {
                    swal("Erro!", "CEP não encontrado", {
                        icon: "error",
                        buttons: {
                            confirm: {
                                className: 'btn btn-danger'
                            }
                        },
                    });
                } else {
                    this.endereco.current.value = res.data.logradouro.toUpperCase();
                    this.bairro.current.value = res.data.bairro.toUpperCase();
                    this.cidade.current.value = res.data.localidade.toUpperCase();
                    this.id_municipio.current.value = res.data.ibge;
                    this.uf.current.value = res.data.uf.toUpperCase();
                    this.setState({ endereco: res.data.logradouro.toUpperCase()});
                    this.setState({bairro: res.data.bairro.toUpperCase()});
                    this.setState({ cidade: res.data.localidade.toUpperCase()});
                    this.setState({ id_municipio: res.data.ibge});
                    this.setState({uf: res.data.uf.toUpperCase()});
                }
            });
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.token}`
            }
        }
        let body = {
            nome: this.state.nome,
            pessoa: this.state.pessoa,
            insc_estadual: this.state.insc_estadual,
            cpf_cnpj: this.state.cpf_cnpj,
            cep: this.state.cep,
            endereco: this.state.endereco,
            numero_end: this.state.numero_end,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            id_municipio: this.state.id_municipio,
            uf: this.state.uf,
            ponto_ref: this.state.ponto_ref,
            telefone: this.state.telefone,
            celular: this.state.celular,
            email: this.state.email,
            data_nasc: this.state.data_nasc,
            sexo: this.state.sexo,
            consumidor: this.state.consumidor,
        }
        axios.post(`http://api.nortelink.com.br/api/v1/clientes/`, qs.stringify(body), config)
        .then((res) => {
            swal("Cliente cadastrado com sucesso", {
                icon: "success",
                buttons: {
                    confirm: {
                        className: 'btn btn-success'
                    }
                },
            }).then(() => {
                window.location.href = "/clientes/";
            });
        })
        .catch((error) => {
            swal("Erro!", `${error.response.data} `, {
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
                                        <h2 className="text-white pb-2 fw-bold">Cadastro de Clientes</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode cadastrar clientes</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Fomulário de Cadastro</div>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <label><b>Informações Gerais</b></label>
                                                <div className="row">
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="nome">Nome <span className="text-danger">*</span></label>
                                                            <input type="text" name="nome" id="nome" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="pessoa">Pessoa Física ou Jurídica <span className="text-danger">*</span></label>
                                                            <select name="pessoa" id="pessoa" className="form-control" required onInput={this.showPessoa} onChange={this.changeHandler}>
                                                                <option value="">&nbsp;</option>
                                                                <option value="J">Pessoa Jurídica</option>
                                                                <option value="F">Pessoa Física</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                {this.state.show_pessoa_juridica ?
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="insc_estadual">Número da Inscrição Estadual <span className="text-danger">*</span></label>
                                                                <input type="text" name="insc_estadual" id="insc_estadual" className="form-control" onChange={this.changeHandler} required />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="cpf_cnpj">CNPJ <span className="text-danger">*</span></label>
                                                                <input type="text" name="cpf_cnpj" id="cpf_cnpj" className="form-control" onChange={this.changeHandler} required />
                                                            </div>
                                                        </div>
                                                    </div> : null
                                                }
                                                {this.state.show_pessoa_fisica ?
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="cpf_cnpj">CPF <span className="text-danger">*</span></label>
                                                                <input type="text" name="cpf_cnpj" id="cpf_cnpj" className="form-control" onChange={this.changeHandler} required />
                                                            </div>
                                                        </div>
                                                    </div> : null
                                                }
                                                <label className="mt-3"><b>Endereço</b></label>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="cep">CEP <span className="text-danger">*</span></label>
                                                            <input type="text" name="cep" id="cep" className="form-control" required onInput={this.carregaInfoCep} onChange={this.changeHandler} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="endereco">Logradouro <span className="text-danger">*</span></label>
                                                            <input type="text" name="endereco" ref={this.endereco} id="endereco" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="numero_end">Número <span className="text-danger">*</span></label>
                                                            <input type="text" name="numero_end" id="numero_end" className="form-control" onChange={this.changeHandler} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="bairro">Bairro <span className="text-danger">*</span></label>
                                                            <input type="text" name="bairro" ref={this.bairro} id="bairro" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="cidade">Cidade <span className="text-danger">*</span></label>
                                                            <input type="text" name="cidade" ref={this.cidade} id="cidade" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="id_municipio">Códido do Município (IBGE) <span className="text-danger">*</span></label>
                                                            <input type="text" name="id_municipio" ref={this.id_municipio} id="id_municipio" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="uf">Estado <span className="text-danger">*</span></label>
                                                            <input type="text" name="uf" ref={this.uf} id="uf" className="form-control" onChange={this.changeHandler} required style={inputStyle} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="ponto_ref">Ponto de referência</label>
                                                            <input type="text" name="ponto_ref" id="ponto_ref" className="form-control" onChange={this.changeHandler} style={inputStyle} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <label className="mt-3"><b>Informações Adicionais</b></label>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="telefone">Telefone <span className="text-danger">*</span></label>
                                                            <input type="text" name="telefone" id="telefone" className="form-control" onChange={this.changeHandler} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="celular">Celular <span className="text-danger">*</span></label>
                                                            <input type="text" name="celular" id="celular" className="form-control" onChange={this.changeHandler} required />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="email">E-mail</label>
                                                            <input type="text" name="email" id="email" className="form-control" onChange={this.changeHandler} style={inputStyle} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-group">
                                                            <label htmlFor="data_nasc">Data de Nascimento</label>
                                                            <input type="date" name="data_nasc" id="data_nasc" className="form-control" onChange={this.changeHandler} />
                                                        </div>
                                                    </div>
                                                    {this.state.show_pessoa_fisica ?
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-check">
                                                                <label>Sexo</label><br/>
                                                                <label className="form-radio-label">
                                                                    <input className="form-radio-input" type="radio" value="M" name="sexo" onChange={this.changeHandler} />
                                                                    <span className="form-radio-sign text-muted">Masculino</span>
                                                                </label>
                                                                <label className="form-radio-label ml-3">
                                                                    <input className="form-radio-input" type="radio" value="F" name="sexo" onChange={this.changeHandler} />
                                                                    <span className="form-radio-sign text-muted">Feminino</span>
                                                                </label>
                                                            </div>
                                                        </div> : null
                                                    }
                                                    <div className="col-md-4 col-sm-12">
                                                        <div className="form-check">
                                                            <label className="form-check-label mt-md-5">
                                                                <input className="form-check-input" type="checkbox" value="true" name="consumidor" onChange={this.changeHandler} />
                                                                <span className="form-check-sign">O cliente é consumidor final?</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button className="btn btn-nortelink btn-round btn-lg btn-block" type="submit"><i className="fas fa-save"></i> Salvar</button>
                                                    </div>
                                                </div>
                                            </form>
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
