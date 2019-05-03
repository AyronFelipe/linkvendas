import React from 'react';

const PAGE = 1;

export default class SearchPlanoPagamento extends React.Component {

    constructor(props) {
        super(props);
        this.state = { plano_pagamento: '', readonly: false };
        this.input = React.createRef();
    }

    searchPlanoPagamento = () => {
        swal({
            text: "Código do Plano de Pagamento",
            content: "input",
            button: {
                text: "Procurar!",
                closeModal: false,
            },
        })
            .then((name) => {
                if (!name) throw null;
                this.setState({ plano_pagamento: name });
                return fetch(`http://api.nortelink.com.br/api/v1/planospag/${name}/`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                if (json.status == 404) {
                    return swal("Plano de Pagamento não encontrado");
                } else {
                    let plano_pagamento_encontrado_list = []
                    plano_pagamento_encontrado_list.push(json);
                    const plano_pagamento_encontrado = plano_pagamento_encontrado_list[0];
                    swal({
                        title: "Plano de Pagamento encontrado!",
                        text: plano_pagamento_encontrado.nome,
                    });
                    this.input.current.value = plano_pagamento_encontrado.id;
                    this.setState({ readonly: true });
                    this.props.onChange(this.input.current.name, this.input.current.value);
                }
            });
    }

    handlerBlur = (e) => {
        this.props.onBlur(e.target.value);
    }

    render() {
        return (
            <input type="text" ref={this.input} name={this.props.name} id={this.props.id} className="form-control" readOnly={this.state.readonly} onBlur={this.handlerBlur} required />
        )
    }
}