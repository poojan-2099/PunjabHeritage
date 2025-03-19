document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                to_name: 'Punjab Heritage', // Restaurant name
                to_email: 'info@punjabheritage.com' // Restaurant email
            };

            // Send email using EmailJS
            emailjs.send(
                'service_mh89jen', // Replace with your EmailJS service ID
                'template_1124ntd', // Replace with your EmailJS template ID
                templateParams
            )
            .then(function(response) {
                // Show success message
                showFormMessage('Thank you for your message. We will contact you soon!', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                // Show error message
                showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }

    // Function to show form messages
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.innerHTML = message;

        // Insert message after form
        contactForm.insertAdjacentElement('afterend', messageDiv);

        // Auto-hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
});