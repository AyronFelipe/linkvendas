import React from 'react';


export default class Pagination extends React.Component {

    render(){
        return(
            <div className="col-sm-12 col-md-7">
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item">
                            <span className="page-link">Anterior</span>
                        </li>
                        <li className="page-item active">
                            <span className="page-link">
                                { this.props.page }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link">
                                { this.props.page + 1 }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link">
                                { this.props.page + 2 }
                            </span>
                        </li>
                        <li className="page-item">
                            <span className="page-link">
                                Próximo
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}