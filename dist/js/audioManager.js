(function ($, root) {
    var $scope = $(document.body);

    function audioManager() {
        this.audio = new Audio();
        this.status = 'pause';
        this.bindEvent();
    };
    audioManager.prototype = {
        play: function () {
            this.audio.play();
            $scope.find('.song-img img').css('animation-play-state', 'running');
            this.status = 'play';
        },
        pause: function () {
            this.audio.pause();
            $scope.find('.song-img img').css('animation-play-state', 'paused');
            this.status = 'pause';
        },
        setAudioSource: function (src) {
            this.audio.src = src;
            this.audio.load();
        },
        playing: function () {
            var id_num = parseInt(this.audio.currentTime);

            if ($("#lyric-" + id_num).length > 0) {
                var $obj = $("#lyric-" + id_num);
                var top = $obj.position().top
                $obj.addClass('active');
                $scope.find('.song-lyric').css({
                    'top': parseInt($('.lyric').css('height')) / 2 - $obj.position().top - 15 + 'px',
                });
                $obj.siblings().removeClass('active')
            }
        },
        
        bindEvent: function () {
            
            $(this.audio).on('ended', function () {
                $scope.find('.next-btn').trigger('click')
            })
        },
        jumpToplay: function (time) {
            this.audio.currentTime = time;
            this.audio.play();
            this.status = 'play'
        }
        
    };
    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}))