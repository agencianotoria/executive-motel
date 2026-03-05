const galleryData = {
    "Suíte Luxo": [
        "gallery/suite-luxo/MOTEL KORPUS-2-2.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-6.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-21.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-20.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-13.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-12.webp",
        "gallery/suite-luxo/MOTEL KORPUS-2-9.webp"
    ],
    "Suíte com Hidro": [
        "gallery/suite-com-hidro/MOTEL KORPUS-2-2.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-9.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-10.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-18.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-23.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-24.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-25.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-32.webp",
        "gallery/suite-com-hidro/MOTEL KORPUS-2-3.webp"
    ],
    "Suíte Executive": [
        "gallery/suite-executive/MOTEL KORPUS-2-5.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-8.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-12.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-14.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-19.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-22.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-28.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-33.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-41.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-42.webp",
        "gallery/suite-executive/MOTEL KORPUS-2-16.webp"
    ]
};

const modal = document.getElementById('gallery-modal');
const mainImage = document.getElementById('gallery-image');
const suiteTitle = document.getElementById('gallery-suite-title');
const counterCurrent = document.getElementById('gallery-counter');
const counterTotal = document.getElementById('gallery-total');
const loader = document.getElementById('gallery-loader');
const zoomBtn = document.getElementById('zoom-gallery');

let isZoomed = false;
let currentGroup = "";
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function openGallery(suiteName) {
    currentGroup = suiteName;
    currentIndex = 0;
    
    suiteTitle.textContent = currentGroup;
    counterTotal.textContent = galleryData[currentGroup].length;
    
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    requestAnimationFrame(() => modal.classList.remove('opacity-0'));
    loadImage();
}

function closeGallery() {
    resetZoom();
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        mainImage.src = '';
    }, 300);
}

function loadImage() {
    resetZoom();
    mainImage.classList.add('opacity-0');
    let loaderTimer;
    setTimeout(() => {
        const targetSrc = galleryData[currentGroup][currentIndex];
        loaderTimer = setTimeout(() => {
            loader.classList.remove('hidden');
        }, 200);

        const img = new Image();
        img.src = targetSrc;
        img.onload = () => {
            clearTimeout(loaderTimer);
            loader.classList.add('hidden');
            mainImage.src = img.src;
            counterCurrent.textContent = currentIndex + 1;
            requestAnimationFrame(() => {
                setTimeout(() => {
                    mainImage.classList.remove('opacity-0');
                }, 50);
            });
        };
    }, 300);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData[currentGroup].length;
    loadImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData[currentGroup].length) % galleryData[currentGroup].length;
    loadImage();
}

document.querySelectorAll('.gallery-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const suite = trigger.getAttribute('data-suite');
        openGallery(suite);
    });
});

document.getElementById('close-gallery')?.addEventListener('click', closeGallery);
document.getElementById('next-gallery')?.addEventListener('click', nextImage);
document.getElementById('prev-gallery')?.addEventListener('click', prevImage);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeGallery(); });

document.addEventListener('keydown', (e) => {
    if (modal?.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

let lastTap = 0;

mainImage.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        toggleZoom();
        e.preventDefault();
    }
    lastTap = currentTime;
});

function handleSwipe() {
    if (isZoomed) return;
    if (window.visualViewport && window.visualViewport.scale > 1) return;

    const swipeThreshold = 50;
    
    if (modal.classList.contains('hidden')) return;

    if (touchStartX - touchEndX > swipeThreshold) {
        nextImage();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        prevImage();
    }
}

function toggleZoom() {
    isZoomed = !isZoomed;
    const wrapper = mainImage.parentElement;
    const container = wrapper.parentElement;
    const navHeight = modal.querySelector('nav').offsetHeight;

    if (isZoomed) {
        container.classList.remove('max-w-5xl', 'px-4', 'mt-16', 'md:mt-20');
        container.classList.add('max-w-full');
        
        container.style.setProperty('margin-top', `${navHeight}px`, 'important');

        mainImage.style.setProperty('max-height', 'none', 'important');
        mainImage.style.setProperty('max-width', '100%', 'important');
        mainImage.style.setProperty('width', 'auto', 'important');
        mainImage.style.setProperty('height', 'auto', 'important');
        mainImage.style.setProperty('margin', '0 auto', 'important');
        mainImage.style.setProperty('cursor', 'zoom-out', 'important');

        wrapper.style.setProperty('overflow-y', 'auto', 'important');
        wrapper.style.setProperty('overflow-x', 'hidden', 'important');
        wrapper.style.setProperty('display', 'block', 'important');
        wrapper.style.setProperty('max-height', `calc(100vh - ${navHeight}px)`, 'important');
    } else {
        resetZoom();
    }
}

function resetZoom() {
    isZoomed = false;
    const wrapper = mainImage.parentElement;
    const container = wrapper.parentElement;

    container.classList.add('max-w-5xl', 'px-4', 'mt-16', 'md:mt-20');
    container.classList.remove('max-w-full');
    
    container.style.removeProperty('margin-top');

    mainImage.style.removeProperty('max-height');
    mainImage.style.removeProperty('max-width');
    mainImage.style.removeProperty('width');
    mainImage.style.removeProperty('height');
    mainImage.style.removeProperty('margin');
    mainImage.style.removeProperty('cursor');

    wrapper.style.removeProperty('overflow-y');
    wrapper.style.removeProperty('overflow-x');
    wrapper.style.removeProperty('display');
    wrapper.style.removeProperty('max-height');
}

zoomBtn?.addEventListener('click', toggleZoom);