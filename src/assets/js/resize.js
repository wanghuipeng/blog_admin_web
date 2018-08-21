function resizeHeight() {
    var height = getViewPortHeight();

    var aside = document.getElementById("aside");
    var content = document.getElementById("content");
    var width = document.documentElement.clientWidth || document.body.clientwidth;

    aside.style.height = height - 60 + "px";
    content.style.height = height - 77 + "px"

    function getViewPortHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
}
window.onresize = resizeHeight
window.onload = resizeHeight