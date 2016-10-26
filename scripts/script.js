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
