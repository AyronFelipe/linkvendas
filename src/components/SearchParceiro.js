import React from 'react';
import MaskedInput from 'react-text-mask';
import axios from 'axios';
import { abstractError, fillWithZeros } from '../utils';

const PAGE = 1;

const inputStyle = {
    textTransform: 'uppercase'
}

export default class SearchParceiro extends React.Component{

    constructor(props){
        super(props);
        this.state = { parceiros: [], readonly: false, showCPFCNPJ: true, showNome: false };
        this.input = React.createRef();
    }

    searchParceiro = () => {
        $('#modal-parceiro').modal('show');
    }

    changeDesejo = (e) => {
        let value = e.target.value;
        if (value == 'cpf_cnpj') {
            this.setState({
                showCPFCNPJ: true,
                showNome: false
            });
        } else {
            this.setState({
                showCPFCNPJ: false,
                showNome: true
            });

        }
    }

    changeHandler = (e) => {
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    handleParceiroClick = (e) => {
        e.preventDefault();
        let order = '';
        let value = '';
        if (this.state.showCPFCNPJ) {
            order = 'cnpj_cpf';
            value = $('#cpf_cnpj_parceiro').val();
        } else {
            order = 'nome';
            value = $('#nome_parceiro').val().toUpperCase();

        }
        axios({
            url: `http://api.nortelink.com.br/api/v1/parceiros/`,
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
            this.setState({ parceiros: res.data });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    renderOptionsBusca = () => {
        if (this.state.showCPFCNPJ) {
            return(
                <div className="form-group">
                    <label htmlFor="id">CPF ou CNPJ do Parceiro (sem formatação)</label>
                    <MaskedInput
                        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,]}
                        guide={false}
                        placeholder="Insira aqui"
                        className="form-control"
                        id="cpf_cnpj_parceiro" />
                </div>
            );
        } else if (this.state.showNome) {
            return(
                <div className="form-group">
                    <label htmlFor="id">Nome do Parceiro</label>
                    <input type="text" placeholder="Insira aqui" name="nome" id="nome_parceiro" className="form-control" style={inputStyle} />
                </div>
            );
        }
    }

    selecionarParceiro = (e) => {
        $('#modal-parceiro').modal('hide');
        this.input.current.value = e.target.value;
        this.props.onChange(this.input.current.name, this.input.current.value);
        $('#cpf_cnpj_parceiro').val('');
        $('#nome_parceiro').val('');
        $("#desejo").val($("#desejo option:first").val());
        this.setState({ parceiros: [], showCPFCNPJ: true });
    }

    renderParceirosEncontrados = () => {
        if (this.state.parceiros.length >= 1) {
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
                            {this.state.parceiros.map((parceiro) => {
                                return(
                                    <tr key={parceiro.id}>
                                        <td><input type="radio" name="parceiro_encontrado" value={parceiro.id} onClick={this.selecionarParceiro} /></td>
                                        <td>{parceiro.id}</td>
                                        <td>{parceiro.nome}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }

    fillSpace = (e) => {
        this.input.current.value = fillWithZeros(e.target.value, 5);
    }

    render(){
        return(
            <React.Fragment>
                <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} onChange={this.changeHandler} onBlur={this.fillSpace} />
                <div className="modal fade" id="modal-parceiro">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Buscar Parceiro</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="desejo">Você deseja buscar por</label>
                                            <select id="desejo" className="form-control" onChange={this.changeDesejo}>
                                                <option value="">&nbsp;</option>
                                                <option value="cpf_cnpj">CPF/CNPJ</option>
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
                                        {this.renderParceirosEncontrados()}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-nortelink" onClick={this.handleParceiroClick}>Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 