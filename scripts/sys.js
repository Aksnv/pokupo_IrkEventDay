
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

/* Счетчик обратного отсчета до мероприятия + правильные окончания у слов "день", "час", "минута" */

function time() {
    timeend= new Date(2016, 11-1, 24, 10);

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
    /*if(tmin < 10)
    {
        tmin = '0'+tmin;
    }*/
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

/* END - Счетчик обратного отсчета до мероприятия + правильные окончания у слов "день", "час", "минута" */


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

/* Открытие/закрытие выпадающего меню-гамбургера */

var menu_hamburger = document.querySelector(".page-header__menu-hamburger");
var button = document.querySelector(".page-header__menu-hamburger button");

button.addEventListener("click", function(event) {
    event.preventDefault();
    menu_hamburger.classList.toggle("page-header__menu-hamburger--active");
});

/* END - Открытие/закрытие выпадающего меню-гамбургера */

/* Меню при скролле страницы */

(function () {

  var mainMenu = document.querySelector(".page-header__main-menu");

  /*var pageContentPreviewItem = document.querySelector(".main-menu__item--preview");*/
  var pageContentResultsItem = document.querySelector(".main-menu__item--results");
  /*var pageContentParticipationItem = document.querySelector(".main-menu__item--participation");
  var pageContentSeminarItem = document.querySelector(".main-menu__item--seminar");
  var pageContentScheduleItem = document.querySelector(".main-menu__item--schedule");*/
  var pageContentPartnersItem = document.querySelector(".main-menu__item--partners");
  /*var pageContentAddressItem = document.querySelector(".main-menu__item--address");*/
  var pageContentContactsItem = document.querySelector(".main-menu__item--social-media");

  var pageHeader = document.querySelector(".page-header");
  /*var pageContentPreview = document.querySelector(".page-content__preview");*/
  var pageContentResults = document.querySelector(".page-content__results");
  /*var pageContentParticipation = document.querySelector(".page-content__participation--top");
  var pageContentSeminar = document.querySelector(".page-content__seminar");
  var pageContentSchedule = document.querySelector(".page-content__schedule");*/
  var pageContentPartners = document.querySelector(".page-content__partners");
  /*var pageContentAddress = document.querySelector(".page-content__address");*/
  var pageContentContacts = document.querySelector(".page-content__social-media");

  window.addEventListener("scroll", function(event) {

    var pageHeaderCoordinates = pageHeader.getBoundingClientRect();
    /*var pageContentPreviewCoordinates = pageContentPreview.getBoundingClientRect();*/
    var pageContentResultsCoordinates = pageContentResults.getBoundingClientRect();
    /*var pageContentParticipationCoordinates = pageContentParticipation.getBoundingClientRect();
    var pageContentSeminarCoordinates = pageContentSeminar.getBoundingClientRect();
    var pageContentScheduleCoordinates = pageContentSchedule.getBoundingClientRect();*/
    var pageContentPartnersCoordinates = pageContentPartners.getBoundingClientRect();
    /*var pageContentAddressCoordinates = pageContentAddress.getBoundingClientRect();*/
    var pageContentContactsCoordinates = pageContentContacts.getBoundingClientRect();
    
    
    if (pageHeaderCoordinates.bottom < 10) {
      mainMenu.classList.add("main-menu__scroll");
    } else {
      mainMenu.classList.remove("main-menu__scroll");
    }

    /*if ((pageContentPreviewCoordinates.top < 10) 
      && (pageContentPreviewCoordinates.top > -pageContentPreviewCoordinates.height)) {
      pageContentPreviewItem.classList.add("main-menu__active");
    } else {
      pageContentPreviewItem.classList.remove("main-menu__active");
    }*/

    if ((pageContentResultsCoordinates.top < 10) 
      && (pageContentResultsCoordinates.top > -pageContentResultsCoordinates.height)) {
      pageContentResultsItem.classList.add("main-menu__active");
    } else {
      pageContentResultsItem.classList.remove("main-menu__active");
    }

    /*if ((pageContentParticipationCoordinates.top < 10) 
      && (pageContentParticipationCoordinates.top > -pageContentParticipationCoordinates.height)) {
      pageContentParticipationItem.classList.add("main-menu__active");
    } else {
      pageContentParticipationItem.classList.remove("main-menu__active");
    }

    if ((pageContentSeminarCoordinates.top < 10) 
      && (pageContentSeminarCoordinates.top > -pageContentSeminarCoordinates.height)) {
      pageContentSeminarItem.classList.add("main-menu__active");
    } else {
      pageContentSeminarItem.classList.remove("main-menu__active");
    }

    if ((pageContentScheduleCoordinates.top < 10) 
      && (pageContentScheduleCoordinates.top > -pageContentScheduleCoordinates.height)) {
      pageContentScheduleItem.classList.add("main-menu__active");
    } else {
      pageContentScheduleItem.classList.remove("main-menu__active");
    }*/

    if ((pageContentPartnersCoordinates.top < 10) 
      && (pageContentPartnersCoordinates.top > -pageContentPartnersCoordinates.height)) {
      pageContentPartnersItem.classList.add("main-menu__active");
    } else {
      pageContentPartnersItem.classList.remove("main-menu__active");
    }

    /*if ((pageContentAddressCoordinates.top < 10) 
      && (pageContentAddressCoordinates.top > -pageContentAddressCoordinates.height)) {
      pageContentAddressItem.classList.add("main-menu__active");
    } else {
      pageContentAddressItem.classList.remove("main-menu__active");
    }*/

    if ((pageContentContactsCoordinates.top < 10) 
      && (pageContentContactsCoordinates.top > -pageContentContactsCoordinates.height)) {
      pageContentContactsItem.classList.add("main-menu__active");
    } else {
      pageContentContactsItem.classList.remove("main-menu__active");
    }

  });

}());

/* END - Меню при скролле страницы */


/* Выпадающие блоки с информацией в расписании */

/*(function () {

  var scheduleDetailsLink = [];
  var scheduleRowDetails = [];
  
  for (var i = 1; i < 12; i++) {
    scheduleDetailsLink.push(document.querySelector(".schedule-details__link-"+i));
    scheduleRowDetails.push(document.querySelector(".schedule__row--details-"+i));
  }

  scheduleDetailsLink[0].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[0].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[1].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[1].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[2].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[2].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[3].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[3].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[4].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[4].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[5].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[5].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[6].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[6].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[7].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[7].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[8].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[8].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[9].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[9].classList.toggle("schedule__row--invisible");
  });

  scheduleDetailsLink[10].addEventListener("click", function(event) {
    event.preventDefault();
    scheduleRowDetails[10].classList.toggle("schedule__row--invisible");
  });

}()); */

/* END - Выпадающие блоки с информацией в расписании */


/* ***** ***** END - Слайдер фотогаллереи ***** ***** */

/* ***** Ползунок прокрутки галлереи ***** */

/*Запоминаем превью каких фото видны на экране при скролле*/

function definePreviewPhotoVisible() {
  var visiblePreviews = [];
  for (var i = 1; i < $(".slider-photo").length + 1; i++) {
    if ($(".gallery-preview__photo--" + i).css("display") == "block") {
      visiblePreviews.push(+$(".gallery-preview__photo--" + i)[0].classList[1].substr(24, $(".gallery-preview__photo--" + i)[0].classList[1].length));
    }
  }
  return visiblePreviews;
}

/*Отображение превью фотографий в соответствии с текущим состоянием полосы прокрутки */

function viewPreview(arr) {
  for (var i = 0; i < arr.length; i++) {
    $(".gallery-preview__photo--" + arr[i]).show();
  }
}

function viewPreviewCall() {
  if (definePreviewPhotoVisible().length == 0) {
    viewPreview(startPreviewPhotoVisible);
  } else {
    viewPreview(nowPreviewPhotoVisible);
  }
}

/*Прокручивание превью фото и ползунка прокрутки при его передвижении мышкой*/

for (var i = 9; i < $(".slider-photo").length + 1; i++) {
  $(".gallery-preview__photo--" + i).css("display", "none");
}

var startPreviewPhotoVisible = definePreviewPhotoVisible();

$("input[type='range']").mousedown(function() {

  setInterval(function() {

    /*Один - Восемь*/
    if ($("input[type='range']").val() <= 8) {
      for (var i = 1; i < $(".slider-photo").length / 2 + 1; i++) {
        $(".gallery-preview__photo--" + i).css("display", "block");
        $(".gallery-preview__photo--" + i).css("marginRight", "10px");
      }
      $(".gallery-preview__photo--" + 8).css("marginRight", 0);

      for (var j = 9; j < $(".slider-photo").length + 1; j++) {
        $(".gallery-preview__photo--" + i).css("display", "none");
      }
    }

    /*Девять - Шестнадцать*/
    if ($("input[type='range']").val() > 8) {
      for (var m = 9; m < $(".slider-photo").length + 1; m++) {
        if ($("input[type='range']").val() == m) {
          for (var i = (m - 7); i < ($(".slider-photo").length / 2 + (m - 7)); i++) {
            $(".gallery-preview__photo--" + i).css("display", "block");
            $(".gallery-preview__photo--" + i).css("marginRight", "10px");
          }
          $(".gallery-preview__photo--" + m).css("marginRight", 0);

          for (var j = (m + 1); j < $(".slider-photo").length + 1; j++) {
            $(".gallery-preview__photo--" + i).css("display", "none");
          }

          for (var k = 1; k <= (m - 8); k++) {
            $(".gallery-preview__photo--" + k).css("display", "none");
          }
        }
      }
    }

    definePreviewPhotoVisible();

  }, 10);
});

/* ***** END - Ползунок прокрутки галлереи ***** */


/* ***** Подсветка превью фотографий рамкой при клике и отображение соответствующего фото в галерее ***** */

function removeClassPhotoActive() {
  for (var i = 0; i < $(".gallery-preview__photo").length; i++) {
    $(".gallery-preview__photo")[i].className = "gallery-preview__photo gallery-preview__photo--" + (i + 1);
  }
}

$(".gallery-preview__photo").click(function() {

  removeClassPhotoActive();
  $(this).addClass("gallery-preview__photo--active");

  var classNumber = +$(this)[0].classList[1].substr(24, $(this)[0].classList[1].length);
  if (classNumber == 1) {
    $(".slider-button--back").attr("disabled", "disabled");
    $(".slider-button--forward").attr("disabled", false);
  } else if (classNumber == 16) {
    $(".slider-button--forward").attr("disabled", "disabled");
    $(".slider-button--back").attr("disabled", false);
  } else {
    $(".slider-button--back").attr("disabled", false);
    $(".slider-button--forward").attr("disabled", false);
  }

  $(".slider-photo").hide();

  $(".slider-photo--" + classNumber).fadeIn(1000);
  $("input[type='range']").val(classNumber);

  var nowPreviewPhotoVisible = definePreviewPhotoVisible();
  console.log(nowPreviewPhotoVisible);

  $(".gallery-preview__photo").hide();

  viewPreviewCall();
  
  return false;
});

/* ***** END - Подсветка превью фотографий рамкой при клике и отображение соответствующего фото в галерее ***** */

/* ***** Переключение фотографий кнопками ***** */

$(".slider-button--back").attr("disabled", "disabled");

$(".slider-button--forward").click(function() {
  $(".slider-button--back").attr("disabled", false);
  for (var i = 1; i <= $(".slider-photo").length; i++) {
    if ($(".slider-photo--" + i).css("display") == "block") {
      $(".slider-photo--" + i).hide();
      $(".slider-photo--" + (i + 1)).fadeIn(1000);
      $(".gallery-preview__photo--" + (i + 1)).addClass("gallery-preview__photo--active");
      $(".gallery-preview__photo--" + i).removeClass("gallery-preview__photo--active");
      $("input[type='range']").val(i + 1);

      if (i >= 8) {
        $(".gallery-preview__photo--" + (i - 7)).hide();
        $(".gallery-preview__photo--" + (i + 1)).show();
        $(".gallery-preview__photo--" + i).css("marginRight", "10px");
        $(".gallery-preview__photo--" + (i + 1)).css("marginRight", 0);
      }

      if (i == $(".slider-photo").length - 1) {
        $(".slider-button--forward").attr("disabled", "disabled");
      }
      break;
    }
  }
  return false;
});

$(".slider-button--back").click(function() {
  $(".slider-button--forward").attr("disabled", false);
  for (var i = $(".slider-photo").length; i >= 1; i--) {
    if ($(".slider-photo--" + i).css("display") == "block") {
      $(".slider-photo--" + i).hide();
      $(".slider-photo--" + (i - 1)).fadeIn(1000);
      $(".gallery-preview__photo--" + (i - 1)).addClass("gallery-preview__photo--active");
      $(".gallery-preview__photo--" + i).removeClass("gallery-preview__photo--active");
      $("input[type='range']").val(i - 1);

      if (i <= 9) {
        $(".gallery-preview__photo--" + (i + 7)).hide();
        $(".gallery-preview__photo--" + (i - 1)).show();
        $(".gallery-preview__photo--" + (i - 1)).css("marginRight", "10px");
        $(".gallery-preview__photo--" + (i + 6)).css("marginRight", 0);
      }

      if (i == 2) {
        $(".slider-button--back").attr("disabled", "disabled");
      }
      break;
    }
  }
  return false;
});

/* ***** END - Переключение фотографий кнопками ***** */

/* ***** ***** END - Слайдер фотогаллереи ***** ***** */


/* ***** ***** Слайдер отзывов о семинаре ***** ***** */

/*Переключение фотографий кнопками*/

$(".slider-button--reviews-back").attr("disabled", "disabled");

$(".slider-button--reviews-forward").click(function() {
  $(".slider-button--reviews-back").attr("disabled", false);
  for (var i = 1; i <= $(".reviews-slider__article").length; i++) {
    if ($(".reviews-slider__article--" + i).css("display") == "block") {
      $(".reviews-slider__article--" + i).hide();
      $(".reviews-slider__article--" + (i + 1)).fadeIn(1000);
      $(".reviews-slider__paginator-button--" + (i + 1)).addClass("reviews-slider__paginator-button--active");
      $(".reviews-slider__paginator-button--" + i).removeClass("reviews-slider__paginator-button--active");

      if (i == $(".reviews-slider__article").length - 1) {
        $(".slider-button--reviews-forward").attr("disabled", "disabled");
      }
      break;
    }
  }
  return false;
});

$(".slider-button--reviews-back").click(function() {
  $(".slider-button--reviews-forward").attr("disabled", false);
  for (var i = $(".reviews-slider__article").length; i >= 1; i--) {
    if ($(".reviews-slider__article--" + i).css("display") == "block") {
      $(".reviews-slider__article--" + i).hide();
      $(".reviews-slider__article--" + (i - 1)).fadeIn(1000);
      $(".reviews-slider__paginator-button--" + (i - 1)).addClass("reviews-slider__paginator-button--active");
      $(".reviews-slider__paginator-button--" + i).removeClass("reviews-slider__paginator-button--active");

      if (i == 2) {
        $(".slider-button--reviews-back").attr("disabled", "disabled");
      }
      break;
    }
  }
  return false;
});

/*Переключение фотографий пагинатором*/

$(".reviews-slider__paginator-button").click(function() {

  for (var j = 1; j < $(".reviews-slider__article").length + 1; j++) {
    $(".reviews-slider__article--" + j).hide();
  }

  for (var i = 1; i < $(".reviews-slider__paginator-button").length + 1; i++) {
    $(".reviews-slider__paginator-button--" + i).removeClass("reviews-slider__paginator-button--active");

    if ($(this).hasClass("reviews-slider__paginator-button--" + i)) {
      $(".reviews-slider__article--" + i).fadeIn(1000);

      if (i == 1) {
        $(".slider-button--reviews-back").attr("disabled", "disabled");
        $(".slider-button--reviews-forward").attr("disabled", false);
      } else if (i == 6) {
        $(".slider-button--reviews-back").attr("disabled", false);
        $(".slider-button--reviews-forward").attr("disabled", "disabled");
      } else {
        $(".slider-button--reviews-back").attr("disabled", false);
        $(".slider-button--reviews-forward").attr("disabled", false);
      }
    }
  }
  $(this).addClass("reviews-slider__paginator-button--active");

  return false;
});

/* ***** ***** END - Слайдер отзывов о семинаре ***** ***** */


/* Плавная прокрутка страницы при нажатии кнопки "Наверх" */

$(".upstairs-block__button").click(function() {
  $("html, body").animate({
    scrollTop: 0
  }, 1000);
  return false;
});

/* END - Плавная прокрутка страницы при нажатии кнопки "Наверх" */

/* Плавная прокрутка страницы при нажатии пунктов меню и ссылок в тексте */

$(".main-menu__item--results").click(function() {
  $("html, body").animate({
    scrollTop: $("#page-content__results").offset().top
  }, 1000);
  return false;
});

$(".main-menu__item--partners").click(function() {
  $("html, body").animate({
    scrollTop: $("#page-content__partners").offset().top
  }, 1000);
  return false;
});

$(".main-menu__item--social-media").click(function() {
  $("html, body").animate({
    scrollTop: $("#page-content__social-media").offset().top
  }, 1000);
  return false;
});

/* END - Плавная прокрутка страницы при нажатии пунктов меню и ссылок в тексте */
