// Section metadata — mirrors the SECTIONS array from the original React app
const SECTIONS = {
  index: { label: "Index", num: "00" },
  work: { label: "Work", num: "01" },
  resume: { label: "Résumé", num: "02" },
  interests: { label: "Interests", num: "03" },
};

const tabs = document.querySelectorAll(".tab");
const panes = document.querySelectorAll("[data-pane]");
const stageFile = document.getElementById("stage-file");

function activateSection(key) {
  // Update tabs
  tabs.forEach((tab) => {
    const isActive = tab.dataset.section === key;
    tab.classList.toggle("tab-active", isActive);
    if (isActive) {
      tab.setAttribute("aria-current", "page");
    } else {
      tab.removeAttribute("aria-current");
    }
  });

  // Update panes
  panes.forEach((pane) => {
    pane.hidden = pane.dataset.pane !== key;
  });

  // Update header label
  const section = SECTIONS[key];
  if (section && stageFile) {
    stageFile.textContent = `FILE — ${section.num} / ${section.label.toUpperCase()}`;
  }

  // Restart the fade-in animation on the newly shown card
  const activeCard = document.querySelector(`[data-pane="${key}"]`);
  if (activeCard) {
    activeCard.style.animation = "none";
    // Force reflow so the animation can be re-triggered
    void activeCard.offsetWidth;
    activeCard.style.animation = "";
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateSection(tab.dataset.section);
  });
});
