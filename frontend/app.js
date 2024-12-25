// Canvas setup
const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')


canvas.width = 800
canvas.height = 600

let isDrawing = false
let currentColor = document.getElementById('brushColor').value
let currentBrushSize = document.getElementById('brushSize').value

// Image manipulation variables
let img = null // Store the image object
let imgX = 100 // Initial X position of the image
let imgY = 100
// Initial Y position of the image
let imgWidth = 200
// Initial width of the image
let imgHeight = 150 // Initial height of the image
let isDragging = false
let isResizing = false
let startX, startY

// Update brush color
document.getElementById('brushColor').addEventListener('change', (e) => {
  currentColor = e.target.value
})

// Update brush size
document.getElementById('brushSize').addEventListener('change', (e) => {
  currentBrushSize = e.target.value
})

// Start Drawing
canvas.addEventListener('mousedown', (e) => {
  const mouseX = e.offsetX
  const mouseY = e.offsetY

  // Check if resizing the image
  if (
    img &&
    mouseX >= imgX + imgWidth - 10 &&
    mouseX <= imgX + imgWidth &&
    mouseY >= imgY + imgHeight - 10 &&
    mouseY <= imgY + imgHeight
  ) {
    isResizing = true
    startX = mouseX
    startY = mouseY
  }
  // Check if dragging the image
  else if (
    img &&
    mouseX >= imgX &&
    mouseX <= imgX + imgWidth &&
    mouseY >= imgY &&
    mouseY <= imgY + imgHeight
  ) {
    isDragging = true
    startX = mouseX
    startY = mouseY
  } else {
    isDrawing = true
    ctx.beginPath()
    ctx.moveTo(e.offsetX, e.offsetY)
    ctx.strokeStyle = currentColor
    ctx.lineWidth = currentBrushSize
  }
})

canvas.addEventListener('mousemove', (e) => {
  const mouseX = e.offsetX
  const mouseY = e.offsetY

  // Cursor changes
  if (
    img &&
    mouseX >= imgX + imgWidth - 10 &&
    mouseX <= imgX + imgWidth &&
    mouseY >= imgY + imgHeight - 10 &&
    mouseY <= imgY + imgHeight
  ) {
    canvas.style.cursor = 'nwse-resize'
  } else if (
    img &&
    mouseX >= imgX &&
    mouseX <= imgX + imgWidth &&
    mouseY >= imgY &&
    mouseY <= imgY + imgHeight
  ) {
    canvas.style.cursor = 'move'
  } else {
    canvas.style.cursor = 'default'
  }

  // Handle resizing
  if (isResizing) {
    const dx = mouseX - startX
    const dy = mouseY - startY
    imgWidth += dx
    imgHeight += dy
    startX = mouseX
    startY = mouseY
    drawCanvas()
  }

  // Handle dragging
  if (isDragging) {
    const dx = mouseX - startX
    const dy = mouseY - startY
    imgX += dx
    imgY += dy
    startX = mouseX
    startY = mouseY
    drawCanvas()
  }

  // Drawing lines
  if (isDrawing) {
    ctx.lineTo(e.offsetX, e.offsetY)
    ctx.stroke()
  }
})

canvas.addEventListener('mouseup', () => {
  isDrawing = false
  isDragging = false
  isResizing = false
  ctx.closePath()
})

canvas.addEventListener('mouseout', () => {
  isDrawing = false
  isDragging = false
  isResizing = false
})

// Clear canvas
document.getElementById('clearCanvas').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  img = null // Clear the image
})

// Upload and display an image
document.getElementById('uploadImage').addEventListener('change', (e) => {
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      img = new Image()
      img.onload = () => {
        imgWidth = img.width / 2 // Scale down for initial load
        imgHeight = img.height / 2
        drawCanvas()
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  }
})

// Export canvas as an image
document.getElementById('exportCanvas').addEventListener('click', () => {
  const link = document.createElement('a')
  link.download = 'canvas-drawing.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
})

// Draw canvas contents
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (img) {
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight)
  }
}

// Initial canvas draw
drawCanvas()

