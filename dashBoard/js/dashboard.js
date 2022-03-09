notesObj = [];
noteObj = {};
var note;
var addBtn;
var editBtn;
var editTitle;
var editNote


showNotes();

function hideLabel() {
  $('.label').hide();

}
function showLabel() {
  $('.label').show();
}

// Menu Button: Click Event function
let flag = 1;
function show() {
  if (flag == 0) {
    hideLabel();
    flag = 1;
  } else {
    showLabel();
    flag = 0;
  }
}

function noteBlock() {
  document.getElementById('writeNote').style.display = "block";
  document.getElementById('takeNote').style.display = "none";
}

//Inner HTML

function innerHtml() {
  console.log("Calling Inner Html");
  let html = "";
  $(notesObj).each(function (index, element) {
    html += `
      <div class="edit_hover_class d-flex justify-content-center py-2" id="danger">
        <form id="writeNote">

          <div class="form-control form-input2 py-2">
            <div class="container-f py-2" id="noteContainer">

              <p id="${index}" onclick="editNote(event, ${element.id})" class="card-title">${element.title}</p>
              <p id="${index}" onclick="editNote(event, ${element.id})" class="card-text">${element.content}</p>
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

                  <button type="delete" id="${element.id}" onclick="deleteNote(${element.id}, event)"
                    class="btn btn-outline-danger btn-sm">Delete</button>

                <button type="edit"  id="edit" onclick="editNote( event, ${element.id} )"
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

// For Ajax Call
function httpCall(url, type, data = null) {
  let responseData = null;
  $.ajax({
    url: url,
    contentType: "application/json; charset=utf-8",
    timeout: 6000,
    data: JSON.stringify(data),
    async: false,
    type: type,
    headers: { "token": localStorage.getItem('token') },
    success: function (result) {
      // alert(result);
      console.log(result);
      responseData = result;
    },
    error: function (msg) {
      alert(msg);
      console.log(msg);
      responseData = msg;
    }
  });
  return responseData;
}

// Add Note

addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
  let url = "http://localhost:8080/users/saveNote/";
  e.preventDefault();

  if ($("#addTitle").val() == "" && $("#addContent").val() == "") {
    return alert("Please add A Whole Note...! or Atleast Title or Content...!")
  }
  else {
    noteObj.content = $("#addContent").val();
    noteObj.title = $("#addTitle").val();
  }
  // console.log(noteObj);
  if (noteObj) {
    console.log("inside if");
    let result = httpCall(url, "POST", noteObj);
    showNotes();
    return false;
  }

})

// Show Notes
function showNotes() {

  console.log("Inside show Note Ajax");
  let url = "http://localhost:8080/users/";
  let result = httpCall(url, "GET");
  // setTimeout(function(){}, 5000);

  if (result == null) {
    notesObj = [];
  }
  else {
    notesObj = result;
  }
  innerHtml();
  return false;
}

//Delete Note
function deleteNote(id, event) {

  
  event.preventDefault();
  let url = "http://localhost:8080/users/";
  console.log(id);
  console.log("Inside Delete Note Ajax");

  let result = httpCall(url + id, "DELETE");

  console.log(result);

  if (result == null) {
    notesObj = [];
  }
  
  note = notesObj.filter(note => note.id == id);
  let noteNo = notesObj.indexOf(note);

  notesObj.splice(noteNo);

  showNotes();
  console.log(result); 
  return false;
}

{
//Edit Note

function editNote(event, id) {

  event.preventDefault();
  
  document.getElementById("writeNote").style.display = "block";
  editTitle = document.getElementById("addTitle");
  editNote = document.getElementById("addContent");

  addBtn.style.display = "none"
  editBtn.style.display = "block"
  
  console.log(event);
  console.log(id);

  note = notesObj.filter(note => note.id == id);
  console.log(note);

  editTitle.value = note[0].title
  editNote.value = note[0].content
    
  showNotes();
 
  return false;
}

editBtn = document.getElementById('editBtn');
editBtn.addEventListener("click", function (event) {
  event.preventDefault();
  editTitle=document.getElementById("addTitle");
  editNote=document.getElementById("addContent");
 
  note[0].title = editTitle.value;
  note[0].content = editNote.value;

  
  let url = "http://localhost:8080/users/";

  let result = httpCall(url, "PUT", note[0]);

  console.log(result);

  if (result == null) {
    notesObj = [];
  }
  
  document.getElementById("writeNote").style.display = "none";
  showNotes();
  
})

}

