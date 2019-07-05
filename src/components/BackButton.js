import React from 'react';
import { withRouter } from 'react-router-dom';


class BackButton extends React.Component {

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="row mb-2">
                <div className="col-12">
                    <button className="btn btn-nortelink btn-round" onClick={this.goBack} title="Página Anterior">
                        <span className="btn-label">
                            <i className="icon-arrow-left"></i>
                        </span>
                        Voltar
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(BackButton);