import React from 'react';


export default class Pagination extends React.Component {

    constructor(props){
        super(props);
        this.state = { ultima_pagina: false };
    }

    handleClick = (e) => {
        if (e.target.innerHTML == 'Anterior') {
            this.props.onClick(parseInt(this.props.page) - 1);
        } else if (e.target.innerHTML == 'Próximo') {
            this.props.onClick(parseInt(this.props.page) + 1);
        } else if (e.target.innerHTML == 'Primeira'){
            this.props.onClick(1);
        } else if (e.target.innerHTML == 'Última'){
            let lol = Math.trunc(parseInt(this.props.count) / parseInt(this.props.rows));
            this.props.onClick(parseInt(lol) + 1);
        } else {
            this.props.onClick(e.target.innerHTML);
        }
    }

    render(){
        return(
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
                            <li className="page-item active">
                                <span className="page-link" onClick={this.handleClick}>
                                    { parseInt(this.props.page) }
                                </span>
                            </li>
                            {
                                this.props.pode_exibir ?
                                    <React.Fragment>
                                        <li className="page-item">
                                            <span className="page-link" onClick={this.handleClick}>
                                                { parseInt(this.props.page) + 1 }
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span className="page-link" onClick={this.handleClick}>
                                                { parseInt(this.props.page) + 2 }
                                            </span>
                                        </li>
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
        );
    }
}