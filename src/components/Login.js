import React from 'react';

export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {type: 'password'};
        this.senha = React.createRef();
        this.changeSenhaType = this.changeSenhaType.bind(this);
    }

    changeSenhaType(e){
        return this.senha.current.type  == 'password' ? this.setState({type: 'text'}) : this.setState({type: 'password'});
    }

    render(){
        return(
            <div className="login">
                <div className="wrapper wrapper-login">
                    <div className="container container-login animated fadeIn">
                        <h3 className="text-center">Login</h3>
                        <div className="login-form">
                            <div className="form-group form-floating-label">
                                <input id="usuario" name="usuario" type="text" className="form-control input-border-bottom" required />
                                <label htmlFor="usuario" className="placeholder">Nome</label>
                            </div>
                            <div className="form-group form-floating-label">
                                <input ref={this.senha} id="senha" name="senha" type={this.state.type} className="form-control input-border-bottom" required />
                                <label htmlFor="senha" className="placeholder">Senha</label>
                                <div className="show-password" onClick={() => this.changeSenhaType(event)}>
                                    <i className="icon-eye"></i>
                                </div>
                            </div>
                            <div className="form-group form-floating-label">
                                <input id="id_loja" name="id_loja" type="text" className="form-control input-border-bottom" required />
                                <label htmlFor="id_loja" className="placeholder">ID de sua loja</label>
                            </div>
                            <div className="form-action mb-3">
                                <button className="btn btn-primary btn-rounded btn-login">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}