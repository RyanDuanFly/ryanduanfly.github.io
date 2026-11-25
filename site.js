const storageFigures = document.getElementById("storage-figures");
if (storageFigures) {
  const slides = [...storageFigures.querySelectorAll(".research-slides a")];
  const controls = storageFigures.querySelector(".research-slide-controls");
  const status = controls.querySelector(".research-slide-status");
  const [previousButton, nextButton] = controls.querySelectorAll("button");
  const animateSlides = window.matchMedia("screen and (prefers-reduced-motion: no-preference)");
  let activeSlide = 0;
  let slideAnimations = [];

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.inert = slideIndex !== activeSlide;
    });
    status.textContent = slides[activeSlide].querySelector("img").alt;
  }

  function moveSlide(step) {
    slideAnimations.forEach(animation => animation.cancel());
    slideAnimations = [];
    const outgoingSlide = slides[activeSlide];
    showSlide(activeSlide + step);
    if (!animateSlides.matches) return;

    const incomingSlide = slides[activeSlide];
    const incomingOffset = step * 100;
    const timing = { duration: 230, easing: "ease" };
    slideAnimations = [
      outgoingSlide.animate([
        { transform: "translateX(0)", visibility: "visible" },
        { transform: `translateX(${-incomingOffset}%)`, visibility: "visible" },
      ], timing),
      incomingSlide.animate([
        { transform: `translateX(${incomingOffset}%)` },
        { transform: "translateX(0)" },
      ], timing),
    ];
  }

  previousButton.addEventListener("click", () => moveSlide(-1));
  nextButton.addEventListener("click", () => moveSlide(1));
  storageFigures.classList.add("research-carousel");
  showSlide(0);
  controls.hidden = false;
}
