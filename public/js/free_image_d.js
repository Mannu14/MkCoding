function toggleMenu() {
  var navLinks = document.getElementById("navLinks");
  var menu = document.querySelector(".menu");
  var lines = document.querySelectorAll(".line");
  navLinks.classList.toggle("nav-active");
  menu.classList.toggle("toggle");
  menu.classList.toggle("rotate");
  lines.forEach((line, index) => {
    line.classList.toggle("line" + (index + 1));
  });
};
//  wraper div java script
const gallery = document.querySelectorAll(".gallery span");
const previewBox = document.querySelector(".preview-box");
const previewImg = previewBox.querySelector("img");
const closeIcon = previewBox.querySelector(".icon");
const currentImg = previewBox.querySelector(".current-img");
const totalImg = previewBox.querySelector(".totle-img");
const shadow = document.querySelector(".shadow");
const galleryImage = document.querySelectorAll(".gallery .download-image");
const downloadBtn = document.querySelector(".download-image");
window.onload = ()=>{
  for(let i=0;i<gallery.length;i++){
    totalImg.textContent = gallery.length;
    let newIndex = i;
    let clickImgIndex;
    gallery[i].onclick = ()=>{
      clickImgIndex = newIndex; 
      function preview(){
          currentImg.textContent = newIndex + 1;
          let selectedImgUrl = gallery[newIndex].querySelector("img").src;
            previewImg.src = selectedImgUrl;
        };
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    if(newIndex == 0){
      prevBtn.style.display = "none"; 
    }
    if(newIndex >= gallery.length-1){
      nextBtn.style.display = "none";
    }
    prevBtn.onclick = ()=>{
      newIndex--;
      if(newIndex == 0){ 
        preview();
        prevBtn.style.display = "none"; 
      }
      else{ 
        preview();
        nextBtn.style.display = "block";
      }
    };
    nextBtn.onclick = ()=>{
      newIndex++;
      if(newIndex>=gallery.length-1){ 
        preview();
        nextBtn.style.display = "none"; 
      }
      else{ 
        preview();
        prevBtn.style.display = "block";
      }
    };  
    preview();
    previewBox.classList.add("show");
    shadow.style.display = "block";
    document.querySelector("body").style.overflow = "hidden";
    closeIcon.onclick = ()=>{
       newIndex = clickImgIndex;
       prevBtn.style.display = "block";
       nextBtn.style.display = "block";
       previewBox.classList.remove("show");
       shadow.style.display = "none";
       document.querySelector("body").style.overflow = "auto";
    };
  };
    // download images start 
    galleryImage[i].onclick = (e)=>{
      fileInput = gallery[i].querySelector("img").src;
      e.preventDefault();
      downloadBtn.innerText = "Downloading file...";
      fetchFile(fileInput);
    }
    //  download images end
  };
};
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
shadow.addEventListener("click", () => {
  newIndex = 0 ;
  prevBtn.style.display = "block";
  nextBtn.style.display = "block";
  previewBox.classList.remove("show");
  shadow.style.display = "none";
  document.querySelector("body").style.overflow = "auto";
});
// download images ----
function fetchFile(url){
 fetch(url).then(res => res.blob()).then(blob => {
    const file = new File([blob], "File name",{ type: "image/png" })
    let tempUrl = URL.createObjectURL(file);
    let aTag = document.createElement("a");
    aTag.href = tempUrl;
    aTag.download = "Mkcoding-Manish.jpg";
    document.body.appendChild(aTag); 
    aTag.click();  
    aTag.remove();  
    URL.revokeObjectURL(tempUrl);
    downloadBtn.innerText = "Download File";
 }).catch(() =>{
    downloadBtn.innerText = "Download File";
    alert("Failed to download file!");
 });
}
//  for imageItem click show like God and Acter
const filterItem = document.querySelector(".nav-links"),
filterImg = document.querySelectorAll(".image");
filterItem.onclick = (selectedItem) =>{
 if(selectedItem.target.classList.contains("imageItem")){ 
  filterItem.querySelector(".active").classList.remove("active"); 
  selectedItem.target.classList.add("active");
  let filterName = selectedItem.target.getAttribute("data-name");  
  filterImg.forEach((image) => {
    let filterImages = image.getAttribute("data-name"); 
    if((filterImages == filterName) || filterName == "all"){
      image.classList.remove("hide");
      image.classList.add("show");
    }
    else{
      image.classList.add("hide");
      image.classList.remove("show");
    };
  });
 };
};