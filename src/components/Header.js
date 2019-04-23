import React from 'react';
import { logout } from '../auth';

export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {toggle_topbar: false, topbar_open: 1, toggle_sidebar: false, nav_open: 1, minimize_sidebar: false, mini_sidebar: 1};
    }

    toggleSidebar = () => {
        let toggle = $('.sidenav-toggler');

        if (this.state.nav_open == 1) {
            $('html').removeClass('nav_open');
            toggle.removeClass('toggled');
            this.setState({nav_open: 0});
        } else {
            $('html').addClass('nav_open');
            toggle.addClass('toggled');
            this.setState({ nav_open: 1 });
        }
        this.setState({toggle_sidebar: true});
    }

    toggleTopBar = () => {
        let topbar = $('.topbar-toggler');

        if (this.state.topbar_open == 1) {
            $('html').removeClass('topbar_open');
            topbar.removeClass('toggled');
            this.setState({ topbar_open: 0});
        } else {
            $('html').addClass('topbar_open');
            topbar.addClass('toggled');
            this.setState({ topbar_open: 1});
        }
        this.setState({ toggle_topbar: true});
    }

    minimizeSidebar = () => {
        let minibutton = $('.toggle-sidebar');

        if ($('.wrapper').hasClass('sidebar_minimize')) {
            this.setState({mini_sidebar: 0});
            minibutton.addClass('toggled');
            minibutton.html('<i class="icon-options-vertical"></i>');
        }

        if (this.state.mini_sidebar == 1) {
            $('.wrapper').removeClass('sidebar_minimize');
            minibutton.removeClass('toggled');
            minibutton.html('<i class="icon-menu"></i>');
            this.setState({mini_sidebar: 0});
        } else {
            $('.wrapper').addClass('sidebar_minimize');
            minibutton.addClass('toggled');
            minibutton.html('<i class="icon-options-vertical"></i>');
            this.setState({mini_sidebar: 1});
        }
        $(window).resize();
        this.setState({minimize_sidebar: true});
    }

    logout = () => {
        logout();
        window.location.href = '/login/';
    }

    componentDidMount(){
        this.toggleSidebar();
        this.toggleTopBar();
        this.minimizeSidebar();
    }

    render(){
        return(
            <header className="main-header">
                <div className="logo-header" data-background-color="nortelink">
                    <a href="#" className="logo">
                        <img src="/static/images/logobranco.png" style={{ height: '35px', width: '108px' }} alt="navbar brand" className="navbar-brand" />
                    </a>
                    <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleSidebar}>
                        <span className="navbar-toggler-icon">
                            <i className="icon-menu"></i>
                        </span>
                    </button>
                    <button className="topbar-toggler more" onClick={this.toggleTopBar}>
                        <i className="icon-options-vertical"></i>
                    </button>
                    <div className="nav-toggle">
                        <button className="btn btn-toggle toggle-sidebar" onClick={this.minimizeSidebar}>
                            <i className="icon-menu"></i>
                        </button>
                    </div>
                </div>
                <nav className="navbar navbar-header navbar-expand-lg" data-background-color="nortelink">
                    <div className="container-fluid">
                        <ul className="navbar-nav topbar-nav ml-md-auto align-items-center">
                            <li className="nav-item">
                                <button type="button" className="btn btn-round btn-nortelink" onClick={this.logout}><i className="icon-logout mr-2"></i> Sair</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}