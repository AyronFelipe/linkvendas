import React from 'react';

export default class SearchProduto extends React.Component {

    constructor(props) {
        super(props);
        this.state = { produto: '', readonly: false };
        this.input = React.createRef();
    }

    searchProduto = () => {
        swal({
            text: "Código do Produto",
            content: "input",
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
            .then((name) => {
                if (!name) throw null;
                this.setState({ produto: name });
                return fetch(`http://api.nortelink.com.br/api/v1/produtos/${name}`, {
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
                    let produto_encontrado_list = []
                    produto_encontrado_list.push(json);
                    const produto_encontrado = produto_encontrado_list[0];
                    swal({
                        title: "Produto encontrado!",
                        text: `${produto_encontrado.descricao} - ${produto_encontrado.compl_descr}`,
                    });
                    this.input.current.value = produto_encontrado.id;
                    this.setState({ readonly: true });
                    this.props.onChange(this.input.current.name, this.input.current.value);
                    this.props.onInput();
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
