document.addEventListener('DOMContentLoaded', () => {
    console.log("HandTrack.js:", typeof handTrack); // Debug: Check if library is loaded

    const webcam = document.getElementById('webcam');
    const canvas = document.getElementById('output');
    const startButton = document.getElementById('start-button');
    const ctx = canvas.getContext('2d');
    let model = null;

    // Load Handtrack.js model
    handTrack.load({
        flipHorizontal: true,
        maxNumBoxes: 1,
        scoreThreshold: 0.6
    }).then(loadedModel => {
        model = loadedModel;
        console.log("Handtrack model loaded successfully.");
    }).catch(error => {
        console.error("Error loading Handtrack.js:", error);
    });

    startButton.addEventListener('click', () => {
        if (!model) {
            alert("Model is not loaded yet. Please wait.");
            return;
        }

        handTrack.startVideo(webcam).then(status => {
            if (status) {
                console.log("Webcam started.");
                detectHands();
            } else {
                alert("Please enable your webcam to proceed.");
            }
        });
    });

    function detectHands() {
        model.detect(webcam).then(predictions => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(webcam, 0, 0, canvas.width, canvas.height);

            predictions.forEach(prediction => {
                const [x, y, width, height] = prediction.bbox;
                ctx.strokeStyle = "#ff0000";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);

                ctx.fillStyle = "#ff0000";
                ctx.font = "16px Arial";
                ctx.fillText(
                    `${prediction.label} (${(prediction.score * 100).toFixed(1)}%)`,
                    x,
                    y - 10
                );
            });

            requestAnimationFrame(detectHands); // Keep detecting hands
        });
    }
});
