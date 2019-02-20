(function ($, root) {
    var duration, frameId, startTime, lastPer = 0;

    function renderAllTime(allTime) {
        duration = allTime;
        console.log(allTime);
        var time = formatTime(allTime);
        $('.all-time').html(time)
    }
    // 转换时间格式
    function formatTime(t) {
        t = Math.round(t)
        var m = Math.floor(t / 60);
        var s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ":" + s
    }
    //进度条开始运动
    function start(p) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        lastPer = p == undefined ? 0 : p;

        function frame() {
            var curTime = new Date().getTime();
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            if (per <= 1) {
                //更新进度条
                update(per);
            } else {
                cancelAnimationFrame(frameId)
            }
            frameId = requestAnimationFrame(frame);
        }
        frame();
    }

    function update(per) {
        var time = formatTime(per * duration);
        $('.cur-time').html(time);
        var x = (per - 1) * 100;
        $('.pro-top').css({
            transform: 'translateX(' + x + '%)'
        })

    }

    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }

})(window.Zepto, window.player || (window.player = {}))