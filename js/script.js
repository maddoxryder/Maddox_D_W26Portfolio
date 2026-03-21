const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const backToTop = document.getElementById("backToTop");
const typedText = document.getElementById("typedText");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        document.body.classList.toggle("menu-open", isOpen);
    });

    document.querySelectorAll(".site-nav a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        });
    });
}

window.addEventListener("scroll", () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    setActiveNavLink();
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.12 });

revealItems.forEach((item) => revealObserver.observe(item));

function setActiveNavLink() {
    const sections = document.querySelectorAll("main section[id]");
    const links = document.querySelectorAll(".site-nav a");

    let current = "";

    sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 140;
        const height = section.offsetHeight;

        if (top >= offset && top < offset + height) {
            current = section.getAttribute("id");
        }
    });

    links.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
}

const phrases = [
    "Selected work / systems / interfaces",
    "Capstone project / documentation / delivery",
    "Building direct and practical software"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typedText) return;

    const currentPhrase = phrases[phraseIndex];

    if (!deleting) {
        typedText.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typedText.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typeEffect, deleting ? 28 : 48);
}

typeEffect();
setActiveNavLink();