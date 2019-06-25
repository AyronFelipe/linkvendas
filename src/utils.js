module.exports = {
    abstractError: function(error){
        let erro = '';
        if (error.response.data.erros) {
            erro = error.response.data.erros;
        } else {
            erro = error.response.data.message
        }
        swal("Erro!", `${erro}`, {
            icon: "error",
            buttons: {
                confirm: {
                    className: 'btn btn-danger'
                }
            },
        })
        .then(() => {
            if (error.response.data.message != undefined && error.response.data.message.includes('Token')) {
                localStorage.token = '';
                window.location.href = '/login/';
            }
        });
    }
}