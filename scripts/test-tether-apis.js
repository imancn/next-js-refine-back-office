#!/usr/bin/env node

/**
 * Test script for Tether Balance Checking APIs
 * 
 * This script tests the Moralis and TronGrid API connections
 * to verify that your API keys are working correctly.
 * 
 * Usage:
 * 1. Set your API keys in .env.local
 * 2. Run: node scripts/test-tether-apis.js
 */

require('dotenv').config({ path: '.env.local' });

const https = require('https');

// Configuration
const config = {
  moralis: {
    apiKey: process.env.MORALIS_API_KEY,
    baseUrl: 'https://deep-index.moralis.io/api/v2.2'
  },
  trongrid: {
    apiKey: process.env.TRONGRID_API_KEY,
    baseUrl: 'https://api.trongrid.io/v1'
  },
  wallets: {
    dirty: {
      bsc: process.env.DIRTY_WALLET_BSC || '0x66E35642dd0a0eAaF622c33b99F1a87DaB23E15B',
      eth: process.env.DIRTY_WALLET_ETH || '0x66E35642dd0a0eAaF622c33b99F1a87DaB23E15B',
      trx: process.env.DIRTY_WALLET_TRX || 'TUDpHcoPZpuwpf6FdyH83b7VCf4FWcHSSm'
    },
    clean: {
      bsc: process.env.CLEAN_WALLET_BSC || '0xf96B6397e26173beaBB4ce26215C65b7f590F338',
      trx: process.env.CLEAN_WALLET_TRX || '0xf96B6397e26173beaBB4ce26215C65b7f590F338'
    }
  },
  tokens: {
    usdtBsc: process.env.USDT_BSC_ADDRESS || '0x55d398326f99059fF775485246999027B3197955',
    usdtEth: process.env.USDT_ETH_ADDRESS || '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  }
};

// Utility function to make HTTPS requests
function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Tether-Balance-Checker/1.0',
        ...headers
      }
    };

    const req = https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: jsonData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: data
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test Moralis API for BSC
async function testMoralisBsc() {
  console.log('\n🔍 Testing Moralis API - BSC Chain...');
  
  if (!config.moralis.apiKey) {
    console.log('❌ MORALIS_API_KEY not found in environment variables');
    return false;
  }

  const url = `${config.moralis.baseUrl}/${config.wallets.dirty.bsc}/erc20?chain=bsc&token_addresses=${config.tokens.usdtBsc}`;
  
  try {
    const response = await makeRequest(url, {
      'x-api-key': config.moralis.apiKey
    });
    
    if (response.status === 200) {
      console.log('✅ Moralis BSC API working correctly');
      console.log(`   Status: ${response.status}`);
      if (response.data.result && response.data.result.length > 0) {
        const usdt = response.data.result.find(token => 
          token.token_address.toLowerCase() === config.tokens.usdtBsc.toLowerCase()
        );
        if (usdt) {
          console.log(`   USDT Balance: ${usdt.balance_formatted} USDT`);
        }
      }
      return true;
    } else {
      console.log(`❌ Moralis BSC API failed: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Moralis BSC API error: ${error.message}`);
    return false;
  }
}

// Test Moralis API for ETH
async function testMoralisEth() {
  console.log('\n🔍 Testing Moralis API - ETH Chain...');
  
  if (!config.moralis.apiKey) {
    console.log('❌ MORALIS_API_KEY not found in environment variables');
    return false;
  }

  const url = `${config.moralis.baseUrl}/${config.wallets.dirty.eth}/erc20?chain=eth&token_addresses=${config.tokens.usdtEth}`;
  
  try {
    const response = await makeRequest(url, {
      'x-api-key': config.moralis.apiKey
    });
    
    if (response.status === 200) {
      console.log('✅ Moralis ETH API working correctly');
      console.log(`   Status: ${response.status}`);
      if (response.data.result && response.data.result.length > 0) {
        const usdt = response.data.result.find(token => 
          token.token_address.toLowerCase() === config.tokens.usdtEth.toLowerCase()
        );
        if (usdt) {
          console.log(`   USDT Balance: ${usdt.balance_formatted} USDT`);
        }
      }
      return true;
    } else {
      console.log(`❌ Moralis ETH API failed: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ Moralis ETH API error: ${error.message}`);
    return false;
  }
}

// Test TronGrid API
async function testTronGrid() {
  console.log('\n🔍 Testing TronGrid API...');
  
  if (!config.trongrid.apiKey) {
    console.log('❌ TRONGRID_API_KEY not found in environment variables');
    return false;
  }

  const url = `${config.trongrid.baseUrl}/accounts/${config.wallets.dirty.trx}/tokens/trc20`;
  
  try {
    const response = await makeRequest(url, {
      'x-api-key': config.trongrid.apiKey
    });
    
    if (response.status === 200) {
      console.log('✅ TronGrid API working correctly');
      console.log(`   Status: ${response.status}`);
      if (response.data.data && response.data.data.length > 0) {
        const usdt = response.data.data.find(token => 
          token.key === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t' // USDT contract address on TRX
        );
        if (usdt) {
          console.log(`   USDT Balance: ${usdt.balance_formatted} USDT`);
        }
      }
      return true;
    } else {
      console.log(`❌ TronGrid API failed: ${response.status}`);
      console.log(`   Response: ${JSON.stringify(response.data, null, 2)}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ TronGrid API error: ${error.message}`);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Tether Balance API Tests...\n');
  
  const results = {
    moralisBsc: false,
    moralisEth: false,
    trongrid: false
  };

  // Run tests
  results.moralisBsc = await testMoralisBsc();
  results.moralisEth = await testMoralisEth();
  results.trongrid = await testTronGrid();

  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log(`   Moralis BSC: ${results.moralisBsc ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   Moralis ETH: ${results.moralisEth ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`   TronGrid: ${results.trongrid ? '✅ PASS' : '❌ FAIL'}`);

  const passedTests = Object.values(results).filter(Boolean).length;
  const totalTests = Object.keys(results).length;

  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);

  if (passedTests === totalTests) {
    console.log('🎉 All APIs are working correctly!');
    console.log('   You can now implement the Tether balance checking functionality.');
  } else {
    console.log('⚠️  Some APIs are not working. Please check the errors above.');
    console.log('   Make sure your API keys are correct and have the required permissions.');
  }
}

// Check if required environment variables are set
function checkEnvironment() {
  console.log('🔧 Environment Check:');
  
  const requiredVars = {
    'MORALIS_API_KEY': config.moralis.apiKey,
    'TRONGRID_API_KEY': config.trongrid.apiKey
  };

  let allSet = true;
  
  for (const [varName, value] of Object.entries(requiredVars)) {
    if (value) {
      console.log(`   ${varName}: ✅ Set`);
    } else {
      console.log(`   ${varName}: ❌ Not set`);
      allSet = false;
    }
  }

  if (!allSet) {
    console.log('\n❌ Please set all required environment variables in .env.local');
    console.log('   See TETHER_BALANCE_SETUP.md for instructions');
    process.exit(1);
  }

  console.log('✅ Environment variables are properly configured\n');
}

// Run the tests
if (require.main === module) {
  try {
    checkEnvironment();
    runTests();
  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

module.exports = {
  testMoralisBsc,
  testMoralisEth,
  testTronGrid,
  runTests
};