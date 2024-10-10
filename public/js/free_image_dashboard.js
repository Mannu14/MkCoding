const uploadBox = document.querySelector(".upload-box"),
imageInput = document.querySelector(".imageInput"),
previewImg = uploadBox.querySelector("img"),
fileInput = imageInput.querySelector("input");
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
submit = document.querySelector(".download-btn");

let ogImageRatio;
document.querySelector(".wrapper").classList.add("active");
fileInput.onclick = (e) =>{
    const file = e.target.files[0]; // getting first user selected file
    if(!file) return;   //return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file);  // passing selected file url to preview img src
    previewImg.addEventListener("load", () => {  // once img loaded
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
    });
};