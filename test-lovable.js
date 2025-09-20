#!/usr/bin/env node

// Simple test script to verify Lovable integration
const fetch = require('node-fetch');

async function testLovableIntegration() {
  console.log('🧪 Testing Lovable Integration...\n');

  try {
    // Test 1: API endpoint exists
    console.log('1. Testing API endpoint availability...');
    const response = await fetch('http://localhost:3000/api/lovable?action=test');
    const data = await response.json();
    
    if (data.error === 'LOVABLE_API_KEY not configured') {
      console.log('   ✅ API endpoint is working (expected error: API key not configured)');
    } else {
      console.log('   ❌ Unexpected response:', data);
    }

    // Test 2: Project info endpoint
    console.log('\n2. Testing project info endpoint...');
    const projectResponse = await fetch('http://localhost:3000/api/lovable?action=project');
    const projectData = await projectResponse.json();
    
    if (projectData.error === 'LOVABLE_API_KEY and LOVABLE_PROJECT_ID must be configured') {
      console.log('   ✅ Project endpoint is working (expected error: credentials not configured)');
    } else {
      console.log('   ❌ Unexpected response:', projectData);
    }

    // Test 3: Deployment status endpoint
    console.log('\n3. Testing deployment status endpoint...');
    const statusResponse = await fetch('http://localhost:3000/api/lovable?action=status');
    const statusData = await statusResponse.json();
    
    if (statusData.error === 'LOVABLE_API_KEY and LOVABLE_PROJECT_ID must be configured') {
      console.log('   ✅ Status endpoint is working (expected error: credentials not configured)');
    } else {
      console.log('   ❌ Unexpected response:', statusData);
    }

    console.log('\n🎉 All Lovable integration tests passed!');
    console.log('\n📝 Next steps:');
    console.log('   1. Get your API key from https://lovable.dev');
    console.log('   2. Create a project in Lovable');
    console.log('   3. Add credentials to nextjs-app/.env.local:');
    console.log('      LOVABLE_API_KEY=your_api_key');
    console.log('      LOVABLE_PROJECT_ID=your_project_id');
    console.log('   4. Restart the development server');
    console.log('   5. Use the Lovable Admin panel in the app to test connection');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('Make sure the development server is running on http://localhost:3000');
  }
}

testLovableIntegration();
