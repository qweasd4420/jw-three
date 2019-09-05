$('.year').hover(function(e) {
    $('.year').css({ "transform": "translateX(-15px)", "transition": "0.4s" })
}, function(e) {
    $('.year').css({ "transform": "translateX(0)", "transition": "0.6s" })
})
var correct = 0
var titit = setInterval(
    function() {

        correct++
        correct %= 4
        $('.stepRight img').removeClass('active')
        $('.stepRight img').eq(correct).addClass('active')
            // console.log($('.stepRight img'))
    }, 4000)

var currents = 0
var arr = ['https://static.jx3.xoyo.com/gfsj/20181201/1night.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/2plxj.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/3light.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/4beach.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/5whhh.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/6jzz.mp4']


var play = true;
var index1;
var timer
    // clearInterval(timer)
    // var index = $(".vid_two_tits div").index($(this));
    // $('.vid_two_tits div').removeClass('act')
    // $(this).addClass('act')
function next_one() {
    timer = setInterval(function() {
        $(".video-box").fadeOut('fast') //第一次视频结束进入定时器，给包裹着video的父盒子淡出效果。
        $(".video-box video").empty('source') //清除video下的source标签

        currents++
        currents %= 6
        var src = arr[currents]


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
}

function aplay() {
    if (play) {
        next_one()
    }
}

$('.vid_two_tits div').click(function(e) {
    clearInterval(timer)
    index1 = $(".vid_two_tits div").index($(this)); //将点击事件里的this

    // $('.menpai_pro').eq(index).fadeOut('slow')
    $(".video-box video").empty('source')
    var src = arr[index1]
    sourceDom = $("<source src=\"" + src + "\">"); //获取动态src添加到 source标签内
    $(".video-box video").append(sourceDom) //将sourceDom插入到video
    $(".video-box video")[0].load(); //让video重新加载
    // $(".video-box").show();
    // 自动播放
    $(".video-box video")[0].play()

    $('.vid_two_tits div').removeClass('act')
    $(this).addClass('act')
    $('.menpai_pro').removeClass('act_menpai')
    $('.menpai_pro').eq(index).addClass('act_menpai')

    currents = index1;
    next_one()
})
aplay()
    // =====================14大门派=========================
var curren = 0



var index;
var timer1

// var timer1 = setInterval(function() {
//     curren++
//     curren %= 14
//     $('.menpai_pro').removeClass('act_menpai')
//     $('.menpai_pro').eq(curren).addClass('act_menpai')
//     $('.menpai_con .tit div').removeClass()
//     $('.menpai_con .tit div').eq(curren).addClass('act')
//     $('.menpai_pro').eq(index).fadeOut('fast')
//     $('.menpai_pro').eq(curren).fadeOut('fast')

//     $('.menpai_pro').eq(curren).fadeIn('fast')
// }, 5500);

function next() {
    timer1 = setInterval(function() {
        curren++
        curren %= 14
        $('.menpai_pro').removeClass('act_menpai')
        $('.menpai_pro').eq(curren).addClass('act_menpai')
        $('.menpai_con .tit div').removeClass()
        $('.menpai_con .tit div').eq(curren).addClass('act')

        $('.menpai_pro').eq(index).fadeOut('fast')
        index = curren
        $('.menpai_pro').eq(curren).fadeOut('fast')

        $('.menpai_pro').eq(curren).fadeIn('fast')
    }, 5500);
}
// next()
var auto = true

function autoplay() {
    if (auto) {
        clearInterval(timer1)
        next()
    }
}
autoplay()
$('.menpai_con .tit div').click(function(e) {
        clearInterval(timer1)

        index = $(".menpai_con .tit div").index($(this));
        $('.menpai_pro').eq(curren).fadeOut('fast')
        $('.menpai_pro').eq(index).fadeIn('slow')
            // $('.menpai_pro').stop()

        $('.menpai_con .tit div').removeClass('act')
        $(this).addClass('act')
            // $('.menpai_pro').removeClass('act_menpai')
            // $('.menpai_pro').eq(index).addClass('act_menpai')

        curren = index;
        next()
    })
    // ==============旋转===============


// var rotation2 = function() {
//     $('#menpai2 .rot').rotate({
//         angle: 0,
//         animateTo: 360,
//         callback: rotation2,
//         easing: function(x, t, b, c, d) {
//             return c * (t / d) + b;
//         }
//     });
// }
// rotation2();
var angle = 0;
setInterval(function() {
    angle += 3;
    $('#menpai2 .rot').rotate(angle);
}, 50);
// cebian
 
$(window).scroll(function() {
        var s = $(window).scrollTop()
        console.log(s)
        console.log($(window).height())
        if (s >= 0) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb1').addClass('act')
        }
        if (s >= 912) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb2').addClass('act')
        }
        if (s >= 1824) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb3').addClass('act')
        }
        if (s >= 2274) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb4').addClass('act')
        }
        if (s >= 3479) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb5').addClass('act')
        }
        if (s >= 4477) {
            $('.cb').removeClass('act')
            console.log('haha')
            $('.cb6').addClass('act')
        }
    })
    // var err = ['https://static.jx3.xoyo.com/HD_mingjiao.mp4', 'https://static.jx3.xoyo.com/HD_gaibang.mp4', 'https://static.jx3.xoyo.com/HD_tiance.mp4', 'https://static.jx3.xoyo.com/HD_badao.mp4', 'https://static.jx3.xoyo.com/HD_chunyang.mp4', 'https://static.jx3.xoyo.com/HD_qixiu.mp4', 'https://static.jx3.xoyo.com/gfsj/20181201/pl856.mp4', 'https://static.jx3.xoyo.com/HD_tangmen.mp4', 'https://static.jx3.xoyo.com/HD_cangjian.mp4', 'https://static.jx3.xoyo.com/HD_wanhua.mp4', 'https://static.jx3.xoyo.com/HD_changge.mp4', 'https://static.jx3.xoyo.com/video/20181226/HD_cangyun.mp4', 'https://static.jx3.xoyo.com/HD_shaolin.mp4', 'https://static.jx3.xoyo.com/HD_wudu.mp4']

