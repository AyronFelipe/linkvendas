import React from 'react';

const PAGE = 1;

export default class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = { parceiro: '', readonly: false };
        this.input = React.createRef();
    }

    searchParceiro = () => {
        swal({
            text: "Código do Parceiro",
            content: "input",
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
        .then((name) => {
            if (!name) throw null;
            this.setState({ parceiro: name });
            return fetch(`http://api.nortelink.com.br/api/v1/parceiros/${name}`, {
                method: `GET`,
                headers: { 'Authorization': `Bearer ${localStorage.token}` },
            });
        })
        .then((results) => {
            return results.json();
        })
        .then((json) => {
            console.log(json);
            if (json.status == 404) {
                return swal("Parceiro não encontrado");
            } else {
                let parceiro_encontrado_list = []
                parceiro_encontrado_list.push(json);
                const parceiro_encontrado = parceiro_encontrado_list[0];
                swal({
                    title: "Parceiro encontrado!",
                    text: parceiro_encontrado.nome,
                });
                this.input.current.value = parceiro_encontrado.id;
                this.setState({ readonly: true });
                this.props.onChange(this.input.current.name, this.input.current.value);
            }
        });
    }

    render(){
        return(
            <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} />
        )
    }
} 