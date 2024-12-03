document.addEventListener('DOMContentLoaded', function() {
    const clickToConvert = document.getElementById('clicktoconvert');
    const convertTextArea = document.getElementById('Convert');


    function speechToImage(promptText) {
        const form = new FormData();
        form.append('prompt', promptText);
    
        console.log("Sending request to generate image with prompt:", promptText);
    
        fetch('https://clipdrop-api.co/text-to-image/v1', {
            method: 'POST',
            headers: {
                'x-api-key': "4ce03e3ecf68997520255610c50ad016edb22ea1eb5c3d95b18d56137b20dceadd2f6eac3dad333015713ffe9ab0e42b",
            },
            body: form,
        })
        .then(response => {
            console.log("Response received:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then(buffer => {
            console.log("Buffer received, generating image...");
            const blob = new Blob([buffer], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(blob);
    
            // Display image
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Generated Image';
            img.style.maxWidth = '100%';
            img.style.marginTop = '20px';
    
            const imageContainer = document.querySelector("#image-container");
            imageContainer.innerHTML = ""; // Clear previous images
            imageContainer.appendChild(img);
    
            console.log("Image generated successfully.");
        })
        .catch(error => {
            console.error("Error generating the image:", error.message || error);
            alert("An error occurred while generating the image. Please check the console for details.");
        });
    }
    


//     // Check for browser support for SpeechRecognition
//     const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//     if (!SpeechRecognition) {
//         alert("Sorry, your browser does not support speech recognition.");
//         return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true; // Enable interim results

//     // Handle results from speech recognition
//     recognition.addEventListener('result', e => {
//         const transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join(' '); // Join transcripts into a single string


// //ENTER TEXT TO IMG HEREEEE


//         console.log(transcript); // Set the textarea value to the recognized text
//         // speechToImage(transcript);
//     });

//     // Start recognition when button is clicked
//     clickToConvert.addEventListener('click', function() {
//         recognition.start(); // Start voice recognition
//         console.log("Voice recognition started. Try speaking into the microphone.");
//     });

//     // Handle errors
//     recognition.addEventListener('error', event => {
//         console.error("Error occurred in recognition: " + event.error);
//         alert("Error occurred: " + event.error);
//     });

//     // Handle end of recognition
//     recognition.addEventListener('end', () => {
//         console.log("Voice recognition ended.");
//     });
// });










// document.addEventListener('DOMContentLoaded', function () {
    // const clickToConvert = document.getElementById('clicktoconvert');
    // const convertTextArea = document.getElementById('Convert');

    // Check for browser support for SpeechRecognition
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
        alert("Sorry, your browser does not support speech recognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Allow continuous recognition
    recognition.lang = 'en-US'; // Set the language (adjust as needed)

    let isListening = false; // Track whether recognition is active
    let finalTranscript = ""; // Store the final transcript

    // Handle results from speech recognition
    recognition.addEventListener('result', (e) => {
        console.log("Result event fired."); // Debug: Check if event fires
        for (let i = 0; i < e.results.length; i++) {
            if (e.results[i].isFinal) {
                console.log("Final result received:", e.results[i][0].transcript); // Debug
                finalTranscript += e.results[i][0].transcript + ' ';
                
            }
        }
        speechToImage(finalTranscript.trim()); // Update textarea with final result
    });

    // Toggle recognition when the button is clicked
    clickToConvert.addEventListener('click', function () {
        if (isListening) {
            recognition.stop(); // Stop voice recognition
            isListening = false;
            console.log("Voice recognition stopped.");
            
        } else {
            recognition.start(); // Start voice recognition
            isListening = true;
            finalTranscript = ""; // Clear the final transcript
            console.log("Voice recognition started. Try speaking into the microphone.");
        }
    });

    // Handle errors
    recognition.addEventListener('error', (event) => {
        console.error("Error occurred in recognition:", event.error);
        alert("Error occurred: " + event.error);
    });

    // Handle recognition end
    recognition.addEventListener('end', () => {
        if (isListening) {
            console.log("Recognition ended. Restarting...");
            recognition.start(); // Restart recognition if still listening
        } else {
            console.log("Recognition ended completely.");
        }
    });
});
