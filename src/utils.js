module.exports = {
    verifyToken: function(message){
        if (message.includes('Token')) {
            localStorage.token = '';
            window.location.href = '/login/';
        }
    },
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
            verifyToken(error.response.data.message);
        });
    }
}