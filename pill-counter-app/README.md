# 💊 AI Pill Counter

A modern web application that uses YOLOv8/YOLOv11 object detection to automatically detect and count pills of mixed types (round tablets, capsules, different colors, different sizes).

## ✨ Features

- 🎯 **AI-Powered Detection** - Uses YOLO object detection trained with Roboflow
- 📸 **Camera Support** - Use your device camera or upload images
- 🎨 **Visual Feedback** - Bounding boxes with confidence scores
- 📊 **Detailed Results** - Total count and individual detection details
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Modern UI** - Dark theme with smooth animations

## 🚀 Quick Start

### Prerequisites

1. A trained YOLO model on Roboflow (see [Complete Guide](../complete-guide.md))
2. Roboflow API key and model credentials

### Setup

1. **Clone or download** this project

2. **Configure your Roboflow credentials** in `app.js`:
   ```javascript
   const ROBOFLOW_API_KEY = "your_actual_api_key";
   const ROBOFLOW_MODEL = "your-model-name";
   const ROBOFLOW_VERSION = "1";
   ```

3. **Run locally**:
   ```bash
   # Option 1: Python
   python3 -m http.server 8000
   
   # Option 2: Node.js
   npx serve
   
   # Then open http://localhost:8000
   ```

4. **Test the app**:
   - Upload an image of pills
   - Or use your camera
   - Click "Detect Pills"

## 📁 Project Structure

```
pill-counter-app/
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── app.js              # Detection logic and API integration
└── README.md           # This file
```

## 🎓 How to Train Your Model

See the [Complete Guide](../complete-guide.md) for step-by-step instructions on:

1. Collecting and labeling pill images with Roboflow
2. Training a YOLO model
3. Getting your API credentials
4. Deploying the web app

## 🌐 Deployment

### Netlify (Easiest)
1. Drag and drop this folder to [Netlify Drop](https://app.netlify.com/drop)
2. Done! Your site is live

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
# Enable Pages in repo settings
```

### Vercel
```bash
npm i -g vercel
vercel
```

## ⚙️ Configuration

Edit `app.js` to customize:

```javascript
// Detection sensitivity (0.0 - 1.0)
const CONFIDENCE_THRESHOLD = 0.25;

// Maximum pills to detect
const MAX_DETECTIONS = 500;
```

## 🔧 Troubleshooting

### Camera not working
- Ensure HTTPS or localhost
- Grant camera permissions in browser
- Check if other apps are using the camera

### No pills detected
- Improve lighting
- Use clearer images
- Lower confidence threshold
- Add more training data to your model

### API errors
- Verify API key and model name are correct
- Check internet connection
- Ensure model is deployed in Roboflow

## 📊 Optional: Google Sheets Integration

To log pill counts to Google Sheets, see the [Complete Guide](../complete-guide.md) section on Google Sheets integration.

## 🤝 Contributing

Suggestions and improvements welcome!

## 📄 License

MIT License - feel free to use for any purpose

## 🙏 Credits

- Built with [Roboflow](https://roboflow.com)
- Uses [YOLOv8](https://github.com/ultralytics/ultralytics) object detection

---

**Need help?** Check out the [Complete Guide](../complete-guide.md) or [Roboflow Documentation](https://docs.roboflow.com)
