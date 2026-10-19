/**
 * Interactive 3D Physics Bouncing Tech Balls (inspired by the viral portfolio reel)
 * Real-time elastic collision physics with gravity, wall bouncing, mouse swatting,
 * and realistic 3D sphere rendering with specular lighting highlights.
 */

(function () {
  'use strict';

  const container = document.getElementById('tech-balls-container');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'tech-balls-canvas';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let animationId = null;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Tech definitions for Abhishek Chaudhary
  const techItems = [
    { name: 'C', badge: 'Core', bg: '#00f0ff', text: '#050508', radius: 46, desc: 'Pointers & Memory' },
    { name: 'C++', badge: 'Learning', bg: '#a855f7', text: '#ffffff', radius: 52, desc: 'OOP & DSA' },
    { name: 'JavaScript', badge: 'ES6+', bg: '#facc15', text: '#000000', radius: 50, desc: 'Interactive Web' },
    { name: 'HTML5', badge: 'Semantic', bg: '#f97316', text: '#ffffff', radius: 44, desc: 'Web Structure' },
    { name: 'CSS3', badge: 'Styling', bg: '#38bdf8', text: '#ffffff', radius: 45, desc: 'Animations & Grid' },
    { name: 'Data Structures', badge: 'CS', bg: '#ec4899', text: '#ffffff', radius: 56, desc: 'Arrays, Lists, Trees' },
    { name: 'Git & GitHub', badge: 'VCS', bg: '#f43f5e', text: '#ffffff', radius: 48, desc: 'Collaboration' },
    { name: 'Problem Solving', badge: 'Logic', bg: '#10b981', text: '#ffffff', radius: 54, desc: 'Algorithmic Thinking' },
    { name: 'BIET CSE', badge: '2026', bg: '#6366f1', text: '#ffffff', radius: 46, desc: 'Jhansi Campus' },
    { name: 'VS Code', badge: 'IDE', bg: '#0284c7', text: '#ffffff', radius: 42, desc: 'Dev Environment' }
  ];

  const mouse = {
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    prevX: 0,
    prevY: 0,
    isDown: false,
    draggedBall: null
  };

  const gravity = 0.22;
  const bounceFriction = 0.78;
  const airResistance = 0.992;

  class Ball {
    constructor(tech, index) {
      this.tech = tech;
      this.radius = tech.radius;
      this.x = (index + 1) * ((width || 800) / (techItems.length + 1)) + (Math.random() - 0.5) * 40;
      this.y = Math.random() * (height * 0.4 || 150) + 50;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = Math.random() * 2;
      this.mass = this.radius * 0.1;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      if (mouse.draggedBall === this) {
        // Being dragged by mouse/touch
        this.vx = (mouse.x - this.x) * 0.25;
        this.vy = (mouse.y - this.y) * 0.25;
        this.x = mouse.x;
        this.y = mouse.y;
        return;
      }

      this.vy += gravity;
      this.vx *= airResistance;
      this.vy *= airResistance;

      this.x += this.vx;
      this.y += this.vy;

      // Mouse collision repulsion / swatting
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < this.radius + 35 && dist > 0) {
        const angle = Math.atan2(dy, dx);
        const force = (this.radius + 35 - dist) * 0.35;
        this.vx += Math.cos(angle) * force + mouse.vx * 0.3;
        this.vy += Math.sin(angle) * force + mouse.vy * 0.3;
      }

      // Wall Bounds
      if (this.x - this.radius < 0) {
        this.x = this.radius;
        this.vx = -this.vx * bounceFriction;
      } else if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.vx = -this.vx * bounceFriction;
      }

      if (this.y - this.radius < 0) {
        this.y = this.radius;
        this.vy = -this.vy * bounceFriction;
      } else if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.vy = -this.vy * bounceFriction;
        // Ground friction
        this.vx *= 0.95;
      }
    }

    draw() {
      // 3D Sphere Shading with Radial Gradient
      const grad = ctx.createRadialGradient(
        this.x - this.radius * 0.35,
        this.y - this.radius * 0.35,
        this.radius * 0.1,
        this.x,
        this.y,
        this.radius
      );

      // Specular highlight colors
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, this.tech.bg);
      grad.addColorStop(0.85, '#0d0d1a');
      grad.addColorStop(1, '#050508');

      // Ambient Drop Shadow
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = this.tech.bg;
      ctx.shadowBlur = 18;
      ctx.fill();

      // Outer Rim Glow Border
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.tech.bg;
      ctx.stroke();
      ctx.restore();

      // Inner glossy shine crescent
      ctx.save();
      ctx.beginPath();
      ctx.arc(
        this.x - this.radius * 0.25,
        this.y - this.radius * 0.28,
        this.radius * 0.45,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fill();
      ctx.restore();

      // Text Label
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Tech Name
      ctx.font = `bold ${Math.max(12, Math.round(this.radius * 0.32))}px 'Space Grotesk', sans-serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 4;
      ctx.fillText(this.tech.name, this.x, this.y - 4);

      // Badge (e.g. "Learning" / "ES6+" / "Core")
      ctx.font = `600 ${Math.max(9, Math.round(this.radius * 0.2))}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = this.tech.bg;
      ctx.fillText(`[${this.tech.badge}]`, this.x, this.y + this.radius * 0.38);

      ctx.restore();
    }
  }

  let balls = [];

  function checkCollisions() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const b1 = balls[i];
        const b2 = balls[j];
        const dx = b2.x - b1.x;
        const dy = b2.y - b1.y;
        const dist = Math.hypot(dx, dy);
        const minDist = b1.radius + b2.radius;

        if (dist < minDist) {
          // Normal and tangent unit vectors
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);

          // Overlap resolution
          const overlap = minDist - dist;
          b1.x -= nx * overlap * 0.5;
          b1.y -= ny * overlap * 0.5;
          b2.x += nx * overlap * 0.5;
          b2.y += ny * overlap * 0.5;

          // Relative velocity
          const kx = b1.vx - b2.vx;
          const ky = b1.vy - b2.vy;

          // Velocity along normal
          const p = 2 * (nx * kx + ny * ky) / (b1.mass + b2.mass);

          // Calculate new velocities with restitution
          b1.vx -= p * b2.mass * nx * 0.92;
          b1.vy -= p * b2.mass * ny * 0.92;
          b2.vx += p * b1.mass * nx * 0.92;
          b2.vy += p * b1.mass * ny * 0.92;
        }
      }
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    width = rect.width || 800;
    height = Math.max(340, rect.height || 420);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Keep balls within bounds after resize
    balls.forEach(b => {
      b.x = Math.min(Math.max(b.radius, b.x), width - b.radius);
      b.y = Math.min(Math.max(b.radius, b.y), height - b.radius);
    });
  }

  function init() {
    balls = techItems.map((tech, idx) => new Ball(tech, idx));
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Update mouse velocity
    mouse.vx = mouse.x - mouse.prevX;
    mouse.vy = mouse.y - mouse.prevY;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;

    // Physics step
    balls.forEach(ball => ball.update());
    checkCollisions();
    balls.forEach(ball => ball.draw());

    animationId = requestAnimationFrame(animate);
  }

  // Mouse & Touch Interaction
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  container.addEventListener('mousemove', e => {
    const pos = getPos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
  });

  container.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
    mouse.draggedBall = null;
  });

  container.addEventListener('mousedown', e => {
    const pos = getPos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
    mouse.isDown = true;

    // Check if clicked inside a ball to drag
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (Math.hypot(b.x - pos.x, b.y - pos.y) <= b.radius) {
        mouse.draggedBall = b;
        break;
      }
    }
  });

  window.addEventListener('mouseup', () => {
    mouse.isDown = false;
    mouse.draggedBall = null;
  });

  // Touch handlers for mobile
  container.addEventListener('touchmove', e => {
    const pos = getPos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
  }, { passive: true });

  container.addEventListener('touchstart', e => {
    const pos = getPos(e);
    mouse.x = pos.x;
    mouse.y = pos.y;
    for (let i = balls.length - 1; i >= 0; i--) {
      const b = balls[i];
      if (Math.hypot(b.x - pos.x, b.y - pos.y) <= b.radius) {
        mouse.draggedBall = b;
        break;
      }
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    mouse.draggedBall = null;
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // Reset / Shake button trigger (fun interactive bonus)
  const shakeBtn = document.getElementById('shake-balls-btn');
  if (shakeBtn) {
    shakeBtn.addEventListener('click', () => {
      balls.forEach(b => {
        b.vx = (Math.random() - 0.5) * 16;
        b.vy = -Math.random() * 14 - 6;
      });
    });
  }

  window.addEventListener('resize', () => {
    resize();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) cancelAnimationFrame(animationId);
    } else {
      animate();
    }
  });

  // Start
  resize();
  init();
  animate();
})();
