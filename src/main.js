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
    const header = document.getElementById('main-header');
    const menuLinks = document.querySelectorAll('.menu-link');

    const line1 = toggleBtn?.querySelector('.line-1');
    const line2 = toggleBtn?.querySelector('.line-2');
    const line3 = toggleBtn?.querySelector('.line-3');

    const getScrollbarWidth = () => {
        return window.innerWidth - document.documentElement.clientWidth;
    };

    const toggleIcon = (isOpen) => {
        if (isOpen) {
            line2?.classList.add('opacity-0', 'scale-x-0');
            line1?.classList.add('translate-y-[7px]', 'rotate-45');
            line3?.classList.add('-translate-y-[7px]', '-rotate-45');
        } else {
            line2?.classList.remove('opacity-0', 'scale-x-0');
            line1?.classList.remove('translate-y-[7px]', 'rotate-45');
            line3?.classList.remove('-translate-y-[7px]', '-rotate-45');
        }
    };

    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpening = !body.classList.contains('menu-open');
            const scrollWidth = getScrollbarWidth();

            if (isOpening) {
                if (scrollWidth > 0) {
                    body.style.paddingRight = `${scrollWidth}px`;
                    header.style.paddingRight = `${scrollWidth}px`;
                }
                body.classList.add('menu-open');
                toggleIcon(true);
            } else {
                body.classList.remove('menu-open');
                body.style.paddingRight = '';
                header.style.paddingRight = '';
                toggleIcon(false);
            }
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            body.classList.remove('menu-open');
            body.style.paddingRight = '';
            header.style.paddingRight = '';
            toggleIcon(false);
        });
    });
};

const initCopyrightYear = () => {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
};

initAnimations();
initHeaderScroll();
initMobileMenu();
initCopyrightYear();