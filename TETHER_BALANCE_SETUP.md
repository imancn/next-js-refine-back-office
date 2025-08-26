# Tether Balance Checking Setup Guide

## Overview
This guide explains how to set up the Tether (USDT) balance checking functionality that monitors wallet balances across multiple blockchain networks.

## Current Issues
Based on the error logs, the system is experiencing:
1. **Moralis API Authentication Error (401)**: Missing `x-api-key` header
2. **TronGrid API Error (404)**: Endpoint not found or incorrect configuration

## Required API Keys

### 1. Moralis API Key
- **Purpose**: Fetch USDT balances from BSC and ETH chains
- **Endpoint**: `https://deep-index.moralis.io/api/v2.2/`
- **Required Header**: `x-api-key`

**How to get a Moralis API key:**
1. Visit [Moralis.io](https://moralis.io/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key from the API Keys section

### 2. TronGrid API Key
- **Purpose**: Fetch USDT balances from TRX chain
- **Endpoint**: `https://api.trongrid.io/v1/`
- **Required Header**: `x-api-key`

**How to get a TronGrid API key:**
1. Visit [TronGrid.io](https://www.trongrid.io/)
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key

## Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env.local
```

### 2. Update Environment Variables
Edit your `.env.local` file and add the following:

```bash
# Blockchain API Configuration
MORALIS_API_KEY="your-actual-moralis-api-key"
TRONGRID_API_KEY="your-actual-trongrid-api-key"

# Wallet Addresses for Tether Balance Checking
DIRTY_WALLET_BSC="0x66E35642dd0a0eAaF622c33b99F1a87DaB23E15B"
DIRTY_WALLET_ETH="0x66E35642dd0a0eAaF622c33b99F1a87DaB23E15B"
DIRTY_WALLET_TRX="TUDpHcoPZpuwpf6FdyH83b7VCf4FWcHSSm"

CLEAN_WALLET_BSC="0xf96B6397e26173beaBB4ce26215C65b7f590F338"
CLEAN_WALLET_TRX="0xf96B6397e26173beaBB4ce26215C65b7f590F338"

# USDT Token Addresses
USDT_BSC_ADDRESS="0x55d398326f99059fF775485246999027B3197955"
USDT_ETH_ADDRESS="0xdAC17F958D2ee523a2206206994597C13D831ec7"
```

## API Endpoints

### Moralis API (BSC & ETH)
```
GET https://deep-index.moralis.io/api/v2.2/{wallet_address}/erc20
Headers:
  x-api-key: {MORALIS_API_KEY}
Query Parameters:
  chain: bsc|eth
  token_addresses: {USDT_TOKEN_ADDRESS}
```

### TronGrid API (TRX)
```
GET https://api.trongrid.io/v1/accounts/{wallet_address}/tokens/trc20
Headers:
  x-api-key: {TRONGRID_API_KEY}
```

## Expected Response Format

### Moralis API Response
```json
{
  "result": [
    {
      "token_address": "0x55d398326f99059fF775485246999027B3197955",
      "name": "Tether USD",
      "symbol": "USDT",
      "logo": null,
      "thumbnail": null,
      "decimals": 18,
      "balance": "1000000000000000000",
      "possible_spam": false,
      "verified_contract": true,
      "balance_formatted": "1.0"
    }
  ]
}
```

### TronGrid API Response
```json
{
  "data": [
    {
      "key": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
      "name": "Tether USD",
      "symbol": "USDT",
      "decimals": 6,
      "balance": "1000000",
      "balance_formatted": "1.0"
    }
  ]
}
```

## Testing the Configuration

### 1. Test Moralis API
```bash
curl -H "x-api-key: YOUR_MORALIS_API_KEY" \
  "https://deep-index.moralis.io/api/v2.2/0x66E35642dd0a0eAaF622c33b99F1a87DaB23E15B/erc20?chain=bsc&token_addresses=0x55d398326f99059fF775485246999027B3197955"
```

### 2. Test TronGrid API
```bash
curl -H "x-api-key: YOUR_TRONGRID_API_KEY" \
  "https://api.trongrid.io/v1/accounts/TUDpHcoPZpuwpf6FdyH83b7VCf4FWcHSSm/tokens/trc20"
```

## Troubleshooting

### Common Issues

1. **401 Unauthorized (Moralis)**
   - Verify your Moralis API key is correct
   - Ensure the `x-api-key` header is being sent
   - Check if your API key has the required permissions

2. **404 Not Found (TronGrid)**
   - Verify the wallet address format
   - Check if the endpoint URL is correct
   - Ensure your API key has access to the required endpoints

3. **Rate Limiting**
   - Both APIs have rate limits on free tiers
   - Implement proper error handling and retry logic
   - Consider upgrading to paid plans for higher limits

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG="true"
LOG_LEVEL="debug"
```

## Security Considerations

1. **API Key Protection**
   - Never commit API keys to version control
   - Use environment variables for sensitive data
   - Rotate API keys regularly

2. **Rate Limiting**
   - Implement proper rate limiting in your application
   - Cache responses when possible
   - Handle API errors gracefully

3. **Data Validation**
   - Validate wallet addresses before making API calls
   - Sanitize API responses
   - Implement proper error handling

## Next Steps

1. **Get API Keys**: Obtain Moralis and TronGrid API keys
2. **Update Environment**: Add the keys to your `.env.local` file
3. **Test APIs**: Verify the endpoints work with your keys
4. **Implement Logic**: Add the balance checking functionality to your application
5. **Monitor Usage**: Track API usage and implement proper error handling

## Support

- **Moralis Support**: [docs.moralis.io](https://docs.moralis.io/)
- **TronGrid Support**: [docs.trongrid.io](https://docs.trongrid.io/)
- **API Status**: Check respective status pages for service updates