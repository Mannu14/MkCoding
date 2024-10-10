// Add your JavaScript code here
const readMoreButtons = document.querySelectorAll('.read-more-btn');
const hiddenContents = document.querySelectorAll('.hidden-content');
readMoreButtons.forEach((button, index) => {
button.addEventListener('click', () => {
if (hiddenContents[index].style.display === 'none') {
hiddenContents[index].style.display = 'inline';
button.textContent = 'Read Less';
} else {
hiddenContents[index].style.display = 'none';
button.textContent = 'Read More';
}
});
});
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

themeToggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
  body.classList.toggle("light-theme");
  themeIcon.classList.toggle("fa-sun");
  themeIcon.classList.toggle("fa-moon");
});
window.onscroll = function() {myFunction()};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function myFunction() {
 if (window.pageYOffset >= sticky) {
  navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
};