function openLinkedTopic() {
  const target = document.getElementById(location.hash.slice(1));
  if (target instanceof HTMLDetailsElement) target.open = true;
}
window.addEventListener("hashchange", openLinkedTopic);
openLinkedTopic();

const storageFigures = document.getElementById("storage-figures");
if (storageFigures) {
  const slides = [...storageFigures.querySelectorAll(".research-slides a")];
  const controls = storageFigures.querySelector(".research-slide-controls");
  const status = controls.querySelector(".research-slide-status");
  const [previousButton, nextButton] = controls.querySelectorAll("button");
  let activeSlide = 0;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    storageFigures.style.setProperty("--slide-offset", `${-100 * activeSlide}%`);
    slides.forEach((slide, slideIndex) => {
      slide.inert = slideIndex !== activeSlide;
    });
    status.textContent = `${activeSlide + 1} / ${slides.length}`;
  }

  previousButton.addEventListener("click", () => showSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
  storageFigures.classList.add("research-carousel");
  showSlide(0);
  controls.hidden = false;
}

let closedBeforePrint = [];
window.addEventListener("beforeprint", () => {
  closedBeforePrint = [...document.querySelectorAll("details:not([open])")];
  for (const topic of closedBeforePrint) topic.open = true;
});
window.addEventListener("afterprint", () => {
  for (const topic of closedBeforePrint) topic.open = false;
  closedBeforePrint = [];
});
