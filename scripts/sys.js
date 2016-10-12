
(function($) {
    $(function() {
        var popwindow = $('.popwindow'); // Класс окна
        var popbutton = $('.popbutton'); // Класс кнопки
        function preparewindow(windowobject) {
            var winwidth = windowobject.data("width");
            var winheight = windowobject.data("height");
            var winmargin = winwidth / 2;

            windowobject.parent(".box_window").css({'width':winwidth,'height':winheight,'margin-left':'-'+winmargin})
            windowobject.css({'height':winheight})
        }
        if (popwindow.length) {

            preparewindow(popwindow);
            popbutton.click(function(){
                $(".submenu").hide();
                var idwind = $(this).data("window");
                $("#" + idwind).parent(".box_window_in").fadeIn().addClass("windactiv");
                $(".popwindow").fadeIn();
                $(".to_blur").addClass("blur");
            });
        };
        $(".bw_close").click(function(){
            $(".windactiv").fadeOut();
            $(".windactiv").removeClass("windactiv");
            $(".popwindow").fadeOut();
            $(".to_blur").removeClass("blur");
            $(".submenu").show();
            return false;
        });
    });


    $(function() {
        $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
            return $(this).addClass('active').siblings().removeClass('active').closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
        return $('#popup1 form').submit(function(e) {

            e.preventDefault();
            new_webinar_order();
            return false;
        });
    });
})(jQuery)

function new_webinar_order()
{
    data = {};
    data['fio'] = $('.fio').val();
    data['email'] = $('.email').val();
    data['phone'] = $('.phone').val();
    data['site'] = $('.site').val();

    var but_text_tmp = $("#submit_btn").val();
    var i=0;
    var loading = setInterval(function() {
        var but_text = $("#submit_btn").val();

        $("#submit_btn").val(but_text+'.');
        if(i==4){
            $("#submit_btn").val(but_text_tmp);
            i=0;
        }
        i++;
    }, 800);

    $.ajax({
        type: "POST",
        url:  Routing.generate('promo_order'),
        data:data,
        datatype:'json',
        success: function(result)
        {
            //console.log(result.errors.fio);return;
            if(result.errors.fio == 1)
            {
                $("#fio_error").show();
                $("#submit_btn").val('ЗАПИСАТЬСЯ');
                clearInterval(loading);
                return;
            }
            else
            {
                $("#fio_error").hide();
            }
            if(result.errors.email == 1)
            {

                $("#email_error").html(result.errors.message);
                $("#email_error").show();
                $("#submit_btn").val('ЗАПИСАТЬСЯ');
                clearInterval(loading);
                return;
            }
            else
            {
                $("#fio_error").hide();
            }


            //return;
            clearInterval(loading);

            $('#link_pay').attr('href',Routing.generate('promo_pay',{'id':result.order_id}));
            $(".wait_submit").addClass('hidden');
            $('#popup1').addClass('hidden');
            $('#popup2').removeClass('hidden');
        },
        error : function()
        {
            $('.error_submit').removeClass('hidden');
            clearInterval(loading);
        }
    });

}
time();

function time() {
    timeend= new Date(2016, 11-1, 24);

    today = new Date();
    today = Math.floor((timeend-today)/1000);
    tsec=today%60;
    today=Math.floor(today/60);
    if(tsec<10)tsec='0'+tsec;
    tmin=today%60;
    today=Math.floor(today/60);
    if(tmin<10)tmin='0'+tmin;
    thour=today%24;
    today=Math.floor(today/24);

    if(thour < 10)
    {
        thour = '0'+thour;
    }
    if(tmin < 10)
    {
        tmin = '0'+tmin;
    }
    if(today < 10)
    {
        today = '0'+today;
    }

    $("#tdays").html(declOfNum(today, ['день','дня','дней']));
    $("#thours").html(thour);
    $("#tminutes").html(tmin);



     $('<span/>').addClass('event-countdown__item')
         .addClass('event-countdown__item--days')
         .addClass('event-countdown__item--days'+declOfNum(today))
         .html(today)
        .appendTo('#date__');

    $('<span/>').addClass('event-countdown__item')
        .addClass('event-countdown__item--hours')
        .addClass('event-countdown__item--hours'+declOfNum(thour))
        .html(thour)
        .appendTo('#date__');

    $('<span/>').addClass('event-countdown__item')
        .addClass('event-countdown__item--minutes')
        .addClass('event-countdown__item--minutes'+declOfNum(tmin))
        .html(tmin)
        .appendTo('#date__');
}


share = {
    fb: function() {
        var uriLocation;
        if (typeof fb_post_id != 'undefined') {
            uriLocation = "https://www.facebook.com/raznogo/posts/"+fb_post_id;
        }else if (typeof fb_post_link != 'undefined') {
            uriLocation = fb_post_link;
        }else {
            uriLocation = window.location.href;
        };
        url = 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(uriLocation);
        share.popup(url);
    },
    vk: function() {
        image = jQuery('.image-popup').attr('href');
        url = 'https://vk.com/share.php?url=' + encodeURIComponent(window.location.href);
        url += '&image='+encodeURIComponent(image);
        share.popup(url);

    },
    od: function() {
        url = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + encodeURIComponent(window.location.href);
        share.popup(url);
    },
    google: function() {
        url = 'https://plus.google.com/share?url=' + encodeURIComponent(window.location.href);
        share.popup(url);
    },
    tw: function() {
        url = 'https://twitter.com/home?status=' + encodeURIComponent(window.location.href);
        share.popup(url);
    },

    popup: function(url) {
        var width = 600;
        var height = 400;
        var top = (screen.height/2)-(height/2);
        var left = (screen.width/2)-(width/2);
        window.open(url,'','toolbar=0,status=0,width='+width+',height='+height+',top='+top+',left='+left);
    }
};



function declOfNum(number)
{
    cases = [2, 0, 1, 1, 1, 2];
    return (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5];
}


var menu_hamburger = document.querySelector(".page-header__menu-hamburger");
var button = document.querySelector(".page-header__menu-hamburger button");

button.addEventListener("click", function(event) {
    event.preventDefault();
    menu_hamburger.classList.toggle("page-header__menu-hamburger--active");
});