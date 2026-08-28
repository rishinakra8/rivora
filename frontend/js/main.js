/* =========================================================================
   EDIT YOUR SERVICES HERE
   - title, description, image (paste a URL once you have photography;
     leave "" to show an editable placeholder tile).
   ========================================================================= */
const services = [
  {
    num: "01",
    title: "architectural design",
    description: "Comprehensive architectural design from concept through execution-ready documentation — combining creative direction with technical precision on every drawing we issue.",
    image: "images/services/architectural-design.jpg"
  },
  {
    num: "02",
    title: "interior design",
    description: "Curated interior environments built around how a space is actually lived in — spatial planning, material selection and lighting brought together with intent.",
    image: "images/services/interior-design.jpg"
  },
  {
    num: "03",
    title: "landscape design",
    description: "Landscapes designed to connect architecture with its site — sunlight, movement and greenery considered alongside the building, not after it.",
    image: "images/services/landscape-design.jpg"
  },
  {
    num: "04",
    title: "design-to-build execution",
    description: "One team carries a project from concept to on-site reality, with in-house coordination and site supervision at every stage of construction.",
    image: "images/services/design-to-build-execution.jpg"
  },
  {
    num: "05",
    title: "exterior design",
    description: "End-to-end management of a building's exterior language and envelope, executed with the same attention to detail as the interiors within it.",
    image: "images/services/exterior-design.jpg"
  },
  {
    num: "06",
    title: "bespoke furniture",
    description: "Furniture designed specifically for the space it sits in — pieces that match the architectural language and complete the interior, rather than furnish around it.",
    image: "images/services/bespoke-furniture.jpg"
  }
];

function renderServices(){
  const grid = document.getElementById('servicesGrid');
  if(!grid) return;
  grid.innerHTML = "";
  services.forEach((s, i) => {
    const bg = s.image ? `background-image:url('${s.image}')` : `background:${gradients[i % gradients.length]}`;
    const photo = document.createElement('div');
    photo.className = 'svc-photo' + (s.image ? '' : ' empty');
    photo.innerHTML = s.image
      ? `<div class="ph-img" style="${bg}"></div>`
      : `<div class="ph-img" style="${bg}"><div class="add-icon">+</div><div class="add-label">Add Photo</div></div>`;

    const text = document.createElement('div');
    text.className = 'svc-text';
    text.innerHTML = `
      <div class="svc-num">${s.num}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>`;

    grid.appendChild(photo);
    grid.appendChild(text);
  });
}

/* =========================================================================
   EDIT YOUR PROJECTS HERE
   - title, location, category (Residential / Hospitality / Commercial)
   - image: paste an image URL once you have project photography.
     Leave image as "" to show an editable placeholder tile ("+ Add Project").
   - size: "wide" | "tall" | "" (controls the grid tile shape)
   ========================================================================= */
const projects = [
  {
    id: "sesh-sports-and-fitness",
    title: "Sesh Sports N Fitness",
    location: "Gurgaon, NCR",
    category: "Commercial",
    image: "images/projects/sesh sports and fitness/1.png",
    size: "wide",
    tag: "Flagship Project"
  },
  {
    id: "dheeraj-residence",
    title: "Dheeraj Residence",
    location: "Bestech, Gurgaon",
    category: "Residential",
    image: "images/projects/DHEERAJ RESIDENCE_ BESTECH/1.jpg",
    size: "",
    tag: "Residential"
  },
  {
    id: "spice-garden",
    title: "Spice Garden",
    location: "NCR, India",
    category: "Hospitality",
    image: "images/projects/SPICE GARDEN/RENDERS/render 1.png",
    size: "wide",
    tag: "Hospitality"
  },
  {
    id: "kunal-residence",
    title: "Kunal Residence",
    location: "Gurgaon, NCR",
    category: "Residential",
    image: "images/projects/KUNAL RESIDENCE/3D VIEW/1.png",
    size: "tall",
    tag: "Residential"
  },
  {
    id: "luv-residence",
    title: "Luv Residence",
    location: "Gurgaon, NCR",
    category: "Residential",
    image: "images/projects/LUV RESIDENCE/3D VIEW/L2.png",
    size: "",
    tag: "Residential"
  },
  {
    id: "rinku-goyal-commercial",
    title: "Commercial Complex",
    location: "Bhiwadi, NCR",
    category: "Commercial",
    image: "images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E1.png",
    size: "",
    tag: "Commercial"
  },
  {
    id: "naveen-residence",
    title: "Naveen Residence",
    location: "Gurgaon, NCR",
    category: "Residential",
    image: "images/projects/NAVEEN RESIDENCE/L1.png",
    size: "",
    tag: "Residential"
  }
];

