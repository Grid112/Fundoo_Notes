showNotes();

function hideLabel() {
  $('.label').hide();

  // $(".nav_side li").css("background-color", "#beb9b9").hide();
}
function showLabel() {
  $('.label').show();
  // $('.nav_side li').css("background-color", "#beb9b9").show();
}

// Menu Button: Click Event function
let flag = 1;
function show() {
  if (flag == 0) {
    hideLabel();
    // $('.nav_side li').css("background-color", "#beb9b9").hide();
    flag = 1;
  } else {
   showLabel();
    // $('.nav_side li').css("background-color", "#beb9b9").show();
    flag = 0;
  }
}

function noteBlock() {
  document.getElementById('writeNote').style.display = "block";
  document.getElementById('takeNote').style.display = "none";
}


// let submit=document.querySelector(".submit");
// let notesElem=document.querySelector('.notes');
// let title=document.querySelector("#text");
// let desc=document.querySelector('#desc');
// let notes=JSON.parse(localStorage.getItem("notes"));
// if(notes){
//     notes.forEach(element => {
//         addNotes(element)
//     });
// }
// submit.addEventListener("click", (e)=>{
//     e.preventDefault();
//     addNotes()
// })
// function addNotes(obj) {
//     let card=document.createElement("div");
//     card.classList.add("card");
//     let titleval=title.value;
//     let descVal=desc.value;
//     if(obj){
//         titleval=obj.title;
//         descVal=obj.desc;
//     }
//     if(titleval){
//         card.innerHTML=`<h3>${titleval}</h3>
//                                     <p class="ptag">${descVal}</p>
//                              <button class="del">Delete</button>`;
//         notesElem.appendChild(card);
//         updateLs()
//     }}




let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
  console.log('clicked');
  let addTitle = document.getElementById('addTitle');
  let addNote = document.getElementById('addNote');

  if (addTitle.value == "" && addNote.value == "") {
    return alert("Please add A Note...!")
  }

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let noteObj = {
    title: addTitle.value,
    note: addNote.value
  }
  notesObj.push(noteObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addNote.value = "";
  addTitle.value = "";
  $("#writeNote").hide();
  $("#takeNote").show();
  showNotes();
});


// show note
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="edit_hover_class d-flex justify-content-center py-2" id="danger">
      <form id="writeNote">
    
        <div class="form-control form-input2 py-2">
          <div class="container-f py-2">
    
            <p id="${index}" onclick="editNote(this.id)" class="card-title">${element.title}</p>
            <p id="${index}" onclick="editNote(this.id)" class="card-text">${element.note}</p>
            <div class="container-y py-2" >
            <span type="span" id="remindMe" class="btn btn-default btn">
                <img src="/dashBoard/assets/bell_Icon.png" height="15" alt="RemindMe_Icon">
            </span>
            <span type="span" id="collaborator" class="btn btn-default btn">
                <img src="/dashBoard/assets/collaborator_icon.png" height="15"
                    alt="Collaborator_Icon">
            </span>
            <span type="span" id="background" class="btn btn-default btn">
                <img src="/dashBoard/assets/background_icon.png" height="15" alt="Background_Icon">
            </span>
            <span type="span" id="addImage" class="btn btn-default btn">
                <img src="/dashBoard/assets/addImage_Icon.png" height="15" alt="AddImage_Icon">
            </span>
            <span type="span" id="archive" class="btn btn-default btn">
                <img src="/dashBoard/assets/archoive_icon.png" height="15" alt="Archive_Icon">
            </span>
            
                <button type="delete" id="${index}" onclick="deleteNote(this.id)"
                    class="btn btn-outline-danger btn-sm">Delete</button>
                
                <button type="edit" id="${index}" onclick="editNote(this.id)"
                    class="btn btn-outline-warning btn-sm">Edit</button>             
          </div>  
        </div> 
      </form>
    </div>
    
    `;
  });

  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = "";
  }
}

// // delete note
// function deleteNote(index) {
//   console.log(index);

//   let notes = localStorage.getItem("notes");
//   if (notes == null) {
//     notesObj = [];
//   }
//   else {
//     notesObj = JSON.parse(notes);
//   }

//   notesObj.splice(index, 1);
//   localStorage.setItem("notes", JSON.stringify(notesObj));
//   showNotes();
// }

// edit note
// function editNote(index) {
//   let notes = localStorage.getItem("notes");
//   if (addTitle.value != "" || addNote.value != "") {
//     alert("edit note not working, clear data instead");
//   }
//   if (notes == null) {
//     notesObj = [];
//   }
//   else {
//     notesObj = JSON.parse(notes);
//   }
//   // console.log(notesObj);
//   notesObj.findIndex((element, index) => {
//     addTitle.value = element.title;
//     addNote.value = element.note;
//   })
//   notesObj.splice(index, 1);
//   localStorage.setItem("notes", JSON.stringify(notesObj));
//   // showNotes();
// }
// showNotes();

// search notes
// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function(){

//     let inputVal = search.value.toLowerCase();
//     // console.log('Input event fired!', inputVal);
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element){
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;
//         if(cardTxt.includes(inputVal)){
//             element.style.display = "block";
//         }
//         else{
//             element.style.display = "none";
//         }
//         // console.log(cardTxt);
//     })
// })
// console.log('hi there')

// let addBtn = document.getElementById('addBtn');
// addBtn.addEventListener("click", function (e) {
//   let url = "http://localhost:8080/users/saveNote/";
//   let noteObj = {};
//   noteObj.content = $("#addNote").val();
//   noteObj.title = $("#addTitle").val();
//   console.log(noteObj);
//   alert(noteObj);  
//   e.preventDefault();
//   // function AjaxSucceeded(result) {

//   // }

//   if (noteObj) {
//     console.log("inside if");
//     $.ajax({
//       url: url,
//       contentType: "application/json; charset=utf-8",
//       timeout: 6000,
//       data: JSON.stringify(noteObj),
//       type: "POST",
//       headers: { "token": localStorage.getItem('token') },
//       success: function (result) {
//         alert(result);
//         console.log(result);
//       },
//       error: function (msg) {
//         alert(msg);
//         console.log(msg);

//       }
//     });
//     return false;
//   }
 
//   // showNotes();
// })
