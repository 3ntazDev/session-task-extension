let tasks = [];

const panel = document.createElement("div");
panel.id = "taskPanel";

panel.innerHTML = `
  <h3>Session Tasks</h3>
  <input id="taskInput" placeholder="Add a task..." />
  <button id="addTask">Add</button>
  <ul id="taskList"></ul>
`;

document.body.appendChild(panel);

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addTask");
const list = document.getElementById("taskList");

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(" " + task));
    list.appendChild(li);
  });
}

addBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;

  tasks.push(value);
  input.value = "";
  renderTasks();
};

window.addEventListener("beforeunload", (e) => {
  if (tasks.length > 0) {
    e.preventDefault();
    e.returnValue = "";
  }
});
