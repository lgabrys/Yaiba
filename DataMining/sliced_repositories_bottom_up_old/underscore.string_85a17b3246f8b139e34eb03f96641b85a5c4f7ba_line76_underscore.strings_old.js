(function(){
    var root = this;
    root._s = {
        endsWith: function(str, ends){
            return str.length >= ends.length && str.substring(ends.length) === ends;
        },
    }
}());
