import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { storageToken, isAuthenticated } from '../auth';
import { abstractError } from '../utils';

const inputStyle = {
    textTransform: 'uppercase'
}

const PAGE = 1;

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = { type: 'password', usuario: '', senha: '', loja: '', lojas: [] };
        this.senha = React.createRef();
        this.changeSenhaType = this.changeSenhaType.bind(this);
    }

    changeSenhaType(e){
        return this.senha.current.type  == 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'});
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value.toUpperCase()});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        let body = {
            usuario: this.state.usuario,
            senha: this.state.senha,
            loja: $('#loja').val()
        }
        axios.post(`http://api.nortelink.com.br/api/v1/login/`, qs.stringify(body), config)
        .then((res) => {
            storageToken(res.data.token);
            if (isAuthenticated()) {
                window.location.href = "/main/";
            }
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    getLojas = () => {
        axios({
            url: `http://api.nortelink.com.br/api/v1/lojas/`,
            method: `get`,
            params: {
                page: PAGE,
            }
        })
        .then((res) => {
            this.setState({ lojas: res.data });
        })
        .catch((error) => {
            abstractError(error);
        })
    }

    componentDidMount = () => {
        this.getLojas();
        $('#loja').select2({
            theme: 'bootstrap'
        });
        $('.select2-selection').css({
            'padding-top': '20px',
            'padding-bottom': '20px'
        });
    }

    render(){
        return(
            <div className="login bg-nortelink">
                <div className="wrapper wrapper-login">
                    <div className="container container-login animated fadeIn">
                        <h3 className="text-center"><i className="icon-login" style={{ marginRight: '5px' }}></i> Login</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="login-form">
                                <div className="form-group">
                                    <label htmlFor="usuario">Nome</label>
                                    <input id="usuario" name="usuario" type="text" className="form-control" value={this.state.usuario} onChange={this.changeHandler} style={inputStyle} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senha">Senha</label>
                                    <div className="position-relative">
                                        <input ref={this.senha} id="senha" name="senha" type={this.state.type} className="form-control" value={this.state.senha} onChange={this.changeHandler} required />
                                        <div className="show-password" onClick={() => this.changeSenhaType(event)}>
                                            <i className="icon-eye"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loja">ID de sua loja</label>
                                    <div className="select2-input">
                                        <select id="loja" name="loja" type="text" className="form-control" onChange={this.changeHandler} required>
                                            {this.state.lojas.map((loja) =>
                                                <option key={loja.id} value={loja.id}>{loja.id} - {loja.nome}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-action mb-3">
                                    <button className="btn btn-nortelink btn-rounded btn-login" type="submit">Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}