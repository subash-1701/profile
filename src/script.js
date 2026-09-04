// =========================================
// MOBILE NAVIGATION - iOS 26 STYLE
// =========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');


// =========================================
// MOBILE NAVBAR SHOW / HIDE ON SCROLL
// =========================================

let lastScrollY = window.scrollY;

function handleMobileNavbarScroll() {

    // Only apply on mobile
    if (window.innerWidth > 768) {
        navbar.classList.remove('nav-hidden');
        return;
    }

    const currentScrollY = window.scrollY;

    // Always show navbar near the top
    if (currentScrollY <= 50) {
        navbar.classList.remove('nav-hidden');
        lastScrollY = currentScrollY;
        return;
    }

    // Keep navbar visible when mobile menu is open
    if (navMenu.classList.contains('active')) {
        navbar.classList.remove('nav-hidden');
        lastScrollY = currentScrollY;
        return;
    }

    // Scrolling DOWN → hide navbar
    if (currentScrollY > lastScrollY + 5) {
        navbar.classList.add('nav-hidden');
    }

    // Scrolling UP → show navbar
    else if (currentScrollY < lastScrollY - 5) {
        navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;
}


// =========================================
// MOBILE MENU FUNCTIONS
// =========================================

function openMobileMenu() {
    hamburger.classList.add('active');
    navMenu.classList.add('active');
    document.body.classList.add('menu-open');

    navbar.classList.add('scrolled');
    navbar.classList.remove('nav-hidden');
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');

    navbar.classList.remove('nav-hidden');

    if (window.scrollY <= 50) {
        navbar.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    if (navMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


// =========================================
// HAMBURGER CLICK
// =========================================

hamburger.addEventListener('click', toggleMobileMenu);


// =========================================
// NAVIGATION LINKS
// =========================================

document.querySelectorAll('.nav-link, .nav-cta-mobile').forEach(link => {

    link.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        closeMobileMenu();

        if (targetId && targetId.startsWith('#')) {

            e.preventDefault();

            const targetElement = document.querySelector(targetId);

            if (targetElement) {

                const offsetTop =
                    targetElement.getBoundingClientRect().top +
                    window.scrollY -
                    80;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });

});


// =========================================
// CLOSE MENU WHEN CLICKING OUTSIDE
// =========================================

document.addEventListener('click', function (e) {

    if (!navMenu.classList.contains('active')) {
        return;
    }

    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);

    if (!clickedInsideMenu && !clickedHamburger) {
        closeMobileMenu();
    }

});


// =========================================
// CLOSE MENU WITH ESCAPE
// =========================================

document.addEventListener('keydown', function (e) {

    if (e.key === 'Escape') {
        closeMobileMenu();
    }

});


// =========================================
// CLOSE MENU WHEN RESIZING
// =========================================

window.addEventListener('resize', function () {

    if (window.innerWidth > 768) {
        closeMobileMenu();
        navbar.classList.remove('nav-hidden');
    }

});


// =========================================
// SCROLL LISTENER
// =========================================

window.addEventListener('scroll', () => {

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const animationElements = document.querySelectorAll(
        '.fade-in, .fade-in-delay, .fade-in-delay-2'
    );

    let currentSection = '';

    // -----------------------------------------
    // Active navigation link
    // -----------------------------------------

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (
            link.getAttribute('href').substring(1) ===
            currentSection
        ) {
            link.classList.add('active');
        }

    });


    // -----------------------------------------
    // Navbar scroll effect
    // -----------------------------------------

    if (
        window.scrollY > 50 ||
        navMenu.classList.contains('active')
    ) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }


    // -----------------------------------------
    // Mobile navbar hide/show
    // -----------------------------------------

    handleMobileNavbarScroll();


    // -----------------------------------------
    // Fade-in animations
    // -----------------------------------------

    animationElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;

        const elementBottom =
            element.getBoundingClientRect().bottom;

        if (
            elementTop < window.innerHeight &&
            elementBottom > 0
        ) {
            element.classList.add('visible');
        }

    });

});


// =========================================
// DOM LOADED
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    document
        .querySelectorAll(
            '.fade-in, .fade-in-delay, .fade-in-delay-2'
        )
        .forEach(element => {

            element.classList.add('hidden');

        });

});


// =========================================
// BUTTON HOVER EFFECT
// =========================================

document.querySelectorAll('.btn').forEach(button => {

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });

});


// =========================================
// CARD HOVER EFFECT
// =========================================

document
    .querySelectorAll(
        '.skill-card, .project-card, .whatido-card'
    )
    .forEach(card => {

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

    });


// =========================================
// CONTACT FORM
// =========================================

const contactForm =
    document.getElementById('portfolioContactForm');

const senderName =
    document.getElementById('senderName');

const senderEmail =
    document.getElementById('senderEmail');

const senderMessage =
    document.getElementById('senderMessage');


if (contactForm) {

    contactForm.addEventListener('submit', function (e) {

        e.preventDefault();

        const name =
            senderName.value.trim();

        const email =
            senderEmail.value.trim();

        const message =
            senderMessage.value.trim();


        if (!name || !email || !message) {

            alert('Please fill in all fields.');

            return;
        }


        const subject =
            'New Portfolio Contact Message';


        const body =
`Name: ${name}

Email: ${email}

Message:
${message}`;


        window.location.href =
            'mailto:subash170107@gmail.com?subject=' +
            encodeURIComponent(subject) +
            '&body=' +
            encodeURIComponent(body);

    });

}
