import React from 'react';
import axios from 'axios';
import Header from './Header';
import SideMenu from './SideMenu';
import BackButton from './BackButton';
import qs from 'qs';
import { abstractError } from '../utils';
import MaskedInput from 'react-text-mask';


const CEP_LENGTH = 8;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class EditarCliente extends React.Component{

    constructor(props) {
        super(props);
        this.endereco = React.createRef();
        this.bairro = React.createRef();
        this.cidade = React.createRef();
        this.id_municipio = React.createRef();
        this.uf = React.createRef();
        this.state = {
            show_pessoa_juridica: false,
            show_pessoa_fisica: true,
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
            consumidor: true,
            cliente: '',
            carregaInfo: true,
            id: '',
            masculino: false,
            feminino: false,
        }
    }

    getCliente = () => {
        let pathname = window.location.pathname;
        let cliente_id = pathname.split('/')[2];
        this.setState({ id: cliente_id });
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

    showPessoa = (event) => {
        if (event.target.value == 'J') {
            this.setState({ show_pessoa_juridica: true });
        } else {
            this.setState({ show_pessoa_juridica: false });
        }

        if (event.target.value == 'F') {
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
                        this.setState({ endereco: res.data.logradouro.toUpperCase() });
                        this.setState({ bairro: res.data.bairro.toUpperCase() });
                        this.setState({ cidade: res.data.localidade.toUpperCase() });
                        this.setState({ id_municipio: res.data.ibge });
                        this.setState({ uf: res.data.uf.toUpperCase() });
                    }
                })
                .catch((error) => {
                    abstractError(error);
                });
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount = () => {
        this.getCliente();
        this.verificaSexo();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${localStorage.token}`
            }
        }
        if ($('#telefone').val() != '' && $('#telefone').val().length < 13) {
            swal("Telefone informado incorretamente", {
                icon: "warning",
                buttons: {
                    confirm: {
                        className: 'btn btn-warning'
                    }
                },
            });
            return false
        }
        if ($('#celular').val() != '' && $('#celular').val().length < 13) {
            swal("Telefone informado incorretamente", {
                icon: "warning",
                buttons: {
                    confirm: {
                        className: 'btn btn-warning'
                    }
                },
            });
            return false
        }
        let body = {
            nome: $('#nome').val().toUpperCase(),
            pessoa: $('#pessoa').val(),
            insc_estadual: $('#insc_estadual').val(),
            cpf_cnpj: $('#cpf_cnpj').val(),
            cep: $('#cep').val(),
            endereco: $('#endereco').val(),
            numero_end: $('#numero_end').val(),
            bairro: $('#bairro').val(),
            cidade: $('#cidade').val(),
            id_municipio: $('#id_municipio').val(),
            uf: $('#uf').val(),
            ponto_ref: $('#ponto_ref').val().toUpperCase(),
            telefone: $('#telefone').val(),
            celular: $('#celular').val(),
            email: $('#email').val(),
            data_nasc: $('#data_nasc').val(),
            sexo: $('.form-radio-input').val(),
            consumidor: $('#consumidor').val(),
        }
        axios.put(`http://api.nortelink.com.br/api/v1/clientes/${this.state.id}`, qs.stringify(body), config)
        .then((res) => {
            swal("Cliente atualizado com sucesso", {
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
            abstractError(error);
        })
    }

    verificaSexo = () => {
        if (this.state.cliente.sexo == 'M') {
            this.setState({ masculino: true });
        } else if (this.state.cliente.sexo == 'F') {
            this.setState({ feminino: true });
        }
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <SideMenu/>
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-nortelink">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Edição de Clientes</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode editar clientes</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-12">
                                    {
                                        this.state.carregaInfo ?
                                            <div className="d-flex justify-content-center mt-5 mb-5">
                                                <div className="loader loader-lg"></div>
                                            </div>
                                        :
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title">Fomulário de Edição</div>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <label><b>Informações Gerais</b></label>
                                                    <div className="row">
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="nome">Nome <span className="text-danger">*</span></label>
                                                                <input type="text" name="nome" id="nome" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.nome} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="pessoa">Pessoa Física ou Jurídica <span className="text-danger">*</span></label>
                                                                <select name="pessoa" id="pessoa" className="form-control" required onInput={this.showPessoa} onChange={this.changeHandler} defaultValue={this.state.cliente.pessoa} >
                                                                    <option value="F">Pessoa Física</option>
                                                                    <option value="J">Pessoa Jurídica</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {this.state.show_pessoa_juridica ?
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="insc_estadual">Número da Inscrição Estadual <span className="text-danger">*</span></label>
                                                                    <input type="text" name="insc_estadual" id="insc_estadual" className="form-control" onChange={this.changeHandler} required defaultValue={this.state.cliente.insc_estadual} />
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="cpf_cnpj">CNPJ <span className="text-danger">*</span></label>
                                                                    <MaskedInput
                                                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                                                                        guide={false}
                                                                        name="cpf_cnpj"
                                                                        id="cpf_cnpj"
                                                                        className="form-control"
                                                                        onChange={this.changeHandler}
                                                                        required
                                                                        defaultValue={this.state.cliente.cpf_cnpj} />
                                                                </div>
                                                            </div>
                                                        </div> : null
                                                    }
                                                    {this.state.show_pessoa_fisica ?
                                                        <div className="row">
                                                            <div className="col-md-6 col-sm-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="cpf_cnpj">CPF <span className="text-danger">*</span></label>
                                                                    <MaskedInput
                                                                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                                                                        guide={false}
                                                                        name="cpf_cnpj"
                                                                        id="cpf_cnpj"
                                                                        className="form-control"
                                                                        onChange={this.changeHandler}
                                                                        required
                                                                        defaultValue={this.state.cliente.cpf_cnpj} />
                                                                </div>
                                                            </div>
                                                        </div> : null
                                                    }
                                                    <label className="mt-3"><b>Endereço</b></label>
                                                    <div className="row">
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="cep">CEP <span className="text-danger">*</span></label>
                                                                <MaskedInput
                                                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                                                                    guide={false}
                                                                    name="cep"
                                                                    id="cep"
                                                                    className="form-control"
                                                                    onBlur={this.carregaInfoCep}
                                                                    onChange={this.changeHandler}
                                                                    required
                                                                    defaultValue={this.state.cliente.cep} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="endereco">Logradouro <span className="text-danger">*</span></label>
                                                                <input type="text" name="endereco" ref={this.endereco} id="endereco" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.endereco} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="numero_end">Número <span className="text-danger">*</span></label>
                                                                <MaskedInput
                                                                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                                                                    guide={false}
                                                                    name="numero_end"
                                                                    id="numero_end"
                                                                    className="form-control"
                                                                    onChange={this.changeHandler}
                                                                    required
                                                                    defaultValue={this.state.cliente.numero_end} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="bairro">Bairro <span className="text-danger">*</span></label>
                                                                <input type="text" name="bairro" ref={this.bairro} id="bairro" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.bairro} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="cidade">Cidade <span className="text-danger">*</span></label>
                                                                <input type="text" name="cidade" ref={this.cidade} id="cidade" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.cidade} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="id_municipio">Códido do Município (IBGE) <span className="text-danger">*</span></label>
                                                                <input type="text" name="id_municipio" ref={this.id_municipio} id="id_municipio" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.id_municipio} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="uf">Estado <span className="text-danger">*</span></label>
                                                                <input type="text" name="uf" ref={this.uf} id="uf" className="form-control" onChange={this.changeHandler} required style={inputStyle} defaultValue={this.state.cliente.uf} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="ponto_ref">Ponto de referência</label>
                                                                <input type="text" name="ponto_ref" id="ponto_ref" className="form-control" onChange={this.changeHandler} style={inputStyle} defaultValue={this.state.cliente.ponto_ref} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label className="mt-3"><b>Informações Adicionais</b></label>
                                                    <div className="row">
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="telefone">Telefone</label>
                                                                <MaskedInput
                                                                    mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                                                                    guide={false}
                                                                    name="telefone"
                                                                    id="telefone"
                                                                    className="form-control"
                                                                    onChange={this.changeHandler}
                                                                    defaultValue={this.state.cliente.telefone} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="celular">Celular</label>
                                                                <MaskedInput
                                                                    mask={['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,]}
                                                                    guide={false}
                                                                    name="celular"
                                                                    id="celular"
                                                                    className="form-control"
                                                                    onChange={this.changeHandler}
                                                                    defaultValue={this.state.cliente.celular} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="email">E-mail</label>
                                                                <input type="email" name="email" id="email" className="form-control" onChange={this.changeHandler} defaultValue={this.state.cliente.email} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="data_nasc">Data de Nascimento</label>
                                                                <input
                                                                    type="date" 
                                                                    name="data_nasc" 
                                                                    id="data_nasc" 
                                                                    className="form-control" 
                                                                    onChange={this.changeHandler} 
                                                                    defaultValue={new Date(`${this.state.cliente.data_nasc}`).toISOString().split('T')[0] } />
                                                            </div>
                                                        </div>
                                                        {this.state.show_pessoa_fisica ?
                                                            <div className="col-md-4 col-sm-12">
                                                                <div className="form-check">
                                                                    <label>Sexo</label><br />
                                                                    <label className="form-radio-label">
                                                                        <input className="form-radio-input" type="radio" value="M" name="sexo" onChange={this.changeHandler} defaultChecked={this.state.masculino} />
                                                                        <span className="form-radio-sign text-muted">Masculino</span>
                                                                    </label>
                                                                    <label className="form-radio-label ml-3">
                                                                        <input className="form-radio-input" type="radio" value="F" name="sexo" onChange={this.changeHandler} defaultChecked={this.state.feminino} />
                                                                        <span className="form-radio-sign text-muted">Feminino</span>
                                                                    </label>
                                                                </div>
                                                            </div> : null
                                                        }
                                                        <div className="col-md-4 col-sm-12">
                                                            <div className="form-check">
                                                                <label className="form-check-label mt-md-5">
                                                                    <input className="form-check-input" type="checkbox" value="true" name="consumidor" onChange={this.changeHandler} defaultChecked={this.state.consumidor} />
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
                                    }
                                    <BackButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}