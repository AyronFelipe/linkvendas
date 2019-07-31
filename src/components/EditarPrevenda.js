import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';

export default class EditarPrevenda extends React.Component{

    constructor(props){
        super(props);
        this.state = { prevenda: [], carregaInfo: true };
    }

    getPrevenda = () => {
        let pathname = window.location.pathname;
        let lol = decodeURI(pathname.split('/')[2]);
        let prevenda_id = lol.replace(/ /g, "");

        axios({
            url: `http://api.nortelink.com.br/api/v1/prevendas/${prevenda_id}`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then((res) => {
            this.setState({ prevenda: res.data, carregaInfo: false });
        })
        .catch((error) => {
            abstractError(error);
        });
    }

    componentDidMount = () => {
        this.getPrevenda();
    }

    render(){
        return(
            <React.Fragment>
                <Header/>
                <SideMenu/>
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-nortelink">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Edição de Pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode editar pré-vendas</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-12"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}