# 🚀 Abhishek Chaudhary — Futuristic 3D Developer Portfolio
> **B.Tech Computer Science & Engineering @ BIET Jhansi**  
> *A high-performance, dark cinematic 3D portfolio inspired by the viral developer aura aesthetic.*

---

## 🌟 Highlights & Included Features

1. **Glowing Aura Cursor (as seen in reference video)**
   - Smooth Linear Interpolation (LERP) trailing glowing aura (`#00f0ff` & `#8b5cf6`).
   - Dynamic magnetic expansion over buttons, project cards, and links.
2. **Hero Section**
   - 3D Holographic Developer Avatar with mouse tilt parallax and glowing orbital rings.
   - Real-time typist role switcher ("B.Tech CSE Student @ BIET Jhansi", "Aspiring Software Engineer", "C & Modern Web Developer").
   - Quick CTAs: **View Projects** & **Download Resume**.
3. **About Me with 3D Developer Workstation**
   - 3D isometric programmer desk visual with an ultrawide curved glowing monitor and ambient code illumination.
   - Clear breakdown of engineering mindset, institution (BIET Jhansi), and core philosophies.
4. **My Education & Learning**
   - Futuristic cyber timeline showcasing B.Tech CSE @ BIET Jhansi (2023–2027) with coursework highlights and prior schooling placeholders.
5. **Interactive Physics Tech Stack Arena (Matching 00:17 of reference video)**
   - Real-time elastic collision physics simulation!
   - 3D specular gradient spheres (`C`, `C++ [Learning]`, `JavaScript`, `HTML5`, `CSS3`, `Data Structures`, `Git`) that bounce with gravity and swat/drag with your cursor!
   - "Shake Balls" interactive trigger button.
6. **Featured Gallery (Projects)**
   - Interactive category filter pills (*All*, *Web Applications*, *C & Systems*, *Algorithms*).
   - Glassmorphic cards with browser mockups, tags, "Quick View" modal, and GitHub repo buttons.
7. **Achievements & Coding Journey**
   - Bento-grid milestone cards highlighting real student accomplishments at BIET Jhansi and algorithmic practice.
8. **Contact & Footer**
   - 1-click email copy to clipboard with glowing toast notification.
   - Interactive cyber transmission form.
   - Live digital clock (IST) and back-to-top button.
9. **Sound FX & Accessibility**
   - Synthesized Web Audio API sound effects (subtle cyber blips on click/hover) with a 1-click mute toggle.

---

## 🤖 How to Make This Type of 3D Futuristic Portfolio (Free AI Tools Guide)

Here are the best **100% FREE AI tools and libraries** used by top developers to create viral 3D portfolios like the one in your reference video:

### 1. 3D Character & Avatar Generation (Free AI)
* **Tripo3D ([tripo3d.ai](https://www.tripo3d.ai/)) / Meshy AI ([meshy.ai](https://www.meshy.ai/))**:
  - **What it does:** Generates a real 3D model (`.glb` / `.gltf`) directly from a text prompt or from a 2D photo of your face!
  - **Free Tier:** Free daily credits.
  - **Prompt to use:**
    > *"3D cute stylized Pixar/Spline character avatar bust of an Indian male developer wearing a cap and modern hoodie, smiling, 3D render, octane render, smooth lighting, black background"*
* **Spline 3D ([spline.design](https://spline.design/))**:
  - **What it does:** The industry-standard 3D web tool used for interactive portfolios. It has a built-in AI prompt generator (*"Generate a 3D isometric computer desk"*).
  - **Why it's awesome:** Gives you a free 1-line HTML embed code (`<spline-viewer url="...">`) that you can paste directly into your portfolio!
* **Microsoft Designer / Bing Image Creator (DALL-E 3 - 100% Free)**:
  - Generate ultra-crisp 3D avatar renders:
  - **Prompt:**
    > *"3D Pixar Disney style cute male developer avatar, smiling, wearing modern cap and dark hoodie, neon cyan and purple rim lighting, cinematic 3D render, octane render, pitch black background, 8k"*

### 2. Physics & Interactive 3D Libraries (Free & Open Source)
* **Matter.js / Canvas 2D Physics**:
  - Powers the bouncing spheres arena featured in this project (`js/tech-balls.js`). Zero cost, lightweight, runs at 60fps on mobile.
* **Three.js & React Three Fiber (`@react-three/fiber`)**:
  - Free open-source WebGL libraries for rendering 3D scenes in the browser.
* **Spline Viewer (`@splinetool/viewer`)**:
  - Drop-in web component to render 3D scenes interactively with cursor tracking.

---

## 🛠️ How to Customize Your Portfolio

### 1. Add Your Own Profile Picture or 3D Avatar
Open `index.html` (around Line 118):
```html
<img src="assets/avatar.svg" alt="Abhishek Chaudhary 3D Developer Avatar" id="profile-avatar-img">
```
* To use your own photo: Save your photo as `assets/profile.jpg` and change `src="assets/avatar.svg"` to `src="assets/profile.jpg"`.
* To use a 3D Spline scene: Replace the `<img>` tag with your Spline viewer embed:
  ```html
  <script type="module" src="https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js"></script>
  <spline-viewer url="https://prod.spline.design/YOUR_SPLINE_ID/scene.splinecode"></spline-viewer>
  ```

### 2. Add Your Resume PDF
Save your actual resume file as `assets/resume.pdf`. The "Download Resume" buttons are already wired to download this file directly!

### 3. Update Your Real Social & Project Links
Search and replace the placeholders in `index.html`:
* `https://github.com/your-username` &rarr; Your real GitHub profile.
* `https://linkedin.com/in/your-username` &rarr; Your real LinkedIn profile.
* `abhishek.chaudhary@example.com` &rarr; Your real college/personal email.

---

## 🚀 How to Launch & Deploy for FREE (in 2 Minutes)

### Option A: Local Preview Right Now
Simply double-click `index.html` on your computer to open it in Chrome, Edge, or Firefox!

### Option B: Deploy for Free on GitHub Pages
1. Create a free repository on [GitHub](https://github.com) named `portfolio` or `username.github.io`.
2. Upload the contents of this folder (`index.html`, `css/`, `js/`, `assets/`).
3. Go to **Repository Settings** &rarr; **Pages** &rarr; select `main` branch &rarr; click **Save**.
4. Your website will be live worldwide at: `https://your-username.github.io`!

---

*Designed & crafted for Abhishek Chaudhary &bull; B.Tech CSE @ BIET Jhansi*
