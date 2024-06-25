function string_template(text, props) {
    return text.replace(/\{(.+?)\}/g, function(str, p){
        return props && props[p];
    });
};
