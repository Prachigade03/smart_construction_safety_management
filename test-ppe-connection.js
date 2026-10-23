/**
 * Quick test to verify PPE Detection connection
 * Run this to test if your PPE detection is accessible
 */

const http = require('http');

function testPPEConnection() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 5000,
      method: 'GET',
      timeout: 5000
    }, (res) => {
      console.log('✅ PPE Detection System is running!');
      console.log(`📍 Status Code: ${res.statusCode}`);
      console.log(`📍 Response Headers:`, res.headers);
      resolve(true);
    });

    req.on('error', (err) => {
      console.log('❌ PPE Detection System is not accessible');
      console.log(`   Error: ${err.message}`);
      console.log('💡 Make sure your app.py is running on http://127.0.0.1:5000');
      resolve(false);
    });

    req.on('timeout', () => {
      console.log('⏰ Connection timeout');
      console.log('💡 Check if the server is running and accessible');
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function main() {
  console.log('🔧 Testing PPE Detection Connection...');
  console.log('📍 Testing: http://127.0.0.1:5000');
  console.log('=' * 50);
  
  const isRunning = await testPPEConnection();
  
  if (isRunning) {
    console.log('\n🎉 SUCCESS! Your PPE Detection System is working correctly!');
    console.log('You can now:');
    console.log('1. Open http://127.0.0.1:5000 in your browser');
    console.log('2. Use the React integration to launch the scanner');
  } else {
    console.log('\n⚠️ ISSUE: PPE Detection System is not accessible');
    console.log('\nTo fix this:');
    console.log('1. Make sure app.py is running');
    console.log('2. Check if the server is on the correct port (5000)');
    console.log('3. Verify the URL is http://127.0.0.1:5000');
  }
}

main();

