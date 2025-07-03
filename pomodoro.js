// Global timer variables to ensure correct scope
let totalPomoTime = 25 * 60;
let pomoTimerInterval = null;
let shortBreakInterval = null;
let longBreakInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const pomoStartBtn = document.querySelector("#pomoStartBtn");
  const pomoResetBtn = document.querySelector("#pomoResetBtn");
  const pomoTime = document.querySelector("#pomoTime");

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    pomoTime.innerText = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  const resetTime = () => {
    clearInterval(pomoTimerInterval);
    totalPomoTime = 25 * 60;
    formatTime(totalPomoTime);
    pomoStartBtn.innerText = "START";
    pomoStartBtn.classList.add("bg-gray-900", "hover:bg-gray-800");
    pomoStartBtn.classList.remove("bg-red-700", "hover:bg-red-600");
  };

  pomoResetBtn.addEventListener("click", () => {
    resetTime();
    pomoResetBtn.classList.add("hidden");
  });

  pomoStartBtn.addEventListener("click", () => {
    console.log("clicked");

    if (pomoStartBtn.innerHTML == "START") {
      pomoStartBtn.innerHTML = "STOP";
      pomoStartBtn.classList.remove("bg-gray-900", "hover:bg-gray-800");
      pomoStartBtn.classList.add("bg-red-700", "hover:bg-red-600");
      pomoResetBtn.classList.remove("hidden");

      pomoTimerInterval = setInterval(() => {
        console.log(totalPomoTime);
        totalPomoTime--;
        formatTime(totalPomoTime);
        if (totalPomoTime === 0) {
          clearInterval(pomoTimerInterval);
          resetTime();
        }
      }, 1000);
    } else {
      pomoStartBtn.innerHTML = "START";
      clearInterval(pomoTimerInterval);
      pomoStartBtn.classList.add("bg-gray-900", "hover:bg-gray-800");
      pomoStartBtn.classList.remove("bg-red-700", "hover:bg-red-600");
    }
  });

  // -- UI Navigation + Reset Handlers --
  const dashboard = document.getElementById("dashboard");
  const pomodoroCard = document.querySelector("#pomodoro");
  const pomodoroSection = document.getElementById("pomodoroSection");
  const pomodoroCloseBtn = document.getElementById("pomodoroClose");

  pomodoroCard.addEventListener("click", () => {
    dashboard.classList.add("hidden");
    pomodoroSection.classList.remove("hidden");
  });

  pomodoroCloseBtn.addEventListener("click", () => {
    dashboard.classList.remove("hidden");
    pomodoroSection.classList.add("hidden");
  });

  // -- Timer Tab Switch --
  const pomoBtn = document.querySelector("#mainPomo");
  const shortBtn = document.querySelector("#shortBreak");
  const longBtn = document.querySelector("#longBreak");

  const pomoTimer = document.querySelector("#pomoTimer");
  const shortTimer = document.querySelector("#shortTimer");
  const longTimer = document.querySelector("#longTimer");

  pomoBtn.addEventListener("click", () => {
    pomoTimer.classList.remove("hidden");
    shortTimer.classList.add("hidden");
    longTimer.classList.add("hidden");

    pomoBtn.classList.add("bg-gray-900", "outline", "outline-1.5", "outline-gray-800");
    shortBtn.classList.remove("bg-gray-900", "outline");
    longBtn.classList.remove("bg-gray-900", "outline");

    clearInterval(pomoTimerInterval);
    clearInterval(shortBreakInterval);
    clearInterval(longBreakInterval);

    resetTime(); // Also formats and resets UI
  });

  shortBtn.addEventListener("click", () => {
    pomoTimer.classList.add("hidden");
    shortTimer.classList.remove("hidden");
    longTimer.classList.add("hidden");

    shortBtn.classList.add("bg-gray-900", "outline", "outline-1.5", "outline-gray-800");
    pomoBtn.classList.remove("bg-gray-900", "outline");
    longBtn.classList.remove("bg-gray-900", "outline");

    clearInterval(pomoTimerInterval);
    clearInterval(shortBreakInterval);
    clearInterval(longBreakInterval);

    totalSbTime = 5 * 60;
    formatSbTime(totalSbTime);
    sbStartBtn.innerText = "START";
  });

  longBtn.addEventListener("click", () => {
    pomoTimer.classList.add("hidden");
    shortTimer.classList.add("hidden");
    longTimer.classList.remove("hidden");

    longBtn.classList.add("bg-gray-900", "outline", "outline-1.5", "outline-gray-800");
    shortBtn.classList.remove("bg-gray-900", "outline");
    pomoBtn.classList.remove("bg-gray-900", "outline");

    clearInterval(pomoTimerInterval);
    clearInterval(shortBreakInterval);
    clearInterval(longBreakInterval);

    totalLbTime = 30 * 60;
    formatLbTime(totalLbTime);
    lbStartBtn.innerText = "START";
  });

  // ----- Short Break -----
  const sbStartBtn = document.querySelector("#sbStartBtn");
  const shortTime = document.querySelector("#shortTime");
  let totalSbTime = 5 * 60;

  const formatSbTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    shortTime.innerText = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  sbStartBtn.addEventListener("click", () => {
    if (sbStartBtn.innerHTML == "START") {
      sbStartBtn.innerHTML = "STOP";
      sbStartBtn.classList.remove("bg-gray-900", "hover:bg-gray-800");
      sbStartBtn.classList.add("bg-red-700", "hover:bg-red-600");

      shortBreakInterval = setInterval(() => {
        totalSbTime--;
        formatSbTime(totalSbTime);
        if (totalSbTime === 0) {
          clearInterval(shortBreakInterval);
        }
      }, 1000);
    } else {
      sbStartBtn.innerHTML = "START";
      clearInterval(shortBreakInterval);
      sbStartBtn.classList.add("bg-gray-900", "hover:bg-gray-800");
      sbStartBtn.classList.remove("bg-red-700", "hover:bg-red-600");
    }
  });

  // ----- Long Break -----
  const lbStartBtn = document.querySelector("#lbStartBtn");
  const longTime = document.querySelector("#longTime");
  let totalLbTime = 30 * 60;

  const formatLbTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    longTime.innerText = `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
  };

  lbStartBtn.addEventListener("click", () => {
    if (lbStartBtn.innerHTML == "START") {
      lbStartBtn.innerHTML = "STOP";
      lbStartBtn.classList.remove("bg-gray-900", "hover:bg-gray-800");
      lbStartBtn.classList.add("bg-red-700", "hover:bg-red-600");

      longBreakInterval = setInterval(() => {
        totalLbTime--;
        formatLbTime(totalLbTime);
        if (totalLbTime === 0) {
          clearInterval(longBreakInterval);
        }
      }, 1000);
    } else {
      lbStartBtn.innerHTML = "START";
      clearInterval(longBreakInterval);
      lbStartBtn.classList.add("bg-gray-900", "hover:bg-gray-800");
      lbStartBtn.classList.remove("bg-red-700", "hover:bg-red-600");
    }
  });

  // Set initial time
  formatTime(totalPomoTime);
});
