(function ($, root) {
    function lyricControl(info) {
        // this.status = false;
    }
    lyricControl.prototype = {
        renderLyric: function (info) {
            var lyric = info.lyric;
            var temp = lyric.split('[');
            var html = '';
            for (var i = 0; i < temp.length; i++) {
                var arr = temp[i].split(']');
                var text = (arr[1]);
                var time = arr[0].split(' ');
                var temp_time = time[0].split('.');
                var ms = temp_time[1]; //毫秒
                var temp_times = temp_time[0].split(':');
                var s = temp_times[1]; //秒
                var m = temp_times[0]; //分
                var total = parseInt(m * 60) + parseInt(s);
                if (text) {
                    html += '<p id="lyric-' + total + '">' + text + '</p>';
                }
            }
            return html;
        },
        lyricClick: function () {
            $scope .find('.lyric').toggleClass('big');
            $scope.find('.song-info').toggleClass('bottom')
        }
    }

    root.lyricControl = lyricControl;
})(window.Zepto, window.player || (window.player = {}))