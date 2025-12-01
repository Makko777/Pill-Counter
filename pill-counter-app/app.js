// ===================================
// CONFIGURATION - UPDATE THESE VALUES!
// ===================================

// Roboflow Inference API Configuration
const ROBOFLOW_API_KEY = "cg9kAf8so7l5FRfm3Lxw"; // Updated with user provided key
const ROBOFLOW_MODEL_ID = "pill-counting-wys30-lo8k6/1"; // Corrected Model ID provided by user
const ROBOFLOW_API_URL = "https://detect.roboflow.com";

// Detection settings
const CONFIDENCE_THRESHOLD = 0.40;  // Minimum confidence to show detection (0.0 - 1.0)
const OVERLAP_THRESHOLD = 0.30;     // IoU threshold for non-max suppression

// ===================================
// DOM ELEMENTS
// ===================================
const fileInput = document.getElementById('fileInput');
const fileName = document.getElementById('fileName');
const detectBtn = document.getElementById('detectBtn');
const cameraBtn = document.getElementById('cameraBtn');
const captureBtn = document.getElementById('captureBtn');
const stopCameraBtn = document.getElementById('stopCameraBtn');
const canvas = document.getElementById('canvas');
const overlay = document.getElementById('overlay');
const cameraStream = document.getElementById('cameraStream');
const placeholder = document.getElementById('placeholder');
const pillCountDisplay = document.getElementById('pillCountDisplay');
const pillCount = document.getElementById('pillCount');
const confidenceAvg = document.getElementById('confidenceAvg');
const loadingSpinner = document.getElementById('loadingSpinner');
const detectionInfo = document.getElementById('detectionInfo');
const detectionList = document.getElementById('detectionList');

// ===================================
// STATE
// ===================================
let selectedFile = null;
let currentStream = null;
let ctx = null;
let overlayCtx = null;

// ===================================
// INITIALIZATION
// ===================================
function init() {
    // Get canvas contexts
    ctx = canvas.getContext('2d');
    overlayCtx = overlay.getContext('2d');

    // Event listeners
    fileInput.addEventListener('change', handleFileSelect);
    detectBtn.addEventListener('click', detectPills);
    cameraBtn.addEventListener('click', startCamera);
    captureBtn.addEventListener('click', captureAndDetect);
    stopCameraBtn.addEventListener('click', stopCamera);

    console.log('🚀 Pill Counter initialized!');
}

// ===================================
// FILE UPLOAD HANDLING
// ===================================
function handleFileSelect(event) {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }

    selectedFile = file;
    fileName.textContent = file.name;
    detectBtn.disabled = false;

    // Display the selected image
    displayImage(file);

    // Hide camera if active
    stopCamera();
}

function displayImage(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;
            overlay.width = img.width;
            overlay.height = img.height;

            // Draw image on canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            // Clear overlay
            overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

            // Show canvas, hide placeholder
            canvas.style.display = 'block';
            overlay.style.display = 'block';
            placeholder.style.display = 'none';

            // Reset results
            resetResults();
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

// ===================================
// CAMERA HANDLING
// ===================================
async function startCamera() {
    try {
        currentStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }  // Use back camera on mobile
        });

        cameraStream.srcObject = currentStream;
        cameraStream.style.display = 'block';
        canvas.style.display = 'none';
        overlay.style.display = 'none';
        placeholder.style.display = 'none';

        // Update button states
        cameraBtn.style.display = 'none';
        captureBtn.style.display = 'block';
        stopCameraBtn.style.display = 'block';
        detectBtn.disabled = true;

        resetResults();

    } catch (error) {
        console.error('Camera error:', error);
        alert('Could not access camera. Please ensure you have granted camera permissions and are using HTTPS or localhost.');
    }
}

function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }

    cameraStream.style.display = 'none';
    cameraBtn.style.display = 'block';
    captureBtn.style.display = 'none';
    stopCameraBtn.style.display = 'none';

    if (!selectedFile) {
        placeholder.style.display = 'flex';
    }
}

function captureAndDetect() {
    // Capture frame from video stream
    const videoWidth = cameraStream.videoWidth;
    const videoHeight = cameraStream.videoHeight;

    canvas.width = videoWidth;
    canvas.height = videoHeight;
    overlay.width = videoWidth;
    overlay.height = videoHeight;

    ctx.drawImage(cameraStream, 0, 0, videoWidth, videoHeight);

    // Convert canvas to blob
    canvas.toBlob(function (blob) {
        selectedFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });

        // Stop camera and show captured image
        stopCamera();
        canvas.style.display = 'block';
        overlay.style.display = 'block';

        // Automatically run detection
        detectPills();
    }, 'image/jpeg', 0.95);
}

