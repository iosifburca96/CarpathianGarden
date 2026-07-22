// Menu tabs
const menuTabs = document.querySelector('.menu-tabs');
const tabFoods = document.getElementById('tab-foods');
const tabDrinks = document.getElementById('tab-drinks');
const foodsPanel = document.getElementById('foods-panel');
const drinksPanel = document.getElementById('drinks-panel');

function selectTab(tab) {
    const isFoods = tab === tabFoods;
    menuTabs.classList.toggle('is-drinks', !isFoods);
    tabFoods.classList.toggle('is-active', isFoods);
    tabDrinks.classList.toggle('is-active', !isFoods);
    tabFoods.setAttribute('aria-selected', String(isFoods));
    tabDrinks.setAttribute('aria-selected', String(!isFoods));
    foodsPanel.classList.toggle('is-hidden', !isFoods);
    drinksPanel.classList.toggle('is-hidden', isFoods);
}

tabFoods.addEventListener('click', () => selectTab(tabFoods));
tabDrinks.addEventListener('click', () => selectTab(tabDrinks));

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
});

primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        primaryNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Booking form defaults: today's date, 19:00
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
document.getElementById('dateInput').value = `${year}-${month}-${day}`;
document.getElementById('timeInput').value = '19:00';

// Scroll-reveal with stagger inside [data-stagger] containers
const revealTargets = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const staggerParent = el.closest('[data-stagger]');
                if (staggerParent) {
                    const siblings = Array.from(
                        staggerParent.querySelectorAll('.reveal')
                    );
                    el.style.transitionDelay = `${siblings.indexOf(el) * 110}ms`;
                }
                el.classList.add('is-visible');
                observer.unobserve(el);
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
} else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
}

// Count-up animation for trust bar stats
const countTargets = document.querySelectorAll('[data-count]');

function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (target * eased).toFixed(decimals);
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            el.textContent = target.toFixed(decimals);
        }
    }
    requestAnimationFrame(frame);
}

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const countObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.6 }
    );
    countTargets.forEach((el) => countObserver.observe(el));
} else {
    countTargets.forEach((el) => {
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        el.textContent = parseFloat(el.dataset.count).toFixed(decimals);
    });
}
