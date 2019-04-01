module.exports = {

    storageToken: function(token){
        localStorage.token = token; 
        return true;
    },

    isAuthenticated: function(){
        if (localStorage.token != '' && localStorage.token != undefined){
            return true;
        }
        return false;
    },

    logout: function(){
        localStorage.token = '';
    }

}