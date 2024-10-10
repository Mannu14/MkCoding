//-Teachers-
const reviews = [
    {id: 1,name: "Manish jain",job: "Data Structure",email:"Not valid123@gmail.com",img: "MkCoding-2.png",text: "Unlock the power of efficiency and organization with Data Structures, where chaos turns into order, and complexity becomes simplicity.",texts: "My name is Manish Jain, and I specialize in the field of data structure. Data structure refers to the method of organizing and storing data within a computer system to facilitate efficient access and manipulation. It offers a structured approach to managing data elements, enabling effective execution of operations like insertion, deletion, searching, and sorting. Essentially, data structures establish the connections between data elements and their arrangement, which plays a crucial role in optimizing algorithms and enhancing the overall performance of a program. This description is provided by MkCoding." },
    {id: 2,name: "Susan Smith",job: "Web Developer",email:"Susan231@gmail.com",img: "MkCoding-1.jpeg",text: "Web development refers to the process of creating, building, and maintaining websites and web applications that are accessible via the internet.",texts: "My name is Susan, and my profession is in web development. I specialize in both front-end and back-end development. Front-End Development: Front-end development involves crafting the user interface and experience that visitors directly interact with. Utilizing technologies such as HTML, CSS, and JavaScript, front-end developers create visually appealing and interactive web pages. They focus on aspects like layout, design, responsiveness, and ensuring compatibility across various devices and browsers. Back-End Development: Back-end development revolves around the server-side of applications, managing data storage, processing, and business logic. Back-end developers are proficient in server-side programming languages such as Node.js, Python, Ruby, PHP, or Java, and work with databases like MySQL, PostgreSQL, MongoDB, among others. Their responsibilities include handling tasks such as user authentication, database operations, and server management. This description is provided by MkCoding."},
    {id: 3,name: "Kunal Jain",job: "App Developer",email:"Kunal321@gmail.com",img: "MkCoding-4.png",text: "App development, also known as mobile app development, refers to the process of creating software applications that run on mobile devices such as smartphones and tablets.",texts: "My name is Kunal Jain, and my profession is cross-platform app development. Cross-platform apps are developed using frameworks that enable developers to write code once and deploy it across multiple platforms. This method significantly reduces development time and effort, as a single codebase can be utilized for both iOS and Android platforms. Popular cross-platform frameworks include React Native, Flutter, Xamarin, and Ionic. Mobile app development encompasses a diverse range of applications, including games, social media platforms, productivity tools, e-commerce apps, health and fitness apps, educational apps, and more. This description is provided by MkCoding"},
    {id: 4,name: "JK Mishra",job: "Game Developer",email:"JK312@gmail.com",img: "MkCoding-5.png",text: "Game programmers write the code that brings the game to life.",texts: "My name is JK Mishra, and my profession is game development. A game developer is an individual or a team of professionals who are responsible for designing, creating, and developing video games for a wide range of platforms including consoles, PCs, mobile devices, and virtual reality systems. Game developers bring game concepts to fruition by programming, designing assets, implementing mechanics, and rigorously testing the final product. Within the field of game development, professionals work in various roles, each contributing to different aspects of the game's creation process. This description is provided by MkCoding."},
];
const img = document.getElementById("person-img");
const author = document.querySelector(".author");
const author_1 = document.querySelector(".author-1");
const job = document.querySelector(".job");
const job_1 = document.querySelector(".job-1");
const info = document.getElementById("info");
const infor = document.getElementById("infor");
const email = document.getElementById("email");

const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const randomBtn = document.querySelector(".random-btn");
let  currentItem = 0;
window.addEventListener("DOMContentLoaded",function(){
    showPerson(currentItem);
});
function showPerson(person){
    const item = reviews[currentItem];
    img.src = item.img;
    author.textContent = item.name;
    author_1.textContent = item.name;
    job.textContent = item.job;
    job_1.textContent = item.job;
    info.textContent = item.text;
    email.textContent = item.email;
    infor.textContent = item.texts;
};
prevBtn.addEventListener('click',function(){
    currentItem--;
    if(currentItem < 0){
        currentItem  = reviews.length - 1;
    }
    showPerson(currentItem);
});
nextBtn.addEventListener('click',function(){
    currentItem++;
    if(currentItem > reviews.length - 1){
        currentItem  = 0;
    }
    showPerson(currentItem);
});
randomBtn.addEventListener('click', function(){
    currentItem = Math.floor(Math.random()*reviews.length);
    showPerson(currentItem);
});