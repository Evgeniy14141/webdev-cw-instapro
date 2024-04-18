String.prototype.sterilize = function () {
    return this
        .replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('/', '&sol;')
}