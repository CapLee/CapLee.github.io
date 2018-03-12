(function ($, root) {
    var $scope = $(document.body);
    function renderInfo(info) {

        var lyric = new root.lyricControl();
        var html = '<div class="song-name">' + info.song + '</div >\
                    <div class="singer-name">' + info.singer + '</div>\
                    <div class="album-name">' + info.album + '</div>\
                    <div class="bigLyric" >\
                    <div class="lyric">\
                        <div class="song-lyric">' + lyric.renderLyric(info) + '</div>\
                    </div>\
                    </div>';
        $scope.find('.song-info').html(html);
    }
    function renderImg(src) {
        var img = new Image();
        img.onload = function () {
            root.blurImg(img, $scope);
            $scope.find('.song-img img').attr('src', src);
        }
        img.src = src;
    }
    function renderIsLike(isLike) {
        if (isLike) {
            $scope.find('.like-btn').addClass('likes');
        }else {
            $scope.find('.like-btn').removeClass('likes');
        }
    }
    root.render = function (data) {
        renderInfo(data);
        renderImg(data.image);
        renderIsLike(data.isLike);
    }
}(window.Zepto, window.player || (window.player = {})));