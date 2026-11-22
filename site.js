const filter = document.getElementById("paper-filter");
const entries = [...document.querySelectorAll(".paper-row")];
const resultCount = document.createElement("span");
resultCount.className = "sr-only";
resultCount.setAttribute("role", "status");
const filterControl = document.getElementById("paper-filter-control");
filterControl.hidden = false;
filterControl.after(resultCount);

filter.addEventListener("change", () => {
  for (const entry of entries) {
    entry.hidden = filter.value !== "all" && entry.dataset.type !== filter.value;
  }
  resultCount.textContent = `${entries.filter(entry => !entry.hidden).length} entries shown.`;
});

function openLinkedTopic() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener("hashchange", openLinkedTopic);
openLinkedTopic();

let closedBeforePrint = [];
window.addEventListener("beforeprint", () => {
  closedBeforePrint = [...document.querySelectorAll("details:not([open])")];
  for (const topic of closedBeforePrint) topic.open = true;
});
window.addEventListener("afterprint", () => {
  for (const topic of closedBeforePrint) topic.open = false;
  closedBeforePrint = [];
});
