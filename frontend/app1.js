const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

let isDrawing = false;
let points = [];
let currentColor = document.getElementById('brushColor').value;

document.getElementById('brushColor').addEventListener('change', (e) => {
  currentColor = e.target.value;
});

// Start Drawing
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = 2;
});

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
  ctx.closePath();
});












document.getElementById('uploadImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const targetWidth = canvas.width / 2;
        const targetHeight = targetWidth / aspectRatio;
  
        ctx.drawImage(img, 100, 100, targetWidth, targetHeight);
      };
      img.src = URL.createObjectURL(file);
    }
  });

  










  const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');

const startCall = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = stream;

  // WebRTC setup logic here
};

const shareScreen = async () => {
  const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
  localVideo.srcObject = stream;

  // Share screen logic
};

document.getElementById('startCall').addEventListener('click', startCall);
document.getElementById('shareScreen').addEventListener('click', shareScreen);





// Clear canvas and reset
clearCanvas.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  importedImage = null;
});