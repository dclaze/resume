window.onload = function() {
    var videoTags = document.getElementsByTagName('video');
    for (var i = 0; i < videoTags.length; i++) {
        var videoTag = videoTags[i];
        videoTag.addEventListener("mouseover", function(e) {
            e.target.play();
        })
        videoTag.addEventListener("mouseout", function(e) {
            e.target.pause();
        })

        videoTag.currentTime = 166; //Asbury Agile Starting Time
    }


};
