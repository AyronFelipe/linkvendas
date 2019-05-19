import React from 'react';


const PAGE = 1;

export default class SearchProduto extends React.Component {

    constructor(props) {
        super(props);
        this.state = { produtos: '', readonly: false };
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
                        swal({
                            title: "Vários produtos encontrados!",
                            text: `Selecione na tabela o produto que você deseja adicionar`,
                        });
                        this.props.onBlur(json);
                    }else{
                        const produto_encontrado = json[0];
                        swal({
                            title: "Produto encontrado!",
                            text: `${produto_encontrado.descricao} - ${produto_encontrado.compl_descr}`,
                        });
                        this.input.current.value = produto_encontrado.id;
                        this.props.onChange(this.input.current.name, this.input.current.value);
                        this.props.onInput();
                        this.props.onBlur(json);
                    }
                }
            });
    }

    changeHandler = (e) => {
        this.props.onChange(this.input.current.name, this.input.current.value);
    }

    inputHandler = () => {
        this.props.onInput();
    }

    render() {
        return (
            <input 
                type="text" 
                ref={this.input} 
                name={this.props.name} 
                id={this.props.id} 
                className="form-control" 
                readOnly={this.state.readonly} 
                onChange={this.changeHandler} 
                onInput={this.inputHandler} 
                required />
        );
    }
}
