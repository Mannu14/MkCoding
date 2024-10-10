//  online offline
const wrapper = document.querySelector(".wrapper-Network");
const toast = wrapper.querySelector(".toast-Network");
const wifiIcon = wrapper.querySelector(".icon-Network");
const title = wrapper.querySelector(".details-Network span");
const subTitle = wrapper.querySelector(".details-Network p");
const closeIcon = wrapper.querySelector(".close-icon-Network");
function onLineUser() {
    // Handle online status
    toast.classList.remove("offline");
    title.innerText = "You're online now";
    subTitle.innerText = "Hurray! Internet is connected.";
    wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
    closeIcon.onclick = () => {
        wrapper.classList.add("hide");
    };
    setTimeout(() => {
        wrapper.classList.add("hide");
    }, 5000);
};
function offlinUser() {
    wrapper.classList.remove("hide");
    toast.classList.add("offline");
    title.innerText = "You're offline now";
    subTitle.innerText = "Opps! Internet is disconnected";
    wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';

    closeIcon.onclick = () => {
        wrapper.classList.add("hide");
    }
    setTimeout(function () {
        wrapper.classList.add("hide");
    }, 5000);
};
window.onload = () => {
    // Check online status when the page loads
    myFunction();
    function simulateProgressBar() {
        const progressBar = document.querySelector('.progress-Network');
        // Set the width of the progress bar to 100% in 5 seconds
        progressBar.style.width = '100%';
        // You can adjust the duration and width as needed
        setTimeout(() => {
            // Hide the toast after the progress is complete
            const toastWrapper = document.querySelector('.wrapper-Network');
            toastWrapper.classList.add('hide');
        }, 5000);
    };
    simulateProgressBar();
};
function myFunction() {
    if (navigator.onLine) {
        onLineUser();
    } else {
        offlinUser();
    };
};
// Event listener for online and offline events
window.addEventListener('online', function () {
    onLineUser();
});

window.addEventListener('offline', function () {
    offlinUser();
});