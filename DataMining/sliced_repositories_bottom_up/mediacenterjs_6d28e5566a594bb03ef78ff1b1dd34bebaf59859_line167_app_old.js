function playMovie(data, $http){
    var orginalName = data;
    var platform = 'desktop';
    if (navigator.userAgent.match(/Android/i)) {
        platform = 'android';
    } else if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        platform = 'ios';
    }
    $http.get('/movies/'+orginalName+'/play/'+platform).success(function(data) {
        var fileName                =  orginalName
            , outputFile            =   fileName.replace(/ /g, "-")
            , extentionlessFile     =   outputFile.replace(/\.[^/.]+$/, "")
    });
}
