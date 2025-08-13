// This is the Vercel serverless function.
// It is a backend script that handles the form submission.
// It must be placed in a file named 'contact.js' inside an 'api' folder.

export default async function handler(request, response) {
    // We only want to process requests that come from our form, which uses a POST method.
    if (request.method === 'POST') {
        try {
            // The data sent from the form is in the request body.
            const formData = request.body;

            // This is where you would process the data, for example, sending an email.
            // For now, we are just logging it to the Vercel console.
            console.log('Received form data:', formData);

            // Send a success message back to the front end.
            // The 'response.ok' check in our 'script.js' file depends on this.
            return response.status(200).json({ message: 'Message received successfully!' });
        } catch (error) {
            // Log any errors that occur and send a 500 status code.
            console.error('Error handling form submission:', error);
            return response.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        // If the request method isn't POST, we send a 405 error.
        // This is a security measure to prevent misuse.
        return response.status(405).json({ message: 'Method Not Allowed' });
    }
}
