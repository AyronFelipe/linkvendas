import React from 'react';
import Swal from 'sweetalert2'


const PAGE = 1;

export default class SearchProduto extends React.Component {

    constructor(props) {
        super(props);
        this.state = { produto: '', readonly: false };
        this.input = React.createRef();
    }

    searchProduto = () => {
        swal({
            text: "Descrição do Produto",
            content: {
                element: "input",
                attributes: {
                    type: "text",
                    style: "text-transform:uppercase;"
                }
            },
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
            .then((name) => {
                if (!name) throw null;
                this.setState({ produto: name });
                return fetch(`http://api.nortelink.com.br/api/v1/produtos/?page=${PAGE}&descr=${this.state.produto.toUpperCase()}`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                if (json.status == 404) {
                    return swal("Produto não encontrado");
                } else {
                    if (json.length > 1) {
                        swal.close();
                    }else{
                        const produto_encontrado = json[0];
                        swal({
                            title: "Produto encontrado!",
                            text: `${produto_encontrado.descricao} - ${produto_encontrado.compl_descr}`,
                        });
                        this.input.current.value = produto_encontrado.id;
                        this.props.onChange(this.input.current.name, this.input.current.value);
                        this.props.onInput();
                    }
                }
            });
    }

    changeHandler = (e) => {
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    render() {
        return (
            <React.Fragment>

                <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} onChange={this.changeHandler} required />
                <div className="modal fade" id="modal-many-products">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Escolha um dos produtos abaixo</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Produto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>PLAYSTATION</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-nortelink">Adicionar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
