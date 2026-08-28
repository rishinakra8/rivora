/* =========================================================================
   RIVORA DESIGN STUDIO — PROJECT DETAIL LOGIC & LIGHTBOX
   ========================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || (projectsData.length > 0 ? projectsData[0].id : null);
  const project = getProjectById(projectId) || (projectsData.length > 0 ? projectsData[0] : null);

  if (!project) {
    document.getElementById('projectNotFound').style.display = 'block';
    document.getElementById('projectContent').style.display = 'none';
    return;
  }

  // Update Page Title
  document.title = `${project.title} — Rivora Design Studio`;

  // Render Hero & Metadata
  document.getElementById('projectCategory').textContent = `${project.category} · ${project.location}`;
  document.getElementById('projectTitle').textContent = project.title;
  if (document.getElementById('projectTagline')) {
    document.getElementById('projectTagline').textContent = project.tagline || '';
  }
  document.getElementById('projectOverview').textContent = project.overview || '';

  // Render Metadata Spec Grid
  const specsContainer = document.getElementById('projectSpecs');
  if (specsContainer && project.details) {
    specsContainer.innerHTML = project.details.map(item => `
      <div class="spec-card">
        <span class="spec-label">${item.label}</span>
        <span class="spec-val">${item.value}</span>
      </div>
    `).join('');
  }

  // Flatten all images for universal indexing & lightbox
  let allGalleryImages = [];
  project.sections.forEach((sec, sIdx) => {
    sec.images.forEach((img, iIdx) => {
      allGalleryImages.push({
        src: img.src,
        caption: img.caption,
        section: sec.title
      });
    });
  });

  // Render Filter Tabs
  const filterTabsContainer = document.getElementById('galleryFilters');
  if (filterTabsContainer) {
    let tabsHtml = `<button class="filter-btn active" data-filter="all">All (${allGalleryImages.length})</button>`;
    project.sections.forEach(sec => {
      tabsHtml += `<button class="filter-btn" data-filter="${encodeURIComponent(sec.title)}">${sec.title} (${sec.images.length})</button>`;
    });
    filterTabsContainer.innerHTML = tabsHtml;

    filterTabsContainer.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-btn')) return;
      filterTabsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const selectedFilter = decodeURIComponent(e.target.dataset.filter);
      renderGalleryGrid(selectedFilter);
    });
  }

  // Render Gallery Grid
  function renderGalleryGrid(filter) {
    const grid = document.getElementById('projectGalleryGrid');
    if (!grid) return;
    grid.innerHTML = '';

    const displayedImages = filter === 'all'
      ? allGalleryImages
      : allGalleryImages.filter(img => img.section === filter);

    displayedImages.forEach((img, idx) => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal in';
      card.innerHTML = `
        <div class="gallery-img-wrap" data-index="${allGalleryImages.indexOf(img)}">
          <img src="${img.src}" alt="${img.caption}" loading="lazy" />
          <div class="gallery-scrim">
            <span class="gallery-sec-tag">${img.section}</span>
            <h4 class="gallery-cap">${img.caption}</h4>
            <span class="gallery-zoom-icon">↗</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(allGalleryImages.indexOf(img)));
      grid.appendChild(card);
    });
  }

  renderGalleryGrid('all');

  // Next / Previous Project Navigation
  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const nextBtn = document.getElementById('nextProjectBtn');
  if (nextBtn && nextProject && nextProject.id !== project.id) {
    nextBtn.href = `project.html?id=${nextProject.id}`;
    nextBtn.querySelector('.next-title').textContent = nextProject.title;
  } else if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  // Lightbox Implementation
  let currentLightboxIndex = 0;
  const lightbox = document.getElementById('lightboxModal');
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbCounter = document.getElementById('lightboxCounter');
  const lbSection = document.getElementById('lightboxSection');

  function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const imgData = allGalleryImages[currentLightboxIndex];
    if (!imgData) return;
    lbImg.src = imgData.src;
    lbCaption.textContent = imgData.caption;
    lbSection.textContent = imgData.section;
    lbCounter.textContent = `${currentLightboxIndex + 1} / ${allGalleryImages.length}`;
  }

  function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % allGalleryImages.length;
    updateLightbox();
  }

  function prevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
    updateLightbox();
  }

  document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
  document.getElementById('lightboxNext')?.addEventListener('click', nextImage);
  document.getElementById('lightboxPrev')?.addEventListener('click', prevImage);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Nav scroll & Mobile Menu
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  const burger = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }
});
