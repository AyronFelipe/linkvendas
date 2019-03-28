import React from 'react';
import axios from 'axios';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {type: 'password', usuario: '', senha: '', id_loja: ''};
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
        axios.post(`http://api.nortelink.com.br/api/v1/login/`, {
            usuario: this.state.usuario,
            senha: this.state.senha,
            id_loja: this.state.id_loja
        }).then(res => {
            console.log(res);
        })
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
                                    <label htmlFor="id_loja">ID de sua loja</label>
                                    <input id="id_loja" name="id_loja" type="text" className="form-control" value={this.state.id_loja} onChange={this.changeHandler} required />
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