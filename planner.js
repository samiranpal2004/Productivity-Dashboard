(() => {
  let dashboard = document.getElementById("dashboard");
  let plannerCard = document.querySelector("#planner");
  let plannerSection = document.getElementById("plannerSection");
  let plannerCloeBtn = document.getElementById("plannerClose");

  plannerCard.addEventListener("click", () => {
    console.log("clicked planner card");
    setTimeout(() => {
      dashboard.classList.add("hidden");
      plannerSection.classList.remove("hidden");
    }, 200);
  });

  plannerCloeBtn.addEventListener("click", () => {
    setTimeout(() => {
      dashboard.classList.remove("hidden");
      plannerSection.classList.add("hidden");
    }, 200);
  });

  let plannerBody = document.querySelector("#plannerBody");

  let hour = Array.from({ length: 18 });

  hour.forEach((_, idx) => {
    let slot = document.createElement("div");

    slot.className =
      "bg-gray-800 px-3 py-2 rounded-lg w-160 h-20 flex flex-col ";
    slot.id = `slot${idx + 1}`;

    slot.innerHTML = `
            <p class="text-zinc-400"> ${6 + idx}:00 - ${7 + idx}:00 </p>
            <input class="p-2 font-medium text-xl outline-none" type="text" placeholder="...">
          `;

    plannerBody.appendChild(slot);
  });

  // Save planner inputs on change
  document.querySelectorAll("#plannerBody input").forEach((input, idx) => {
    input.addEventListener("input", () => {
      let plannerData = JSON.parse(localStorage.getItem("plannerData")) || {};
      plannerData[`slot${idx + 1}`] = input.value;
      localStorage.setItem("plannerData", JSON.stringify(plannerData));
    });
  });

  // Restore saved inputs on load
  window.addEventListener("load", () => {
    let plannerData = JSON.parse(localStorage.getItem("plannerData")) || {};
    Object.keys(plannerData).forEach((slotId) => {
      const input = document.querySelector(`#${slotId} input`);
      if (input) input.value = plannerData[slotId];
    });
  });
})();
