import React from 'react';

const PAGE = 1;

export default class SearchCliente extends React.Component {

    constructor(props) {
        super(props);
        this.state = { cliente: '', readonly: false };
        this.input = React.createRef();
    }

    searchCliente = () => {
        swal({
            text: "Código ou CPF ou CNPJ do cliente sem formatação",
            content: "input",
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
            .then((name) => {
                if (!name) throw null;
                this.setState({ cliente: name });
                return fetch(`http://api.nortelink.com.br/api/v1/clientes/${name}`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                if (json.status == 404) {
                    return swal("Cliente não encontrado");
                } else {
                    let cliente_encontrado_list = []
                    cliente_encontrado_list.push(json);
                    const cliente_encontrado = cliente_encontrado_list[0];
                    swal({
                        title: "Cliente encontrado!",
                        text: cliente_encontrado.nome,
                    });
                    this.input.current.value = cliente_encontrado.id;
                    this.props.onChange(this.input.current.name, this.input.current.value);
                }
            });
    }

    changeHandler = (e) => {
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    render() {
        return (
            <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} onChange={this.changeHandler} required />
        )
    }
}
