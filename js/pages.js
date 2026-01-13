/**
 * 법률사무소 후 - Premium Detail Pages JavaScript
 * Scroll Animations & Interactive Elements
 */

(function() {
    'use strict';

    // ============================================
    // Scroll Animation Observer
    // ============================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll, .stagger-children');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ============================================
    // Self Check Functionality
    // ============================================
    const initSelfCheck = () => {
        const checkCards = document.querySelectorAll('.check-card');
        const checkResult = document.querySelector('.check-result');
        const countDisplay = document.querySelector('.check-count');

        if (!checkCards.length) return;

        checkCards.forEach(card => {
            card.addEventListener('click', () => {
                const checkbox = card.querySelector('input[type="checkbox"]');
                if (checkbox) {
                    checkbox.checked = !checkbox.checked;
                    card.classList.toggle('active', checkbox.checked);
                    updateCheckResult();
                }
            });
        });

        const updateCheckResult = () => {
            const checkedCount = document.querySelectorAll('.check-card.active').length;

            if (countDisplay) {
                countDisplay.textContent = checkedCount;
            }

            if (checkResult) {
                if (checkedCount > 0) {
                    checkResult.classList.add('show');
                } else {
                    checkResult.classList.remove('show');
                }
            }
        };
    };

    // ============================================
    // Filter Buttons
    // ============================================
    const initFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const filterItems = document.querySelectorAll('[data-category]');

        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                // Filter items
                filterItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        item.style.display = '';

                        requestAnimationFrame(() => {
                            item.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    };

    // ============================================
    // Form Enhancements
    // ============================================
    const initFormEnhancements = () => {
        const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('focused');
                if (input.value.trim()) {
                    input.classList.add('has-value');
                } else {
                    input.classList.remove('has-value');
                }
            });
        });

        // Form submission handling
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                const submitBtn = form.querySelector('.form-submit');
                if (submitBtn) {
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<span>전송 중...</span>';
                    submitBtn.disabled = true;

                    // Simulate submission
                    setTimeout(() => {
                        submitBtn.innerHTML = '<span>전송 완료!</span>';
                        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                            form.reset();
                        }, 2000);
                    }, 1500);
                }
            });
        });
    };

    // ============================================
    // Parallax Effect for Page Header
    // ============================================
    const initParallax = () => {
        const headerBg = document.querySelector('.page-header-bg');
        if (!headerBg) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;

                    if (scrolled < window.innerHeight) {
                        headerBg.style.transform = `scale(1.1) translateY(${rate}px)`;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // ============================================
    // Counter Animation
    // ============================================
    const initCounters = () => {
        const counters = document.querySelectorAll('.stats-banner-num, [data-count]');

        const animateCounter = (el) => {
            const target = parseInt(el.dataset.count || el.textContent.replace(/[^0-9]/g, ''));
            const suffix = el.textContent.replace(/[0-9,]/g, '');
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);

                el.textContent = current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    };

    // ============================================
    // Hover Effects Enhancement
    // ============================================
    const initHoverEffects = () => {
        // Card tilt effect
        const cards = document.querySelectorAll('.premium-card, .value-card, .service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    };

    // ============================================
    // Mobile Menu Close on Navigation
    // ============================================
    const initMobileMenuClose = () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = mobileMenu?.querySelectorAll('a');

        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    };

    // ============================================
    // Initialize All
    // ============================================
    const init = () => {
        animateOnScroll();
        initSmoothScroll();
        initSelfCheck();
        initFilters();
        initFormEnhancements();
        initParallax();
        initCounters();
        initHoverEffects();
        initMobileMenuClose();
    };

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
