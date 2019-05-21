import React from 'react';
import axios from 'axios';
import MaskedInput from 'react-text-mask';


const PAGE = 1;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class SearchCliente extends React.Component {

    constructor(props) {
        super(props);
        this.state = {clientes: [], readonly: false, showCodigo: true, showCPFCNPJ: false, showNome: false, };
        this.input = React.createRef();
    }

    searchCliente = () => {
        $('#modal-cliente').modal('show');
    }

    changeHandler = (e) => {
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    changeDesejo = (e) => {
        if (e.target.value == 'id') {
            this.setState({
                showCodigo: true,
                showCPFCNPJ: false,
                showNome: false,
            });
        } else if (e.target.value == 'cpfcnpj') {
            this.setState({
                showCodigo: false,
                showCPFCNPJ: true,
                showNome: false,
            });
        } else {
            this.setState({
                showCodigo: false,
                showCPFCNPJ: false,
                showNome: true,
            });
        }
    }

    renderOptionsBusca = () => {
        if (this.state.showCodigo) {
            return (
                <div className="form-group">
                    <label htmlFor="codigo">Código do cliente</label>
                    <input type="text" placeholder="Insira aqui" name="codigo" id="codigo" className="form-control" />
                </div>
            );
        } else if (this.state.showCPFCNPJ) {
            return (
                <div className="form-group">
                    <label htmlFor="cpf_cnpj">CPF ou CNPJ do cliente (sem formatação)</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                        guide={false}
                        placeholder="Insira aqui"
                        className="form-control"
                        id="cpf_cnpj" />
                </div>
            );
        } else {
            return (
                <div className="form-group">
                    <label htmlFor="nome">Nome do cliente</label>
                    <input type="text" placeholder="Insira aqui" name="nome" id="nome" className="form-control" style={inputStyle} />
                </div>
            );
        }
    }

    handleClienteClick = () => {
        let order = '';
        let value = '';
        if (this.state.showCodigo) {
            order = 'id';
            value = $('#codigo').val().toUpperCase();
        } else if (this.state.showCPFCNPJ) {
            order = 'cpf_cnpj';
            value = $('#cpf_cnpj').val().toUpperCase();
        } else {
            order = 'nome';
            value = $('#nome').val().toUpperCase();
        }
        this.setState({ carregaInfo: true });
        axios({
            url: `http://api.nortelink.com.br/api/v1/clientes/`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
            params: {
                page: PAGE,
                order: order,
                value: value
            }
        })
        .then((res) => {
            this.setState({ clientes: res.data });
        })
        .catch((error) => {
            this.setState({ clientes: '' });
            swal("Erro!", `${error.response.data.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: 'btn btn-danger'
                    }
                },
            }).then(() => {
                verifyToken(error.response.data.message);
            });
        });
    }

    renderClientesEncontrados = () => {
        if (this.state.clientes.length >= 1) {
            return(
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Código</th>
                                <th>Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.clientes.map((cliente) => 
                                <tr key={cliente.id}>
                                    <td><input type="radio" name="cliente_encontrado" value={cliente.id} onClick={this.selecionarCliente} /></td>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return(
                null
            );
        }
    }

    selecionarCliente = (e) => {
        $('#modal-cliente').modal('hide');
        this.input.current.value = e.target.value;
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    render() {
        return (
            <React.Fragment>
                <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} onChange={this.changeHandler} required />
                <div className="modal fade" id="modal-cliente">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Procurar Cliente</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="desejo">Você deseja buscar cliente por</label>
                                            <select name="desejo" id="desejo" onChange={this.changeDesejo} className="form-control">
                                                <option value="">&nbsp;</option>
                                                <option value="id">Código</option>
                                                <option value="cpfcnpj">CPF ou CNPJ</option>
                                                <option value="nome">Nome</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {this.renderOptionsBusca()}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {this.renderClientesEncontrados()}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-nortelink" onClick={this.handleClienteClick}>Procurar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
