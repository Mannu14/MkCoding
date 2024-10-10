// for imageItem click show like God and Acter
const filterItem = document.querySelector(".nav-links"),
filterImg = document.querySelectorAll(".maindiv");

filterItem.onclick = (selectedItem) =>{
    if(selectedItem.target.classList.contains("imageItem")){ 
        let filterName = selectedItem.target.getAttribute("data-name"); 
        filterImg.forEach((maindiv) => {
            let filterImages = maindiv.getAttribute("data-name");
            if((filterImages == filterName) || filterName == "all"){ 
                maindiv.classList.remove("hide");
                maindiv.classList.add("show");
            }
            else{
                maindiv.classList.add("hide");
                maindiv.classList.remove("show");
            };
        });
    };
};