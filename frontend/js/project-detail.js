/* =========================================================================
   RIVORA DESIGN STUDIO — PROJECT DETAIL LOGIC & LIGHTBOX
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Resolve project from PROJECTS data
  const dataList = (typeof PROJECTS !== 'undefined') ? PROJECTS : [];

  if (!dataList || dataList.length === 0) {
    showNotFound();
    return;
  }

  // Parse ID from URL query (?id=...) or path (/project/<id>)
  const urlParams = new URLSearchParams(window.location.search);
  let requestedId = urlParams.get('id');

  if (!requestedId) {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    if (lastPart && lastPart !== 'project' && lastPart !== 'project.html') {
      requestedId = lastPart;
    }
  }

  // Find target project or fallback to first project
  const project = (requestedId) 
    ? dataList.find(p => p.id === requestedId) 
    : dataList[0];

  if (!project) {
    showNotFound();
    return;
  }

  function showNotFound() {
    const notFoundEl = document.getElementById('projectNotFound');
    const contentEl = document.getElementById('projectContent');
    if (notFoundEl) notFoundEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
  }

  // 2. Update Page Head & Titles
  document.title = `${project.title} — Rivora Design Studio`;

  // 3. Render Hero & Story
  const catEl = document.getElementById('projectCategory');
  const titleEl = document.getElementById('projectTitle');
  const taglineEl = document.getElementById('projectTagline');
  const overviewEl = document.getElementById('projectOverview');

  if (catEl) catEl.textContent = `${project.category} · ${project.location}`;
  if (titleEl) titleEl.textContent = project.title;
  if (taglineEl) taglineEl.textContent = project.tag || `${project.category} Design`;
  if (overviewEl) overviewEl.textContent = project.description || '';

  // 4. Render Metadata Specs Bar
  const specsContainer = document.getElementById('projectSpecs');
  if (specsContainer) {
    const specs = [
      { label: 'Category', value: project.category || 'Architecture & Interiors' },
      { label: 'Location', value: project.location || 'NCR, India' },
      { label: 'Year', value: project.year || '2024' },
      { label: 'Scope', value: project.scope || 'Design & Turnkey Execution' },
      { label: 'Area', value: project.area || 'Bespoke' }
    ];

    specsContainer.innerHTML = specs.map(s => `
      <div class="spec-card">
        <span class="spec-label">${s.label}</span>
        <span class="spec-val">${s.value}</span>
      </div>
    `).join('');
  }

  // 5. Prepare Gallery Images
  const galleryImages = (project.gallery && project.gallery.length > 0)
    ? project.gallery
    : (project.cover ? [{ src: project.cover, label: 'Overview' }] : []);

  // Collect unique section labels
  const uniqueLabels = [];
  galleryImages.forEach(img => {
    const lbl = img.label || 'General';
    if (!uniqueLabels.includes(lbl)) {
      uniqueLabels.push(lbl);
    }
  });

  // 6. Render Filter Tabs
  const filterContainer = document.getElementById('galleryFilters');
  if (filterContainer) {
    if (uniqueLabels.length > 1) {
      let tabsHtml = `<button class="filter-btn active" data-filter="all">All (${galleryImages.length})</button>`;
      uniqueLabels.forEach(lbl => {
        const count = galleryImages.filter(g => (g.label || 'General') === lbl).length;
        tabsHtml += `<button class="filter-btn" data-filter="${encodeURIComponent(lbl)}">${lbl} (${count})</button>`;
      });
      filterContainer.innerHTML = tabsHtml;

      filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;
        filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const selectedFilter = decodeURIComponent(e.target.dataset.filter);
        renderGalleryGrid(selectedFilter);
      });
    } else {
      filterContainer.innerHTML = '';
    }
  }

  // 7. Render Gallery Grid
  function renderGalleryGrid(filter) {
    const grid = document.getElementById('projectGalleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const displayedImages = (filter === 'all')
      ? galleryImages
      : galleryImages.filter(img => (img.label || 'General') === filter);

    displayedImages.forEach(img => {
      const globalIdx = galleryImages.indexOf(img);
      const card = document.createElement('div');
      card.className = 'gallery-card reveal in';
      const labelText = img.label || project.title;

      card.innerHTML = `
        <div class="gallery-img-wrap" data-index="${globalIdx}">
          <img src="${encodeURI(img.src)}" alt="${project.title} — ${labelText}" loading="lazy" />
          <div class="gallery-scrim">
            <span class="gallery-sec-tag">${labelText}</span>
            <h4 class="gallery-cap">${project.title}</h4>
            <span class="gallery-zoom-icon">↗</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => openLightbox(globalIdx));
      grid.appendChild(card);
    });
  }

  renderGalleryGrid('all');

  // 8. Next / Previous Project Navigation
  const currentIndex = dataList.findIndex(p => p.id === project.id);
  const nextProject = dataList[(currentIndex + 1) % dataList.length];
  const nextBtn = document.getElementById('nextProjectBtn');

  if (nextBtn && nextProject) {
    nextBtn.href = `project.html?id=${nextProject.id}`;
    const nextTitleEl = nextBtn.querySelector('.next-title');
    if (nextTitleEl) nextTitleEl.textContent = nextProject.title;
  }

  // 9. Fullscreen Lightbox Modal Logic
  let activeLightboxIndex = 0;
  const modal = document.getElementById('lightboxModal');
  const modalImg = document.getElementById('lightboxImg');
  const modalSec = document.getElementById('lightboxSection');
  const modalCap = document.getElementById('lightboxCaption');
  const modalCounter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtnLb = document.getElementById('lightboxNext');

  function openLightbox(index) {
    if (!galleryImages || galleryImages.length === 0) return;
    activeLightboxIndex = index;
    updateLightbox();
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateLightbox() {
    if (activeLightboxIndex < 0) activeLightboxIndex = galleryImages.length - 1;
    if (activeLightboxIndex >= galleryImages.length) activeLightboxIndex = 0;

    const currentImg = galleryImages[activeLightboxIndex];
    if (modalImg) modalImg.src = encodeURI(currentImg.src);
    if (modalSec) modalSec.textContent = currentImg.label || project.category;
    if (modalCap) modalCap.textContent = project.title;
    if (modalCounter) modalCounter.textContent = `${activeLightboxIndex + 1} / ${galleryImages.length}`;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => { activeLightboxIndex--; updateLightbox(); });
  if (nextBtnLb) nextBtnLb.addEventListener('click', () => { activeLightboxIndex++; updateLightbox(); });

  if (modal) {
    const backdrop = modal.querySelector('.lightbox-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { activeLightboxIndex--; updateLightbox(); }
    if (e.key === 'ArrowRight') { activeLightboxIndex++; updateLightbox(); }
  });

  // Mobile nav burger toggle
  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
  // Scroll header effect
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40));
  }
});
