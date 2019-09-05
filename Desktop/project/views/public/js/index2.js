// nav
$('.nav_con li').hover(function() {
    var index = $(".nav_con li").index($(this));
    $(".nav_con li:eq(" + index + ") .bottom ").show(500)
}, function() {
    $('.nav_con li .bottom').hide()
})
$('.nav_pro_ml2 .bottom a').eq(3).hover(function() {

    $('.nav_pro_ml2 .bottom img').show(500)
}, function() {
    $('.nav_pro_ml2 .bottom img').hide()
})
$('.nav_pro_ml2 .bottom a').eq(2).hover(function() {

        $('.nav_pro_ml2 .bottom .ljt').animate({ width: 139, left: '-139px' }, 1000, 'swing')
        $('.nav_pro_ml2 .bottom .ljt').css('color', '#fff')
    }, function() {
        $('.nav_pro_ml2 .bottom .ljt').animate({ width: 0, left: '0' }, 1000, 'swing')
        $('.nav_pro_ml2 .bottom .ljt').css('color', 'transparent')
    })
    // ======================banner=====================
var current = 0
var auto = true;

var timer;
var timer1;

function autonext() {

    timer = setInterval(() => {

        current++
        current %= 9
        if (!(current %= 8)) {
            current = 0
            $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1)
        }

        $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1500, 'swing')



    }, 5000);

    timer1 == setInterval(() => {


        current %= 9
        if (current <= 2) {
            $('.bannerLeft ul').animate({ left: -164 * current + 'px' }, 500, 'linear')
        }
        $('.bannerLeft ul li').removeClass('act')
        $('.bannerLeft ul li').eq(current).addClass('act')


    }, 5100);

}
$('.banner_con .bannerLeft .left_con').hover(function() {
    clearInterval(timer)
    clearInterval(timer1)
    auto = false;
}, function() {
    auto = true;
    autoplay()
})

function autoplay() {
    if (auto) {
        clearInterval(timer)
        clearInterval(timer1)
        autonext()

    }
}

function next() {
    clearInterval(timer)
    clearInterval(timer1)
    current++
    current %= 9
    if (!(current %= 8)) {
        current = 0
        $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1)
    }

    $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1000, 'swing')
    autonext()
    $('.bannerLeft ul li').removeClass('act')
    $('.bannerLeft ul li').eq(current).addClass('act')
}

function prev() {
    clearInterval(timer)
    clearInterval(timer1)
    current--

    if (current == -1) {
        current = 6
        $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1)
    }

    $('.bannerLeft .left_con').animate({ left: -820 * current + 'px' }, 1000, 'swing')
    autonext()
    $('.bannerLeft ul li').removeClass('act')
    $('.bannerLeft ul li').eq(current).addClass('act')
}

// function intNav() {
//     $('.bannerLeft .left_con').mouseenter(function() {
//         auto = false;
//         console.log(auto)
//     })
//     $('.bannerLeft .left_con').mouseleave(function() {
//         auto = true;
//     })
// }
$('.banner_con .rt').click(() => {
    next()
})
$('.banner_con .lt').click(() => {
    prev()
})
autoplay()
    // intNav()
$('.bannerLeft ul li').click(function() {
        var index = $(".bannerLeft ul li").index($(this));
        current = index - 1
        next()

        $('.bannerLeft ul li').removeClass('act')
        $('.bannerLeft ul li').eq(index).addClass('act')

    })
    //点击出现span背景
$('.activeLeft .tit .second li').click(function() {
        var index = $(".activeLeft .tit .second li").index($(this));
        $('.activeLeft .tit .second li').removeClass('act')
        $('.activeLeft .tit .second li').eq(index).addClass('act')
        $('.activeLeft .after_tit').animate({ left: -836 * index })
        $(".activeLeft .tit .second li  span").removeClass('act')
        $(".activeLeft .tit .second li:eq(" + index + ")  span").addClass('act')

    })
    ///////////////////
$(' .activeRight .tit li').click(function() {
        var index = $(".activeRight .tit li").index($(this));
        $('.activeRight .tit li').removeClass('act')
        $('.activeRight .tit li').eq(index).addClass('act')
        $('.activeRight .con ul').css({ 'transform': 'translate(' + -501 * index + 'px)' })
        $(".activeRight .tit li  span").removeClass('act')
        $(".activeRight .tit li:eq(" + index + ") span").addClass('act')

    })
    ////////精彩视频//////////////
