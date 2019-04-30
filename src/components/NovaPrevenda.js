import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

export default class NovaPrevenda extends React.Component{

    constructor(props){
        super(props);
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
                                        <h2 className="text-white pb-2 fw-bold">Cadastro de Pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">>Nesta seção você pode buscar e cadastrar suas pré-vendas</h5>
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
                                                        <div className="form-group">
                                                            <label htmlFor="id_venda" className="placeholder">Código da Venda Temporária <span className="text-danger">*</span></label>
                                                            <input type="text" name="id_venda" id="id_venda" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id_cliente" className="placeholder">Código do Cliente <span className="text-danger">*</span></label>
                                                            <input type="text" name="id_cliente" id="id_cliente" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id_plano_pag" className="placeholder">Código do plano de pagamento <span className="text-danger">*</span></label>
                                                            <input type="text" name="id_plano_pag" id="id_plano_pag" className="form-control" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="id_pos" className="placeholder">Código da posição inicial da pré-venda </label>
                                                            <input type="text" name="id_pos" id="id_pos" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="mod_venda" className="placeholder">Modalidade da venda <span className="text-danger">*</span></label>
                                                            <select name="mod_venda" id="mod_venda" className="form-control" required>
                                                                <option value="">&nbsp;</option>
                                                                <option value="1">Normal</option>
                                                                <option value="2">Futura</option>
                                                                <option value="9">NFC-e</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_itens">Valor total dos produtos <span className="text-danger">*</span></label>
                                                            <input type="text" name="vl_itens" id="vl_itens" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_desconto">Valor do desconto sobre os produtos <span className="text-danger">*</span></label>
                                                            <input type="text" name="vl_desconto" id="vl_desconto" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_acrescimo">Valor do acréscimo sobre os produtos <span className="text-danger">*</span></label>
                                                            <input type="text" name="vl_acrescimo" id="vl_acrescimo" className="form-control" required />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-3">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_total">Valor total da venda <span className="text-danger">*</span></label>
                                                            <input type="text" id="vl_total" name="vl_total" className="form-control" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_entrada">Valor de entrada</label>
                                                            <input type="text" id="vl_entrada" className="form-control" name="vl_entrada" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="parcelas">Quantidade de parcelas de pagamento</label>
                                                            <input type="text" id="parcelas" className="form-control" name="parcelas" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="vl_parcela">Valor da parcela de pagamento</label>
                                                            <input type="text" id="vl_parcela" className="form-control" name="vl_parcela" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="tipo_entrega">Tipo de entrega <span className="text-danger">*</span></label>
                                                            <select name="tipo_entrega" id="tipo_entrega" className="form-control" required>
                                                                <option value="">&nbsp;</option>
                                                                <option value="0">Cliente retira</option>
                                                                <option value="1">Loja entrega</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="data_entrega">Data de entrega dos produtos</label>
                                                            <input type="date" className="form-control" id="data_entrega" name="data_entrega" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id_end_entrega">Código do endereço de entrega do cliente</label>
                                                            <input type="text" className="form-control" id="id_end_entrega" name="id_end_entrega" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id_obra">Código da obra</label>
                                                            <input type="text" className="form-control" id="id_obra" name="id_obra" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-12 col-md-4">
                                                        <div className="form-group">
                                                            <label htmlFor="id_parceiro">Código do parceiro</label>
                                                            <input type="text" className="form-control" id="id_parceiro" name="id_parceiro" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-group">
                                                            <label htmlFor="obs">Observações referentes à venda</label>
                                                            <textarea name="obs" id="obs" cols="30" rows="10" className="form-control"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12 col-md-3 offset-md-9">
                                                        <button className="btn btn-nortelink btn-round btn-lg btn-block"><i className="fas fa-save"></i> Salvar</button>
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