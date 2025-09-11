const menuBtn = document.getElementById('menu-button');
const panel = document.getElementById('togglepanel');

menuBtn.addEventListener("click", function () {
    console.log("Button clicked!");
    panel.classList.toggle("open");
});