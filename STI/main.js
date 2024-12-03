

// Text to speech converter and image generator using ClipDrop API

// Select input field and send button from the DOM
const input = document.querySelector("input");
const sendtext = document.querySelector(".send");

// Function to convert speech prompt to an image
function speechToImage(promptText) {
    const form = new FormData();
    form.append('prompt', promptText);

    fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            'x-api-key': "4ce03e3ecf68997520255610c50ad016edb22ea1eb5c3d95b18d56137b20dceadd2f6eac3dad333015713ffe9ab0e42b", // Add your API key here
        },
        body: form,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.arrayBuffer();
    })
    .then(buffer => {
        // Convert binary buffer to a Blob
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        // Create a URL for the Blob
        const imageUrl = URL.createObjectURL(blob);

        // Create an img element and set its source to the Blob URL
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Generated Image';
        img.style.maxWidth = '100%'; // Optional: Adjust as needed
        img.style.marginTop = '20px';

        // Append the image to a container or directly to the body
        const imageContainer = document.querySelector("#image-container");
        imageContainer.appendChild(img);
    })
    .catch(error => {
        console.error('Error generating the image:', error);
        alert("An error occurred while generating the image. Please try again.");
    });
}

// Add event listener to the send button
sendtext.addEventListener("click", (e) => {
    const userInput = input.value.trim();
    if (userInput !== "") {
        // Clear the container before appending the new image
        const imageContainer = document.querySelector("#image-container");
        imageContainer.innerHTML = ""; // Clear previous images

        // Call the speechToImage function with user input
        speechToImage(userInput);
    } else {
        alert("Please enter a prompt before sending.");
    }
});
