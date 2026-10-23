@echo off
echo Starting PPE Detection System...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    pause
    exit /b 1
)

REM Check if detection_module directory exists
if not exist "detection_module" (
    echo Error: detection_module directory not found
    echo Please ensure you are running this from the project root directory
    pause
    exit /b 1
)

REM Check if app.py exists
if not exist "detection_module\app.py" (
    echo Error: app.py not found in detection_module directory
    pause
    exit /b 1
)

echo Starting PPE Detection Flask application...
echo The system will open in your browser at http://localhost:5000
echo Press Ctrl+C to stop the system
echo.

REM Start the Flask app
cd detection_module
python app.py

pause

