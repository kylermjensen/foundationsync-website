// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            business: document.getElementById('business').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            industry: document.getElementById('industry').value,
            employees: document.getElementById('employees').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        // Get the submit button
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            // TODO: Replace with your actual form endpoint
            // Options:
            // 1. Formspree: https://formspree.io/
            // 2. Netlify Forms: https://www.netlify.com/products/forms/
            // 3. Google Forms: https://www.google.com/forms/about/
            // 4. Custom backend endpoint

            // For now, log to console (you'll need to set up a form handler)
            console.log('Form submission:', formData);

            // Simulate API call (remove this when you have a real endpoint)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success message
            showMessage('Thank you! I\'ll respond within 24 hours to schedule your free audit.', 'success');

            // Reset form
            contactForm.reset();

        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Something went wrong. Please email me directly or try again.', 'error');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Show message function
function showMessage(message, type) {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    // Add styles
    messageDiv.style.padding = '1rem';
    messageDiv.style.marginTop = '1rem';
    messageDiv.style.borderRadius = '0.5rem';
    messageDiv.style.textAlign = 'center';
    messageDiv.style.fontWeight = '600';

    if (type === 'success') {
        messageDiv.style.background = '#d1fae5';
        messageDiv.style.color = '#065f46';
    } else {
        messageDiv.style.background = '#fee2e2';
        messageDiv.style.color = '#991b1b';
    }

    // Insert after form
    contactForm.appendChild(messageDiv);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.5s';
        messageDiv.style.opacity = '0';
        setTimeout(() => messageDiv.remove(), 500);
    }, 5000);
}

// Add active state to nav on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }

    lastScrollTop = scrollTop;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.benefit-card, .step, .industry');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
