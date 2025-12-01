# Quick Configuration Guide

## Step 1: Add Your API Key

Open `app.js` and find line 6:

```javascript
const ROBOFLOW_API_KEY = "YOUR_API_KEY_HERE";
```

Replace `"YOUR_API_KEY_HERE"` with your actual Roboflow API key.

## Step 2: Reload the Page

After saving `app.js`, reload the page in your browser (⌘ + R on Mac, Ctrl + R on Windows).

## Step 3: Test!

Upload a pill image or use your camera and click "Detect Pills". Your workflow will:
- Detect all pills
- Count them
- Draw bounding boxes
- Show confidence scores

## Your Workflow Details

- **Workspace**: `pill-count-hblhz`
- **Workflow**: `detect-count-and-visualize`
- **API URL**: `https://serverless.roboflow.com`

These are already configured in the code - you just need to add your API key!

## Troubleshooting

If you see errors:
1. Check that your API key is correct (no quotes or extra spaces)
2. Make sure you're connected to the internet
3. Verify your workflow is deployed in Roboflow
4. Check the browser console (F12) for detailed error messages
