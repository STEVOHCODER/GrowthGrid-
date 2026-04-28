(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  if (!slides.length || !dots.length) return;

  let idx = 0;
  let timer;

  function show(next) {
    idx = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === idx));
    dots.forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  function autoplay() {
    timer = setInterval(() => show(idx + 1), 4200);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      show(i);
      clearInterval(timer);
      autoplay();
    });
  });

  show(0);
  autoplay();
})();

(function () {
  const tasksInput = document.getElementById("tasksInput");
  const tasksValue = document.getElementById("tasksValue");
  const hoursSaved = document.getElementById("hoursSaved");
  if (!tasksInput || !tasksValue || !hoursSaved) return;

  function updateDemo() {
    const tasks = Number(tasksInput.value || 0);
    tasksValue.textContent = String(tasks);
    const saved = (tasks * 0.067).toFixed(1);
    hoursSaved.textContent = saved;
  }

  tasksInput.addEventListener("input", updateDemo);
  updateDemo();
})();
