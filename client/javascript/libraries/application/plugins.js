String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.deCapitalize = function() {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.replaceAll = function(search, replace){
    return this.split(search).join(replace);
}