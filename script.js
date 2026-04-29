function hamburg() {
    setMobileMenu(true);
}

function cancel() {
    setMobileMenu(false);
}

function setMobileMenu(isOpen) {
    const navbar = document.querySelector('.dropdown');
    const openButton = document.querySelector('.hamburg');

    if (!navbar) {
        return;
    }

    if (isOpen) {
        navbar.classList.add('active');
    } else {
        navbar.classList.remove('active');
    }
    navbar.setAttribute('aria-hidden', String(!isOpen));

    if (openButton) {
        openButton.setAttribute('aria-expanded', String(isOpen));
    }
}

// Navbar scroll effect & Back to Top visibility
function handleScroll() {
    const nav = document.querySelector('nav');
    const backToTop = document.querySelector('.back-to-top');

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    if (backToTop) {
        if (window.scrollY > 500) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    }
}

function getApiBaseUrl() {
    if (window.location.protocol === 'file:') {
        return 'http://localhost:3000';
    }

    return window.location.origin;
}

const texts = [
    "DevOps Engineer",
    "System Administrator",
];

let speed = 60;

const textElements = document.querySelector('.typewriter-text');

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
    if (!textElements) return; // Ensure element exists
    if (characterIndex < texts[textIndex].length) {
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    }
    else {
        setTimeout(eraseText, 800);
    }
}

function eraseText() {
    if (!textElements) return; // Ensure element exists
    if (textElements.innerHTML.length > 0) {
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 30);
    }
    else {
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 300);
    }
}

// Initialize typewriter only if the element exists (on home page)
if (textElements) {
    window.addEventListener('load', typeWriter);
}

// Skill bar animation functionality
function animateSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const width = skillFill.style.width;
                skillFill.style.width = '0%';
                setTimeout(() => {
                    skillFill.style.width = width;
                }, 100);
                observer.unobserve(skillFill);
            }
        });
    }, observerOptions);

    skillFills.forEach(skillFill => {
        observer.observe(skillFill);
    });
}

// Initialize skill bar animations only if skill elements exist (on skills page)
if (document.querySelectorAll('.skill-fill').length > 0) {
    window.addEventListener('load', animateSkillBars);
}

// ============= Contact Form Validation and Handling =============

// Form validation functions
function validateName(name) {
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (phone.trim() === '') {
        return ''; // Phone is optional
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }
    return '';
}

function validateSubject(subject) {
    if (subject.trim().length < 3) {
        return 'Subject must be at least 3 characters long';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Clear field error on input
function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(errorId);

    if (field) {
        field.addEventListener('input', function () {
            field.classList.remove('input-error');
            errorSpan.classList.remove('show');
            errorSpan.textContent = '';
        });
    }
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();

    // Get form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');

    // Clear previous messages
    formMessage.classList.remove('success', 'error');
    formMessage.textContent = '';

    // Validate all fields
    let hasError = false;

    // Name validation
    const nameError = validateName(nameInput.value);
    if (nameError) {
        nameInput.classList.add('input-error');
        document.getElementById('nameError').classList.add('show');
        document.getElementById('nameError').textContent = nameError;
        hasError = true;
    } else {
        nameInput.classList.remove('input-error');
        document.getElementById('nameError').classList.remove('show');
    }

    // Email validation
    const emailError = validateEmail(emailInput.value);
    if (emailError) {
        emailInput.classList.add('input-error');
        document.getElementById('emailError').classList.add('show');
        document.getElementById('emailError').textContent = emailError;
        hasError = true;
    } else {
        emailInput.classList.remove('input-error');
        document.getElementById('emailError').classList.remove('show');
    }

    // Phone validation
    const phoneError = validatePhone(phoneInput.value);
    if (phoneError) {
        phoneInput.classList.add('input-error');
        document.getElementById('phoneError').classList.add('show');
        document.getElementById('phoneError').textContent = phoneError;
        hasError = true;
    } else {
        phoneInput.classList.remove('input-error');
        document.getElementById('phoneError').classList.remove('show');
    }

    // Subject validation
    const subjectError = validateSubject(subjectInput.value);
    if (subjectError) {
        subjectInput.classList.add('input-error');
        document.getElementById('subjectError').classList.add('show');
        document.getElementById('subjectError').textContent = subjectError;
        hasError = true;
    } else {
        subjectInput.classList.remove('input-error');
        document.getElementById('subjectError').classList.remove('show');
    }

    // Message validation
    const messageError = validateMessage(messageInput.value);
    if (messageError) {
        messageInput.classList.add('input-error');
        document.getElementById('messageError').classList.add('show');
        document.getElementById('messageError').textContent = messageError;
        hasError = true;
    } else {
        messageInput.classList.remove('input-error');
        document.getElementById('messageError').classList.remove('show');
    }

    // If no errors, submit to backend API
    if (!hasError) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        fetch(`${getApiBaseUrl()}/api/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                subject: subjectInput.value,
                message: messageInput.value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.classList.add('success');
                    formMessage.textContent = '✓ ' + data.message;
                    form.reset();
                } else {
                    formMessage.classList.add('error');
                    formMessage.textContent = data.message || 'Failed to send message. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.classList.add('error');
                formMessage.textContent = 'Network error. Please check your connection and try again.';
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                setTimeout(() => {
                    formMessage.classList.remove('success', 'error');
                    formMessage.textContent = '';
                }, 5000);
            });
    }
}

// Event Listeners
window.addEventListener('scroll', handleScroll);

// Initialize contact form if it exists
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.dropdown');
    const dropdownLinks = document.querySelectorAll('.dropdown .links a');
    const contactForm = document.getElementById('contactForm');

    if (dropdown) {
        dropdown.setAttribute('aria-hidden', 'true');
    }

    dropdownLinks.forEach((link) => {
        link.addEventListener('click', () => {
            cancel();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            cancel();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            cancel();
        }
    });

    if (contactForm) {
        // Add submit listener
        contactForm.addEventListener('submit', handleFormSubmit);

        // Add input listeners to clear errors
        clearFieldError('name', 'nameError');
        clearFieldError('email', 'emailError');
        clearFieldError('phone', 'phoneError');
        clearFieldError('subject', 'subjectError');
        clearFieldError('message', 'messageError');
    }
});
