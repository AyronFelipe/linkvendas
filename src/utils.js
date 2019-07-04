module.exports = {
    abstractError: function(error){
        let erro = '';
        if (error.response.data.erros) {
            erro = error.response.data.erros;
        } else {
            erro = error.response.data.message
        }
        swal("Oops!", `${erro}`, {
            icon: "warning",
            buttons: {
                confirm: {
                    className: 'btn btn-warning'
                }
            },
        })
        .then(() => {
            if (error.response.data.message != undefined && error.response.data.message.includes('Token')) {
                localStorage.token = '';
                window.location.href = '/login/';
            }
        });
    },
    fillWithZeros: function(str, qunt){
        if (str != '' && str.length < qunt) {
            let id = str;
            let add = qunt - id.length;
            for (var i = 0; i < add; i++) id = '0' + id;
            return id;
        }
        return str;
    }
}