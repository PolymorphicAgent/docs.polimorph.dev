// Currently unused and incomplete background animation script


var canvas_ = document.createElement('canvas');
canvas_.id = 'void-bg';
canvas_.style = 'position: fixed; z-index: -1;';
document.body.prepend(canvas_);

const canvas = document.getElementById('void-bg');
const ctx = canvas.getContext('2d');

let w, h, t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

/* ---------- VOID LAYERS ---------- */

const layers = Array.from({ length: 3 }, (_, i) => ({
  depth: 0.3 + i * 0.35,
  count: 40 + i * 25,
  drift: 0.0002 + i * 0.0005,
  blobs: Array.from({ length: 40 + i * 25 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.15 + Math.random() * 0.35,
    hue: 245 + Math.random() * 25,
    phase: Math.random() * Math.PI * 2
  }))
}));

/* ---------- RENDER ---------- */

function drawBlob(b, depth) {
  const px = b.x * w;
  const py = b.y * h;
  const radius = b.r * Math.min(w, h);

  const pulse = 0.5 + Math.sin(t * 0.0003 + b.phase) * 0.15;

  const grad = ctx.createRadialGradient(
    px, py, 0,
    px, py, radius
  );

  grad.addColorStop(0, `hsla(${b.hue}, 40%, 40%, ${0.06 * pulse})`);
  grad.addColorStop(1, `hsla(${b.hue}, 50%, 10%, 0)`);

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'lighter';

  layers.forEach(layer => {
    layer.blobs.forEach(b => {
      b.y += layer.drift * layer.depth;
      if (b.y > 1.2) b.y = -0.2;

      drawBlob(b, layer.depth);
    });
  });

  ctx.globalCompositeOperation = 'source-over';
  t += 1;
  requestAnimationFrame(animate);
}

animate();
