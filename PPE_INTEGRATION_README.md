# PPE Detection Integration Guide

This guide explains how to integrate and run the PPE Detection System with your React construction website.

## 🚀 Quick Start

### Option 1: Automatic Backend Startup (Recommended)
1. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
2. Start the backend starter and React app together:
   ```bash
   npm run dev:full
   ```
3. Navigate to Features → Launch PPE Scanner
4. Click "Start PPE Detection Backend" - it will start automatically!

### Option 2: Manual Setup
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the backend starter:
   ```bash
   npm run start-backend
   ```
3. Start your React development server:
   ```bash
   npm run dev
   ```

### Option 3: Using Batch File (Windows)
1. Double-click `start-ppe-detection.bat`
2. The Flask backend will start automatically
3. Open your React app and navigate to Features → Launch PPE Scanner

## 📁 File Structure

```
safe-build-nexus/
├── src/
│   ├── pages/
│   │   ├── PPEScanner.tsx          # New PPE Scanner page
│   │   └── Features.tsx            # Updated with PPE scanner navigation
│   └── App.tsx                     # Updated with PPE scanner route
├── detection_module/
│   ├── app.py                      # Flask backend server
│   ├── model_inference.py          # PPE detection model
│   ├── templates/
│   │   └── index.html              # Flask frontend template
│   ├── static/
│   │   └── style.css               # Flask frontend styles
│   └── runs/train_ppe/             # Trained model files
├── start-ppe-detection.py          # Python startup script
├── start-ppe-detection.bat         # Windows batch file
├── backend-starter.js              # Express server to start Flask backend
├── test-integration.js             # Integration testing script
├── requirements.txt                # Python dependencies
└── PPE_INTEGRATION_README.md       # This file
```

## 🔧 How It Works

### 1. React Frontend Integration
- **PPE Scanner Page**: New React component that provides a user-friendly interface
- **Connection Check**: Automatically checks if the Flask backend is running
- **Launch Button**: Opens the Flask detection interface in a new tab

### 2. Flask Backend
- **Real-time Detection**: Uses OpenCV and YOLO model for live PPE detection
- **Web Interface**: Serves a simple HTML page with live video feed
- **API Endpoints**: Provides status and video feed endpoints

### 3. Integration Flow
1. User clicks "Launch PPE Scanner" on the Features page
2. React navigates to `/ppe-scanner` route
3. PPE Scanner page checks Flask backend connection
4. If backend is not running, user clicks "Start PPE Detection Backend"
5. Backend starter automatically starts the Flask app.py process
6. User clicks "Launch PPE Scanner" button
7. Flask detection interface opens in new tab
8. Camera access is requested and PPE detection begins

## 🌐 URLs and Ports

- **React Frontend**: `http://localhost:5173` (or your configured port)
- **Backend Starter**: `http://localhost:3001`
- **Flask Backend**: `http://127.0.0.1:5000` (✅ Updated to match your running instance)
- **PPE Scanner Page**: `http://localhost:5173/ppe-scanner`
- **Detection Interface**: `http://127.0.0.1:5000`

## 🎯 Features

### PPE Scanner React Page
- ✅ Connection status indicator
- ✅ Real-time backend health check
- ✅ User-friendly launch interface
- ✅ Instructions and requirements display
- ✅ Detection status dashboard
- ✅ Recent alerts section

### Flask Detection System
- ✅ Live camera feed
- ✅ Real-time PPE detection (Helmet, Safety Vest, Mask)
- ✅ Person detection and compliance checking
- ✅ Email alerts for violations
- ✅ WhatsApp notifications (optional)
- ✅ Snapshot saving functionality

## 🛠️ Troubleshooting

### Common Issues

1. **"Cannot connect to PPE Detection Service"**
   - Ensure Flask backend is running on port 5000
   - Check if any firewall is blocking the connection
   - Verify Python dependencies are installed

2. **Camera not working**
   - Grant camera permissions in your browser
   - Ensure no other application is using the camera
   - Try refreshing the page

3. **Model files not found**
   - Verify `runs/train_ppe/ppe_detector/weights/best1.pt` exists
   - Check the detection_module directory structure

4. **Python dependencies issues**
   - Run `pip install -r requirements.txt`
   - Ensure Python 3.8+ is installed
   - Check for conflicting package versions

### Development Tips

1. **Testing the Integration**:
   - Start Flask backend: `python start-ppe-detection.py`
   - Start React dev server: `npm run dev`
   - Navigate to Features page and click "Launch PPE Scanner"

2. **Customizing the Detection**:
   - Modify `detection_module/app.py` for Flask configuration
   - Update `detection_module/model_inference.py` for model behavior
   - Customize `detection_module/templates/index.html` for UI

3. **Adding New Features**:
   - Extend `PPEScanner.tsx` for React frontend features
   - Add new API endpoints in `app.py` for backend functionality
   - Use the existing connection checking pattern for new services

## 🔐 Security Considerations

- The Flask backend runs on `0.0.0.0:5000` (accessible from network)
- For production, consider:
  - Running Flask behind a reverse proxy
  - Implementing authentication
  - Using HTTPS
  - Restricting network access

## 📱 Mobile Compatibility

- The detection system works on mobile devices
- Camera access is required for functionality
- Responsive design is included in the React components

## 🚀 Deployment

For production deployment:

1. **React Frontend**: Build and deploy to your hosting service
2. **Flask Backend**: Deploy to a server with Python support
3. **Update URLs**: Modify `FLASK_URL` in `PPEScanner.tsx` to point to your backend
4. **Environment Variables**: Set up proper configuration for production

## 📞 Support

If you encounter issues:
1. Check the console for error messages
2. Verify all dependencies are installed
3. Ensure both frontend and backend are running
4. Check browser permissions for camera access
