const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i"),
popupTitle = popupBox.querySelector("header p"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector(".textarea"),
addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novenber", "December"];
// getting localStorage notes if exist and parsing them
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    titleTag.focus();
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = "",
    descTag.value = "";
    addBtn.innerText = "Add a Code";
    popupTitle.innerText = "Add a new Code";
    popupBox.classList.remove("show");
});

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());  // removing all previous notes before adding new
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
        <div class="details">
            <p>${note.title}</p>
            <span><textarea id="editor-${index}" type="text" aria-label="First name" class="desctext form-control">${note.description}</textarea></span>
        </div>
        <div class="bottom-content">
            <span>${note.date}</span>
            <div class="settings">
                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                <ul class="menu-coding">
                <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                </ul>
            </div>
        </div>
    </li>`;

    addBox.insertAdjacentHTML("afterend", liTag);
    });
    notes.forEach((note, index) => {
    var editor = Mkcoding.fromTextArea(document.getElementById(`editor-${index}`),{
        mode: "text/x-python",
        theme: "dracula",
        lineNumbers: true,
        autoCloseBrackets: true,
     });
    })
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e =>{
        // removing show class from the setting menu on document click
        if(e.target.tagName != "I" || e.target != elem){
            elem.parentElement.classList.remove("show");
        }
    });
};

function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);  // removing selected note from array/tasks
    // saving updated notes to localstroge
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title, desc){
    isUpdate = true;
    updateId = noteId;
    addBox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerText = "update Note";
    popupTitle.innerText = "update a Note";

}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let noteTitle = titleTag.value,
    noteDesc = descTag.value;

    if(noteTitle || noteDesc){
        // getting month, day, year from the current date
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();
        
        let noteInfo = {
            title: noteTitle, description: noteDesc,
            date: `${month} ${day}, ${year}`
        }
        if(!isUpdate){
            notes.push(noteInfo);  // adding new note to notes
        }
        else{
            isUpdate = false;
            notes[updateId] = noteInfo; // updating specified note
        }
        // saving notes to localstorage
        localStorage.setItem("notes",JSON.stringify(notes));
        closeIcon.click();
        showNotes();
    };
});