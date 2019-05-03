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
                const PARAMS = {
                    page: PAGE,
                    id: name
                }
                this.setState({ plano_pagamento: name });
                return fetch(`http://api.nortelink.com.br/api/v1/planospag?page=${encodeURIComponent(PARAMS.page)}`, {
                    method: `GET`,
                    headers: { 'Authorization': `Bearer ${localStorage.token}` },
                });
            })
            .then((results) => {
                return results.json();
            })
            .then((json) => {
                let plano_pagamento_encontrado_list = []
                json.map((plano_pagamento) => {
                    if (plano_pagamento.id == this.state.plano_pagamento || plano_pagamento.nome.includes(this.state.plano_pagamento)) {
                        plano_pagamento_encontrado_list.push(plano_pagamento);
                    }
                });
                const plano_pagamento_encontrado = plano_pagamento_encontrado_list[0];
                if (!plano_pagamento_encontrado) {
                    return swal("Plano de Pagamento não encontrado");
                }
                swal({
                    title: "Plano de Pagamento encontrado!",
                    text: plano_pagamento_encontrado.nome,
                });
                this.input.current.value = plano_pagamento_encontrado.id;
                this.setState({ readonly: true });
                this.props.onChange(this.input.current.name, this.input.current.value);
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