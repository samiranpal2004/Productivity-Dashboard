(() => {
  let dashboard = document.getElementById("dashboard");
  let pomodoroCard = document.querySelector("#pomodoro");
  let pomodoroSection = document.getElementById("pomodoroSection");
  let pomodoroCloeBtn = document.getElementById("pomodoroClose");

  pomodoroCard.addEventListener("click", () => {
    console.log("clicked pomodoro card");
    setTimeout(() => {
      dashboard.classList.add("hidden");
      pomodoroSection.classList.remove("hidden");
    }, 200);
  });

  pomodoroCloeBtn.addEventListener("click", () => {
    setTimeout(() => {
      dashboard.classList.remove("hidden");
      pomodoroSection.classList.add("hidden");
    }, 200);
  });

  let pomoBtn = document.querySelector("#mainPomo");
  let shortBtn = document.querySelector("#shortBreak");
  let longBtn = document.querySelector("#longBreak");

  let pomoTimer = document.querySelector("#pomoTimer");
  let shortTimer = document.querySelector("#shortTimer");
  let longTimer = document.querySelector("#longTimer");

  pomoBtn.addEventListener("click", () => {
    pomoTimer.classList.remove("hidden");
    pomoBtn.classList.add(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    shortTimer.classList.add("hidden");
    shortBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    longTimer.classList.add("hidden");
    longBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
  });
  shortBtn.addEventListener("click", () => {
    pomoTimer.classList.add("hidden");
    pomoBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    shortTimer.classList.remove("hidden");
    shortBtn.classList.add(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    longTimer.classList.add("hidden");
    longBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
  });
  longBtn.addEventListener("click", () => {
    pomoTimer.classList.add("hidden");
    pomoBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    shortTimer.classList.add("hidden");
    shortBtn.classList.remove(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
    longTimer.classList.remove("hidden");
    longBtn.classList.add(
      "outline",
      "outline-1.5",
      "outline-gray-800",
      "bg-gray-900"
    );
  });

  let pomoStartBtn = document.querySelector("#pomoStartBtn");
  let pomoResetBtn = document.querySelector("#pomoResetBtn");
  let pomoTime = document.querySelector("#pomoTime");

  let totalPomoTime = 25 * 60;
  let timer = null;
  let formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    pomoTime.innerText = `${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`;
    return pomoTime;
  };
  let resetTime = () => {
    clearInterval(timer); // ✅ stop timer
    totalPomoTime = 25 * 60;
    formatTime(totalPomoTime);
    pomoStartBtn.innerText = "START";
    pomoStartBtn.classList.add("bg-gray-900", "hover:bg-gray-800");
    pomoStartBtn.classList.remove("bg-red-700", "hover:bg-red-600");
  };
  pomoResetBtn.addEventListener("click", () => {
    resetTime(totalPomoTime);
    pomoResetBtn.classList.add("hidden");
  });
  pomoStartBtn.addEventListener("click", () => {
    if (pomoStartBtn.innerHTML == "START") {
      pomoStartBtn.innerHTML = "STOP";
      pomoStartBtn.classList.remove("bg-gray-900");
      pomoStartBtn.classList.remove("hover:bg-gray-800");
      pomoStartBtn.classList.add("bg-red-700");
      pomoStartBtn.classList.add("hover:bg-red-600");
      pomoResetBtn.classList.remove("hidden");

      timer = setInterval(() => {
        totalPomoTime--;
        formatTime(totalPomoTime);
        if (totalPomoTime === 0) {
          clearInterval(timer);
          resetTime();
        }
      }, 1000);
    } else if (pomoStartBtn.innerHTML == "STOP") {
      pomoStartBtn.innerHTML = "START";
      clearInterval(timer);
      pomoStartBtn.classList.add("bg-gray-900");
      pomoStartBtn.classList.add("hover:bg-gray-800");
      pomoStartBtn.classList.remove("bg-red-700");
      pomoStartBtn.classList.remove("hover:bg-red-600");
    }
  });

  // Short Break Timer

  let sbStartBtn = document.querySelector("#sbStartBtn");
  let shortTime = document.querySelector("#shortTime");
  let totalSbTime = 5 * 60;

  let formatSbTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    shortTime.innerText = `${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`;
    return shortTime;
  };

  sbStartBtn.addEventListener("click", () => {
    if (sbStartBtn.innerHTML == "START") {
      sbStartBtn.innerHTML = "STOP";
      sbStartBtn.classList.remove("bg-gray-900");
      sbStartBtn.classList.remove("hover:bg-gray-800");
      sbStartBtn.classList.add("bg-red-700");
      sbStartBtn.classList.add("hover:bg-red-600");

      timer = setInterval(() => {
        totalSbTime--;
        formatSbTime(totalSbTime);
        if (totalSbTime === 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else if (sbStartBtn.innerHTML == "STOP") {
      sbStartBtn.innerHTML = "START";
      clearInterval(timer);
      sbStartBtn.classList.add("bg-gray-900");
      sbStartBtn.classList.add("hover:bg-gray-800");
      sbStartBtn.classList.remove("bg-red-700");
      sbStartBtn.classList.remove("hover:bg-red-600");
    }
  });

  //long break timer
  let lbStartBtn = document.querySelector("#lbStartBtn");
  let longTime = document.querySelector("#longTime");
  let totalLbTime = 30 * 60;

  let formatLbTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    longTime.innerText = `${min < 10 ? "0" + min : min}:${
      sec < 10 ? "0" + sec : sec
    }`;
    return longTime;
  };

  lbStartBtn.addEventListener("click", () => {
    if (lbStartBtn.innerHTML == "START") {
      lbStartBtn.innerHTML = "STOP";
      lbStartBtn.classList.remove("bg-gray-900");
      lbStartBtn.classList.remove("hover:bg-gray-800");
      lbStartBtn.classList.add("bg-red-700");
      lbStartBtn.classList.add("hover:bg-red-600");

      timer = setInterval(() => {
        totalLbTime--;
        formatLbTime(totalLbTime);
        if (totalLbTime === 0) {
          clearInterval(timer);
        }
      }, 1000);
    } else if (lbStartBtn.innerHTML == "STOP") {
      lbStartBtn.innerHTML = "START";
      clearInterval(timer);
      lbStartBtn.classList.add("bg-gray-900");
      lbStartBtn.classList.add("hover:bg-gray-800");
      lbStartBtn.classList.remove("bg-red-700");
      lbStartBtn.classList.remove("hover:bg-red-600");
    }
  });

  let inputField = document.querySelector("#inputTask input");
  let addTaskBtn = document.querySelector("#inputTask button");
  let taskList = document.querySelector("#taskList");

  const maxTasks = 3;

  let updateCurrentTask = () => {
    let firstTask = taskList.querySelector("label p");
    let currentTaskDisplay = document.getElementById("currentTask");

    if (firstTask) {
      currentTaskDisplay.innerHTML = `${firstTask.innerText}`;
    } else {
      currentTaskDisplay.innerHTML = "No Task is there in task list";
    }
  };

  let updateTaskListeners = () => {
    // For delete buttons
    let deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.target.closest("label").remove();
        updateCurrentTask();
      });
    });

    let checkboxes = document.querySelectorAll(
      "#taskList input[type='checkbox']"
    );
    checkboxes.forEach((box) => {
      box.addEventListener("change", () => {
        let taskLabel = box.closest("label"); // safely gets the label element
        let taskText = taskLabel.querySelector("p");

        if (box.checked) {
          taskText.classList.add("line-through", "text-gray-500");
        } else {
          taskText.classList.remove("line-through", "text-gray-500");
        }
      });
    });
  };

  addTaskBtn.addEventListener("click", () => {
    let task = inputField.value.trim();
    if (task === "") return;

    let currentTasks = taskList.querySelectorAll("label").length;
    if (currentTasks >= maxTasks) {
      alert("You can only add up to 3 tasks.");
      return;
    }

    // Create task HTML
    let newTask = document.createElement("label");
    newTask.setAttribute("id", `pomoTask${currentTasks + 1}`);
    newTask.className =
      "flex items-center gap-4 p-3 bg-gray-900 outline outline-1 outline-gray-800 rounded";
    newTask.innerHTML = `
      <input class="w-5 h-5 rounded-full appearance-none outline outline-blue-900 outline-2 checked:bg-indigo-800 cursor-pointer" type="checkbox" />
      <p class="font-semibold text-gray-200">${task}</p>
      <button class="ml-auto delete-btn cursor-pointer rounded active:scale-[0.94] duration-200 h-8 px-2 py-1 text-red-400 hover:text-red-600">
        <i class="ri-delete-bin-line"></i>
      </button>
    `;

    taskList.appendChild(newTask);
    inputField.value = "";
    newTask.setAttribute("draggable", "true");

    newTask.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", e.target.id);
    });

    newTask.addEventListener("dragover", (e) => {
      e.preventDefault(); // Necessary for drop
    });

    newTask.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      const draggedElement = document.getElementById(draggedId);

      const dropTarget = e.target.closest("label");
      if (dropTarget && draggedElement !== dropTarget) {
        taskList.insertBefore(draggedElement, dropTarget);
        updateCurrentTask(); // update #1 task
      }
    });

    updateTaskListeners();
    updateCurrentTask();
  });

  updateTaskListeners();
  updateCurrentTask();
})();
