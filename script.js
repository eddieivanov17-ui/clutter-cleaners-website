// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form Handling
const estimateForm = document.getElementById('estimateForm');
if (estimateForm) {
    estimateForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'phone'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                input.style.borderColor = '#dc3545';
                showFieldError(input, 'This field is required');
            } else {
                input.style.borderColor = '#e9ecef';
                clearFieldError(input);
            }
        });
        
        // Validate email format
        const emailInput = this.querySelector('[name="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (data.email && !emailRegex.test(data.email)) {
            isValid = false;
            emailInput.style.borderColor = '#dc3545';
            showFieldError(emailInput, 'Please enter a valid email address');
        }
        
        // Validate phone format
        const phoneInput = this.querySelector('[name="phone"]');
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (data.phone && !phoneRegex.test(data.phone)) {
            isValid = false;
            phoneInput.style.borderColor = '#dc3545';
            showFieldError(phoneInput, 'Please enter a valid phone number');
        }
        
        // Check if at least one service is selected
        const serviceCheckboxes = this.querySelectorAll('[name="services"]:checked');
        if (serviceCheckboxes.length === 0) {
            isValid = false;
            showFormError('Please select at least one service');
        }
        
        if (isValid) {
            // Show success message
            showFormSuccess('Thank you! Your estimate request has been submitted. We\'ll contact you within 24 hours.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', data);
        }
    });
}

// Helper function to show field errors
function showFieldError(input, message) {
    clearFieldError(input);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    input.parentNode.appendChild(errorDiv);
}

// Helper function to clear field errors
function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Helper function to show form success message
function showFormSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid #c3e6cb;
    `;
    successDiv.textContent = message;
    
    const form = document.getElementById('estimateForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Helper function to show form error message
function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        border: 1px solid #f5c6cb;
    `;
    errorDiv.textContent = message;
    
    const form = document.getElementById('estimateForm');
    form.insertBefore(errorDiv, form.firstChild);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-prop, .service-card, .testimonial, .gallery-item, .step').forEach(el => {
    observer.observe(el);
});

// Gallery lightbox functionality (simple implementation)
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 8px;
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function() {
                document.body.removeChild(lightbox);
            });
            
            // Close lightbox on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                }
            });
        }
    });
});

// Phone number formatting
const phoneInput = document.querySelector('[name="phone"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
        }
        e.target.value = value;
    });
}

// Service checkbox validation
document.querySelectorAll('[name="services"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const formError = document.querySelector('.form-error');
        if (formError) {
            formError.remove();
        }
    });
});

// Lazy loading for images
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

// Add loading state to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.type === 'submit') {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Initialize tooltips for service features
document.querySelectorAll('.service-features li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Add click-to-call functionality for phone numbers
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // Track phone clicks for analytics (if needed)
        console.log('Phone number clicked:', this.href);
    });
});

// Form field focus effects
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentNode.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentNode.classList.remove('focused');
        }
    });
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Initialize the first section immediately
const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
}
