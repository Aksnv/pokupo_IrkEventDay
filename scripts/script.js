var menu_hamburger = document.querySelector(".page-header__menu-hamburger");
var button = document.querySelector(".page-header__menu-hamburger button");

button.addEventListener("click", function(event) {
  event.preventDefault();
  menu_hamburger.classList.toggle("page-header__menu-hamburger--active");
});