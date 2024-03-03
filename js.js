let imageMeme;

const generate = document.getElementById('genMeme');
generate.addEventListener('click', function() {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    const imageInput = document.getElementById('imageInput');
    imageMeme = document.getElementById('meme'); // Assign imageMeme using let instead of const
    const colorInput = document.getElementById('color');
    const fontInput = document.getElementById('font');

    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            imageMeme.src = e.target.result;

            imageMeme.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = imageMeme.width;
                canvas.height = imageMeme.height;

                context.drawImage(imageMeme, 0, 0, canvas.width, canvas.height);


                const textCanvas = document.createElement('canvas');
                const textContext = textCanvas.getContext('2d');
                textCanvas.width = canvas.width;
                textCanvas.height = canvas.height;


                const selectedColor = colorInput.value;
                const selectedFont = fontInput.value;

                textContext.font = `3em ${selectedFont}`;
                textContext.fillStyle = selectedColor;
                textContext.strokeStyle = 'black';
                textContext.lineWidth = 2;
                textContext.textAlign = 'center';


                function splitTextIntoLines(text, context, maxWidth) {
                    const words = text.split(' ');
                    const lines = [];
                    let currentLine = '';

                    for (let i = 0; i < words.length; i++) {
                        const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
                        const testWidth = context.measureText(testLine).width;

                        if (testWidth <= maxWidth) {
                            currentLine = testLine;
                        } else {
                            lines.push(currentLine);
                            currentLine = words[i];
                        }
                    }

                    lines.push(currentLine);
                    return lines;
                }

                const textX = textCanvas.width / 2;
                const textYTop = 40; // Adjust as needed
                const textYBottom = textCanvas.height - 60; // Adjust as needed

                const linesTop = splitTextIntoLines(topText, textContext, textCanvas.width);
                linesTop.forEach((line, index) => {
                    textContext.fillText(line, textX, textYTop + (index * 40));
                    textContext.lineWidth = 1; // Adjust this value for the size of the stroke
                    textContext.strokeText(line, textX, textYTop + (index * 40));
                });

                const linesBottom = splitTextIntoLines(bottomText, textContext, textCanvas.width);
                linesBottom.forEach((line, index) => {
                    textContext.fillText(line, textX, textYBottom + (index * 40));
                    textContext.lineWidth = 1; // Adjust this value for the size of the stroke
                    textContext.strokeText(line, textX, textYBottom + (index * 40));
                });

                context.drawImage(textCanvas, 0, 0, canvas.width, canvas.height);

                imageMeme.src = canvas.toDataURL('image/jpeg');
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image.');
    }
});

document.getElementById('download').addEventListener('click', function () {
    if (imageMeme && imageMeme.src) {

        const link = document.createElement('a');
        link.href = imageMeme.src;
        link.download = 'meme.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        console.error('imageMeme or its src property is undefined. Make sure to generate the meme first.');
    }
});
