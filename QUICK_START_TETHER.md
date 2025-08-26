# Quick Start: Fix Tether Balance Checking Issues

## 🚨 Current Problems
Your Tether balance checking system is failing because:
1. **Missing Moralis API Key** - 401 errors for BSC/ETH balance checks
2. **Missing TronGrid API Key** - 404 errors for TRX balance checks

## ✅ Quick Fix Steps

### 1. Get API Keys
- **Moralis**: Sign up at [moralis.io](https://moralis.io/) and get your API key
- **TronGrid**: Sign up at [trongrid.io](https://www.trongrid.io/) and get your API key

### 2. Update Environment
```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local and add your API keys
MORALIS_API_KEY="your-actual-moralis-api-key"
TRONGRID_API_KEY="your-actual-trongrid-api-key"
```

### 3. Test the Fix
```bash
# Test if APIs are working
npm run test:tether

# Or run directly
node scripts/test-tether-apis.js
```

## 📋 What You'll Get
- ✅ Working BSC USDT balance checks
- ✅ Working ETH USDT balance checks  
- ✅ Working TRX USDT balance checks
- ✅ Proper error handling and logging

## 🔍 Detailed Documentation
- See `TETHER_BALANCE_SETUP.md` for complete setup instructions
- See `scripts/test-tether-apis.js` for testing the APIs

## ⚠️ Important Notes
- Never commit API keys to version control
- Both APIs have rate limits on free tiers
- Test thoroughly before deploying to production

## 🆘 Need Help?
1. Check the detailed setup guide
2. Run the test script to identify specific issues
3. Verify your API keys have the required permissions
4. Check API status pages for service updates