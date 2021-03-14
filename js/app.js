// if user adds a note store it in local storage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    let notes = localStorage.getItem('notes');
    let title = localStorage.getItem('title')
    let notesObj
    let titleObj
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
        titleObj = JSON.parse(title)
        // console.log(notesObj)
    }
    notesObj.push(addTxt.value)
    titleObj.push(addTitle.value)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('title', JSON.stringify(titleObj))
    addTxt.value = ''
    addTitle.value = ''
    // console.log(notesObj)
    showNotes();
})
// function to show notes from local storage 
function showNotes() {
    let notes = localStorage.getItem('notes')
    let title = localStorage.getItem('title')
    if (notes == null) {
        notesObj = [];
        titleObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
        titleObj = JSON.parse(title)

    }
    let html = ''
    notesObj.forEach(function (element, index) {
        html += `<div class="notesCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title greenText">${index+1 }. ${titleObj[index]} </h5>
            <p class = "card-text greenText"> ${element} </p>
            <button id = "${index}" onclick = "deleteNote(this.id)" class="btn btn-primary bg-green effect ">Delete note</button>
        </div>
    </div>`
    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `<h2 class = "greenText">Nothing to show ! use "add notes " section to add notes</h2>`
    }
}
// function to delete note
function deleteNote(index) {
    // console.log('i am deleting', index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1)
    titleObj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('title', JSON.stringify(titleObj))
    showNotes();

}
// function to search notes
let search = document.getElementById('searchTxt')
search.addEventListener('input',function(){
    let inputVal = search.value.toLowerCase();
    // console.log('input event is being fired',inputVal)
    let noteCards = document.getElementsByClassName('notesCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerHTML
        // console.log( cardTxt.innerHTML)
        if(cardTxt.includes(inputVal))
        {
            element.style.display = 'block';
        }
        else
        {
            element.style.display = 'none';
        }

    })
})