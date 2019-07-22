import React from 'react';


export default class Pagination extends React.Component {

    handleClick = (e) => {
        this.props.onClick(e.target.innerHTML);
    }

    render(){
        return(
            <div className="col-sm-12 col-md-7">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item">
                            <span className="page-link" onClick={this.handleClick}>Anterior</span>
                        </li>
                        <li className="page-item active">
                            <span className="page-link" onClick={this.handleClick}>
                                { this.props.page }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link" onClick={this.handleClick}>
                                { this.props.page + 1 }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link" onClick={this.handleClick}>
                                { this.props.page + 2 }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link" onClick={this.handleClick}>
                                Próximo
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}