/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
  
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
      });
    }
  };
  showMenu('nav-toggle', 'nav-menu');
  
  /*===== REMOVE MENU ON LINK CLICK =====*/
  document.querySelectorAll('.nav__link').forEach(n =>
    n.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('show');
    })
  );
  
  /*===== SCROLL SECTIONS ACTIVE LINK =====*/
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.pageYOffset;
  
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
  
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        sectionLink.classList.add('active-link');
      } else {
        sectionLink.classList.remove('active-link');
      }
    });
  };
  window.addEventListener('scroll', scrollActive);
  
  /*===== SCROLL REVEAL ANIMATION =====*/
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
  });
  
  sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text');
  sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 400 });
  sr.reveal('.home__social-icon', { interval: 200 });
  sr.reveal('.skills__data, .work__img, .contact__input, .more', { interval: 200 });
  