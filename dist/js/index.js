var root = window.player;
var $scope = $(document.body);
var songList;
var controlmanager;
var audio = new root.audioManager();
var lyric = new root.lyricControl();
var full = false;
function bindEvent() {
    $scope.on('play:change', function (event, index, flag) {
        audio.setAudioSource(songList[index].music);
        $scope.find('.song-img img').removeClass('turn');
        if (audio.status == 'play' || flag) {
            setTimeout(function () {
                $scope.find('.song-img img').addClass('turn');
            }, 400);
            audio.play();
            root.processor.start();
            
        }
        root.processor.renderAllTime(songList[index].duration);
        root.processor.update(0);
        root.render(songList[index]);

        if (full) {
            $scope.find('.lyric').addClass('big');
            $scope.find('.song-info').addClass('bottom')
        }

    });
    $scope.on('click', '.prev-btn', function () {
        var index = controlmanager.prev();
        root.render(songList[index]);
        $scope.trigger('play:change', index);

    });
    $scope.on('click', '.next-btn', function () {
        var index = controlmanager.next();
        root.render(songList[index]);
        $scope.trigger('play:change', index);
    });
    $scope.on('click', '.play-btn', function () {
        if (audio.status == 'play') {
            audio.pause();
            root.processor.stop();
            audio.status = 'pause';
        } else {
            $scope.find('.song-img img').addClass('turn');
            root.processor.start();
            audio.play();
            audio.status = 'play';
        }
        $(this).toggleClass('playing');
    });
    $scope.on('click', '.list-btn', function () {
        root.playList.show(controlmanager);
    });
    $scope.on('click', '.song-lyric', function () {
        lyric.lyricClick();
        audio.playing();
        full = !full;
        // console.log(full)
    })
    $(audio.audio).on('timeupdate', function () {
        audio.playing();
    });


};

function bindTouch() {
    var $sliderPoint = $scope.find('.slider-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on('touchstart', function () {
        root.processor.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        }
        root.processor.update(percent)
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        if (percent > 1 || percent < 0) {
            percent = 0;
        };
        var curDuration = songList[controlmanager.index].duration;
        var curTime = curDuration * percent;
        audio.jumpToplay(curTime);
        $scope.find('.play-btn').addClass('playing');
        root.processor.start(percent);
    })
}
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            
            controlmanager = new root.controlManager(data.length);
            bindEvent();
            bindTouch();
            songList = data;
            root.render(data[0]);
            root.playList.renderList(data)
            $scope.trigger('play:change', 0);

        },
        error: function () {
            console.log('error')
        }
    })
}
getData('../mock/data.json');