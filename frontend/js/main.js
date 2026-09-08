/* =============================================================================
   RIVORA DESIGN STUDIO — LUXURY INTERFACE LOGIC
   ============================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Fadeout
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 700);
  }

  // 2. Navbar Scroll Style
  const navbar = document.getElementById('siteNavbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Drawer Toggle
  const burgerToggle = document.getElementById('burgerToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  if (burgerToggle && mobileDrawer) {
    burgerToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const spans = burgerToggle.querySelectorAll('span');
      if (mobileDrawer.classList.contains('active')) {
        spans[0].style.transform = 'translateY(6.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        const spans = burgerToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // 4. Portfolio Category Filtering
  const portfolioTabs = document.getElementById('portfolioTabs');
  const projectCards = document.querySelectorAll('#featuredGrid .portfolio_project');

  if (portfolioTabs && projectCards.length > 0) {
    portfolioTabs.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter_btn')) return;
      portfolioTabs.querySelectorAll('.filter_btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      const filter = e.target.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // 5. Why Rivora / Advantages Accordion & Visual Sync
  const advantageItems = document.querySelectorAll('.advantage_item');
  const advantageImg = document.getElementById('advantageImg');

  if (advantageItems.length > 0 && advantageImg) {
    advantageItems.forEach(item => {
      item.addEventListener('click', () => {
        advantageItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        const newVisual = item.dataset.visual;
        if (newVisual) {
          advantageImg.style.opacity = '0.4';
          setTimeout(() => {
            advantageImg.src = newVisual;
            advantageImg.style.opacity = '1';
          }, 200);
        }
      });
    });
  }

  // 6. Testimonials Carousel
  const testiTrack = document.getElementById('testiTrack');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');
  const slides = document.querySelectorAll('.testi_slide');

  if (testiTrack && slides.length > 1) {
    let currentSlide = 0;
    const updateSlide = () => {
      testiTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    if (testiNext) {
      testiNext.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
      });
    }

    if (testiPrev) {
      testiPrev.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
      });
    }

    // Auto-advance every 6s
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlide();
    }, 6000);
  }

  // 7. FAQ Accordion Open/Close
  const faqItems = document.querySelectorAll('.faq_item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq_item_header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // 8. Consultation / Enquiry Form Handler
  const enquiryForm = document.getElementById('homeEnquiryForm');
  const formFeedback = document.getElementById('formFeedback');

  if (enquiryForm && formFeedback) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = enquiryForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      setTimeout(() => {
        formFeedback.style.display = 'block';
        enquiryForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }, 800);
    });
  }
});
