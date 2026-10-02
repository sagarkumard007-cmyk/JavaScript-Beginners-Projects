const form = document.getElementById("task-form");
const taskName = document.getElementById("task-name");
const progressStatus = document.getElementById("progress_status");
const dueDate = document.getElementById("due-date");
const priority = document.getElementById("priority");
const taskRows = document.getElementById("taskTbody");
const totalCount = document.querySelector(".task-count");
const completedCount = document.querySelector(".completed-count");
const pendingCount = document.querySelector(".pending-count");
const overdueCount = document.querySelector(".overdue-count");

const themeButton = document.getElementById("theme-btn");
const themeIcon = themeButton.querySelector("i");

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeIcon.className = isDark
    ? "fa-solid fa-sun"
    : "fa-regular fa-moon";
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme",
  );
  localStorage.setItem("taskflow-theme", isDark ? "dark" : "light");
}

setTheme(localStorage.getItem("taskflow-theme") === "dark");
themeButton.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark"));
});


const statusLabels = {
  pending: "Pending",
  progress: "In Progress",
  completed: "Completed",
};

const statusClasses = {
  pending: "s3",
  progress: "s1",
  completed: "s2",
};

const priorityClasses = {
  Low: "hi4",
  Medium: "hi2",
  High: "hi1",
};

function createCell(content) {
  const cell = document.createElement("div");
  cell.className = "task-cell";
  cell.setAttribute("role", "cell");
  cell.textContent = content;
  return cell;
}

function updateDashboard() {
  const rows = Array.from(taskRows.children);
  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  totalCount.textContent = String(rows.length);
  completedCount.textContent = String(
    rows.filter((row) => row.dataset.status === "completed").length,
  );
  pendingCount.textContent = String(
    rows.filter((row) => row.dataset.status === "pending").length,
  );
  overdueCount.textContent = String(
    rows.filter(
      (row) =>
        row.dataset.status !== "completed" &&
        row.dataset.dueDate &&
        row.dataset.dueDate < todayString,
    ).length,
  );
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = taskName.value.trim();
  if (!name) {
    taskName.focus();
    return;
  }

  const row = document.createElement("div");
  row.className = "task-row";
  row.setAttribute("role", "row");
  row.dataset.status = progressStatus.value;
  row.dataset.dueDate = dueDate.value;

  const nameCell = createCell(name);

  const statusCell = createCell("");
  const statusBadge = document.createElement("span");
  statusBadge.className = statusClasses[progressStatus.value];
  statusBadge.textContent = statusLabels[progressStatus.value];
  statusCell.append(statusBadge);

  const formattedDate = dueDate.value
    ? new Date(`${dueDate.value}T00:00:00`).toLocaleDateString()
    : "—";
  const dateCell = createCell(formattedDate);

  const priorityCell = createCell("");
  const priorityBadge = document.createElement("span");
  priorityBadge.className = priorityClasses[priority.value];
  priorityBadge.textContent = priority.value;
  priorityCell.append(priorityBadge);

  const actionsCell = createCell("");
  actionsCell.classList.add("task-actions");

  const completeButton = document.createElement("button");
  completeButton.type = "button";
  completeButton.className = "complete-task";
  completeButton.textContent = "Mark complete";
  completeButton.disabled = row.dataset.status === "completed";
  if (completeButton.disabled) {
    completeButton.textContent = "Completed";
  }
  completeButton.addEventListener("click", () => {
    row.dataset.status = "completed";
    statusBadge.className = statusClasses.completed;
    statusBadge.textContent = statusLabels.completed;
    completeButton.disabled = true;
    completeButton.textContent = "Completed";
    updateDashboard();
  });

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-task";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    row.remove();
    updateDashboard();
  });

  actionsCell.append(completeButton, deleteButton);
  row.append(nameCell, statusCell, dateCell, priorityCell, actionsCell);
  taskRows.append(row);
  updateDashboard();
  form.reset();
});
