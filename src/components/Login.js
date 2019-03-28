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
            <div className="login bg-nortelink">
                <div className="wrapper wrapper-login">
                    <div className="container container-login animated fadeIn">
                        <h3 className="text-center"><i className="icon-login" style={{ marginRight: '5px' }}></i> Login</h3>
                        <div className="login-form">
                            <div className="form-group">
                                <label htmlFor="usuario">Nome</label>
                                <input id="usuario" name="usuario" type="text" className="form-control" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="senha">Senha</label>
                                <div className="position-relative">
                                    <input ref={this.senha} id="senha" name="senha" type={this.state.type} className="form-control" required />
                                    <div className="show-password" onClick={() => this.changeSenhaType(event)}>
                                        <i className="icon-eye"></i>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="id_loja">ID de sua loja</label>
                                <input id="id_loja" name="id_loja" type="text" className="form-control" required />
                            </div>
                            <div className="form-action mb-3">
                                <button className="btn btn-nortelink btn-rounded btn-login">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}