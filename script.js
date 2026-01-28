const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const deleteBtn = document.getElementById("deleteButton");
const prioritas = document.getElementById("Prioritas");
const date = document.getElementById("date");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");

  formValidation();
});

let formValidation = () => {
  if (
    input.value === "" ||
    date.value === "" ||
    prioritas.value === "Prioritas"
  ) {
    alert("Tolong diisi dengan lengkap yaa!");
  } else {
    acceptData();
  }
};

let data = {};
let acceptData = () => {
  createPost();
};

let createPost = () => {
  taskList.innerHTML += ` 
        <div class="detailTask">
          <div class="kiri">
            <button></button>
          </div>
          <div class="tengah">
            <p>${input.value}</p>
            <div class="bawah">
              <p class="prioritas">${prioritas.value}</p>
              <p id="tanggal">${date.value}</p>
            </div>
          </div>
          <div class="kanan">
            <span class="options">
              <i onClick="deletePost(this)" class='bx  bx-trash'></i> 
              <i onClick="editPost(this)" class='bx  bx-edit'></i> 
            </span>
          </div>
        </div>
  `;

  const taskTerakhir = taskList.lastElementChild;
  const prioritasEl = taskTerakhir.querySelector(".prioritas");

  if (prioritas.value === "Tinggi") {
    prioritasEl.style.color = "red";
    prioritasEl.style.backgroundColor = "rgb(68, 26, 26)";
  } else if (prioritas.value === "Sedang") {
    prioritasEl.style.color = "orange";
    prioritasEl.style.backgroundColor = "rgb(145, 94, 0)";
  } else if (prioritas.value === "Rendah") {
    prioritasEl.style.color = "green";
    prioritasEl.style.backgroundColor = "lightgreen";
  }

  input.value = "";
  date.value = "";
  prioritas.value = "";
};



let deletePost = (e) => {
  e.parentElement.parentElement.parentElement.remove();
}

let editPost = (e) => {
  let selectedTask = e.parentElement.parentElement.parentElement;
  input.value = selectedTask.children[1].children[0].innerHTML;
  date.value = selectedTask.children[1].children[1].children[1].innerHTML;
  prioritas.value = selectedTask.children[1].children[1].children[0].innerHTML;
  selectedTask.remove();
};

deleteBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
});
