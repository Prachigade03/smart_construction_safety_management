#!/usr/bin/env python3
"""
Enhanced startup script for PPE Detection App
This script handles common import and setup issues
"""

import sys
import os
import subprocess

def install_requirements():
    """Install required packages if they're missing"""
    try:
        print("📦 Installing required packages...")
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✅ Requirements installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False
    except FileNotFoundError:
        print("⚠️ requirements.txt not found, trying to install common packages...")
        packages = [
            'flask==2.3.3',
            'opencv-python==4.8.1.78', 
            'ultralytics==8.0.196',
            'numpy==1.24.3'
        ]
        try:
            subprocess.check_call([sys.executable, '-m', 'pip', 'install'] + packages)
            print("✅ Common packages installed successfully")
            return True
        except subprocess.CalledProcessError as e:
            print(f"❌ Failed to install packages: {e}")
            return False

def check_model_files():
    """Check if required model files exist"""
    model_path = 'runs/train_ppe/ppe_detector/weights/best1.pt'
    if os.path.exists(model_path):
        print(f"✅ Model file found: {model_path}")
        return True
    else:
        print(f"❌ Model file not found: {model_path}")
        print("Please ensure the model weights are trained and available")
        return False

def test_imports():
    """Test critical imports"""
    print("🔧 Testing imports...")
    
    critical_imports = ['flask', 'cv2', 'numpy', 'ultralytics']
    failed_imports = []
    
    for module in critical_imports:
        try:
            __import__(module)
            print(f"✅ {module} imported successfully")
        except ImportError as e:
            print(f"❌ {module} import failed: {e}")
            failed_imports.append(module)
    
    if failed_imports:
        print(f"\n⚠️ Failed imports: {failed_imports}")
        return False
    
    return True

def main():
    print("🚀 PPE Detection System Startup")
    print("=" * 50)
    
    # Test imports first
    if not test_imports():
        print("\n🔧 Attempting to fix import issues...")
        if install_requirements():
            print("\n🔄 Retesting imports after installation...")
            if not test_imports():
                print("\n❌ Import issues persist. Please check your Python environment.")
                return False
        else:
            print("\n❌ Could not install requirements. Please install manually:")
            print("pip install flask opencv-python ultralytics numpy")
            return False
    
    # Check model files
    check_model_files()
    
    # Try to start the app
    print("\n🚀 Starting PPE Detection App...")
    try:
        from app import app
        print("✅ App imported successfully")
        print("📍 Starting Flask server on http://localhost:5000")
        print("⚠️ Press Ctrl+C to stop the server")
        app.run(host='0.0.0.0', port=5000, debug=False)
    except Exception as e:
        print(f"❌ Failed to start app: {e}")
        print("\n💡 Troubleshooting tips:")
        print("1. Make sure all dependencies are installed: pip install -r requirements.txt")
        print("2. Check if your camera is connected and not being used by another app")
        print("3. Verify the model weights file exists")
        print("4. Try running: python test_imports.py")
        return False

if __name__ == "__main__":
    main()

