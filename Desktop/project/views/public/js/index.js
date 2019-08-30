$('.year').hover(function(e) {
    $('.year').css({ "transform": "translateX(-15px)", "transition": "0.4s" })
}, function(e) {
    $('.year').css({ "transform": "translateX(0)", "transition": "0.6s" })
})
var correct = 0
setInterval(
    function() {

        correct++
        correct %= 4
        $('.stepRight img').removeClass('active')
        $('.stepRight img').eq(correct).addClass('active')
            // console.log($('.stepRight img'))
    }, 4000)
var current = 0
var currents = 0
var arr = ['https://static.jx3.xoyo.com/gfsj/20181201/2plxj.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/3light.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/4beach.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/5whhh.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/6jzz.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/1night.mp4']



// clearInterval(timer)
// var index = $(".vid_two_tits div").index($(this));
// $('.vid_two_tits div').removeClass('act')
// $(this).addClass('act')

var timer = setInterval(function() {
    $(".video-box").fadeOut('fast') //第一次视频结束进入定时器，给包裹着video的父盒子淡出效果。
    $(".video-box video").empty('source') //清除video下的source标签
    current %= 6 //保证current的值为0-5;

    var src = arr[current]

    current++
    currents++
    currents %= 6
    sourceDom = $("<source src=\"" + src + "\">"); //获取动态src添加到 source标签内
    $(".video-box video").append(sourceDom) //将sourceDom插入到video
    $(".video-box video")[0].load(); //让video重新加载
    // $(".video-box").show();
    // 自动播放
    $(".video-box video")[0].play()
    $(".video-box").fadeIn('slow') //让下一个视频有淡入效果
    $('.vid_two_tits div').removeClass('act')
    $('.vid_two_tits div').eq(currents).addClass('act')

}, 5300);
// =====================14大门派=========================
var curren = 0
var timer = setInterval(function() {

    curren++
    curren %= 14
    $('.menpai_pro').removeClass('act_menpai')
    $('.menpai_pro').eq(curren).addClass('act_menpai')
    $('.menpai_con .tit div').removeClass()
    $('.menpai_con .tit div').eq(curren).addClass('act')
    $('.menpai_pro').eq(curren).fadeOut('fast')
    $('.menpai_pro').eq(curren).fadeIn('slow')



}, 5500);