const mainNav = document.querySelector('#main');
const navTop = mainNav.getBoundingClientRect().top;
const navheight = mainNav.getBoundingClientRect().height;
const siteWrap = document.querySelector('.site-wrap');

window.addEventListener("scroll", function (e) {
    if (this.scrollY >= navTop) {
        document.body.classList.add("fixed-nav");
        document.body.style.paddingTop = navheight + "px"

    } else {
        document.body.classList.remove("fixed-nav");
        document.body.style.paddingTop = "";
    }
})