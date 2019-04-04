import React from 'react';
import Header from './Header';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PRIMEIRA_PAGE = 1;

export default class MainInterno extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount(){
        Circles.create({
            id: 'circles-1',
            radius: 45,
            value: 60,
            maxValue: 100,
            width: 7,
            text: 5,
            colors: ['#f1f1f1', '#FF9E27'],
            duration: 400,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            styleWrapper: true,
            styleText: true
        });

        Circles.create({
            id: 'circles-2',
            radius: 45,
            value: 70,
            maxValue: 100,
            width: 7,
            text: 36,
            colors: ['#f1f1f1', '#2BB930'],
            duration: 400,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            styleWrapper: true,
            styleText: true
        });

        Circles.create({
            id: 'circles-3',
            radius: 45,
            value: 40,
            maxValue: 100,
            width: 7,
            text: 12,
            colors: ['#f1f1f1', '#F25961'],
            duration: 400,
            wrpClass: 'circles-wrp',
            textClass: 'circles-text',
            styleWrapper: true,
            styleText: true
        });

        var totalIncomeChart = document.getElementById('totalIncomeChart').getContext('2d');

        var mytotalIncomeChart = new Chart(totalIncomeChart, {
            type: 'bar',
            data: {
                labels: ["S", "M", "T", "W", "T", "F", "S", "S", "M", "T"],
                datasets: [{
                    label: "Total Income",
                    backgroundColor: '#ff9e27',
                    borderColor: 'rgb(23, 125, 255)',
                    data: [6, 4, 9, 5, 4, 6, 4, 3, 8, 10],
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            display: false //this will remove only the label
                        },
                        gridLines: {
                            drawBorder: false,
                            display: false
                        }
                    }],
                    xAxes: [{
                        gridLines: {
                            drawBorder: false,
                            display: false
                        }
                    }]
                },
            }
        });
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
                                        <h2 className="text-white pb-2 fw-bold">Bem-vindo ao Sistema de pré-vendas</h2>
                                        <h5 className="text-white op-7 mb-2">Olá, Ayron Felipe</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="page-inner mt--5">
                            <div className="row mt--2">
                                <div className="col-md-6">
                                    <div className="card full-height">
                                        <div className="card-body">
                                            <div className="card-title">Estatísticas Gerais</div>
                                            <div className="card-category">Informações sobre as estatísticas do sistema</div>
                                            <div className="d-flex flex-wrap justify-content-around pb-2 pt-4">
                                                <div className="px-2 pb-2 pb-md-0 text-center">
                                                    <div id="circles-1"></div>
                                                    <h6 className="fw-bold mt-3 mb-0">Clientes</h6>
                                                </div>
                                                <div className="px-2 pb-2 pb-md-0 text-center">
                                                    <div id="circles-2"></div>
                                                    <h6 className="fw-bold mt-3 mb-0">Vendas</h6>
                                                </div>
                                                <div className="px-2 pb-2 pb-md-0 text-center">
                                                    <div id="circles-3"></div>
                                                    <h6 className="fw-bold mt-3 mb-0">Pré-vendas</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card full-height">
                                        <div className="card-body">
                                            <div className="card-title">Total de entradas</div>
                                            <div className="row py-3">
                                                <div className="col-md-4 d-flex flex-column justify-content-around">
                                                    <div>
                                                        <h6 className="fw-bold text-uppercase text-success op-8">Entrada</h6>
                                                        <h3 className="fw-bold">R$9782,00</h3>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div id="chart-container">
                                                        <canvas id="totalIncomeChart"></canvas>
                                                    </div>
                                                </div>
                                            </div>
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