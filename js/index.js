/*
 * 爱特工作室  Waydrow
 * Mail: waydrow@163.com
 */

var $docWidth = $(document).width();
var isReady = false; //旋转地球动画是否加载完成


$(document).ready(function(){
    /*左侧中间文字滚动*/
    $(".left-mid").myScroll({
        speed:40,
        rowHeight:$(".left-mid li").height()
    });
    /*左侧下方文字滚动*/
    $(".left-bottom-scroll").myScroll({
        speed:40,
        rowHeight:$(".left-bottom-scroll li").height()
    });
    /*中间部分文字滚动*/
    $(".car-bottom-text").myScroll({
       speed: 40,
        rowHeight: $(".car-bottom-text li").height()
    });
});
/*文字滚动*/
(function ($) {
    $.fn.myScroll = function (options) {
        //默认配置
        var defaults = {
            speed: 40,  //滚动速度,值越大速度越慢
            rowHeight: 24 //每行的高度
        };

        var opts = $.extend({}, defaults, options), intId = [];

        function marquee(obj, step) {

            obj.find("ul").animate({
                marginTop: '-=1'
            }, 0, function () {
                var s = Math.abs(parseInt($(this).css("margin-top")));
                if (s >= step) {
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                }
            });
        }

        this.each(function (i) {
            var sh = opts["rowHeight"], speed = opts["speed"], _this = $(this);
            intId[i] = setInterval(function () {
                if (_this.find("ul").height() <= _this.height()) {
                    clearInterval(intId[i]);
                } else {
                    marquee(_this, sh);
                }
            }, speed);

            _this.hover(function () {
                clearInterval(intId[i]);
            }, function () {
                intId[i] = setInterval(function () {
                    if (_this.find("ul").height() <= _this.height()) {
                        clearInterval(intId[i]);
                    } else {
                        marquee(_this, sh);
                    }
                }, speed);
            });

        });

    }

})(jQuery);