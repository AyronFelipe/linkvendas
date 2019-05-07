module.exports = {
    verifyToken: function(message){
        if (message.includes('Token')) {
            localStorage.token = '';
            window.location.href = '/login/';
        }
    }
}