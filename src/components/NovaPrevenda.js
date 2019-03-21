import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

export default class NovaPrevenda extends React.Component{

    render(){
        return(
            <React.Fragment>
                <Header />
                <SideMenu />
                <div className="main-panel">
                    <div className="content">
                        <div className="panel-header bg-primary-gradient">
                            <div className="page-inner py-5">
                                <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
                                    <div>
                                        <h2 className="text-white pb-2 fw-bold">Cadastro de Pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">Nesta seção você pode cadastrar pré-vendas</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="card-title">Fomulário de Cadastro</div>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <input type="text" name="id_venda" id="id_venda" className="form-control input-border-bottom" required />
                                                            <label htmlFor="id_venda" className="placeholder">ID da Venda Temporária <span className="text-danger">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <input type="text" name="id_cliente" id="id_cliente" className="form-control input-border-bottom" required />
                                                            <label htmlFor="id_cliente" className="placeholder">Código do Cliente <span className="text-danger">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <input type="text" name="id_tab_preco" id="id_tab_preco" className="form-control input-border-bottom" required />
                                                            <label htmlFor="id_tab_preco" className="placeholder">ID da Tabela de Preço <span className="text-danger">*</span></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <input type="text" name="id_plano_pag" id="id_plano_pag" className="form-control input-border-bottom" required />
                                                            <label htmlFor="id_plano_pag" className="placeholder">ID do plano de pagamento <span className="text-danger">*</span></label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <input type="text" name="id_pos" id="id_pos" className="form-control input-border-bottom" required />
                                                            <label htmlFor="id_pos" className="placeholder">ID da posição inicial da pré-venda </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group form-floating-label">
                                                            <select name="mod_venda" id="mod_venda" className="form-control input-border-bottom" required>
                                                                <option value="">&nbsp;</option>
                                                                <option value="1">Normal</option>
                                                                <option value="2">Futura</option>
                                                                <option value="9">NFC-e</option>
                                                            </select>
                                                            <label htmlFor="mod_venda" className="placeholder">Modalidade da venda <span className="text-danger">*</span></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button className="btn btn-primary btn-lg btn-block"><i className="fas fa-save"></i> Salvar</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}