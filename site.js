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
