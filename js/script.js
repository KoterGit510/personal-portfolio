
const SECTIONS = {
  index: { label: "Index", num: "00" },
  projects: { label: "Projects", num: "01" },
  resume: { label: "Résumé", num: "02" },
  interests: { label: "Interests", num: "03" },
};

const tabs = document.querySelectorAll(".tab");
const panes = document.querySelectorAll("[data-pane]");
const stageFile = document.getElementById("stage-file");


const ROW_DURATION = 420;
const ROW_STAGGER = 90;

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


  const meta = SECTIONS[key];
  if (meta && stageFile) {
    stageFile.textContent = `FILE — ${meta.num} / ${meta.label.toUpperCase()}`;
  }

  // Restart the fade-in animation on the newly shown card
  const activeCard = document.querySelector(`[data-pane="${key}"]`);
  if (activeCard) {
    activeCard.style.animation = "none";
    void activeCard.offsetWidth; // forced
    activeCard.style.animation = "";
  }


  if (key === "projects") {
    animateProjectRows();
  }
}

function animateProjectRows() {
  const rows = document.querySelectorAll('[data-pane="projects"] .project-row');

  rows.forEach((row, i) => {
    // Reset
    row.style.animation = "none";
    void row.offsetWidth; //forced

    const delay = i === 0 ? 0 : ROW_DURATION / 2 + (i - 1) * ROW_STAGGER;
    row.style.animationDelay = `${delay}ms`;
    row.style.animation = "";
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateSection(tab.dataset.section);
  });
});
