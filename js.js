const generate = document.getElementById('genMeme');
generate.addEventListener('click', function() {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    const imageInput = document.getElementById('imageInput');
    const imageMeme = document.getElementById('meme');
    const colorInput = document.getElementById('color');
    const fontInput = document.getElementById('font');

    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        // ...

        // ...

        reader.onload = function (e) {
            imageMeme.src = e.target.result;

            imageMeme.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = imageMeme.width;
                canvas.height = imageMeme.height;

                context.drawImage(imageMeme, 0, 0, canvas.width, canvas.height);

                // Create a separate canvas for text rendering
                const textCanvas = document.createElement('canvas');
                const textContext = textCanvas.getContext('2d');
                textCanvas.width = canvas.width; // or adjust as needed
                textCanvas.height = canvas.height; // or adjust as needed

                // Get values from inputs
                const selectedColor = colorInput.value;
                const selectedFont = fontInput.value;

                textContext.font = `3em ${selectedFont}`;
                textContext.fillStyle = selectedColor;
                textContext.strokeStyle = 'black';
                textContext.lineWidth = 2; // Adjust this value for the size of the filled text stroke
                textContext.textAlign = 'center';

                // Function to split text into lines
                function splitTextIntoLines(text) {
                    const words = text.split(' ');
                    const lines = [];
                    let currentLine = '';

                    for (let i = 0; i < words.length; i++) {
                        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
                        const testWidth = textContext.measureText(testLine).width;

                        if (testWidth <= textCanvas.width) {
                            currentLine = testLine;
                        } else {
                            lines.push(currentLine);
                            currentLine = words[i];
                        }
                    }

                    lines.push(currentLine);
                    return lines;
                }

                // Calculate text position to center it within the canvas
                const textX = textCanvas.width / 2;
                const textYTop = 40; // Adjust as needed
                const textYBottom = textCanvas.height - 60; // Adjust as needed

                // Split and render TOP text
                const linesTop = splitTextIntoLines(topText);
                linesTop.forEach((line, index) => {
                    textContext.fillText(line, textX, textYTop + (index * 40));
                    textContext.lineWidth = 1; // Adjust this value for the size of the stroke for the word "stroke"
                    textContext.strokeText(line, textX, textYTop + (index * 40));
                });

                // Split and render BOTTOM text
                const linesBottom = splitTextIntoLines(bottomText);
                linesBottom.forEach((line, index) => {
                    textContext.fillText(line, textX, textYBottom + (index * 40));
                    textContext.lineWidth = 1; // Adjust this value for the size of the stroke for the word "stroke"
                    textContext.strokeText(line, textX, textYBottom + (index * 40));
                });

                // Combine the image canvas with the text canvas
                context.drawImage(textCanvas, 0, 0, canvas.width, canvas.height);

                imageMeme.src = canvas.toDataURL('image/jpeg');
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image.');
    }
});


// Select the download button
const downloadButton = document.getElementById('downloadButton');

// Add a click event listener to the download button
downloadButton.addEventListener('click', function () {
    // Convert the canvas content to a data URL
    const dataURL = canvas.toDataURL('image/jpeg');

    // Create a temporary anchor element
    const downloadLink = document.createElement('a');

    // Set the download link's href to the data URL
    downloadLink.href = dataURL;

    // Set the download attribute with the desired file name
    downloadLink.download = 'meme.jpg';

    // Append the download link to the document
    document.body.appendChild(downloadLink);

    // Trigger a click on the download link to start the download
    downloadLink.click();

    // Remove the download link
    document.body.removeChild(downloadLink);
});

// ...