// Video call and screen sharing logic remains as provided earlier
// Additional features like radio functionality are also kept the same
// and appended as necessary.

//   above code is for canvas
// Video call setup
const localVideo = document.getElementById('localVideo')
let localStream = null // To hold the media stream

// Start the video call
const startCall = async () => {
  try {
    // Get media stream
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    localVideo.srcObject = localStream // Set the video element to display the stream
  } catch (error) {
    console.error('Error starting video call:', error)
    alert('Could not access your camera and microphone.')
  }
}

// End the video call
const endCall = () => {
  if (localStream) {
    // Stop all tracks in the stream
    localStream.getTracks().forEach((track) => track.stop())
    localStream = null // Clear the stream reference
    localVideo.srcObject = null // Clear the video element
  }
}

// Screen sharing functionality
const shareScreen = async () => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    })
    localVideo.srcObject = screenStream

    // Stop screen sharing when the stream ends
    screenStream.getVideoTracks()[0].onended = () => {
      if (localStream) {
        localVideo.srcObject = localStream // Revert to camera feed
      } else {
        localVideo.srcObject = null
      }
    }
  } catch (error) {
    console.error('Error sharing screen:', error)
    alert('Unable to share the screen.')
  }
}

// Attach event listeners
document.getElementById('startCall').addEventListener('click', startCall)
document.getElementById('endCall').addEventListener('click', endCall)
document.getElementById('shareScreen').addEventListener('click', shareScreen)

// Additional toolbox buttons
document.querySelector('.videoCallIcon').addEventListener('click', () => {
  document.getElementById('videoContainer').style.display = 'block'
})

document
  .querySelector('.screenShareIcon')
  .addEventListener('click', shareScreen)

document.querySelector('.radioIcon').addEventListener('click', () => {
  alert('Radio feature is under development!')
})

//Radion Secton
const radioBox = document.getElementById('radioBox')
const languageSelect = document.getElementById('languageSelect')
const channelList = document.getElementById('channelList')
const radioPlayer = document.getElementById('radioPlayer')

// Default international channels
const radioChannels = {
  international: [
    {
      name: 'Capital Dance',
      url: 'https://media-ice.musicradio.com/CapitalDanceMP3',
    },
    {
      name: 'NRJ Hits',
      url: 'http://cdn.nrjaudio.fm/audio1/fr/30001/mp3_128.mp3',
    },
    { name: 'Kiss FM', url: 'http://stream.kissfm.ro:8000/kissfm.aacp' },
  ],
  english: [
    { name: 'Capital FM', url: 'http://media-ice.musicradio.com/CapitalMP3' },
    {
      name: 'Heart Radio',
      url: 'http://media-ice.musicradio.com/HeartLondonMP3',
    },
  ],
  hindi: [
    { name: 'Radio Mirchi', url: 'http://sc-bb.1.fm:8017/' },
    { name: 'Big FM', url: 'http://sc-bb.1.fm:8030/' },
  ],
  spanish: [
    {
      name: 'Cadena SER',
      url: 'http://playerservices.streamtheworld.com/api/livestream-redirect/CADENASER.mp3',
    },
    {
      name: 'Los 40',
      url: 'http://playerservices.streamtheworld.com/api/livestream-redirect/LOS40.mp3',
    },
  ],
}

// Function to render channels
const renderChannels = (language) => {
  channelList.innerHTML = ''
  const channels = radioChannels[language]
  channels.forEach((channel) => {
    const button = document.createElement('button')
    button.textContent = channel.name
    button.addEventListener('click', () => {
      radioPlayer.src = channel.url
      radioPlayer.play()
    })
    channelList.appendChild(button)
  })

  // Set default channel
  if (channels.length > 0) {
    radioPlayer.src = channels[0].url
    radioPlayer.play()
  }
}

// Show radio box
document.querySelector('.radioIcon').addEventListener('click', () => {
  radioBox.style.display = radioBox.style.display === 'none' ? 'block' : 'none'
  renderChannels('international') // Default language
})

// Update channels based on language
languageSelect.addEventListener('change', (e) => {
  renderChannels(e.target.value)
})
