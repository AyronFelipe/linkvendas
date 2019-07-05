import React from 'React';


class BackToTopButton extends React.Component {

    componentDidMount = () => {
        window.scrollTo(0, 0);
        if (window.pageYOffset > 50) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
        $('.back-to-top').tooltip('show');
    }

    backToTop = () => {
        $('.back-to-top').tooltip('hide');
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
    }

    render(){
        return(
            <button className="btn btn-nortelink btn-lg back-to-top" title="Retornar para o topo da página" role="button" data-toggle="tooltip" data-placement="left" onClick={this.backToTop}>
                <i className="icon-arrow-up"></i>
            </button>
        );
    }
}

export default BackToTopButton;