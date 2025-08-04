document.addEventListener('DOMContentLoaded', function () {
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');

        // Update indicator opacity
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.style.opacity = '0.9';
            } else {
                indicator.style.opacity = '0.3';
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000); // Change every 5 seconds
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Start the slideshow
    startSlideshow();

    // Click indicators to change slide
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopSlideshow();
            startSlideshow(); // Restart the timer
        });
    });

    // Pause slideshow on hover
    const heroSection = document.querySelector('#accueil');
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);

    // Initialize first slide
    showSlide(0);
});












// Animation des compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 secondes
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Observer pour déclencher l'animation quand la section est visible
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer la section des statistiques
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.counter').closest('section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});










 class ImageCarousel {
            constructor(carouselElement) {
                this.carousel = carouselElement;
                this.images = this.carousel.querySelectorAll('.carousel-image');
                this.dots = this.carousel.parentElement.querySelectorAll('.carousel-dot');
                this.currentSlide = 0;
                this.autoSlideInterval = null;
                
                this.init();
            }

            init() {
                // Ajouter les événements aux dots
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });

                // Démarrer le défilement automatique
                this.startAutoSlide();

                // Pause au hover
                this.carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
                this.carousel.addEventListener('mouseleave', () => this.startAutoSlide());
            }

            goToSlide(slideIndex) {
                // Masquer l'image actuelle
                this.images[this.currentSlide].classList.remove('active');
                this.dots[this.currentSlide].classList.remove('active');

                // Afficher la nouvelle image
                this.currentSlide = slideIndex;
                this.images[this.currentSlide].classList.add('active');
                this.dots[this.currentSlide].classList.add('active');
            }

            nextSlide() {
                const nextIndex = (this.currentSlide + 1) % this.images.length;
                this.goToSlide(nextIndex);
            }

            startAutoSlide() {
                this.autoSlideInterval = setInterval(() => {
                    this.nextSlide();
                }, 4000); // Change d'image toutes les 4 secondes
            }

            stopAutoSlide() {
                if (this.autoSlideInterval) {
                    clearInterval(this.autoSlideInterval);
                    this.autoSlideInterval = null;
                }
            }
        }

        // Initialiser tous les carrousels au chargement de la page
        document.addEventListener('DOMContentLoaded', function() {
            const carousels = document.querySelectorAll('.carousel');
            carousels.forEach(carousel => {
                new ImageCarousel(carousel);
            });

            // Animation d'apparition progressive des éléments
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observer tous les éléments de projet
            const projectCards = document.querySelectorAll('#projects .bg-white');
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });

        // Fonction pour lazy loading des images
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Initialiser le lazy loading
        document.addEventListener('DOMContentLoaded', lazyLoadImages);















                // Animation d'apparition progressive pour la section support
        document.addEventListener('DOMContentLoaded', function() {
            const supportCards = document.querySelectorAll('#support .group');
            
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 200); // Délai progressif
                    }
                });
            }, observerOptions);

            supportCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(card);
            });
        });



document.addEventListener('DOMContentLoaded', function () {
    const supportSection = document.querySelector('#support-stats'); 
    const counters = supportSection ? supportSection.querySelectorAll('.counter') : [];

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    }

    if (supportSection && counters.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounter(counter));
                    observer.unobserve(supportSection);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(supportSection);
    }
});

