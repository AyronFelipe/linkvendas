import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { storageToken, isAuthenticated } from '../auth';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {type: 'password', usuario: '', senha: '', loja: ''};
        this.senha = React.createRef();
        this.changeSenhaType = this.changeSenhaType.bind(this);
    }

    changeSenhaType(e){
        return this.senha.current.type  == 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'});
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value});
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
            loja: this.state.loja
        }
        axios.post(`http://api.nortelink.com.br/api/v1/login/`, qs.stringify(body), config)
        .then((res) => {
            storageToken(res.data.token);
            if (isAuthenticated()) {
                window.location.href = "/main/";
            }
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
                                    <input id="usuario" name="usuario" type="text" className="form-control" value={this.state.usuario} onChange={this.changeHandler} required />
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
                                    <input id="loja" name="loja" type="text" className="form-control" value={this.state.loja} onChange={this.changeHandler} required />
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