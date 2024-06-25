function makePredicate(words) {
    if (!Array.isArray(words)) words = words.split(" ");
    words.forEach(function(word) {
    });
}
function all(array, predicate) {
    for (var i = array.length; --i >= 0;)
        if (!predicate(array[i], i))
            return false;
}
