/**
 * Abhishek Chaudhary | Interactive Portfolio Scripts
 * Features:
 * - Glowing Aura Cursor with smooth linear interpolation (LERP)
 * - 3D Mouse Parallax Tilt for Avatar & Cards
 * - Dynamic Cyber Typist for Roles
 * - Project Category Filtering
 * - Web Audio API Synthesized High-Tech Sound Effects (Toggleable)
 * - Resume Preview & Project Details Modals
 * - 1-Click Email Copy to Clipboard with Toast Notification
 * - Live Digital Clock & Smooth Navigation Spy
 */

(function () {
  'use strict';

  // ==========================================
  // 1. Glowing Aura Cursor (as seen in video)
  // ==========================================
  const cursorAura = document.querySelector('.cursor-aura');
  const cursorDot = document.querySelector('.cursor-dot');

  let mouseX = -100;
  let mouseY = -100;
  let auraX = -100;
  let auraY = -100;

  if (cursorAura && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      cursorAura.style.opacity = '1';
    });

    function renderAura() {
      // Smooth interpolation
      auraX += (mouseX - auraX) * 0.12;
      auraY += (mouseY - auraY) * 0.12;
      cursorAura.style.transform = `translate(${auraX}px, ${auraY}px)`;
      requestAnimationFrame(renderAura);
    }
    requestAnimationFrame(renderAura);

    // Hover states for links & buttons
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .project-card, .filter-btn, .avatar-interactive-wrapper');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
        playCyberSound(480, 0.04);
      });
      target.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
      });
    });
  }

  // ==========================================
  // 2. Dynamic Typist Effect
  // ==========================================
  const typistElement = document.getElementById('hero-typed-text');
  const roles = [
    'B.Tech CSE Student @ BIET Jhansi',
    'Aspiring Software Engineer',
    'C & Modern Web Developer',
    'Building Practical & Useful Tech',
    'Algorithmic Problem Solver'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!typistElement) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typistElement.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typistElement.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 85;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      // Pause at end of word
      typeSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 450;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  typeEffect();

  // ==========================================
  // 3. Interactive 3D Avatar Tilt
  // ==========================================
  const avatarCard = document.querySelector('.avatar-3d-card');
  const avatarWrapper = document.querySelector('.avatar-interactive-wrapper');

  if (avatarCard && avatarWrapper) {
    avatarCard.addEventListener('mousemove', (e) => {
      const rect = avatarCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 14;

      avatarWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`;
    });

    avatarCard.addEventListener('mouseleave', () => {
      avatarWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // Workstation visual tilt in About section
  const workstationScene = document.querySelector('.about-center-scene');
  const workstationWrapper = document.querySelector('.workstation-visual-wrapper');

  if (workstationScene && workstationWrapper) {
    workstationScene.addEventListener('mousemove', (e) => {
      const rect = workstationScene.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = -(y / (rect.height / 2)) * 10;
      const rotateY = (x / (rect.width / 2)) * 10;
      workstationWrapper.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    workstationScene.addEventListener('mouseleave', () => {
      workstationWrapper.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  }

  // ==========================================
  // 4. Header Scroll Spy & Shrink
  // ==========================================
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header styling on scroll
    if (scrollPos > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll spy
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Mobile navigation drawer toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (mobileToggle && navLinksContainer) {
    mobileToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i, svg');
      playCyberSound(650, 0.05);
    });

    // Close when clicking any nav item
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 5. Project Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      playCyberSound(580, 0.05);

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'slideInToast 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 6. Web Audio API High-Tech Sound FX
  // ==========================================
  let audioContext = null;
  let audioMuted = true; // Default muted for unobtrusive experience

  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  function initAudio() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playCyberSound(frequency = 520, duration = 0.05, type = 'sine') {
    if (audioMuted) return;
    try {
      initAudio();
      if (!audioContext) return;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContext.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      audioMuted = !audioMuted;
      soundToggleBtn.innerHTML = audioMuted
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';

      showToast(audioMuted ? 'Cyber Audio: Muted' : 'Cyber Audio: Enabled ⚡');
      if (!audioMuted) playCyberSound(800, 0.08);
    });
  }

  // ==========================================
  // 7. Modals: Resume & Project Details
  // ==========================================
  const resumeModal = document.getElementById('resume-modal');
  const resumeTriggers = document.querySelectorAll('.trigger-resume-modal');
  const projectModal = document.getElementById('project-modal');
  const projectTriggers = document.querySelectorAll('.trigger-project-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');
  const modalOverlays = document.querySelectorAll('.modal-overlay');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playCyberSound(750, 0.06);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  resumeTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  });

  projectTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-project-title') || 'Project Overview';
      const desc = btn.getAttribute('data-project-desc') || 'Project details placeholder.';
      const tech = btn.getAttribute('data-project-tech') || 'HTML, CSS, JS';

      const pTitle = document.getElementById('modal-project-title');
      const pDesc = document.getElementById('modal-project-desc');
      const pTech = document.getElementById('modal-project-tech');

      if (pTitle) pTitle.textContent = title;
      if (pDesc) pDesc.textContent = desc;
      if (pTech) pTech.textContent = tech;

      openModal(projectModal);
    });
  });

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      closeModal(resumeModal);
      closeModal(projectModal);
    });
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(resumeModal);
      closeModal(projectModal);
    }
  });

  // ==========================================
  // 8. 1-Click Copy Email & Toast System
  // ==========================================
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const contactEmail = 'abhishek.chaudhary@example.com'; // Easy customizable placeholder

  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(contactEmail).then(() => {
        showToast('Email copied to clipboard!');
        playCyberSound(900, 0.08);
      }).catch(() => {
        showToast('Email: ' + contactEmail);
      });
    });
  }

  // Contact Form Submission Simulation
  const contactForm = document.getElementById('portfolio-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = 'Transmitting... ⚡';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast('Message transmitted successfully! Abhishek will get back to you.');
        playCyberSound(1050, 0.1);
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  // ==========================================
  // 9. Live Digital Clock & Back-To-Top
  // ==========================================
  const clockElement = document.getElementById('live-clock');

  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    clockElement.textContent = `${timeStr} [IST]`;
  }

  updateClock();
  setInterval(updateClock, 1000);

  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playCyberSound(700, 0.05);
    });
  }

  // ==========================================
  // 10. 3D Mode Selector & Spline View
  // ==========================================
  const btnModeHologram = document.getElementById('btn-mode-hologram');
  const btnModeSpline = document.getElementById('btn-mode-spline');
  const viewHologram = document.getElementById('view-hologram-card');
  const viewSpline = document.getElementById('view-spline-card');

  if (btnModeHologram && btnModeSpline && viewHologram && viewSpline) {
    btnModeHologram.addEventListener('click', () => {
      btnModeHologram.classList.add('active');
      btnModeSpline.classList.remove('active');
      viewHologram.style.display = 'flex';
      viewSpline.style.display = 'none';
      playCyberSound(620, 0.05);
    });

    btnModeSpline.addEventListener('click', () => {
      btnModeSpline.classList.add('active');
      btnModeHologram.classList.remove('active');
      viewHologram.style.display = 'none';
      viewSpline.style.display = 'block';
      playCyberSound(840, 0.07);
    });
  }

  // AI 3D Studio Modal Trigger
  const aiStudioModal = document.getElementById('ai-studio-modal');
  const aiStudioTriggers = document.querySelectorAll('.trigger-ai-studio');

  aiStudioTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(aiStudioModal);
    });
  });

  // Apply Custom 3D Model / Image Live Tester
  const applyCustom3dBtn = document.getElementById('apply-custom-3d-btn');
  const custom3dUrlInput = document.getElementById('custom-3d-url-input');
  const profileAvatarImg = document.getElementById('profile-avatar-img');
  const heroSplineViewer = document.getElementById('hero-spline-viewer');

  if (applyCustom3dBtn && custom3dUrlInput) {
    applyCustom3dBtn.addEventListener('click', () => {
      const url = custom3dUrlInput.value.trim();
      if (!url) {
        showToast('Please paste a valid URL!');
        return;
      }

      if (url.includes('spline') || url.endsWith('.splinecode')) {
        // Update Spline viewer
        if (heroSplineViewer) {
          heroSplineViewer.setAttribute('url', url);
        }
        if (btnModeSpline) btnModeSpline.click();
        showToast('Spline 3D Scene Loaded Live! ⚡');
      } else {
        // Update Avatar image
        if (profileAvatarImg) {
          profileAvatarImg.src = url;
        }
        if (btnModeHologram) btnModeHologram.click();
        showToast('Avatar Image Updated Live! 🚀');
      }

      closeModal(aiStudioModal);
      playCyberSound(950, 0.09);
    });
  }

  // ==========================================
  // 11. Theme Accent Switcher
  // ==========================================
  const themeSwitchBtn = document.getElementById('theme-switch-btn');
  const themes = ['cyber', 'matrix', 'sunset'];
  let currentThemeIdx = 0;

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      currentThemeIdx = (currentThemeIdx + 1) % themes.length;
      const newTheme = themes[currentThemeIdx];
      document.documentElement.setAttribute('data-theme', newTheme);

      const labels = {
        cyber: 'Cyan & Violet (Default)',
        matrix: 'Matrix Emerald ⚡',
        sunset: 'Synthwave Sunset 🌅'
      };

      showToast(`Color Accent: ${labels[newTheme]}`);
      playCyberSound(600 + currentThemeIdx * 150, 0.07);
    });
  }

  // ==========================================
  // 12. Interactive Cyber Terminal CLI
  // ==========================================
  const terminalScreen = document.getElementById('terminal-screen');
  const terminalBtns = document.querySelectorAll('.terminal-cmd-btn');

  const cliCommands = {
    whoami: 'Abhishek Chaudhary — B.Tech Computer Science & Engineering Student at BIET Jhansi. Passionate about software engineering, C/C++, and building useful web tech.',
    skills: 'Languages: C, C++ [Learning/OOP], JavaScript (ES6+) | Web: HTML5, CSS3 Grid/Flexbox | CS Core: Data Structures, Algorithms, Git & GitHub.',
    biet: 'Bundelkhand Institute of Engineering & Technology (BIET), Jhansi — Premier Autonomous Govt. Engineering College in Uttar Pradesh, India.',
    clear: ''
  };

  terminalBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (!terminalScreen) return;

      playCyberSound(750, 0.04);

      if (cmd === 'clear') {
        terminalScreen.innerHTML = `
          <div class="terminal-line"><span class="t-prompt">abhishek@biet-jhansi:~$</span> <span class="t-cursor">_</span></div>
        `;
        return;
      }

      const response = cliCommands[cmd] || 'Command not found. Try: whoami, skills, biet, clear';

      // Remove previous cursor
      const oldCursor = terminalScreen.querySelector('.t-cursor');
      if (oldCursor) oldCursor.parentElement.remove();

      const cmdLine = document.createElement('div');
      cmdLine.className = 'terminal-line';
      cmdLine.innerHTML = `<span class="t-prompt">abhishek@biet-jhansi:~$</span> <span class="t-cmd">${cmd}</span>`;

      const respLine = document.createElement('div');
      respLine.className = 'terminal-line t-response';
      respLine.textContent = `> ${response}`;

      const newPromptLine = document.createElement('div');
      newPromptLine.className = 'terminal-line';
      newPromptLine.innerHTML = `<span class="t-prompt">abhishek@biet-jhansi:~$</span> <span class="t-cursor">_</span>`;

      terminalScreen.appendChild(cmdLine);
      terminalScreen.appendChild(respLine);
      terminalScreen.appendChild(newPromptLine);

      terminalScreen.scrollTop = terminalScreen.scrollHeight;
    });
  });
})();

