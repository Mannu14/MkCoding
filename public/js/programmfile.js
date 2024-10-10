// from backend
const articlesData = JSON.parse(document.getElementById('articles-data').textContent);
const suggestions = [];
for (let i = 0; i < articlesData.length; i++) {
    suggestions.push(articlesData[i].uploadID);
}

const searchWrapper = document.querySelector(".search-input");
const inputBox2 = document.querySelector("input");
const suggBox = document.querySelector(".autocom-box");
inputBox2.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            return data = `<a href=/programm/${data}>${data}</a>`;
        });
        searchWrapper.classList.add("active");
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("a");
        for(let i =0; i<allList.length; i++){
            allList[i].setAttribute("onclick","select(this)");
        }
    }else{
        searchWrapper.classList.remove("active");
    };
};
function select(element){
    let selectUserData = element.textContent;
    inputBox2.value = selectUserData;
    searchWrapper.classList.remove("active");
}
function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox2.value;
        listData = `<a href=/${userValue}>${userValue}</a>`;
    } else {
        // Display up to four suggestions
        listData = list.slice(0, 4).join('');
    }
    suggBox.innerHTML = listData;
}

//-time digital clock
const time = document.querySelector("#time");
setInterval(()=>{
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if(hours > 12){
        day_night = "PM";
        hours = hours - 12;
    }
    if(hours < 10){
        hours = "0" + hours;
    }
    if(minutes < 10){
        hours = "0" + minutes;
    }
    if(seconds < 10){
        seconds = "0" + seconds;
    }
    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
});

//copy code 
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetID = button.getAttribute('data-target');
        const codeTextArea = document.getElementById(targetID);
        if (codeTextArea) {
            codeTextArea.select();
            navigator.clipboard.writeText(codeTextArea.value)
            document.execCommand('copy');
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 1500);
        }
    });
});
// local storage --
const themeToggleBtn = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
  localStorage.setItem('preferredTheme', currentTheme);
  applyStoredTheme();
});
applyStoredTheme();

function applyStoredTheme() {
  const storedTheme = localStorage.getItem('preferredTheme');
  if (storedTheme === 'dark') {
    themeIcon.classList.add("fa-moon");
    themeIcon.classList.remove("fa-sun");
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    themeIcon.classList.add("fa-sun");
    themeIcon.classList.remove("fa-moon");
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
 };
};
// user login navbar2
const storedUser = localStorage.getItem('userLogin');
const signUP = document.querySelector('.profile-Image-icon');
const signUP_i = document.querySelector('.profile-Image-icon i');
if (storedUser) {
    const user = JSON.parse(storedUser);
    signUP_i.style.display = "none";
    const signup_Img = document.createElement('img');
    const signup_h6 = document.createElement('h3');
    signup_Img.src = user.image;
    signup_h6.innerHTML = user.firstname.substring(0, 10);
    signUP.appendChild(signup_Img);
    signUP.appendChild(signup_h6);
};