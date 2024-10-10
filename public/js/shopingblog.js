const searchInput = document.getElementById('search-input');
const shopingTopImgShowHidden = document.getElementById('imgshowhidden');
const h2Elements = document.querySelectorAll('.maindiv h3');
const linkContainer = document.getElementById('links-container');

const inputField = document.getElementById('search-input');
window.addEventListener('beforeunload', function() {
  inputField.value = '';
  shopingTopImgShowHidden.style.display = 'block';
});
function checkSearchParameter() {
  const url = new URL(window.location.href);
  if ((url.searchParams.get('search') == '') || (url.href == "http://localhost:3000/Shoping")) {
    shopingTopImgShowHidden.style.display = 'block';
  } 
  else {
    shopingTopImgShowHidden.style.display = 'none';
  };
};
// Add an event listener to handle clicks
linkContainer.addEventListener('click', function(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const currentURL = event.target.getAttribute('href');
    console.log('Current URL:', currentURL);

    const productCard = event.target.closest('.product-card');
    const title = productCard.querySelector('li').textContent;
    updatePage(title, currentURL);
  };
});
// Add an event listener for the search input
searchInput.addEventListener('input', function() {
  if (searchInput.value === '') {
    shopingTopImgShowHidden.style.display = 'block';
  } else {
    shopingTopImgShowHidden.style.display = 'none';
  };
});
// Check the search parameter when the page loads
checkSearchParameter();
function updatePage(page, currentURL) {
  if (currentURL) {
    const url = new URL(currentURL);
    url.searchParams.set('search', page);
    window.location.href = url.toString();
  };
};
// -- image-zoom-hover--
var zoompicture = document.querySelector('#hover-Zoom-img-pic');
var zoom = document.querySelector('#hover-Zoom-img-zoom');
const picturesimages = document.querySelectorAll('.hover-Zoom-img-pictures .hover-Zoom-img-pictures-image');
let activeImage = picturesimages[0]; 
activeImage.classList.add('hover-Zoom-img-img-active');
document.addEventListener('DOMContentLoaded', function() {
picturesimages.forEach(picturesimage => {
    const imgSrc = picturesimage.getAttribute('data-src');

    picturesimage.addEventListener('mouseover', function () {
            zoompicture.src = imgSrc;
            zoom.style.backgroundImage = `url(${imgSrc})`;
            if (activeImage) {
                activeImage.classList.remove('hover-Zoom-img-img-active');
            }
            picturesimage.classList.add('hover-Zoom-img-img-active');
            activeImage = picturesimage;
    });
});
});
var pictureDiv = document.querySelector('#hover-Zoom-img-picture');
var pictureDiv_rect = document.querySelector('#hover-Zoom-img-rect');

let w1 = pictureDiv.offsetWidth;
let h1 = pictureDiv.offsetHeight;
let ratio;
if (window.innerWidth > 1165) {
  ratio = 5.9;
};
if (window.innerWidth < 1165) {
  ratio = 4;
};
if (window.innerWidth < 865) {
  ratio = 3;
};
if (window.innerWidth < 665) {
  zoom.style.display = "none";
};
zoom.style.backgroundSize = w1 * ratio + 'px ' + h1 * ratio + 'px';

let x,y,xx,yy;
let w2 = pictureDiv_rect.offsetWidth;
let h2 = pictureDiv_rect.offsetHeight;
zoom.style.width = w2 * ratio + 'px';
zoom.style.height = h2 * ratio + 'px';

w2 = w2 / 2 ;
h2 = h2 / 2;
document.addEventListener('DOMContentLoaded', function() {
pictureDiv.addEventListener('mousemove', function (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    xx= x - w2;
    yy= y - h2;

    if(x<w2){
        x=w2; 
        xx=0;
    }
    if(x>w1-w2){
        x=w1-w2;
        xx= x-w2;
    }
    if(y<h2){
        y=h2;
        yy=0;
    }
    if(y>h1-h2){
        y=h1-h2;
    }
    xx = xx * ratio;
    yy = yy * ratio;
    pictureDiv_rect.style.opacity = "1";
    zoom.style.display = "block";
          
    pictureDiv_rect.style.left = x + 'px';
    pictureDiv_rect.style.top = y + 'px';
          
    zoom.style.backgroundPosition = '-' + xx + 'px ' + '-' + yy + 'px';
});
pictureDiv.addEventListener('mouseout', function (e) {
    pictureDiv_rect.style.opacity = "0";
    zoom.style.display = "none";
});
});