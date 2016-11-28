/* Открытие/закрытие выпадающего меню-гамбургера */

(function () {
  var menu_hamburger = document.querySelector(".page-header__menu-hamburger");
  var button = document.querySelector(".page-header__menu-hamburger button");

  button.addEventListener("click", function(event) {
    event.preventDefault();
    menu_hamburger.classList.toggle("page-header__menu-hamburger--active");
  });
}());

/* END - Открытие/закрытие выпадающего меню-гамбургера */


/* Меню при скролле страницы */

(function () {

  var mainMenu = document.querySelector(".page-header__main-menu");

  var pageContentPreviewItem = document.querySelector(".main-menu__item--preview");
  var pageContentParticipationItem = document.querySelector(".main-menu__item--participation");
  var pageContentSeminarItem = document.querySelector(".main-menu__item--seminar");
  var pageContentScheduleItem = document.querySelector(".main-menu__item--schedule");
  var pageContentPartnersItem = document.querySelector(".main-menu__item--partners");
  var pageContentAddressItem = document.querySelector(".main-menu__item--address");

  var pageHeader = document.querySelector(".page-header");
  var pageContentPreview = document.querySelector(".page-content__preview");
  var pageContentParticipation = document.querySelector(".page-content__participation--top");
  var pageContentSeminar = document.querySelector(".page-content__seminar");
  var pageContentSchedule = document.querySelector(".page-content__schedule");
  var pageContentPartners = document.querySelector(".page-content__partners");
  var pageContentAddress = document.querySelector(".page-content__address");

  window.addEventListener("scroll", function(event) {

    var pageHeaderCoordinates = pageHeader.getBoundingClientRect();
    var pageContentPreviewCoordinates = pageContentPreview.getBoundingClientRect();
    var pageContentParticipationCoordinates = pageContentParticipation.getBoundingClientRect();
    var pageContentSeminarCoordinates = pageContentSeminar.getBoundingClientRect();
    var pageContentScheduleCoordinates = pageContentSchedule.getBoundingClientRect();
    var pageContentPartnersCoordinates = pageContentPartners.getBoundingClientRect();
    var pageContentAddressCoordinates = pageContentAddress.getBoundingClientRect();
    
    
    if (pageHeaderCoordinates.bottom < 10) {
      mainMenu.classList.add("main-menu__scroll");
    } else {
      mainMenu.classList.remove("main-menu__scroll");
    }

    if ((pageContentPreviewCoordinates.top < 10) 
      && (pageContentPreviewCoordinates.top > -pageContentPreviewCoordinates.height)) {
      pageContentPreviewItem.classList.add("main-menu__active");
    } else {
      pageContentPreviewItem.classList.remove("main-menu__active");
    }

    if ((pageContentParticipationCoordinates.top < 10) 
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
    }

    if ((pageContentPartnersCoordinates.top < 10) 
      && (pageContentPartnersCoordinates.top > -pageContentPartnersCoordinates.height)) {
      pageContentPartnersItem.classList.add("main-menu__active");
    } else {
      pageContentPartnersItem.classList.remove("main-menu__active");
    }

    if ((pageContentAddressCoordinates.top < 10) 
      && (pageContentAddressCoordinates.top > -pageContentAddressCoordinates.height)) {
      pageContentAddressItem.classList.add("main-menu__active");
    } else {
      pageContentAddressItem.classList.remove("main-menu__active");
    }

  });

}());

/* END - Меню при скролле страницы */


/* Выпадающие блоки с информацией в расписании */

(function () {

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

}()); 

/* END - Выпадающие блоки с информацией в расписании */


/* Слайдер */



/* END - Слайдер */
