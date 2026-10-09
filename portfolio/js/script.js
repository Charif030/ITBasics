/* ============================================
   Persoonlijke Portfolio Website
   JavaScript functionaliteit
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initHamburgerMenu();
    initActiveNavLink();
    initSkillAnimation();
    initContactForm();
    setupCurrentYear();
});

/* ---------- Hamburger menu (mobiel) ---------- */
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
}

/* ---------- Actieve navigatielink markeren ---------- */
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(function (link) {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/* ---------- Vaardighedenbalken animeren bij scrollen ---------- */
function initSkillAnimation() {
    const progressBars = document.querySelectorAll('.progress-bar');

    if (progressBars.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width') || '0%';
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(function (bar) {
        bar.style.width = '0%';
        observer.observe(bar);
    });
}

/* ---------- Contactformulier ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const alertBox = document.getElementById('form-alert');

    if (!form || !alertBox) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const naam = document.getElementById('naam');
        const email = document.getElementById('email');
        const bericht = document.getElementById('bericht');

        if (!naam.value || !email.value || !bericht.value) {
            alertBox.textContent = 'Vul alstublieft alle velden in.';
            alertBox.classList.add('alert-success', 'show');
            alertBox.style.backgroundColor = '#fff3cd';
            alertBox.style.color = '#856404';
            return;
        }

        alertBox.textContent = 'Bedankt voor je bericht! Ik neem zo snel mogelijk contact met je op.';
        alertBox.classList.add('alert-success', 'show');
        alertBox.style.backgroundColor = '#d4edda';
        alertBox.style.color = '#155724';

        form.reset();

        setTimeout(function () {
            alertBox.classList.remove('show');
        }, 5000);
    });
}

/* ---------- Huidig jaar in footer ---------- */
function setupCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}