const form = document.getElementById("form");
const input = document.getElementById("taskInput");
const button = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const deleteBtn = document.getElementById("deleteButton");
const prioritas = document.getElementById("Prioritas");
const date = document.getElementById("date");
const statusBar = document.getElementById("status");
const statusAktif = document.getElementById("statusAktif");
const statusSelesai = document.getElementById("statusSelesai");
const statusPrioritas = document.getElementById("statusPrioritas");
const msg = document.getElementById("msg");
const msg2 = document.getElementById("msg2");
const msg3 = document.getElementById("msg3");

// Realtime Status Bar
let statusTask = 0;
let updateStatusPrioritas = 0;

let updateStatusBar = () => {
  statusBar.innerText = statusTask;
  statusAktif.innerText = statusTask;
  statusPrioritas.innerText = updateStatusPrioritas;
};
//check button
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("checkButton")) {
    e.target.classList.toggle("checked");
    statusSelesai.innerText = `${document.getElementsByClassName("checked").length}`;
    statusAktif.innerText = `${statusTask - document.getElementsByClassName("checked").length}`;
    statusPrioritas.innerText = `${updateStatusPrioritas - statusSelesai.innerText}`;
  }
});

// Form Submit Event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

// Form Validation
let formValidation = () => {
  if (
    input.value === "" ||
    date.value === "" ||
    prioritas.value === "Prioritas"
  ) {
    msg.textContent = "*Tidak boleh kosong!";
    msg2.textContent = "*Tidak boleh kosong!";
    msg3.textContent = "*Tidak boleh kosong!";
  } else {
    statusTask++;

    if (prioritas.value === "Tinggi") {
      updateStatusPrioritas++;
    }
    updateStatusBar();
    acceptData();
    msg.textContent = "";
    msg2.textContent = "";
    msg3.textContent = "";
  }
};

// Accept Data
let data = {};
let acceptData = () => {
  createPost();
};

// Create Post
let createPost = () => {
  taskList.innerHTML += ` 
        <div class="detailTask">
          <div class="kiri">
            <button class="checkButton"></button>
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

// Delete and Edit Post
let deletePost = (e) => {
  e.parentElement.parentElement.parentElement.remove();
  statusTask--;
  updateStatusPrioritas--;
  updateStatusBar();
};

// Edit Post
let editPost = (e) => {
  let selectedTask = e.parentElement.parentElement.parentElement;
  input.value = selectedTask.children[1].children[0].innerHTML;
  date.value = selectedTask.children[1].children[1].children[1].innerHTML;
  prioritas.value = selectedTask.children[1].children[1].children[0].innerHTML;
  selectedTask.remove();
  // statusSelesai.innerText = `0`;
  // statusPrioritas.innerText = `0`;
  statusTask--;
  if (prioritas.value === "Tinggi") {
      updateStatusPrioritas--;
    }
  updateStatusBar();
};

// Delete All Tasks
deleteBtn.addEventListener("click", () => {
  taskList.innerHTML = "";
  statusSelesai.innerText = `0`;
  statusTask = 0;
  updateStatusBar();
});
