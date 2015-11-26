/**
 * Created by waydrow on 15-11-26.
 * 爱特工作室  Waydrow
 * Mail: waydrow@163.com
 */

/*平行车辆页面*/
$(document).ready(function () {
    /*右上角*/
    $(".right-top-park").hover(function(){
        $(this).children('ul').stop(true,false).fadeIn();
    },function(){
        $(this).children('ul').stop(true,false).delay(300).fadeOut();
    });

    var rightTopSecondList = $(".main-list-park li");   /*右上方主菜单*/
    var rightTopMainContent = ['R','P','R&P','B'];
    var rightTopSecondListLen = rightTopSecondList.length;  /*主菜单长度*/
    var leftBottomPark = $(".left-bottom-park");    /*左下方排行*/
    var rightBottomBtn = $(".right-bottom-park");   /*右下方按钮*/

    /*右下方回归初始状态*/
    function clearRightBottom(){
        for(var i=0; i<rightBottomBtn.length; i++)
            $(rightBottomBtn[i]).addClass('hide');
    }
    /*左下方回归初始状态*/
    function clearLeftBottom(){
        for(var i=0; i<leftBottomPark.length; i++)
            $(leftBottomPark[i]).addClass('hide');
    }
    $(rightTopSecondList).each(function(index,ele){
        $(this).on('click',function(){
            /*主按钮内容变化*/
            $('.main-list-park+p').html(rightTopMainContent[index]);
            /*左下方不显示，右下方显示图标按钮*/
            clearRightBottom();     /*右下方先隐藏全部按钮*/
            clearTimeLineAndState();        /*隐藏右下角时间线*/
            $(rightBottomBtn[index]).removeClass('hide');
            if(index==0||index==2)
                $(rightBottomBtn).toggleClass('right-bottom-time-control');
            clearLeftBottom();      /*左下方按钮先全部隐藏*/
            if(index==1)return;     /*停车场分布左下方无显示*/
            else if(index==0)$(leftBottomPark[0]).removeClass('hide');
            else $(leftBottomPark[index-1]).removeClass('hide');
        });
    });

    /*右下角主按钮*/
    $(rightBottomBtn).hover(function(){
        $(this).children('ul').delay(200).stop(true,false).delay(300).slideDown();
    },function(){
        $(this).children('ul').stop(true,false).delay(300).slideUp();
    });
    $(".right-bottom-parking-lot").hover(function(){
        $(this).children('ul').stop(true,false).animate({width:'toggle'});
    },function(){
        $(this).children('ul').stop(true,false).delay(300).animate({width:'toggle'});
    });

    /************************/
    /*时间线创建开始*/
    /************************/
    var mySlider = [],
        timeLine = $(".time-line li");
    /*获取当前日期前30天*/
    var myDate = new Date(); //获取今天日期
    myDate.setDate(myDate.getDate() - 31);
    var dateArray = [],
        dateTemp,
        flag = 1;
    for (var i = 0; i < 31; i++) {
        dateTemp = myDate.getFullYear() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getDate();
        dateArray.push(dateTemp);
        myDate.setDate(myDate.getDate() + flag);
    }
    /*获取过去24小时*/
    var myTimePast = new Date();
    myTimePast.setTime(myTimePast.getTime() - (24 * 60 * 60 * 1000));
    var timePastArray = [],
        timePastTemp;
    for (var i = 0; i < 25; i++) {
        timePastTemp =
            myTimePast.getMonth() + "-" + myTimePast.getDate() + "-" + myTimePast.getHours() + ":00";
        timePastArray.push(timePastTemp);
        myTimePast.setTime(myTimePast.getTime() + (1 * 60 * 60 * 1000))
    }
    /*获取未来24小时*/
    var myTimeFuture = new Date();
    var timeFutureArray = [],
        timeFutureTemp;
    for (var i = 0; i < 25; i++) {
        timeFutureTemp =
            myTimeFuture.getMonth() + "-" + myTimeFuture.getDate() + "-" + myTimeFuture.getHours() + ":00";
        timeFutureArray.push(timeFutureTemp);
        myTimeFuture.setTime(myTimeFuture.getTime() + (1 * 60 * 60 * 1000));
    }

    for (var i = 0; i < timeLine.length; i++) {
        mySlider[i] = $(timeLine).eq(i).slider();
        mySlider[i].slider({
            'max': 24
        });
        mySlider[0].slider({
            'max': 30
        });
    }
    /*过去30天*/
    mySlider[0].slider({
        formatter: function (value) {
            return dateArray[value];
        }
    });
    mySlider[0].slider('setValue', 0);

    /*过去24小时*/
    mySlider[1].slider({
        formatter: function (value) {
            return timePastArray[value];
        }
    });
    mySlider[1].slider('setValue', 0);

    /*未来24小时*/
    mySlider[2].slider({
        formatter: function (value) {
            return timeFutureArray[value];
        }
    });
    mySlider[2].slider('setValue', 0);

    for (var i = 0; i < $(timeLine).length; i++)
        $(".slider").addClass('hide');
    /************************/
    /*时间线创建结束*/
    /************************/


    /*隐藏时间线和图标*/
    function clearTimeLineAndState(){
        $('.parking-lot-state').addClass('hide');
        for(var i=0; i< $(timeLine).length; i++)
            $(timeLine[i]).prev().addClass('hide');
    }
    /*停车需求分析和需求消化比二级菜单*/
    var statusNow = $(".right-bottom-time-control li");
    $(statusNow).each(function(index,ele){
        $(this).on('click',function(){
            $(this).parent('ul').next('p').html($(this).html());
            /*弹出实时状态*/
            if(index>=4)index-=4;
            if(index == 0) {
                clearTimeLineAndState();
                $(".progress-btn").click();
            }
            else {
                for(var i=0; i< $(timeLine).length; i++){
                    if(i==index-1)continue;
                    $(timeLine[i]).prev('div').addClass("hide");
                }
                $(timeLine[index-1]).prev('div').toggleClass('hide');
            }
        });
    });

    /*停车场分布*/
    var parkingLot = $('.right-bottom-parking-lot li');
    $(parkingLot).each(function(index){
        $(this).on('click',function(){
            if(index==0)$('.parking-lot-state').addClass('hide');
            else $('.parking-lot-state').removeClass('hide');
        })
    });
    /*模拟建设*/


    /*左下角列表*/
    $(".progress-btn").on("click",function(){
        $(this).toggleClass("progress-btn-on");
        var progressBtnSpan = $(this).children('span');
        for(var i=0; i<progressBtnSpan.length; i++)
            $(progressBtnSpan[i]).toggleClass('hide');
        if($(this).hasClass("progress-btn-on")){
            $(this).children('i').removeClass("icon-plus").addClass("icon-minus");
        } else {
            $(this).children('i').removeClass("icon-minus").addClass("icon-plus");
        }
        $(this).next("ul").stop(true,false).slideToggle();
    });



});
