#!/usr/bin/env python3
"""
Startup script for PPE Detection System
This script starts the Flask backend for PPE detection
"""

import os
import sys
import subprocess
import time
import threading
from pathlib import Path

def check_python_dependencies():
    """Check if required Python packages are installed"""
    required_packages = [
        'flask', 'opencv-python', 'ultralytics', 'numpy', 
        'pywhatkit', 'pillow', 'smtplib'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print("❌ Missing required packages:")
        for package in missing_packages:
            print(f"   - {package}")
        print("\n📦 Install missing packages with:")
        print(f"pip install {' '.join(missing_packages)}")
        return False
    
    print("✅ All required packages are installed")
    return True

def check_model_files():
    """Check if required model files exist"""
    detection_dir = Path("detection_module")
    required_files = [
        "app.py",
        "model_inference.py",
        "runs/train_ppe/ppe_detector/weights/best1.pt"
    ]
    
    missing_files = []
    for file_path in required_files:
        full_path = detection_dir / file_path
        if not full_path.exists():
            missing_files.append(str(full_path))
    
    if missing_files:
        print("❌ Missing required files:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ All required model files found")
    return True

def start_flask_app():
    """Start the Flask PPE detection application"""
    detection_dir = Path("detection_module")
    
    if not detection_dir.exists():
        print("❌ Detection module directory not found!")
        return False
    
    os.chdir(detection_dir)
    
    print("🚀 Starting PPE Detection Flask Server...")
    print("📍 Server will be available at: http://localhost:5000")
    print("📹 Camera access will be requested when you open the scanner")
    print("\n⚠️  Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Start Flask app
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 PPE Detection server stopped")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting Flask server: {e}")
        return False
    
    return True

def main():
    """Main function to start the PPE detection system"""
    print("🔧 Safe Build Nexus - PPE Detection System")
    print("=" * 50)
    
    # Check dependencies
    if not check_python_dependencies():
        return 1
    
    # Check model files
    if not check_model_files():
        return 1
    
    # Start Flask app
    if not start_flask_app():
        return 1
    
    return 0

if __name__ == "__main__":
    sys.exit(main())

