var dataList,len,control,timer,root=window.player,audio=root.audioManager;function getData(t){$.ajax({type:"GET",url:t,success:function(t){len=t.length,control=new root.controlIndex(len),dataList=t,bindEvent(),bindTouch(),root.playList.renderList(t),$("body").trigger("play:change",0)},error:function(){}})}function bindEvent(){$("body").on("play:change",function(t,o){audio.getAudio(dataList[o].audio),root.render(dataList[o]),root.pro.renderAllTime(dataList[o].duration),"play"==audio.status&&(audio.play(),rotated(0)),$(".img-box").attr("data-deg",0),$(".img-box").css({transform:"rotateZ( 0deg)",transition:"none"})}),$(".prev").on("click",function(){var t=control.prev();$("body").trigger("play:change",t),root.pro.start(0),"pause"==audio.status&&root.pro.stop()}),$(".next").on("click",function(){var t=control.next();$("body").trigger("play:change",t),root.pro.start(0),"pause"==audio.status&&root.pro.stop()}),$(".play").on("click",function(){"pause"==audio.status?(audio.play(),root.pro.start(),rotated($(".img-box").attr("data-deg"))):(audio.pause(),root.pro.stop(),clearInterval(timer));$(".play").toggleClass("playing")}),$(".list").on("click",function(){root.playList.show(control)})}function bindTouch(){var t=$(".pro-bottom").offset(),r=t.left,n=t.width;$(".spot").on("touchstart",function(){root.pro.stop()}).on("touchmove",function(t){var o=(t.changedTouches[0].clientX-r)/n;0<=o&&o<=1&&root.pro.update(o)}).on("touchend",function(t){var o=(t.changedTouches[0].clientX-r)/n;if(0<=o&&o<=1){var a=o*dataList[control.index].duration;root.pro.start(o),audio.playTo(a),audio.play(),audio.status="play",$(".play").addClass("playing")}})}function rotated(t){clearInterval(timer),t=+t,timer=setInterval(function(){t+=2,$(".img-box").attr("data-deg",t),$(".img-box").css({transform:"rotateZ("+t+"deg)",transition:"all 0.5s ease-out"})},200)}getData("../mock/data.json");