/* =========================================================================
   EDIT YOUR OPEN ROLES HERE — remove or add entries freely.
   ========================================================================= */
const openRoles = [
  { title: "Interior Designer", meta: "Full-time · Gurgaon" },
  { title: "Site Execution Engineer", meta: "Full-time · NCR Sites" },
  { title: "Design Intern", meta: "3–6 months · Gurgaon Studio" }
];

const gradients = [
  "linear-gradient(135deg, rgba(184,146,90,0.35), rgba(28,24,20,0.9))",
  "linear-gradient(135deg, rgba(72,89,76,0.4), rgba(20,17,15,0.9))",
  "linear-gradient(135deg, rgba(184,146,90,0.25), rgba(72,89,76,0.3))",
  "linear-gradient(135deg, rgba(28,24,20,0.95), rgba(184,146,90,0.3))"
];

function renderWork(filter){
  const grid = document.getElementById('workGrid');
  if(!grid) return;
  grid.innerHTML = "";
  const list = filter === 'all' ? projects : projects.filter(p => p.category === filter);
  list.forEach((p, i) => {
    const card = document.createElement(p.placeholder ? 'div' : 'a');
    if(!p.placeholder){
      card.href = `project.html?id=${p.id || 'sesh-sports-and-fitness'}`;
    }
    card.className = 'work-card' + (p.size ? ' ' + p.size : '') + (p.placeholder ? ' empty' : '');
    const bg = p.image ? `background-image:url('${encodeURI(p.image)}')` : `background:${gradients[i % gradients.length]}`;

    if(p.placeholder){
      card.innerHTML = `
        <div class="tile">
          <div class="tile-img" style="${bg}">
            <div class="add-icon">+</div>
            <div class="add-label">Add Project</div>
          </div>
          <div class="scrim"></div>
          <div class="meta">
            <div class="cat">${p.category}</div>
            <h3>${p.title}</h3>
          </div>
        </div>`;
    } else {
      card.innerHTML = `
        <div class="tile">
          <div class="tile-img" style="${bg}"></div>
          <div class="scrim"></div>
          <div class="meta">
            <div class="cat">${p.tag || p.category}</div>
            <h3>${p.title}</h3>
            <div class="loc">${p.location}</div>
          </div>
        </div>`;
    }
    grid.appendChild(card);
  });
}

function renderRoles(){
  const wrap = document.getElementById('rolesList');
  if(!wrap) return;
  wrap.innerHTML = "";
  openRoles.forEach(r => {
    const row = document.createElement('div');
    row.className = 'role-row';
    row.innerHTML = `
      <div>
        <h3>${r.title}</h3>
        <div class="role-meta">${r.meta}</div>
      </div>
      <a class="role-apply" href="mailto:rishi.rivora@gmail.com?subject=Application: ${encodeURIComponent(r.title)}">Apply</a>`;
    wrap.appendChild(row);
  });
}

// Initial render
renderWork('all');
renderServices();
renderRoles();

// Filter buttons
const filterBar = document.getElementById('filterBar');
if(filterBar){
  filterBar.addEventListener('click', (e) => {
    if(!e.target.classList.contains('filter-btn')) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderWork(e.target.dataset.filter);
  });
}

/* Nav scroll state */
const header = document.getElementById('siteHeader');
if(header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* Mobile menu */
const burger = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
if(burger && mobileMenu){
  burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

/* Scroll reveal */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* Contact form — POST to /api/contact */
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const btn = this.querySelector('button');
    const originalText = btn.textContent;
    
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const projectType = document.getElementById('ctype').value;
    const message = document.getElementById('cmsg').value.trim();

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, projectType, message })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        btn.textContent = "Sent — We'll be in touch";
        contactForm.reset();
      } else {
        btn.textContent = data.message || "Error — Please try again";
      }
    } catch (err) {
      console.error('Submission error:', err);
      btn.textContent = "Error — Please try again";
    } finally {
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    }
  });
}
