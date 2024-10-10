const pswrd_1 = document.querySelector("#pswrd_1"),
pswrd_2 = document.querySelector("#pswrd_2"),
btn = document.querySelector("#submit-btn"),
showBtn = document.querySelector(".show");

const indicator = document.querySelector(".indicator"),
passInput = document.querySelector("#pswrd_1"),
weak = document.querySelector(".weak"),
medium = document.querySelector(".medium"),
strong = document.querySelector(".strong"),
text = document.querySelector(".text");

let regExpWeak = /[a-z]/;
let regExpMedium = /\d+/;
let regExpStrong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;
function active(){
        if(passInput.value != ""){
            let  no = ''
            indicator.style.display = "block";
            indicator.style.display = "flex";
            if(passInput.value.length <= 3 && (passInput.value.match(regExpWeak)) || (passInput.value.match(regExpMedium)) || (passInput.value.match(regExpStrong)))  no=1;
            if(passInput.value.length >= 6 && (passInput.value.match(regExpWeak) && passInput.value.match(regExpMedium)) || (passInput.value.match(regExpMedium) && passInput.value.match(regExpStrong)) || (passInput.value.match(regExpWeak) && passInput.value.match(regExpStrong))) no=2;
            if(passInput.value.length >=6 && passInput.value.match(regExpWeak) && passInput.value.match(regExpMedium) && passInput.value.match(regExpStrong)) no=3;
            if(no == 1){
                weak.classList.add("active");
                text.style.display = "block";
                text.textContent = "Your Password is too weak";
                text.classList.add("weak");
            }
            if(no == 2){
                medium.classList.add("active");
                text.textContent = "Your Password is medium";
                text.classList.add("medium");
            }else{
                medium.classList.remove("active");
                text.classList.remove("medium");
                
            }
            if(no == 3){
                medium.classList.add("active");
                strong.classList.add("active");
                text.textContent = "Your Password is strong";
                text.classList.add("strong");
                // =========
                btn.removeAttribute("disabled", "");
                btn.classList.add("active");
                pswrd_2.removeAttribute("disabled", "");
            }else{
                strong.classList.remove("active");
                text.classList.remove("strong");
                showBtn.style.display = "none"
                pswrd_1.type = "password";
                pswrd_2.type = "password";
                // =========
                btn.setAttribute("disabled", "");
                btn.classList.remove("active");
                pswrd_2.setAttribute("disabled", "");
            }
        }else{
            indicator.style.display = "none";
            text.style.display = "none";
            showBtn.style.display = "none"
            // =========
            btn.setAttribute("disabled", "");
            btn.classList.remove("active");
            pswrd_2.setAttribute("disabled", "");
        }
    }

function active_2(){
    if(pswrd_2.value != ""){
        showBtn.style.display = "block";
        showBtn.onclick = function(){
            if((pswrd_1.type == "password") && (pswrd_2.type == "password")){
                pswrd_1.type = "text";
                pswrd_2.type = "text";
                this.textContent = "HIDE";
                this.classList.add("active");
             }else{
                pswrd_1.type = "password";
                pswrd_2.type = "password";
                this.textContent = "SHOW";
                this.classList.remove("active");
             }
        }
    }else{
        showBtn.style.display = "none";
    }
}
// online offline
const wrapper = document.querySelector(".wrapper-Network");
const toast = wrapper.querySelector(".toast-Network");
const wifiIcon = wrapper.querySelector(".icon-Network");
const title = wrapper.querySelector(".details-Network span");
const subTitle = wrapper.querySelector(".details-Network p");
const closeIcon = wrapper.querySelector(".close-icon-Network");

function onLineUser() {
    toast.classList.remove("offline");
    title.innerText = "You're online now";
    subTitle.innerText = "Hurray! Internet is connected.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';

    closeIcon.onclick = () => {
        wrapper.classList.add("hide");
    }

    setTimeout(() => {
        wrapper.classList.add("hide");
    }, 5000);
}

function offlinUser() {
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're offline now";
    subTitle.innerText = "Opps! Internet is disconnected";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';

    closeIcon.onclick = () => {
        wrapper.classList.add("hide");
    };
    setTimeout(function () {
        wrapper.classList.add("hide");
    }, 5000);
};

window.onload = () => {
    myFunction();
    function simulateProgressBar() {
        const progressBar = document.querySelector('.progress-Network');
        progressBar.style.width = '100%';
        setTimeout(() => {
            const toastWrapper = document.querySelector('.wrapper-Network');
            toastWrapper.classList.add('hide');
        }, 5000);
    }
    simulateProgressBar();
}

function myFunction() {
    if (navigator.onLine) {
        onLineUser();
    } else {
        offlinUser();
    };
};
window.addEventListener('online', function () {
    onLineUser();
});

window.addEventListener('offline', function () {
    offlinUser();
});
// email send timer -
const sendOTP_email = document.querySelector('#sendOTP-email');
const OtpTimer = document.querySelector('.OtpTimer');
let timerValue = 300; // 5 minutes in seconds
let timerId;

sendOTP_email.addEventListener('click', function () {
    startTimer();
});
function startTimer() {
    clearTimeout(timerId);
    timerValue = 300;
    updateTimer();
    sendOTP_email.innerText = 'Sent';
    sendOTP_email.style.background = 'rgb(99 225 231)';
}
function updateTimer() {
    const minutes = Math.floor(timerValue / 60);
    const seconds = timerValue % 60;
    OtpTimer.innerText = `${minutes} : ${seconds}`;

    if (timerValue > 0) {
        timerValue--;
        timerId = setTimeout(updateTimer, 1000);
    } else {
        sendOTP_email.innerText = 'Re-Send';
        sendOTP_email.style.background = '#a9ff00';
    };
};
sendOTP_email.addEventListener('click', function () {
    startTimer();
});