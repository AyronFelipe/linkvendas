module.exports = {
    verifyToken: function(message){
        if (message.includes('Token')) {
            window.location.href = '/login/';
        }
    }
}