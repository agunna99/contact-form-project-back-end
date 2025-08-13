// This code will run only after the entire HTML document is ready.
document.addEventListener('DOMContentLoaded', () => {

    // --- Form Validation and Back-End Submission ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Get the form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Simple validation: check if fields are not empty
            if (name === '' || email === '' || message === '') {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.color = '#ef5350';
                return;
            }

            // Basic email validation using a regular expression
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formMessage.textContent = 'Please enter a valid email address.';
                formMessage.style.color = '#ef5350';
                return;
            }

            // Show a loading message
            formMessage.textContent = 'Sending your message...';
            formMessage.style.color = '#64ffda';

            // Create a data object to send to the server
            const formData = { name, email, message };

            try {
                // The fetch URL MUST point to '/api/contact' to match the file path.
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    formMessage.style.color = '#66bb6a';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'Oops! Something went wrong. Please try again later.';
                    formMessage.style.color = '#ef5350';
                }

            } catch (error) {
                console.error('Error:', error);
                formMessage.textContent = 'A network error occurred. Please check your connection.';
                formMessage.style.color = '#ef5350';
            }
        });
    }

});
