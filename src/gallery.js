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

let currentGroup = "";
let currentIndex = 0;

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
    modal.classList.add('opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        mainImage.src = '';
    }, 300);
}

function loadImage() {
    mainImage.classList.add('opacity-0', 'scale-95');
    loader.classList.remove('hidden');

    setTimeout(() => {
        const img = new Image();
        img.src = galleryData[currentGroup][currentIndex];

        img.onload = () => {
            mainImage.src = img.src;
            loader.classList.add('hidden');
            counterCurrent.textContent = currentIndex + 1;

            requestAnimationFrame(() => {
                setTimeout(() => {
                    mainImage.classList.remove('opacity-0', 'scale-95');
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