/**
 * Greatphar Website JavaScript
 * Main functionality and interactions
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initScrollAnimations();
    initCounters();
    initMobileMenu();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.classList.remove('active');
        });
    });
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.philosophy-card, .product-card, .app-card, .specs-block').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add animation class styles
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

/**
 * Animated counters for stats
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        // Format number
        if (target % 1 !== 0) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Modal/Popup functionality
 */
function openInquiry(productName) {
    const modal = document.getElementById('inquiryModal');
    const productSpan = document.getElementById('modalProductName');
    
    if (modal && productSpan) {
        productSpan.textContent = productName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus on first input
        setTimeout(() => {
            const firstInput = modal.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }
}

function closeModal() {
    const modal = document.getElementById('inquiryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

/**
 * Open inquiry modal with product info
 */
function openInquiryModal(productName) {
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('formProduct').value = productName;
    document.getElementById('inquiryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    document.getElementById('inquiryModal').classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Handle form submission via AJAX
 */
document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            
            fetch('https://formspree.io/f/xrerbgoz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // 显示感谢信息
                    this.innerHTML = `
                        <div style="text-align: center; padding: 40px 20px;">
                            <div style="font-size: 48px; margin-bottom: 20px;">✓</div>
                            <h3 style="color: var(--primary-green); margin-bottom: 15px;">Спасибо!</h3>
                            <p style="color: var(--text-gray);">Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.</p>
                        </div>
                    `;
                    
                    // 3秒后自动关闭弹窗
                    setTimeout(() => {
                        closeModal();
                        // 重置表单（延迟执行，等弹窗关闭后）
                        setTimeout(() => {
                            this.reset();
                            this.innerHTML = this.originalHTML || this.innerHTML;
                        }, 300);
                    }, 3000);
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                alert('Произошла ошибка. Пожалуйста, попробуйте позже.');
            });
        });
    }
});

/**
 * Submit to Formspree (example)
 * Replace with your Formspree endpoint
 */
function submitToFormspree(data) {
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    
    fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showNotification('Спасибо! Ваш запрос отправлен.', 'success');
        } else {
            showNotification('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Произошла ошибка. Пожалуйста, попробуйте позже.', 'error');
    });
}

/**
 * Notification system
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.95)' : type === 'error' ? 'rgba(255, 68, 68, 0.95)' : 'rgba(0, 136, 255, 0.95)'};
        color: ${type === 'success' ? '#0a0a0a' : '#fff'};
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-family: 'Times New Roman', Times, serif;
    `;
    
    // Add animation styles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        </style>
    `);
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Product image lazy loading
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Performance: Preload critical resources
 */
function preloadResources() {
    const criticalImages = [
        // Add critical images here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloads
preloadResources();
