import React from 'react';

export default class Header extends React.Component{

    constructor(props){
        super(props);
        this.state = {toggle_topbar: false, topbar_open: 1};
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
        let minimize_sidebar = false;
        let mini_sidebar = 0;
    
        if (!minimize_sidebar) {
            let minibutton = $('.toggle-sidebar');
            if ($('.wrapper').hasClass('sidebar_minimize')) {
                mini_sidebar = 1;
                minibutton.addClass('toggled');
                minibutton.html('<i class="icon-options-vertical"></i>');
            }
    
            minibutton.on('click', function () {
                if (mini_sidebar == 1) {
                    $('.wrapper').removeClass('sidebar_minimize');
                    minibutton.removeClass('toggled');
                    minibutton.html('<i class="icon-menu"></i>');
                    mini_sidebar = 0;
                } else {
                    $('.wrapper').addClass('sidebar_minimize');
                    minibutton.addClass('toggled');
                    minibutton.html('<i class="icon-options-vertical"></i>');
                    mini_sidebar = 1;
                }
                $(window).resize();
            });
            minimize_sidebar = true;
        }
    }

    componentDidMount(){
        this.toggleTopBar();
        this.minimizeSidebar();
    }

    render(){
        return(
            <header className="main-header">
                <div className="logo-header" data-background-color="nortelink">
                    <a href="#" className="logo">
                        <img src="../../assets/images/logobranco.png" style={{ height: '35px', width: '108px' }} alt="navbar brand" className="navbar-brand" />
                    </a>
                    <button className="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
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
                                <a href="#" className="nav-link">
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}