document.addEventListener('DOMContentLoaded', function() {
    const clickToConvert = document.getElementById('clicktoconvert');
    const convertTextArea = document.getElementById('Convert');

    // Check for browser support for SpeechRecognition
    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognition) {
        alert("Sorry, your browser does not support speech recognition.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = true; // Enable interim results

    // Handle results from speech recognition
    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join(' '); // Join transcripts into a single string

        convertTextArea.value = transcript; // Set the textarea value to the recognized text
    });

    // Start recognition when button is clicked
    clickToConvert.addEventListener('click', function() {
        recognition.start(); // Start voice recognition
        console.log("Voice recognition started. Try speaking into the microphone.");
    });

    // Handle errors
    recognition.addEventListener('error', event => {
        console.error("Error occurred in recognition: " + event.error);
        alert("Error occurred: " + event.error);
    });

    // Handle end of recognition
    recognition.addEventListener('end', () => {
        console.log("Voice recognition ended.");
    });
});