$('.live_con .liveLeft .tit .second li').click(function() {
        var index = $(".live_con .liveLeft .tit .second li ").index($(this));
        $('.live_con .liveLeft .tit .second li ').removeClass('act')
        $('.live_con .liveLeft .tit .second li ').eq(index).addClass('act')
        $('.live_con .liveLeft .con .con_all').animate({ left: -836 * index })
        $(".live_con .liveLeft .tit .second li span").removeClass('act')
        $(".live_con .liveLeft .tit .second li:eq(" + index + ") span").addClass('act')

    })
    /////////////周几///////////////
$('.liveRight .tit .second li').click(function() {
        var index = $('.liveRight .tit .second li').index($(this));
        console.log(index)
        $('.liveRight .tit .second li').removeClass('act')
        $('.liveRight .tit .second li').eq(index).addClass('act')
        $('.live_con .liveRight .con .con_all').animate({ left: -500 * index })
        $('.liveRight .tit .second li span').removeClass('act')
        $(".liveRight .tit .second li:eq(" + index + ") span").addClass('act')

    })
    /////////////////同人//////////////
$('#tr .tr_con .tit .second li').click(function() {
        var index = $('#tr .tr_con .tit .second li').index($(this));
        console.log(index)
        $('#tr .tr_con .tit .second li').removeClass('act')
        $('#tr .tr_con .tit .second li').eq(index).addClass('act')
        $('#tr .tr_con .con_all').animate({ left: -1370 * index })
        $('#tr .tr_con .tit .second li span').removeClass('act')
        $("#tr .tr_con .tit .second li:eq(" + index + ") span").addClass('act')

    })
    //////////////////合作////////////////////
$('.peizhi_con .con .con_left .con_tit i').click(function() {
        var index = $('.peizhi_con .con .con_left .con_tit i').index($(this));
        console.log(index)
        $('.peizhi_con .con .con_left .con_tit i').removeClass('act')
        $('.peizhi_con .con .con_left .con_tit i').eq(index).addClass('act')
        $('.peizhi_con .con .con_left .txt .txt_all').animate({ left: -347 * index })
            // $('#tr .tr_con .tit .second li span').removeClass('act')
            // $("#tr .tr_con .tit .second li:eq(" + index + ") span").addClass('act')

    })
    /////////////////////auto自动///////////////////
var csc = 0
setInterval(function() {
        csc++
        if (csc > 7) {
            csc = 1
            $('.peizhi_con .con .con_right .right_con .con_all').animate({ top: -58 * csc }, 1)
        }
        $('.peizhi_con .con .con_right .right_con .con_all').animate({ top: -58 * csc })
    }, 1000)
    /////////////////配置/////////////
$('.peizhiRight .tit .second li').click(function() {
    var index = $('.peizhiRight .tit .second li').index($(this));
    console.log(index)
    $('.peizhiRight .tit .second li').removeClass('act')
    $('.peizhiRight .tit .second li').eq(index).addClass('act')
    $('.peizhi_con .peizhiRight .con .con_all').animate({ left: -500 * index })
    $('.peizhi_con .peizhiRight .con .con_tit').animate({ left: -500 * index })
    $('.peizhiRight .tit .second li span').removeClass('act')
    $(".peizhiRight .tit .second li:eq(" + index + ") span").addClass('act')

})

$('.peizhiRight .con .con_tit1 p').hover(function() {
    var index = $('.peizhiRight .con .con_tit1 p').index($(this));
    $('.peizhiRight .con .con_tit1 p').removeClass('act')
    $('.peizhiRight .con .con_tit1 p').eq(index).addClass('act')
    $('.peizhiRight .con .con_all .con_pro1 ul').removeClass('act')
    $('.peizhiRight .con .con_all .con_pro1 ul').eq(index).addClass('act')


})
$('.peizhiRight .con .con_tit2 p').hover(function() {
    var index = $('.peizhiRight .con .con_tit2 p').index($(this));
    $('.peizhiRight .con .con_tit2 p').removeClass('act')
    $('.peizhiRight .con .con_tit2 p').eq(index).addClass('act')
    $('.peizhiRight .con .con_all .con_pro2 ul').removeClass('act')
    $('.peizhiRight .con .con_all .con_pro2 ul').eq(index).addClass('act')


})



// $.ajax({
//     url: '/index2'
// }).then(res => {
//     if (res.code == 200) {
//         location = '/index2'

//     }
// })


// ==================login===============
$('.headRight ul li:first-child a').click(function(e) {
    e.preventDefault()
    $('.login').addClass('asd')
})
$('.login .tit .btn').click(function() {
    $('.login').removeClass('asd')
})
window.addEventListener('load', function() {
    $.ajax({
        url: '/logstage',

    }).then(res => {
        // console.log((res.msg)[0])
        var user = (res.msg)[0].data
        var obj = JSON.parse(user)
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