/**
 * Cybernetic Particle Background System
 * High-performance 2D Canvas constellation with interactive mouse gravity,
 * dual-tone neon purple/cyan nodes, and battery-friendly auto-pausing.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let width = 0;
  let height = 0;
  let dpr = 1;

  // Configuration
  const isMobile = window.innerWidth < 768;
  const config = {
    particleCount: isMobile ? 40 : 85,
    maxDistance: isMobile ? 90 : 130,
    mouseRadius: isMobile ? 80 : 140,
    colors: [
      { r: 0, g: 240, b: 255 },    // Neon Cyan
      { r: 168, g: 85, b: 247 },   // Electric Purple
      { r: 59, g: 130, b: 246 }    // Tech Blue
    ],
    speedFactor: 0.55
  };

  const mouse = {
    x: -9999,
    y: -9999,
    active: false
  };

  let particles = [];

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.radius = Math.random() * 1.8 + 1.2;
      this.vx = (Math.random() - 0.5) * config.speedFactor;
      this.vy = (Math.random() - 0.5) * config.speedFactor;
      this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      this.baseAlpha = Math.random() * 0.45 + 0.35;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulseVal = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap boundaries smoothly
      if (this.x < -20) this.x = width + 20;
      else if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      else if (this.y > height + 20) this.y = -20;

      // Pulse alpha for subtle cinematic shimmer
      this.pulseVal += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.15;

      // Mouse interaction (repel gently)
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < config.mouseRadius && dist > 0) {
          const force = (1 - dist / config.mouseRadius) * 2;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.8)`;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset for performance
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.scale(dpr, dpr);

    // Adjust particle count dynamically on resize
    const targetCount = window.innerWidth < 768 ? 40 : 85;
    if (particles.length !== targetCount) {
      initParticles(targetCount);
    }
  }

  function initParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const maxDist = config.maxDistance;
    const count = particles.length;

    for (let i = 0; i < count; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          // Blend gradient between node 1 and node 2
          ctx.strokeStyle = `rgba(${p1.color.r}, ${p1.color.g}, ${p1.color.b}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Connect to mouse if active
      if (mouse.active) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist < config.mouseRadius) {
          const alpha = (1 - dist / config.mouseRadius) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    drawConnections();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Mouse Listeners
  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', function () {
    mouse.active = false;
  });

  // Battery / Tab optimization
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else {
      render();
    }
  });

  let resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 150);
  });

  // Init
  resize();
  initParticles(config.particleCount);
  render();
})();
