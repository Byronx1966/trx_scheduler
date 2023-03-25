const socket = io();

const taskTable = document.getElementById("task-table").getElementsByTagName("tbody")[0];
const logTable = document.getElementById("log-table").getElementsByTagName("tbody")[0];
const taskForm = document.getElementById("task-form");

socket.on("task", (task) => {
  addTaskToTable(task);
});

socket.on("log", (log) => {
  addLogToTable(log);
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const task = {
    fromAddress: formData.get("fromAddress"),
    toAddress: formData.get("toAddress"),
    amount: formData.get("amount"),
    interval: formData.get("interval"),
  };

  socket.emit("addTask", task);

  taskForm.reset();
});

function addTaskToTable(task) {
  const row = taskTable.insertRow();

  row.insertCell().textContent = task.id;
  row.insertCell().textContent = task.fromAddress;
  row.insertCell().textContent = task.toAddress;
  row.insertCell().textContent = task.amount;
  row.insertCell().textContent = task.interval;

  const actionsCell = row.insertCell();
  const startButton = document.createElement("button");
  startButton.textContent = "启动";
  startButton.addEventListener("click", () => {
    socket.emit("startTask", task.id);
  });
  actionsCell.appendChild(startButton);

  const stopButton = document.createElement("button");
  stopButton.textContent = "停止";
  stopButton.addEventListener("click", () => {
    socket.emit("stopTask", task.id);
  });
  actionsCell.appendChild(stopButton);
}

function addLogToTable(log) {
  const row = logTable.insertRow();

  row.insertCell().textContent = log.taskId;
  row.insertCell().textContent = log.message;
  row.insertCell().textContent = log.type;
  row.insertCell().textContent = new Date(log.createdAt).toLocaleString();
}
