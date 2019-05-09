import React from 'react';

export default class SearchTabPreco extends React.Component {

    constructor(props) {
        super(props);
        this.state = { tab_preco: '', readonly: true };
        this.input = React.createRef();
    }

    searchTabPreco = () => {
        swal({
            text: "Código da Tabela de Preço",
            content: "input",
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
            .then((name) => {
                if (!name) throw null;
                this.setState({ tab_preco: name });
                return fetch(`http://api.nortelink.com.br/api/v1/produtos/tabprecos/${name}`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                if (json.status == 404) {
                    return swal("Tabela de Preço não encontrada");
                } else {
                    let tab_preco_encontrado_list = []
                    tab_preco_encontrado_list.push(json);
                    const tab_preco_encontrado = tab_preco_encontrado_list[0];
                    swal({
                        title: "Tabela de Preço encontrada!",
                        text: `${tab_preco_encontrado.descricao}`,
                    });
                    this.input.current.value = tab_preco_encontrado.id;
                    this.setState({ readonly: true });
                    this.props.onChange(this.input.current.name, this.input.current.value);
                    this.props.onInput();
                }
            });
    }

    render() {
        return (
            <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} required />
        )
    }
}
