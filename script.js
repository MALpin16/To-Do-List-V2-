const taskField = document.getElementById('inputField');
const list = document.getElementById('list');
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const title = document.getElementById('title');

window.onload = function() {
    const storedTitle = localStorage.getItem('pageTitle');
    if (storedTitle !== null && storedTitle.trim() !== '') {
        const titleElement = document.getElementById('title');
        titleElement.textContent = storedTitle;

        localStorage.setItem('pageTitle', storedTitle);
    } else {
        // If there's no stored title, set it to "TITLE"
        title.textContent = "TITLE";
        localStorage.setItem('pageTitle', "TITLE");
    }
};

title.addEventListener('click', function() {
    const currentTitle = this.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentTitle;
    inputField.addEventListener('blur', function() {
        const newTitle = this.value.trim();
        if (newTitle !== '') {
            title.textContent = newTitle;
            localStorage.setItem('pageTitle', newTitle);
        }
        else {
            title.textContent = currentTitle;
        }
    });
    this.textContent = '';
    this.appendChild(inputField);
    inputField.focus();
});


function add(){
    const taskText = taskField.value.trim();
    if (taskText === '') return;

    const task = {text: taskText};
    tasks.push(task);
    
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskField.value = '';

    displayTasks();
}

function deleteTask(index){
    Swal.fire({
        title: "Kamu yakin?",
        text: "Kamu tidak akan bisa mengaksesnya lagi!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Berhasil di hapus!",
            icon: "success"
          });
          tasks.splice(index, 1);
          localStorage.setItem('tasks', JSON.stringify(tasks));
          displayTasks();
        }else{
            return;
        }
      });
}

function editTask(index){
    const li = list.childNodes[index];
    const span = li.querySelector('span');
    const button = li.querySelector('.edit-button');

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = tasks[index].text;

    li.replaceChild(inputField, span);
    button.innerText = 'Save';
    button.onclick = () => saveTask(index);
}

function saveTask(index){
    const li = list.childNodes[index];
    const inputField = li.querySelector('input');

    tasks[index].text = inputField.value;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}

function displayTasks(){
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <hr>
            <button class="edit-button" onclick="editTask(${index})">Edit</button>
            <button class="hapus-button" onclick="deleteTask(${index})">Hapus</button>`;
        list.appendChild(li);
    });
}

displayTasks();
