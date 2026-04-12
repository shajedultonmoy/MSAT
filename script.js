function hamburg(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(0px)';
}

function cancel(){
    const navbar = document.querySelector('.dropdown');
    navbar.style.transform = 'translateY(-500px)';
}

const texts = [
    "DEVOPS ENGINEER",
    "System Administrator",
];

let speed = 100;

const textElements = document.querySelector('.typewriter-text');

let textIndex = 0;
let characterIndex = 0;

function typeWriter(){
    if(characterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(characterIndex);
        characterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000);
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0, -1);
        setTimeout(eraseText, 50);
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        characterIndex = 0;
        setTimeout(typeWriter, 500);
    }
}

// Initialize typewriter only if the element exists (on home page)
if(textElements) {
    window.onload = typeWriter;
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
        field.addEventListener('input', function() {
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
    
    // If no errors, show success message and reset form
    if (!hasError) {
        formMessage.classList.add('success');
        formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        
        // Reset form
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 5000);
    }
}

// Initialize contact form if it exists
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
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

