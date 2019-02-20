var root = window.player;
// var nowIndex = 0;
var dataList;
var len;
var audio = root.audioManager;
var control;
var timer;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            len = data.length;
            control = new root.controlIndex(len);
            dataList = data;
            // root.render(data[0]);
            // root.pro.renderAllTime(data[0].duration);

            // audio.getAudio(data[0].audio);
            bindEvent();
            bindTouch();
            root.playList.renderList(data);

            $('body').trigger('play:change', 0)

        },
        error: function () {
            console.log("error")
        }
    })
}

function bindEvent() {
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }

        $('.img-box').attr('data-deg', 0)
        $('.img-box').css({
            'transform': 'rotateZ( 0deg)',
            'transition': 'none'
        })
    })
    // 点击按钮
    // 音频的播放与暂停 切歌
    $('.prev').on('click', function () {
        // if (nowIndex == 0) {
        //     nowIndex = len - 1;
        // } else {
        //     nowIndex--;
        // }

        var i = control.prev();

        $('body').trigger('play:change', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }

    })
    $('.next').on('click', function () {
        // if (nowIndex == len - 1) {
        //     nowIndex = 0;
        // } else {
        //     nowIndex++;
        // }
        var i = control.next();
        $('body').trigger('play:change', i);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }

    })
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);

        } else {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
    $('.list').on('click', function () {
        root.playList.show(control);
        console.log(1)

    })
}
// 进度条运动与拖拽
function bindTouch() {
    var bottom = $('.pro-bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    var $spot = $('.spot');
    $spot.on('touchstart', function () {
        root.pro.stop();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            root.pro.update(per);
        }
        // console.log(e)
    }).on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per >= 0 && per <= 1) {
            var time = per * dataList[control.index].duration;
            root.pro.start(per);
            audio.playTo(time)
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing')
        }
    })
}
// 图片旋转
function rotated(deg) {
    clearInterval(timer);
    deg = +deg; //字符串转换成数字
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg)
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transition': 'all 0.5s ease-out'
        })
    }, 200)
}
getData('../mock/data.json');
// 信息+图片渲染到页面上 render

// 列表切歌