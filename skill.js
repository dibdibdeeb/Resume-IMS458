// Animate circular meters + show detail on click
document.querySelectorAll(".soft").forEach(card => {
  const canvas = card.querySelector("canvas");
  const percent = Number(canvas.dataset.percent);
  const ctx = canvas.getContext("2d");
  const size = 100;            // Full size of canvas
  const radius = 40;           // Radius of circle
  const center = size / 2;     // Always center
  let progress = 0;

  canvas.width = size;
  canvas.height = size;

  ctx.lineWidth = 8;
  ctx.font = "16px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw background track
  function drawBase() {
    ctx.strokeStyle = "#552619";
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, size, size);   // Clear before redraw
    drawBase();

    // Draw progress ring
    ctx.strokeStyle = "#ff4b78";
    ctx.beginPath();
    const endAngle = (progress / 100) * 2 * Math.PI - Math.PI / 2;
    ctx.arc(center, center, radius, -Math.PI / 2, endAngle);
    ctx.stroke();

    // Draw percentage text
    ctx.fillStyle = "#ff4b78";
    ctx.fillText(progress + "%", center, center);

    if (progress < percent) {
      progress++;
      requestAnimationFrame(animate);
    }
  }

  animate();

  // Expand info on click
  card.addEventListener("click", () => {
    card.classList.toggle("active");

    if (!card.querySelector(".details")) {
      const div = document.createElement("div");
      div.className = "details";
      div.textContent =
        card.dataset.info ||
        "Additional details about this skill will appear here.";
      card.appendChild(div);
    }
  });
});

// Animate horizontal bars on load
window.addEventListener("load", () => {
  document.querySelectorAll(".fill").forEach(f => {
    const width = f.style.width;
    f.style.width = "0";
    requestAnimationFrame(() => (f.style.width = width));
  });
});


