const qrFileInput = document.getElementById("qr-file");
const qrCanvas = document.getElementById("qr-canvas");
const qrResult = document.getElementById("qr-result");
const canvasContext = qrCanvas.getContext("2d");

qrFileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        const image = new Image();
        image.onload = function () {
            qrCanvas.width = image.width;
            qrCanvas.height = image.height;
            canvasContext.drawImage(image, 0, 0, qrCanvas.width, qrCanvas.height);

            const imageData = canvasContext.getImageData(0, 0, qrCanvas.width, qrCanvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

            if (qrCode) {
                qrResult.textContent = "QR Code Result: " + qrCode.data;
            } else {
                qrResult.textContent = "No QR code found.";
            }
        };
        image.src = reader.result;
    };
    reader.readAsDataURL(file);
});