// ===================================
// PILL DETECTION
// ===================================
async function detectPills() {
    if (!selectedFile) {
        alert('Please select an image or use camera first');
        return;
    }

    // Validate configuration
    if (ROBOFLOW_API_KEY === "YOUR_API_KEY_HERE" || ROBOFLOW_API_KEY.includes("YOUR_API_KEY")) {
        alert('⚠️ Please configure your Roboflow API key in app.js!\n\nUpdate line 6 with your actual API key.');
        return;
    }

    // Show loading with initial status
    updateLoadingStatus('Preparing image...');
    showLoading();
    resetResults();

    // Start performance timing
    const perfStart = performance.now();
    console.log('🕐 Detection started');

    try {
        // Resize image and convert to base64
        const resizeStart = performance.now();
        const { base64: base64Image, dataUrl, width: inferenceWidth, height: inferenceHeight } = await resizeImage(selectedFile);
        const resizeEnd = performance.now();
        console.log(`📐 Image resize took: ${(resizeEnd - resizeStart).toFixed(0)}ms (Size: ${inferenceWidth}x${inferenceHeight})`);

        // UPDATE UI: Show the exact image being sent to the model
        // This ensures coordinates align perfectly (What You See Is What You Detect)
        const img = new Image();
        img.onload = () => {
            canvas.width = inferenceWidth;
            canvas.height = inferenceHeight;
            overlay.width = inferenceWidth;
            overlay.height = inferenceHeight;

            ctx.drawImage(img, 0, 0);
            overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
        };
        img.src = dataUrl;

        // Construct Inference API URL
        // Format: https://detect.roboflow.com/model-id/version?api_key=KEY
        const apiUrl = `${ROBOFLOW_API_URL}/${ROBOFLOW_MODEL_ID}?api_key=${ROBOFLOW_API_KEY}&confidence=${CONFIDENCE_THRESHOLD}&overlap=${OVERLAP_THRESHOLD}`;

        console.log(`🔍 Sending request to Roboflow Inference API: ${ROBOFLOW_MODEL_ID}`);
        console.log(`📦 Payload size: ${(base64Image.length / 1024).toFixed(2)} KB`);
        updateLoadingStatus('Analyzing image...');

        // Make API request (POST method is preferred for base64)
        const apiStart = performance.now();
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: base64Image,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const apiEnd = performance.now();
        console.log(`🌐 API request took: ${(apiEnd - apiStart).toFixed(0)}ms`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
        }

        const data = await response.json();
        const totalEnd = performance.now();
        console.log(`✅ Detection complete: ${(totalEnd - perfStart).toFixed(0)}ms total`);
        console.log('📊 Breakdown:');
        console.log(`   - Image preparation: ${(resizeEnd - resizeStart).toFixed(0)}ms`);
        console.log(`   - API call (upload + processing + download): ${(apiEnd - apiStart).toFixed(0)}ms`);
        console.log(`   - Total: ${(totalEnd - perfStart).toFixed(0)}ms`);

        // Process and display results (No scaling needed now!)
        processInferenceResults(data);

    } catch (error) {
        console.error('❌ Detection error:', error);
        alert('Detection failed. Please check:\n\n' +
            '1. Your API key is correct\n' +
            '2. Your Model ID is correct\n' +
            '3. You have internet connection\n\n' +
            'Error: ' + error.message);
    } finally {
        hideLoading();
    }
}

// Helper function to resize image and convert to base64
function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const maxDim = 416; // Reduced to 416px for faster upload
                let width = img.width;
                let height = img.height;

                // Maintain aspect ratio
                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                // Create canvas for resizing
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Get Data URL (full string)
                // Reduced quality to 0.5 for faster upload
                const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
                // Get Base64 (without prefix)
                const base64 = dataUrl.split(',')[1];

                // Return object with both formats and dimensions
                resolve({ base64, dataUrl, width, height });
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function processInferenceResults(data) {
    // Inference API returns { predictions: [...] }
    let predictions = data.predictions || [];

    console.log(`Found ${predictions.length} pills`);

    if (predictions.length === 0) {
        alert('No pills detected! Try:\n\n' +
            '1. Better lighting\n' +
            '2. Clearer image\n' +
            '3. Lower confidence threshold in app.js\n' +
            '4. More training data for your model');
        return;
    }

    // Draw red dots (Coordinates are 1:1 now)
    drawPillDots(predictions);

    // Update pill count
    updatePillCount(predictions.length);

    // Calculate and display average confidence
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
    confidenceAvg.textContent = `Average Confidence: ${(avgConfidence * 100).toFixed(1)}%`;
}

function drawPillDots(predictions) {
    // Clear previous overlay
    overlayCtx.clearRect(0, 0, overlay.width, overlay.height);

    // Draw a red dot for each pill
    predictions.forEach((prediction) => {
        const { x, y } = prediction;

        // Draw Red Dot at center
        overlayCtx.beginPath();
        overlayCtx.arc(x, y, 5, 0, 2 * Math.PI); // 5px radius for "tiny dot"
        overlayCtx.fillStyle = 'red';
        overlayCtx.fill();

        // Add a white border to make it visible on dark pills
        overlayCtx.strokeStyle = 'white';
        overlayCtx.lineWidth = 1.5;
        overlayCtx.stroke();
    });
}

function updatePillCount(count) {
    pillCount.textContent = count;
    pillCountDisplay.style.display = 'block';

    // Animate count
    pillCount.style.animation = 'none';
    setTimeout(() => {
        pillCount.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// showDetectionDetails function removed as requested

// ===================================
// UI HELPERS
// ===================================
function showLoading() {
    loadingSpinner.style.display = 'flex';
    detectBtn.disabled = true;
}

function hideLoading() {
    loadingSpinner.style.display = 'none';
    detectBtn.disabled = false;
}

function updateLoadingStatus(text) {
    const p = loadingSpinner.querySelector('p');
    if (p) {
        p.textContent = text;
    }
}

function resetResults() {
    pillCountDisplay.style.display = 'none';
    detectionInfo.style.display = 'none';
    pillCount.textContent = '0';
    confidenceAvg.textContent = '';
    detectionList.innerHTML = '';

    // Clear overlay
    if (overlayCtx) {
        overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
    }
}

// ===================================
// ANIMATIONS
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// ===================================
// PWA SERVICE WORKER
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch((err) => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// ===================================
// START APP
// ===================================
init();
