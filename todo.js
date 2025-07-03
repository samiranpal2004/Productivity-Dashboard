let dashboard = document.getElementById("dashboard");
let todoCard = document.getElementById("todo");
let todoSection = document.getElementById("todoSection");
let todoCloeBtn = document.getElementById("todoClose");

todoCard.addEventListener("click", () => {
  console.log("clicked todo card");
  setTimeout(() => {
    dashboard.classList.add("hidden");
    todoSection.classList.remove("hidden");
  }, 200);
});

todoCloeBtn.addEventListener("click", () => {
  setTimeout(() => {
    dashboard.classList.remove("hidden");
    todoSection.classList.add("hidden");
  }, 200);
});

let addTaskBtn = document.getElementById("addTaskBtn");
let allTaskContainer = document.getElementById("allTasks");

let taskCount = 1;

let taskArr = [];

let renderTasks = (taskObj, idx) => {
  let task = document.createElement("div");
  task.setAttribute("id", `task${idx}`);
  task.className =
    "flex justify-between bg-gray-800 items-center rounded-lg p-3 mb-3";

  task.innerHTML = `
    <label class="flex gap-4 items-start">
      <input 
        type="checkbox"
        class="w-5 h-5 rounded-full appearance-none outline outline-blue-400 outline-2 checked:bg-blue-500 cursor-pointer mt-1"
        ${taskObj.completed ? "checked" : ""}
      />
      <div>
        <p class="font-semibold ml-2 ${
          taskObj.important ? "text-red-500" : ""
        } ${taskObj.completed ? "line-through text-gray-500" : ""}">
          ${taskObj.input}
        </p>
        <p class="text-sm ml-2 text-gray-400">${taskObj.desc}</p>
      </div>
    </label>
    <button class="delete-btn cursor-pointer rounded active:scale-[0.94] hover:bg-red-500 duration-200 outline outline-1.5 outline-gray-200 h-8 px-2 py-1">
      <i class="ri-delete-bin-line"></i>
    </button>
  `;

  allTaskContainer.appendChild(task);
};

window.addEventListener("load", () => {
  console.log("window loaded");
  let storedTasks = JSON.parse(localStorage.getItem("taskArr")) || [];

  taskArr = storedTasks;
  storedTasks.forEach((taskObj, idx) => {
    renderTasks(taskObj, idx + 1);
  });
  taskCount = storedTasks.length + 1; // Update taskCount based on stored tasks
});

// localStorage.clear();
addTaskBtn.addEventListener("click", () => {
  console.log("clicked add task button");
  let taskInput = document.getElementById("todoTask").value;
  let taskDescInput = document.getElementById("todoDesc").value;
  let isImportant = document.getElementById("todoCheck").checked;

  if (taskInput === "") {
    alert("Add a task");
    return;
  }

  let obj = {
    input: taskInput.trim(),
    desc: taskDescInput.trim(),
    important: isImportant,
    completed: false, // New property to track completion status
  };

  taskArr.push(obj);
  localStorage.setItem("taskArr", JSON.stringify(taskArr));
  renderTasks(obj, taskCount);
  taskCount++;

  document.getElementById("todoTask").value = "";
  document.getElementById("todoDesc").value = "";
  document.getElementById("todoCheck").checked = false;
});

allTaskContainer.addEventListener("click", function (e) {
  if (e.target.closest(".delete-btn")) {
    const taskElement = e.target.closest(".delete-btn").parentElement;
    taskElement.classList.add("opacity-0", "scale-95");
    let taskId = taskElement.id;
    let taskIndex = parseInt(taskId.replace("task", "")) - 1;
    // Remove task from taskArr
    taskArr.splice(taskIndex, 1);
    // Update task IDs in taskArr
    localStorage.setItem("taskArr", JSON.stringify(taskArr));
    setTimeout(() => taskElement.remove(), 300); // smooth removal
  }
  // CHECKBOX – STRIKE THROUGH
  if (e.target.type === "checkbox") {
    const taskElement =
      e.target.closest(".delete-btn")?.parentElement ||
      e.target.closest("div[id^='task']");
    const id = taskElement.id;
    const index = parseInt(id.replace("task", "")) - 1;

    const label = e.target.closest("label");
    const taskTitle = label.querySelector("p");

    taskArr[index].completed = e.target.checked;
    localStorage.setItem("taskArr", JSON.stringify(taskArr));

    if (e.target.checked) {
      taskTitle.classList.add("line-through", "text-gray-500");
    } else {
      taskTitle.classList.remove("line-through", "text-gray-500");
    }
  }
});
