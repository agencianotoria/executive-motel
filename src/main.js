import './style.css'

const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-visible')
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .reveal').forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
};

const initHeaderScroll = () => {
  const header = document.getElementById('main-header');
  const logoContainer = document.getElementById('logo-container');
  const logoLarge = document.getElementById('logo-large');
  const logoCompact = document.getElementById('logo-compact');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-black/95', 'py-3');
      header.classList.remove('py-8', 'bg-black/40');
      
      logoContainer.classList.add('h-[39px]', 'md:h-[47px]');
      logoContainer.classList.remove('h-[114px]', 'md:h-[140px]');

      logoLarge.classList.add('delay-0', 'opacity-0', 'scale-90');
      logoLarge.classList.remove('delay-300', 'opacity-100', 'scale-100');
      
      logoCompact.classList.add('delay-300', 'opacity-100', 'scale-100');
      logoCompact.classList.remove('delay-0', 'opacity-0', 'scale-90');
      
    } else {
      header.classList.remove('bg-black/95', 'py-3');
      header.classList.add('py-8', 'bg-black/40');
      
      logoContainer.classList.remove('h-[39px]', 'md:h-[47px]');
      logoContainer.classList.add('h-[114px]', 'md:h-[140px]');

      logoCompact.classList.remove('delay-300', 'opacity-100', 'scale-100');
      logoCompact.classList.add('delay-0', 'opacity-0', 'scale-90');

      logoLarge.classList.remove('delay-0', 'opacity-0', 'scale-90');
      logoLarge.classList.add('delay-300', 'opacity-100', 'scale-100');
    }
  });
};

const initMobileMenu = () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const body = document.body;
  const header = document.querySelector('header');
  const menuLinks = document.querySelectorAll('.menu-link');

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const isOpening = !body.classList.contains('menu-open');
      const scrollbarWidth = getScrollbarWidth();

      if (isOpening) {
        body.style.paddingRight = `${scrollbarWidth}px`;
        header.style.paddingRight = `${scrollbarWidth}px`;
        body.classList.add('menu-open');
      } else {
        body.style.paddingRight = '0px';
        header.style.paddingRight = '0px';
        body.classList.remove('menu-open');
      }
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.style.paddingRight = '0px';
      header.style.paddingRight = '0px';
      body.classList.remove('menu-open');
    });
  });
};

initAnimations();
initHeaderScroll();
initMobileMenu();