let mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  };
};
function topFunction() {
  let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

  let scrollStep = -currentScroll / 50; 

  let scrollInterval = setInterval(function(){
    currentScroll = currentScroll + scrollStep;

    document.documentElement.scrollTop = currentScroll;
    document.body.scrollTop = currentScroll;
    if (currentScroll <= 0) {
      clearInterval(scrollInterval);
    }
  }, 15);
}
// - preloader---
var loader = document.getElementById('preloader-preloader');
window.addEventListener('load',function(){
  loader.style.display = 'none';
});

const outputDiv = document.getElementById('preloader-loding');
const txt =`kCoding Loding`;
let i=0
const IntervalId = setInterval(function(){
  outputDiv.innerHTML += txt[i];
  i++;
  if (i== txt.length) {
    clearInterval(IntervalId);
  }
},50);

// -- show previewBox-
const showgallery = document.querySelectorAll(".right-links-main .mainheading_file_2");
const showpreviewBox = document.querySelector(".show-preview-box");
const showpreviewImg = showpreviewBox.querySelector("img");
const showcloseIcon = showpreviewBox.querySelector(".show-icon");
const showshadow = document.querySelector(".show-shadow");

window.onload = ()=>{
    for(let i=0;i<showgallery.length;i++){
        showgallery[i].onclick = ()=>{
            function preview(){
                let selectedImgUrl = showgallery[i].querySelector("img").src;
                showpreviewImg.src = selectedImgUrl;
            }
            preview();
        showpreviewBox.classList.add("show-box");
        showshadow.style.display = "block";
        showcloseIcon.onclick = ()=>{
            showpreviewBox.classList.remove("show-box");
            showshadow.style.display = "none";
        };
    };
};
};
showshadow.addEventListener("click", () => {
    showpreviewBox.classList.remove("show-box");
    showshadow.style.display = "none";
});
// -- for '_blank' target link-
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('.selectedimageItem');
  let openInBackground = false;
  const handleClick = (event) => {
    if (openInBackground) {
      window.open(event.target.href, '_blank');
      event.preventDefault();
  } else {
      window.location.href = event.target.href;
    };
  };
  const handleMouseEnter = () => {
    openInBackground = true;
  };
  const handleMouseLeave = () => {
    openInBackground = false;
  };
  links.forEach(link => {
    link.addEventListener('click', handleClick);
    link.addEventListener('mouseover', handleMouseEnter);
    link.addEventListener('mouseleave', handleMouseLeave);
  });
      })
// for lazy load
const lazyImgRefs = document.querySelectorAll('img[data-src]');
const lazyImg = (entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.src = entry.target.dataset.src;
        imgObserver.unobserve(entry.target);
    });
}
const imgObserver = new IntersectionObserver(lazyImg, {
    root: null,
    threshold: 0,
});
lazyImgRefs.forEach(imgRef => {
    imgObserver.observe(imgRef);
});
// blur load
const imgblurDivs = document.querySelectorAll('.blur-load');
        imgblurDivs.forEach(div =>{
            const img = div.querySelector('img');
            function lazyImgloaded(){
                // show images
                div.classList.add('lazyImgloaded');
            }
            if(img.complete){
                lazyImgloaded();
            }
            else{
                img.addEventListener('load', lazyImgloaded);
            }
        })

//hidden images show
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
      if(entry.isIntersecting){
          entry.target.classList.add('hidden-img-show');
      }
      else{
          entry.target.classList.remove('hidden-img-show');
      }
  })
});

const hiddenElements = document.querySelectorAll('.hidden-img');
hiddenElements.forEach((el)=> observer.observe(el));
// ---
const images = document.querySelectorAll('.hidden-img');
images.forEach((image, index) => {
  image.style.transitionDelay = `${100}ms`;
});
// -- split text---
    const containersh3 = document.querySelectorAll('.mainheading_h3');
    const containersh4 = document.querySelectorAll('.mainheading_h4');
    const containersh5 = document.querySelectorAll('.mainheading_h5');
    const containersh6 = document.querySelectorAll('.mainheading_h6');
    const containersp = document.querySelectorAll('.mainheading_p');
    containersh3.forEach(container => {
        const textContent = container.textContent;
        const splitted = textContent.split('\\n');
        container.innerHTML = '';
        splitted.forEach(function(line) {
            const p = document.createElement('h3');
            p.textContent = line.trim(); 
            container.appendChild(p);
        });
    });
    containersh4.forEach(container => {
        const textContent = container.textContent;
        const splitted = textContent.split('\\n');
        container.innerHTML = '';
        splitted.forEach(function(line) {
            const p = document.createElement('h4');
            p.textContent = line.trim(); 
            container.appendChild(p);
        });
    });
    containersh5.forEach(container => {
        const textContent = container.textContent;
        const splitted = textContent.split('\\n');
        container.innerHTML = '';
        splitted.forEach(function(line) {
            const p = document.createElement('h5');
            p.textContent = line.trim(); 
            container.appendChild(p);
        });
    });
    containersh6.forEach(container => {
        const textContent = container.textContent;
        const splitted = textContent.split('\\n');
        container.innerHTML = '';
        splitted.forEach(function(line) {
            const p = document.createElement('h6');
            p.textContent = line.trim(); 
            container.appendChild(p);
        });
    });
    containersp.forEach(container => {
        const textContent = container.textContent;
        const splitted = textContent.split('\\n');
        container.innerHTML = '';
        splitted.forEach(function(line) {
            const p = document.createElement('p');
            p.textContent = line.trim(); 
            container.appendChild(p);
        });
    });