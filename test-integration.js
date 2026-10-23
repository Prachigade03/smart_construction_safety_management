/**
 * Integration Test Script for PPE Detection System
 * Run this with: node test-integration.js
 */

const http = require('http');

// Test configuration
const REACT_PORT = 5173;
const FLASK_PORT = 5000;
const FLASK_HOST = '127.0.0.1';  // ✅ Updated to match your running instance

function testConnection(port, serviceName, hostname = 'localhost') {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: hostname,
      port: port,
      method: 'GET',
      timeout: 3000
    }, (res) => {
      console.log(`✅ ${serviceName} is running on ${hostname}:${port}`);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log(`❌ ${serviceName} is not running on port ${port}`);
      console.log(`   Error: ${err.message}`);
      resolve(false);
    });

    req.on('timeout', () => {
      console.log(`⏰ ${serviceName} connection timeout on port ${port}`);
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function testIntegration() {
  console.log('🔧 Testing PPE Detection Integration...');
  console.log('=' * 50);

  // Test React frontend
  const reactRunning = await testConnection(REACT_PORT, 'React Frontend');
  
  // Test Flask backend
  const flaskRunning = await testConnection(FLASK_PORT, 'Flask Backend', FLASK_HOST);

  console.log('\n📋 Test Results:');
  console.log(`React Frontend (${REACT_PORT}): ${reactRunning ? '✅ Running' : '❌ Not Running'}`);
  console.log(`Flask Backend (${FLASK_PORT}): ${flaskRunning ? '✅ Running' : '❌ Not Running'}`);

  if (reactRunning && flaskRunning) {
    console.log('\n🎉 Integration test passed!');
    console.log('You can now:');
    console.log('1. Open http://localhost:5173 in your browser');
    console.log('2. Navigate to Features page');
    console.log('3. Click "Launch PPE Scanner"');
    console.log('4. Click "Launch PPE Scanner" button on the PPE page');
  } else {
    console.log('\n⚠️  Integration test failed!');
    console.log('\nTo fix:');
    if (!reactRunning) {
      console.log('1. Start React dev server: npm run dev');
    }
    if (!flaskRunning) {
      console.log('2. Start Flask backend: python start-ppe-detection.py');
    }
  }
}

testIntegration();
