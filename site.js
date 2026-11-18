const filterButtons = [...document.querySelectorAll(".filter-button")];
const papers = [...document.querySelectorAll(".paper-row")];
const resultCount = document.createElement("span");
resultCount.className = "sr-only";
resultCount.setAttribute("role", "status");
document.querySelector(".publication-filters").after(resultCount);
document.documentElement.classList.add("js");

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    for (const item of papers) {
      item.hidden = filter !== "all" && item.dataset.type !== filter;
    }
    for (const control of filterButtons) {
      control.setAttribute("aria-pressed", String(control === button));
    }
    const visible = papers.filter(item => !item.hidden).length;
    resultCount.textContent = `${visible} entries shown.`;
  });
}

const dialog = document.querySelector("#project-dialog");
const closeButton = dialog.querySelector(".close-dialog");
if (typeof dialog.showModal === "function") {
  for (const link of document.querySelectorAll(".project-link")) {
    link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", event => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      const project = document.getElementById(link.hash.slice(1)).cloneNode(true);
      project.removeAttribute("id");
      project.querySelector("h2").id = "dialog-title";
      dialog.querySelector(".dialog-content").replaceChildren(project);
      dialog.showModal();
      dialog.scrollTop = 0;
      closeButton.focus({preventScroll: true});
    });
  }
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
}

const header = document.querySelector(".masthead");
const sections = [...document.querySelectorAll("#about, #research, .content-section")];
const navigationGroups = [
  [...document.querySelectorAll(".primary-nav a")],
  [...document.querySelectorAll(".section-menu a")],
];
function updateNavigation() {
  const threshold = header.offsetHeight + 45;
  let current = "about";
  for (const section of sections) {
    if (section.getBoundingClientRect().top > threshold) break;
    current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1].id;
  }
  for (const links of navigationGroups) {
    for (const link of links) {
      if (link.hash === "#" + current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
}
let framePending = false;
function requestNavigationUpdate() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    updateNavigation();
    framePending = false;
  });
}
window.addEventListener("scroll", requestNavigationUpdate, {passive: true});
window.addEventListener("resize", requestNavigationUpdate);
window.addEventListener("load", requestNavigationUpdate);
updateNavigation();
