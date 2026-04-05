// Starfield background (same as previous but optimized)
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let stars = [];
  let width, height;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function initStars(starCount = 250) {
    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        speed: 0.0005 + Math.random() * 0.001,
      });
    }
  }

  function drawStars() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    const grad = ctx.createLinearGradient(0, 0, width*0.8, height);
    grad.addColorStop(0, '#03050f');
    grad.addColorStop(1, '#060b1a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    
    for (let s of stars) {
      let x = s.x * width;
      let y = s.y * height;
      ctx.beginPath();
      ctx.arc(x, y, s.radius, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255, 240, 200, ${s.alpha + Math.sin(Date.now() * 0.001 * s.speed * 10) * 0.2})`;
      ctx.fill();
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => { resizeCanvas(); initStars(250); });
  resizeCanvas();
  initStars(250);
  drawStars();
}

// Additional GSAP scroll triggers for any page (global)
gsap.registerPlugin(ScrollTrigger);
// Any extra global animations can be added here