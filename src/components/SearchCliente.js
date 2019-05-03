import React from 'react';

const PAGE = 1;

export default class SearchParceiro extends React.Component {

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
                const PARAMS = {
                    page: PAGE,
                    id: name
                }
                this.setState({ cliente: name });
                return fetch(`http://api.nortelink.com.br/api/v1/clientes?page=${encodeURIComponent(PARAMS.page)}`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                let cliente_encontrado_list = []
                json.map((cliente) => {
                    if (cliente.cpf_cnpj == this.state.cliente || cliente.id == this.state.cliente) {
                        cliente_encontrado_list.push(cliente);
                    }
                });
                const cliente_encontrado = cliente_encontrado_list[0];
                if (!cliente_encontrado) {
                    return swal("Cliente não encontrado");
                }
                swal({
                    title: "Cliente encontrado!",
                    text: cliente_encontrado.nome,
                });
                this.input.current.value = cliente_encontrado.id;
                this.setState({ readonly: true });
                this.props.onChange(this.input.current.name, this.input.current.value);
            });
    }

    render() {
        return (
            <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} required />
        )
    }
}
