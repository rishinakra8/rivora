/* =============================================================================
   RIVORA DESIGN STUDIO — PROJECT DATA
   All image paths are relative to /frontend/ (served from root by Express).
   Videos (mp4) are local-only — too large for GitHub; embed via YouTube instead.
   ============================================================================= */

const PROJECTS = [

  // ── 1. SESH SPORTS N FITNESS ──────────────────────────────────────────────
  {
    id:          'sesh-sports-and-fitness',
    title:       'Sesh Sports N Fitness',
    location:    'Gurgaon, NCR',
    category:    'Commercial',
    tag:         'Flagship Project',
    size:        'wide',                         // homepage grid tile size
    year:        '2024',
    area:        '12,000 sq ft',
    scope:       'Interior Design · Branding Integration · Execution',
    description: 'A high-energy sports and fitness destination designed around movement, performance, and community — combining bold spatial gestures with precision detailing across gym, studio, café, and conference zones.',
    cover:       'images/projects/sesh sports and fitness/1.png',
    gallery: [
      // Overview renders
      { src: 'images/projects/sesh sports and fitness/1.png',               label: 'Overview' },
      { src: 'images/projects/sesh sports and fitness/2.png',               label: 'Overview' },
      { src: 'images/projects/sesh sports and fitness/3.png',               label: 'Overview' },
      { src: 'images/projects/sesh sports and fitness/4.png',               label: 'Overview' },
      { src: 'images/projects/sesh sports and fitness/5.png',               label: 'Overview' },
      // Elevation
      { src: 'images/projects/sesh sports and fitness/ELEVATION.png',       label: 'Elevation' },
      { src: 'images/projects/sesh sports and fitness/ELEVATION 1.png',     label: 'Elevation' },
      // Indoor renders
      { src: 'images/projects/sesh sports and fitness/Indoor R1.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R2.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R3.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R4.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R5.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R6.png',       label: 'Indoor' },
      { src: 'images/projects/sesh sports and fitness/Indoor R7.png',       label: 'Indoor' },
      // Dance Studio
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 1.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 2.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 3.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 4.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 5.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 6.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 7.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 8.png',  label: 'Dance Studio' },
      { src: 'images/projects/sesh sports and fitness/DANCE STUDIO 9.png',  label: 'Dance Studio' },
      // Café
      { src: 'images/projects/sesh sports and fitness/CAFE.jpeg',           label: 'Café' },
      { src: 'images/projects/sesh sports and fitness/CAFE 1.png',          label: 'Café' },
      { src: 'images/projects/sesh sports and fitness/CAFE2.png',           label: 'Café' },
      { src: 'images/projects/sesh sports and fitness/CAFE 3.png',          label: 'Café' },
      // Conference
      { src: 'images/projects/sesh sports and fitness/Conference room.png', label: 'Conference' },
      { src: 'images/projects/sesh sports and fitness/Conference room 1.png', label: 'Conference' },
    ]
  },

  // ── 2. DHEERAJ RESIDENCE ──────────────────────────────────────────────────
  {
    id:          'dheeraj-residence',
    title:       'Dheeraj Residence',
    location:    'Bestech, Delhi - NCR',
    category:    'Residential',
    tag:         'Architecture & Elevation',
    size:        '',
    year:        '2023',
    area:        'Bespoke Residence',
    scope:       'Elevation Design & Architecture',
    description: 'A distinctive contemporary residence featuring bold facade geometry, sculpted curved balconies, and integrated architectural lighting — crafted to create a striking architectural presence with timeless elegance.',
    cover:       'images/projects/DHEERAJ RESIDENCE_ BESTECH/1.jpg',
    gallery: [
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/1.jpg',  label: 'Day Elevation' },
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/3.jpg',  label: 'Front Elevation' },
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/4.jpg',  label: 'Dusk View' },
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/5.jpg',  label: 'Night Illumination' },
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/6.jpg',  label: 'Elevation Angular' },
      { src: 'images/projects/DHEERAJ RESIDENCE_ BESTECH/E1.jpg', label: 'Elevation Detail' },
    ]
  },

  // ── 3. SPICE GARDEN ───────────────────────────────────────────────────────
  {
    id:          'spice-garden',
    title:       'Spice Garden',
    location:    'NCR, India',
    category:    'Hospitality',
    tag:         'Hospitality',
    size:        'wide',
    year:        '2024',
    area:        'N/A',
    scope:       'Architectural Design · Interior Design · Landscape',
    description: 'A contemporary hospitality venue celebrating regional culinary identity through layered spatial storytelling — the design channels the warmth and texture of traditional Indian dining into a modern, immersive environment.',
    cover:       'images/projects/SPICE GARDEN/RENDERS/render 1.png',
    gallery: [
      // Renders
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 1.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 2.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 3.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 4.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 5.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 6.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 7.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 8.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 9.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render 11.png',   label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/render a7.png',   label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/Scene 13.png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/Image(3).png',    label: 'Renders' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/p.png',           label: 'Renders' },
      // Elevations
      { src: 'images/projects/SPICE GARDEN/RENDERS/ELEVATION R1.png', label: 'Elevation' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/ELEVATION R2.png', label: 'Elevation' },
      { src: 'images/projects/SPICE GARDEN/RENDERS/ELEVATION R3.png', label: 'Elevation' },
    ]
  },

  // ── 4. KUNAL RESIDENCE ────────────────────────────────────────────────────
  {
    id:          'kunal-residence',
    title:       'Kunal Residence',
    location:    'Gurgaon, NCR',
    category:    'Residential',
    tag:         'Residential',
    size:        'tall',
    year:        '2024',
    area:        'N/A',
    scope:       'Interior Design · 3D Visualisation · Execution',
    description: 'A contemporary family home developed across multiple zones — living, dining, bedrooms, kitchen and bathrooms — each treated with a consistent material language of textured surfaces, warm wood tones and considered ambient lighting.',
    cover:       'images/projects/KUNAL RESIDENCE/3D VIEW/1.png',
    gallery: [
      // 3D Views
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/1.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/2.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/3.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/4.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/5.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/5.jpg',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/6.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/7.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/8.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/9.png',              label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/10.png',             label: '3D View' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/11.png',             label: '3D View' },
      // Bedroom views
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/B1.png',             label: 'Bedroom' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/B2.png',             label: 'Bedroom' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/B3.png',             label: 'Bedroom' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/B4.png',             label: 'Bedroom' },
      // Apartment views
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/A1.jpg',             label: 'Apartment' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/A2.jpg',             label: 'Apartment' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/A2.1 copy.jpg',      label: 'Apartment' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/A2.2 copy.jpg',      label: 'Apartment' },
      // Scene renders
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 1_5.png',      label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 2_1(1).png',   label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 3_2.png',      label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 7_7.png',      label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 8_6.png',      label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 26.png',       label: 'Renders' },
      { src: 'images/projects/KUNAL RESIDENCE/3D VIEW/Scene 27.png',       label: 'Renders' },
    ]
  },

  // ── 5. LUV RESIDENCE ──────────────────────────────────────────────────────
  {
    id:          'luv-residence',
    title:       'Luv Residence',
    location:    'Gurgaon, NCR',
    category:    'Residential',
    tag:         'Residential',
    size:        '',
    year:        '2023',
    area:        'N/A',
    scope:       'Interior Design · 3D Visualisation',
    description: 'A warm, composed family residence — spatial planning centred on natural flow between living areas, with materials and colour palette chosen to balance elegance with everyday comfort.',
    cover:       'images/projects/LUV RESIDENCE/3D VIEW/L2.png',
    gallery: [
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/L2.png',   label: 'Living' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/D1.png',   label: 'Dining' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/K1.png',   label: 'Kitchen' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/K2.png',   label: 'Kitchen' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B1.png',   label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B1A.png',  label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B2.png',   label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B2A.png',  label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B2B.png',  label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B3.png',   label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B3A.png',  label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B3B.png',  label: 'Bedroom' },
      { src: 'images/projects/LUV RESIDENCE/3D VIEW/B3C.png',  label: 'Bedroom' },
    ]
  },

  // ── 6. RINKU GOYAL COMMERCIAL ─────────────────────────────────────────────
  {
    id:          'rinku-goyal-commercial',
    title:       'Commercial Complex',
    location:    'Bhiwadi, NCR',
    category:    'Commercial',
    tag:         'Commercial',
    size:        '',
    year:        '2023',
    area:        'N/A',
    scope:       'Architectural Design · Elevation Design',
    description: 'A multi-storey commercial complex designed for retail and professional use — the facade composition balances visual impact with practical legibility, using articulated bay rhythm and considered materiality.',
    cover:       'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E1.png',
    gallery: [
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E1.png', label: 'Elevation' },
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E2.png', label: 'Elevation' },
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E3.png', label: 'Elevation' },
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E4.png', label: 'Elevation' },
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E5.png', label: 'Elevation' },
      { src: 'images/projects/RINKU GOYAL_COMMERCIAL BHIWADI/E6.png', label: 'Elevation' },
    ]
  },

  // ── 7. NAVEEN RESIDENCE ───────────────────────────────────────────────────
  {
    id:          'naveen-residence',
    title:       'Naveen Residence',
    location:    'Gurgaon, NCR',
    category:    'Residential',
    tag:         'Residential',
    size:        '',
    year:        '2023',
    area:        'N/A',
    scope:       'Architectural Design · Landscape Design',
    description: 'A contemporary residential exterior with sculpted landscape design — the architectural language is clean and restrained, allowing the landscape to define the experience of arrival and outdoor living.',
    cover:       'images/projects/NAVEEN RESIDENCE/L1.png',
    gallery: [
      { src: 'images/projects/NAVEEN RESIDENCE/L1.png', label: 'Exterior' },
    ]
  },

  // ── 8. RENDERS (Standalone Visualisation Portfolio) ───────────────────────
  {
    id:          'renders',
    title:       'Renders Portfolio',
    location:    'NCR, India',
    category:    'Residential',
    tag:         'Visualisation',
    size:        'wide',
    year:        '2024',
    area:        'N/A',
    scope:       'Architectural Visualisation · 3D Rendering · Landscape',
    description: 'A curated collection of architectural and interior visualisations — demonstrating the full range of Rivora\'s rendering capability across exterior elevations, landscape design, and bespoke interior spaces.',
    cover:       'images/projects/Renders/Exterior/Elevation 1/1.png',
    gallery: [
      // Exterior — Elevations
      { src: 'images/projects/Renders/Exterior/Elevation 1/1.png',          label: 'Elevation' },
      { src: 'images/projects/Renders/Exterior/Elevation 1/3.png',          label: 'Elevation' },
      { src: 'images/projects/Renders/Exterior/Elevation 2/E1 Final R1.png', label: 'Elevation' },
      { src: 'images/projects/Renders/Exterior/Elevation 2/E1 Final R3.png', label: 'Elevation' },
      { src: 'images/projects/Renders/Exterior/Elevation 3/E1 R2 final.png', label: 'Elevation' },
      { src: 'images/projects/Renders/Exterior/Elevation 4/E1. Final R1.png', label: 'Elevation' },
      // Exterior — Landscape
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 1.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 2.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 3.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 5.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 7.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 8.png',      label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 11.png',     label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 20.png',     label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 24.png',     label: 'Landscape' },
      { src: 'images/projects/Renders/Exterior/Landscape/Scene 30.png',     label: 'Landscape' },
      // Interior — Bedrooms
      { src: 'images/projects/Renders/Interior/Bedroom 1/Bed R1.png',       label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 1/Bed R2.png',       label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 1/Bed R3.png',       label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 1/Bed R4.png',       label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 2/Bed3 R1.png',      label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 2/Bed3 R3.png',      label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 3/2.jpg',            label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 3/Bed1 R2.png',      label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 3/Bed1 R3.png',      label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 4/R1.png',           label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 5/R1_inpainting04.png', label: 'Bedroom' },
      { src: 'images/projects/Renders/Interior/Bedroom 5/R3.png',           label: 'Bedroom' },
      // Interior — Dance Studio
      { src: 'images/projects/Renders/Interior/Dance studio/Studio R1.png', label: 'Dance Studio' },
      { src: 'images/projects/Renders/Interior/Dance studio/Studio R2.png', label: 'Dance Studio' },
      { src: 'images/projects/Renders/Interior/Dance studio/Studio R4.png', label: 'Dance Studio' },
      { src: 'images/projects/Renders/Interior/Dance studio/Studio R5.png', label: 'Dance Studio' },
      // Interior — Gym
      { src: 'images/projects/Renders/Interior/Gym/Gym R1.png',             label: 'Gym' },
      { src: 'images/projects/Renders/Interior/Gym/Gym R2.png',             label: 'Gym' },
      { src: 'images/projects/Renders/Interior/Gym/Gym R3.png',             label: 'Gym' },
      { src: 'images/projects/Renders/Interior/Gym/Gym R4.png',             label: 'Gym' },
      { src: 'images/projects/Renders/Interior/Gym/Gym R6.png',             label: 'Gym' },
      { src: 'images/projects/Renders/Interior/Gym/Gym R7.png',             label: 'Gym' },
      // Interior — Living Area
      { src: 'images/projects/Renders/Interior/Living area/R1.png',         label: 'Living' },
      { src: 'images/projects/Renders/Interior/Living area/R2.png',         label: 'Living' },
      // Interior — Office
      { src: 'images/projects/Renders/Interior/Office/BR R1.png',           label: 'Office' },
      { src: 'images/projects/Renders/Interior/Office/BR R2.png',           label: 'Office' },
      { src: 'images/projects/Renders/Interior/Office/L1 R1.png',           label: 'Office' },
      { src: 'images/projects/Renders/Interior/Office/L1 R2.png',           label: 'Office' },
      { src: 'images/projects/Renders/Interior/Office/L1 R3.png',           label: 'Office' },
    ]
  },

];
