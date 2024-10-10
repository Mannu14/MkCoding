var indexValue =1;
function sliderShow(){
    setTimeout(sliderShow, 2000);
    var x;
    const img = document.querySelectorAll(".image");
    sliders = document.querySelectorAll(".btn-sliders span");
    for (x = 0; x < img.length; x++) {
        img[x].style.display = "none";
        sliders[x].style.background = "none";
    }
    indexValue++;
    if(indexValue > img.length){indexValue = 1};
    img[indexValue - 1].style.display = "block";
    sliders[indexValue - 1].style.background = "white";
}
sliderShow();
//image sliders
showImg(indexValue);
function btn_slide(e){showImg(indexValue = e)};
function side_slide(e){showImg(indexValue += e)};
function showImg(e){
    var i;
    const img = document.querySelectorAll(".image");
    sliders = document.querySelectorAll(".btn-sliders span");
    if(e > img.length){indexValue = 1};
    if(e < 1){indexValue = img.length};
    for(i = 0; i<img.length; i++){
        img[i].style.display = "none";
    };
    for(i = 0; i<sliders.length; i++){
        sliders[i].style.background = "rgba(255,255,255,0.1)";
    };
    img[indexValue - 1].style.display = "block";
    sliders[indexValue - 1].style.background = "white";
};