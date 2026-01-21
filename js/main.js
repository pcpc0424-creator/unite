/**
 * Premium Law Firm Website
 * 프리미엄 법률사무소 JavaScript
 * Modern Korean Design - Enhanced Version
 */

(function() {
    'use strict';

    // =========================================
    // Scroll Reset on Page Load
    // =========================================
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    document.addEventListener('DOMContentLoaded', function() {
        window.scrollTo(0, 0);
    });

    window.addEventListener('load', function() {
        setTimeout(function() {
            window.scrollTo(0, 0);
        }, 0);
    });

    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });

    // =========================================
    // DOM Elements
    // =========================================
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    // =========================================
    // Header Scroll Effect
    // =========================================
    function initHeaderScroll() {
        if (!header) return;

        let ticking = false;

        function updateHeader() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        updateHeader();
    }

    // =========================================
    // Mobile Menu
    // =========================================
    function initMobileMenu() {
        if (!menuToggle || !mobileMenu) return;

        function openMenu() {
            mobileMenu.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-label', '메뉴 닫기');
            document.body.classList.add('menu-open');
        }

        function closeMenu() {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-label', '메뉴 열기');
            document.body.classList.remove('menu-open');
        }

        menuToggle.addEventListener('click', function() {
            if (mobileMenu.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', closeMenu);
        });

        // Close on logo click
        var logo = document.querySelector('.header .logo');
        if (logo) {
            logo.addEventListener('click', closeMenu);
        }

        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Close on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 1024 && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Mobile submenu toggle
        const submenuToggles = mobileMenu.querySelectorAll('.submenu-toggle');
        submenuToggles.forEach(function(toggle) {
            toggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const parentLi = this.closest('.has-submenu');
                parentLi.classList.toggle('active');
            });
        });
    }

    // =========================================
    // Smooth Scroll
    // =========================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // =========================================
    // Number Counter Animation
    // =========================================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stats-num[data-count]');
        if (counters.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'), 10);
            const duration = 2000;
            const startTime = performance.now();

            function easeOutQuart(t) {
                return 1 - Math.pow(1 - t, 4);
            }

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.floor(target * easedProgress);

                element.textContent = current.toLocaleString('ko-KR');

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target.toLocaleString('ko-KR');
                }
            }

            requestAnimationFrame(update);
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    // =========================================
    // Stats Bar Animation
    // =========================================
    function initStatsBarAnimation() {
        const statsItems = document.querySelectorAll('.stats-item');
        if (statsItems.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.3
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    // Add staggered delay for each item
                    const delay = index * 150;
                    setTimeout(function() {
                        entry.target.classList.add('animated');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statsItems.forEach(function(item) {
            observer.observe(item);
        });
    }

    // =========================================
    // Scroll Reveal Animation
    // =========================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('[data-animate]');

        if (revealElements.length === 0) return;

        // Set initial state based on animation type
        revealElements.forEach(function(el) {
            const animationType = el.getAttribute('data-animate');
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

            switch(animationType) {
                case 'fade-up':
                    el.style.transform = 'translateY(40px)';
                    break;
                case 'fade-down':
                    el.style.transform = 'translateY(-40px)';
                    break;
                case 'fade-left':
                    el.style.transform = 'translateX(40px)';
                    break;
                case 'fade-right':
                    el.style.transform = 'translateX(-40px)';
                    break;
                case 'fade-scale':
                    el.style.transform = 'scale(0.9)';
                    break;
                default:
                    el.style.transform = 'translateY(30px)';
            }
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.getAttribute('data-delay') || 0, 10) * 100;

                    setTimeout(function() {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) translateX(0) scale(1)';
                    }, delay);

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // =========================================
    // Legacy Scroll Reveal (for elements without data-animate)
    // =========================================
    function initLegacyScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.about-header:not([data-animate]), .about-intro:not([data-animate]), .feature-card:not([data-animate]), ' +
            '.practice-header:not([data-animate]), .practice-item:not([data-animate]), ' +
            '.stats-header:not([data-animate]), ' +
            '.testimonial-quote:not([data-animate]), ' +
            '.cta-content:not([data-animate]), .cta-contact:not([data-animate]), ' +
            '.footer-brand:not([data-animate]), .footer-links:not([data-animate])'
        );

        if (revealElements.length === 0) return;

        revealElements.forEach(function(el) {
            if (!el.hasAttribute('data-animate')) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            }
        });

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const parent = element.parentElement;
                    let delay = 0;

                    if (element.classList.contains('feature-card') ||
                        element.classList.contains('practice-item')) {
                        const className = element.classList[0];
                        const siblings = parent.querySelectorAll('.' + className);
                        const index = Array.from(siblings).indexOf(element);
                        delay = index * 100;
                    }

                    setTimeout(function() {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay);

                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        revealElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // =========================================
    // Active Navigation
    // =========================================
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.gnb-list a, .mobile-nav a');

        if (sections.length === 0 || navLinks.length === 0) return;

        let ticking = false;

        function updateActiveNav() {
            const scrollY = window.scrollY;
            const headerHeight = header ? header.offsetHeight : 0;

            let current = '';

            sections.forEach(function(section) {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveNav);
                ticking = true;
            }
        }, { passive: true });

        updateActiveNav();
    }

    // =========================================
    // Practice Items Hover Effect
    // =========================================
    function initPracticeHover() {
        const items = document.querySelectorAll('.practice-item');
        if (items.length === 0) return;

        items.forEach(function(item) {
            item.addEventListener('mouseenter', function() {
                items.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0.5';
                    }
                });
            });

            item.addEventListener('mouseleave', function() {
                items.forEach(function(otherItem) {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }

    // =========================================
    // Feature Cards Hover Effect
    // =========================================
    function initFeatureHover() {
        const cards = document.querySelectorAll('.feature-card');
        if (cards.length === 0) return;

        cards.forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                cards.forEach(function(otherCard) {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.6';
                    }
                });
            });

            card.addEventListener('mouseleave', function() {
                cards.forEach(function(otherCard) {
                    otherCard.style.opacity = '1';
                });
            });
        });
    }

    // =========================================
    // Parallax for Hero
    // =========================================
    function initParallax() {
        const heroVisual = document.querySelector('.hero-visual');
        const heroBg = document.querySelector('.hero-bg');
        const decoCircle = document.querySelector('.deco-circle');

        if (window.innerWidth < 1024) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            if (scrollY < window.innerHeight) {
                if (heroVisual) {
                    heroVisual.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
                }
                if (heroBg) {
                    heroBg.style.transform = 'translateY(' + (scrollY * 0.1) + 'px)';
                }
                if (decoCircle) {
                    decoCircle.style.transform = 'translateY(' + (scrollY * 0.05) + 'px) rotate(' + (scrollY * 0.02) + 'deg)';
                }
            }
            ticking = false;
        }

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // =========================================
    // Hero Text Animation
    // =========================================
    function initHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero-content [data-animate]');

        if (heroElements.length === 0) return;

        heroElements.forEach(function(el) {
            const delay = parseInt(el.getAttribute('data-delay') || 0, 10) * 100;

            setTimeout(function() {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) translateX(0) scale(1)';
            }, 300 + delay);
        });
    }

    // =========================================
    // Scroll Indicator Click
    // =========================================
    function initScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = aboutSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

    // =========================================
    // Magnetic Button Effect
    // =========================================
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-cta');

        if (buttons.length === 0 || window.innerWidth < 1024) return;

        buttons.forEach(function(button) {
            button.addEventListener('mousemove', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            button.addEventListener('mouseleave', function() {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }

    // =========================================
    // Cursor Trail Effect (Premium Touch)
    // =========================================
    function initCursorEffect() {
        if (window.innerWidth < 1024 || 'ontouchstart' in window) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = 'position: fixed; width: 20px; height: 20px; border: 1px solid rgba(201, 169, 98, 0.5); border-radius: 50%; pointer-events: none; z-index: 9999; transition: transform 0.15s ease-out, opacity 0.3s ease; mix-blend-mode: difference;';
        document.body.appendChild(cursor);

        let cursorVisible = false;

        document.addEventListener('mousemove', function(e) {
            if (!cursorVisible) {
                cursor.style.opacity = '1';
                cursorVisible = true;
            }
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorVisible = false;
        });

        // Expand cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .practice-item, .feature-card');
        interactiveElements.forEach(function(el) {
            el.addEventListener('mouseenter', function() {
                cursor.style.transform = 'scale(2)';
                cursor.style.borderColor = 'rgba(201, 169, 98, 0.8)';
            });
            el.addEventListener('mouseleave', function() {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(201, 169, 98, 0.5)';
            });
        });
    }

    // =========================================
    // Lazy Load Images
    // =========================================
    function initLazyLoad() {
        const images = document.querySelectorAll('img[data-src]');
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        images.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // =========================================
    // Preloader (Optional)
    // =========================================
    function initPreloader() {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // =========================================
    // Hero Video Slider
    // =========================================
    function initHeroVideoSlider() {
        const slides = document.querySelectorAll('.hero-video-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        const totalSlides = slides.length;
        const interval = 6000; // 6초마다 전환

        function nextSlide() {
            // 현재 슬라이드에서 active 제거
            slides[currentSlide].classList.remove('active');

            // 다음 슬라이드로 이동
            currentSlide = (currentSlide + 1) % totalSlides;

            // 다음 슬라이드에 active 추가
            slides[currentSlide].classList.add('active');
        }

        // 모든 비디오 재생 시작
        slides.forEach(function(slide) {
            const video = slide.querySelector('video');
            if (video) {
                video.play().catch(function(e) {
                    console.log('Video autoplay prevented:', e);
                });
            }
        });

        // 일정 간격으로 슬라이드 전환
        setInterval(nextSlide, interval);
    }

    // =========================================
    // Initialize
    // =========================================
    function init() {
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initScrollReveal();
        initLegacyScrollReveal();
        initCounterAnimation();
        initStatsBarAnimation();
        initActiveNavigation();
        initPracticeHover();
        initFeatureHover();
        initParallax();
        initHeroAnimation();
        initScrollIndicator();
        initMagneticButtons();
        initCursorEffect();
        initLazyLoad();
        initPreloader();
        initHeroVideoSlider();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
