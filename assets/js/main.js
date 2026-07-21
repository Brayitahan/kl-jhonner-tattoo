// Page load skeleton
  function hideSkel(){
    const skel = document.getElementById('pageSkel');
    if(!skel) return;
    skel.classList.add('is-hidden');
    setTimeout(() => skel.remove(), 600);
  }
  window.addEventListener('load', hideSkel);
  setTimeout(hideSkel, 5000);

  // Nav scroll state
  const nav = document.getElementById('siteNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  });

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', false);
  }));

  // Works carousel
  const track = document.getElementById('worksTrack');
  const step = () => track.querySelector('.tile:not(.is-filtered-out)')?.getBoundingClientRect().width + 14 || 200;
  document.getElementById('prevBtn').addEventListener('click', () => track.scrollBy({left: -step(), behavior:'smooth'}));
  document.getElementById('nextBtn').addEventListener('click', () => track.scrollBy({left: step(), behavior:'smooth'}));

  // Gallery filters (style + género)
  const tiles = Array.from(track.querySelectorAll('.tile'));
  const emptyMsg = document.getElementById('worksEmpty');
  let activeStyle = 'all';
  let activeGender = 'all';

  function applyFilters(){
    let visibleCount = 0;
    tiles.forEach(tile => {
      const style = tile.dataset.style || 'all';
      const gender = tile.dataset.gender || '';
      const styleMatch = activeStyle === 'all' || style === activeStyle;
      const genderMatch = activeGender === 'all' || gender === '' || gender === activeGender;
      const show = styleMatch && genderMatch;
      tile.classList.toggle('is-filtered-out', !show);
      if(show) visibleCount++;
    });
    emptyMsg.hidden = visibleCount > 0;
    track.scrollTo({left:0});
  }

  document.getElementById('styleFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-style-filter]');
    if(!btn) return;
    activeStyle = btn.dataset.styleFilter;
    document.querySelectorAll('#styleFilters .pill').forEach(p => p.classList.toggle('is-active', p === btn));
    applyFilters();
  });

  document.getElementById('genderFilters').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-gender-filter]');
    if(!btn) return;
    activeGender = btn.dataset.genderFilter;
    document.querySelectorAll('#genderFilters .pill').forEach(p => p.classList.toggle('is-active', p === btn));
    applyFilters();
  });

  // Contact form (no backend — placeholder confirmation)
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formMsg').textContent = 'Mensaje enviado. Te contactaré pronto.';
    e.target.reset();
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('is-visible'); io.unobserve(en.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
