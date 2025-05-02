document.addEventListener('DOMContentLoaded', function() {
  // Animate the arrows on hover (vertical stack)
  document.querySelectorAll('.hero-cta').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.querySelectorAll('.arrow-svg').forEach((arrow, i) => {
        arrow.style.transition = 'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)';
        arrow.style.transform = `translateY(${(i+1)*6}px)`;
      });
    });
    btn.addEventListener('mouseleave', () => {
      btn.querySelectorAll('.arrow-svg').forEach(arrow => {
        arrow.style.transform = 'translateY(0)';
      });
    });
  });

  // Simple animated grid for the hero canvas
  const canvas = document.querySelector('.hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    let t = 0;
    function drawGrid() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      let gridSize = 80;
      let offset = Math.sin(t/40) * 10;
      for (let x = offset; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = offset; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();
      t++;
      requestAnimationFrame(drawGrid);
    }
    drawGrid();
  }
});

