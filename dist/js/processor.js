(function ($, root) {
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var lastPercent = 0;
    var startTime;
    function formatTime(time) {
        var time = parseInt(time);
        var m = Math.floor(time / 60);
        var s = parseInt(time % 60);
        m = toDouble(m);
        s = toDouble(s);

        function toDouble(num) {
            if (num < 10) {
                num = "0" + num;
            }
            return num;
        }

        return m + ":" + s;

    };

    function renderAlltime(duration) {
        lastPercent = 0;
        curDuration = Math.floor(duration);
        var allTime = formatTime(duration);
        console.log(allTime)
        $scope.find('.all-time').html(allTime);
       
    };
    
    function start(percentage) {
        lastPercent = percentage === undefined ? lastPercent : percentage
        cancelAnimationFrame(frameId)
        startTime = +new Date();
        function frame() {
            var nowTime = +new Date();
            var percent = lastPercent + (nowTime - startTime) / (curDuration * 1000);
            if (percent <= 1) {
                frameId = requestAnimationFrame(frame);
                update(percent)
            }else {
                cancelAnimationFrame(frameId)
            }
            update(percent)
        };
        frame();
    };
    function stop() {
        var stopTime = +new Date();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId)
    }
    function update(percent) {
        var curTime = percent * curDuration;
        curTime = formatTime(curTime);
        $scope.find('.cur-time').html(curTime);
        var percentage = (percent - 1) * 100 + '%';
        $scope.find('.pro-top').css({
            transform: 'translateX(' + percentage + ')'
        })
    }
    root.processor = {
        renderAllTime: renderAlltime,
        start: start,
        stop: stop,
        update: update
    }
})(window.Zepto, window.player || (window.player = {}))