$('.play_v').click(() => {
        $.ajax({
            url: '/video'
        }).then(res => {
            console.log(res.msg)
            $(".videol video").empty('source')
            $('body').css({ 'width': '100%', 'height': '100%', 'overflow': 'hidden' })
                // var src = err[curren]
            var src = res.msg[curren].video
            sourceDom = $("<source src=\"" + src + "\">");
            $(".videol video").append(sourceDom)
            $(".videol video")[0].load()
            $('.videol').css('display', 'block')
            $('.videol video').focus()
            $('.videol video').blur(function() {
                $('body').css({ 'width': '100%', 'height': '100%', 'overflow': 'visible' })
                $('.videol').css('display', 'none')
                $('.videol video').trigger('pause')
            })
        })
    })
    //     $(".videol video").empty('source')
    //     $('body').css({ 'width': '100%', 'height': '100%', 'overflow': 'hidden' })
    //     var src = err[curren]
    //     sourceDom = $("<source src=\"" + src + "\">");
    //     $(".videol video").append(sourceDom)
    //     $(".videol video")[0].load()
    //     $('.videol').css('display', 'block')
    //     $('.videol video').focus()
    //     $('.videol video').blur(function() {
    //         $('body').css({ 'width': '100%', 'height': '100%', 'overflow': 'visible' })
    //         $('.videol').css('display', 'none')
    //         $('.videol video').trigger('pause')
    //     })
    // })
    // login

$('.headRight ul li:first-child a').click(function(e) {
    e.preventDefault()
    $('.login').addClass('asd')
})
$('.login .tit .btn').click(function() {
        $('.login').removeClass('asd')
    })
    // $.ajax({
    //     url: '/index2'
    // }).then(res => {
    //     if (res.code == 200) {
    //         location = '/index2'

//     }
// })
window.addEventListener('load', function() {
    $.ajax({
        url: '/logstage',

    }).then(res => {
        console.log((res.msg)[0])
            // var user = (res.msg)[0].data
        var { data } = (res.msg)[0]
        this.console.log(data)
        var obj = JSON.parse(data)
        this.console.log(obj)
        var username = obj.user.username
        $('.login').removeClass('asd')
        $('.headRight li:first-child').css('visibility', 'hidden')
        $('.headRight .loginC').addClass('act')

        $('.headRight .loginC span:first-child').text(username)


    })
})
$('.headRight .loginC span:last-child').click(function() {
    $.ajax({
        url: '/logout'
    }).then(res => {
        if (res.code == 200) {
            console.log('asdf')
            $('.headRight li:first-child').css('visibility', 'visible')
            $('.headRight .loginC').removeClass('act')

        }
    })


})

$('.login form').submit(function(e) {
    e.preventDefault()
    var $this = $(this)
    $.ajax({
        url: '/login',
        type: 'post',
        data: $this.serialize(),
        dataType: 'json'
    }).then(res => {
        alert(res.msg)
        if (res.code == 200) {

            $(document).ready(function() {
                $('.login').removeClass('asd')
                $('.headRight li:first-child').css('visibility', 'hidden')
                $('.headRight .loginC').addClass('act')
                var id = $('.login .username input').val()
                $('.headRight .loginC span:first-child').text(id)




            })
        }
    })
});
// $('.login form').submit(function(e) {
//         e.preventDefault()
//         var $this = $(this)
//         $.ajax({
//             url: '/login',
//             type: 'post',
//             data: $this.serialize(),
//             dataType: 'json'
//         }).then(res => {
//             alert(res.msg)
//             if (res.code == 200) {
//                 console.log()

//                 $('.login').removeClass('asd')
//                 $('.headRight li:first-child').css('visibility', 'hidden')
//                 $('.headRight .loginC').addClass('act')
//                 var id = $('.login .username input').val()
//                 $('.headRight .loginC span:first-child').text(id)





//             }
//         })
//     })
// register
$('.login .username i').click(function(e) {
    e.preventDefault()
    $('.login').removeClass('asd')
    $('.register').addClass('asd')
})

$('.register .tit .btn').click(function() {
        $('.register').removeClass('asd')
    })
    //ajax

$('.register form').submit(function(e) {
    e.preventDefault()
    var $this = $(this)
    if ($('.register input[name=check]').get(0).checked) {
        $.ajax({
            url: '/register',
            type: 'post',
            data: $this.serialize(),
            dataType: 'json'
        }).then(res => {
            alert(res.msg)
            if (res.code == 200) {
                $('.register').removeClass('asd')
                $('.login').addClass('asd')


            }
        })
    } else {
        alert('请阅读协议')
    }
})