(() => {
  let quoteText = document.getElementById("quoteText");
  let quoteAuthor = document.getElementById("quoteAuthor");

  let fetchMotivation = async () => {
    let url =
      "https://api.allorigins.win/get?url=" +
      encodeURIComponent("https://zenquotes.io/api/random");
    const rawData = await fetch(url);
    const data = await rawData.json();
    const parsed = JSON.parse(data.contents);

    quoteText.innerText = parsed[0].q;
    quoteAuthor.innerText = `- ${parsed[0].a}`;
  };

  let dashboard = document.getElementById("dashboard");
  let motivationCard = document.querySelector("#motivation");
  let motivationSection = document.getElementById("motivationSection");
  let motivationCloeBtn = document.getElementById("motivationClose");

  motivationCard.addEventListener("click", () => {
    console.log("clicked planner card");
    setTimeout(() => {
      dashboard.classList.add("hidden");
      motivationSection.classList.remove("hidden");
      fetchMotivation();
    }, 200);
  });

  motivationCloeBtn.addEventListener("click", () => {
    setTimeout(() => {
      dashboard.classList.remove("hidden");
      motivationSection.classList.add("hidden");
    }, 200);
  });
})();
