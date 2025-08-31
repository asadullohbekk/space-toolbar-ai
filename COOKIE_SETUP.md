# OAuth Cookie Authentication Setup

This document explains how the OAuth authentication system works with cookies in the Space Toolbar AI application.

## Overview

The application now automatically saves access tokens and refresh tokens to both cookies and localStorage when users log in via OAuth (Google). This provides better security and persistence compared to localStorage-only storage.

## How It Works

### 1. OAuth Flow
1. User clicks "Login with Google" button
2. User is redirected to Google OAuth
3. After successful authentication, Google redirects back to `/auth/callback`
4. The callback handler processes the authorization code
5. API call is made to `/v1/auth/google/` endpoint
6. Tokens are extracted from the response and saved to cookies

### 2. Token Storage
Tokens are stored in two places for compatibility:
- **Cookies**: Primary storage with expiration dates
- **localStorage**: Fallback storage for compatibility with existing code

### 3. Cookie Configuration
- **Access Token**: 24-hour expiration
- **Refresh Token**: 30-day expiration
- **Security**: `secure` flag (only on HTTPS), `samesite=strict`
- **Path**: `/` (available across the entire application)

## API Response Format

The `/v1/auth/google/` endpoint returns:

```json
{
    "message": "Вы успешно вошли в систему.",
    "user": {
        "id": 3,
        "email": "ayubovasadbek33@gmail.com",
        "first_name": "Asadbek",
        "last_name": "Ayubov"
    },
    "tokens": {
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
}
```

## Functions Available

### Core Functions
- `setAuthToken(accessToken, refreshToken)`: Saves tokens to cookies and localStorage
- `getAccessToken()`: Retrieves access token from cookies
- `getRefreshToken()`: Retrieves refresh token from cookies
- `clearAuthToken()`: Removes all tokens from cookies and localStorage

### Utility Functions
- `verifyCookies()`: Checks if cookies are properly set
- `isTokenExpired(token)`: Checks if a token has expired
- `shouldRefreshTokens()`: Determines if tokens need refreshing
- `refreshTokens()`: Automatically refreshes expired access tokens
- `testCookieFunctionality()`: Tests cookie functionality

## Automatic Token Refresh

The system automatically checks if tokens need refreshing before making API requests:
- Access tokens are refreshed when they expire within 5 minutes
- Refresh tokens are used to get new access tokens
- Failed refresh attempts are logged but don't block requests

## Debugging

### Console Logs
The system provides detailed console logging:
- OAuth callback processing steps
- Token storage confirmation
- Cookie verification status
- Token refresh attempts

### Testing
Use `testCookieFunctionality()` in the browser console to test cookie functionality:
```javascript
import { testCookieFunctionality } from '@/lib/auth'
testCookieFunctionality()
```

## Security Features

1. **HTTPS Only**: `secure` flag is automatically set when on HTTPS
2. **SameSite Protection**: `samesite=strict` prevents CSRF attacks
3. **Token Validation**: JWT format validation before storage
4. **Automatic Cleanup**: Expired cookies are automatically removed
5. **Fallback Storage**: localStorage backup if cookies fail

## Troubleshooting

### Common Issues

1. **Cookies Not Set**
   - Check if cookies are enabled in browser
   - Verify HTTPS requirement (if applicable)
   - Check browser console for errors

2. **Tokens Not Persisting**
   - Verify cookie expiration dates
   - Check if cookies are being cleared by browser
   - Ensure proper domain and path settings

3. **OAuth Callback Failures**
   - Check network requests in browser dev tools
   - Verify API endpoint is accessible
   - Check for CORS issues

### Debug Steps

1. Open browser console during OAuth flow
2. Check Network tab for API calls
3. Use `verifyCookies()` function to check cookie status
4. Check Application tab in dev tools for cookie storage

## Browser Compatibility

- **Modern Browsers**: Full support for all features
- **HTTPS Required**: Secure flag requires HTTPS (except localhost)
- **Cookie Support**: Requires cookies to be enabled
- **JavaScript**: Requires JavaScript enabled for token management

## Future Enhancements

- [ ] Add refresh token rotation
- [ ] Implement token blacklisting
- [ ] Add rate limiting for refresh attempts
- [ ] Implement offline token validation
- [ ] Add multi-device token management
