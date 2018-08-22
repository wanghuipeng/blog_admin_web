function resizeHeight() {
    var height = getViewPortHeight();

    var aside = document.getElementById("aside");
    var content = document.getElementById("content");
    var home = document.getElementById("home");
    var width = document.documentElement.clientWidth || document.body.clientwidth;

    aside.style.height = height - 60 + "px";
    content.style.height = height - 60 + "px"
    home.style.height = height - 0 + "px"

    function getViewPortHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
}
window.onresize = resizeHeight
window.onload = resizeHeight