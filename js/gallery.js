const revealItems = document.querySelectorAll(".reveal");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const clickableImages = document.querySelectorAll(".gallery-item images, .schedule-card images");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

clickableImages.forEach((img) => {
    img.addEventListener("click", () => {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
    });
}

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("open");
            lightbox.setAttribute("aria-hidden", "true");
        }
    });
}

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox) {
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
    }
});