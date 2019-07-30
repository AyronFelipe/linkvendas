import React from 'react'; 


export default class Pagination extends React.Component {

    constructor(props){
        super(props);
        this.state = { ultima_pagina: false, pode_exibir: this.props.pode_exibir, nao_exibe_mais: false };
    }

    handleClick = (e) => {
        let ante_penultima = Math.trunc(parseInt(this.props.count) / parseInt(this.props.rows));
        let ultima = parseInt(ante_penultima) + 1;
        this.setState({  ultima_pagina: false, pode_exibir: this.props.pode_exibir, nao_exibe_mais: false });
        if (e.target.innerHTML == 'Anterior') {
            let index = parseInt(this.props.page) - 1;
            if (index == ante_penultima) {
                this.setState({ nao_exibe_mais: true });
            }
            if (index == ultima) {
                this.setState({ ultima_pagina: true, pode_exibir: false });
            }
            this.props.onClick(index);
        } else if (e.target.innerHTML == 'Próximo') {
            let index = parseInt(this.props.page) + 1;
            if (index == ante_penultima) {
                this.setState({ nao_exibe_mais: true });
            }
            if (index == ultima) {
                this.setState({ ultima_pagina: true, pode_exibir: false });
            }
            this.props.onClick(index);
        } else if (e.target.innerHTML == 'Primeira'){
            this.props.onClick(1);
        } else if (e.target.innerHTML == 'Última'){
            this.props.onClick(ultima);
            this.setState({ ultima_pagina: true, pode_exibir: false });
        } else if ( parseInt(e.target.innerHTML) == ultima ){
            this.props.onClick(ultima);
            this.setState({ ultima_pagina: true, pode_exibir: false });
        } else if (parseInt(e.target.innerHTML) == ante_penultima) {
            this.props.onClick(ante_penultima);
            this.setState({ nao_exibe_mais: true });
        } else {
            this.props.onClick(e.target.innerHTML);
        }
    }

    render(){
        return(
            <React.Fragment>
                {
                    this.props.exibe_tudo ?
                    <React.Fragment>
                        <div className="col-sm-12 col-md-5">
                            <p>Mostrando de { this.props.base } a { this.props.ultimo } de { this.props.count } entradas</p>
                        </div>
                        <div className="col-sm-12 col-md-7">
                            <nav aria-label="...">
                                <ul className="pagination">
                                    {
                                        this.props.page > 1 ?
                                            <React.Fragment>
                                                <li className="page-item">
                                                    <span className="page-link" onClick={this.handleClick}>Primeira</span>
                                                </li>
                                                <li className="page-item">
                                                    <span className="page-link" onClick={this.handleClick}>Anterior</span>
                                                </li>
                                            </React.Fragment>
                                        :
                                            null
                                    }
                                    {
                                        this.state.ultima_pagina ?
                                        <React.Fragment>
                                            <li className="page-item">
                                                <span className="page-link" onClick={this.handleClick}>
                                                    {parseInt(this.props.page) - 2}
                                                </span>
                                            </li>
                                            <li className="page-item">
                                                <span className="page-link" onClick={this.handleClick}>
                                                    {parseInt(this.props.page) - 1}
                                                </span>
                                            </li>
                                        </React.Fragment>
                                        :
                                        null
                                    }
                                    <li className="page-item active">
                                        <span className="page-link" onClick={this.handleClick}>
                                            { parseInt(this.props.page) }
                                        </span>
                                    </li>
                                    {
                                        this.state.pode_exibir ?
                                            <React.Fragment>
                                                <li className="page-item">
                                                    <span className="page-link" onClick={this.handleClick}>
                                                        { parseInt(this.props.page) + 1 }
                                                    </span>
                                                </li>
                                                {
                                                    this.state.nao_exibe_mais ?
                                                    null
                                                    :
                                                    <li className="page-item">
                                                        <span className="page-link" onClick={this.handleClick}>
                                                            { parseInt(this.props.page) + 2 }
                                                        </span>
                                                    </li>
                                                }
                                                <li className="page-item">
                                                    <span className="page-link" onClick={this.handleClick}>
                                                        Próximo
                                                    </span>
                                                </li>
                                                <li className="page-item">
                                                    <span className="page-link" onClick={this.handleClick}>
                                                        Última
                                                    </span>
                                                </li>
                                            </React.Fragment>
                                        :
                                            null
                                    }
                                </ul>
                            </nav>
                        </div>
                    </React.Fragment>
                    :
                    null
                }
            </React.Fragment>
        );
    }
}