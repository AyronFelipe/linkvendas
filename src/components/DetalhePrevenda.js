import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import axios from 'axios';
import { verifyToken } from '../utils';


export default class DetalhePrevenda extends React.Component {

    constructor(props) {
        super(props);
        this.state = { prevenda: '', carregaInfo: true }
    }

    getPrevenda = () => {
        let pathname = window.location.pathname;
        let numero = pathname.split('/')[2];
        axios({
            url: `http://api.nortelink.com.br/api/v1/prevendas/${numero}`,
            method: `get`,
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            },
        })
        .then((res) => {
            this.setState({ prevenda: res.data, carregaInfo: false });
        })
        .catch((error) => {
            swal("Erro!", `${error.response.data.message}`, {
                icon: "error",
                buttons: {
                    confirm: {
                        className: 'btn btn-danger'
                    }
                },
            })
            .then(() => {
                verifyToken(error.response.data.message);
            });
        });
    }

    componentDidMount = () => {
        this.getPrevenda();
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <SideMenu />
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-nortelink">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Detalhes da Pré-venda</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row justify-content-center">
                                {
                                    this.state.carregaInfo ?
                                        <div className="loader loader-lg"></div>
                                    :
                                        <div className="col-12 col-lg-10 col-xl-9">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="card card-invoice">
                                                        <div className="card-header"></div>
                                                        <div className="card-body"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}