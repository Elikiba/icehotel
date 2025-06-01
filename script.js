document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initMobileMenu();
    initHeroAnimations();
    initContestantsLoadMore();
});


/**
 * Mobile Menu Functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!hamburger || !mobileMenu) return;

    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle menu state
        hamburger.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        document.body.classList.toggle('menu-open', isMenuOpen);
    };

    // Click event for hamburger
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !mobileMenu.contains(e.target) && e.target !== hamburger) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.mobile-nav-item a').forEach(link => {
        link.addEventListener('click', function() {
            if (isMenuOpen) toggleMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (isMenuOpen && e.key === 'Escape') {
            toggleMenu();
        }
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu();
        }
    });
}



/**
 * Preloader Function
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    document.body.style.overflow = 'hidden';
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            setTimeout(() => preloader.remove(), 1000);
        }, 1500);
    });
    
    setTimeout(() => {
        if (document.querySelector('.preloader')) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = '';
            setTimeout(() => preloader.remove(), 1000);
        }
    }, 4000);
}




//  Hero Section Animations

function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const registerButton = document.querySelector('.register-button');
    
    if (heroTitle && heroSubtitle && registerButton) {
        heroTitle.style.opacity = '0';
        heroSubtitle.style.opacity = '0';
        registerButton.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease-in-out';
            heroTitle.style.opacity = '1';
        }, 300);
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'opacity 1s ease-in-out';
            heroSubtitle.style.opacity = '1';
        }, 800);
        
        setTimeout(() => {
            registerButton.style.transition = 'opacity 1s ease-in-out, transform 0.3s ease';
            registerButton.style.opacity = '1';
        }, 1200);
    }
}



/**
 * Contestants Load More Functionality
 */
function initContestantsLoadMore() {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    const contestantsGrid = document.querySelector('.contestants-grid');
    
    if (viewMoreBtn && contestantsGrid) {
        viewMoreBtn.addEventListener('click', function() {
            const currentCount = contestantsGrid.children.length;
            const names = [
                "Amina Yusuf", "Chidera Obi", "Efe Omorodion", 
                "Fatima Bello", "Gbenga Adeleke", "Ifeoma Okoro",
                "Jide Adeoye", "Funke Adetiba", "Lola Shoneye",
                "Kemi Aliu", "Chinaza Ezeonu", "Aminat Jacobs",
                "Chisom Ozokwor", "Adaeze Nwokoye", "Funke Mofe-Damijo"
            ];
            
            for (let i = 0; i < 6 && currentCount + i < 15; i++) {
                const newCard = document.createElement('div');
                newCard.className = 'contestant-card';
                newCard.innerHTML = `
                    <img src="images/contestant${currentCount + i % 2 === 0 ? '' : ''}.png" alt="${names[currentCount + i]}" class="contestant-image">
                    <h3 class="contestant-name">${names[currentCount + i]}</h3>
                `;
                contestantsGrid.appendChild(newCard);
                
                setTimeout(() => {
                    newCard.style.opacity = '1';
                    newCard.style.transform = 'translateY(0)';
                }, 100 * i);
            }
            
            if (contestantsGrid.children.length >= 15) {
                viewMoreBtn.disabled = true;
                viewMoreBtn.textContent = 'All Contestants Loaded';
                viewMoreBtn.style.opacity = '0.7';
            }
        });
    }
}