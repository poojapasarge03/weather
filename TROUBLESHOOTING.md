# Troubleshooting Guide

## Common Issues and Solutions

### 1. API Key Not Working

**Problem:** Getting "Invalid API key" error

**Solutions:**
- Verify your API key is correct in the `.env` file
- Ensure the variable name is exactly: `REACT_APP_WEATHERSTACK_API_KEY`
- Restart the development server after changing `.env`
- Check if your API key is active on Weatherstack dashboard

```bash
# Stop the server (Ctrl+C) and restart
npm start
```

### 2. Forecast/Historical Data Not Available

**Problem:** "This feature requires a paid plan" error

**Solutions:**
- Weatherstack free plan has limitations
- Forecast and historical endpoints require paid subscription
- Upgrade your plan at https://weatherstack.com/product
- Current weather works on all plans

### 3. CORS Errors

**Problem:** Cross-Origin Request Blocked

**Solutions:**
- Weatherstack free plan uses HTTP (not HTTPS)
- Some browsers block mixed content
- Upgrade to paid plan for HTTPS support
- Or use a proxy server for development

### 4. Module Not Found Errors

**Problem:** Cannot find module 'axios' or other dependencies

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### 5. Chart Not Displaying

**Problem:** Time-series chart not showing

**Solutions:**
- Ensure Chart.js is installed: `npm install chart.js react-chartjs-2`
- Check browser console for errors
- Verify data is being fetched correctly
- Clear browser cache

### 6. Theme Not Persisting

**Problem:** Theme resets on page refresh

**Solutions:**
- Check browser localStorage is enabled
- Clear browser cache and try again
- Check browser console for localStorage errors

### 7. Favorites Not Saving

**Problem:** Favorite locations disappear on refresh

**Solutions:**
- Ensure localStorage is enabled in browser
- Check browser privacy settings
- Try a different browser
- Clear browser data and try again

### 8. Build Errors

**Problem:** npm run build fails

**Solutions:**
```bash
# Clear cache and rebuild
npm cache clean --force
rm -rf node_modules
npm install
npm run build
```

### 9. Port Already in Use

**Problem:** Port 3000 is already in use

**Solutions:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
set PORT=3001 && npm start
```

### 10. API Rate Limit Exceeded

**Problem:** Too many requests error

**Solutions:**
- Wait for rate limit to reset
- Upgrade to higher tier plan
- Implement request caching
- Reduce API call frequency

## Environment Issues

### Windows
- Use `set` instead of `export` for environment variables
- Use backslashes for paths: `C:\Users\...`

### Mac/Linux
- Use `export` for environment variables
- Use forward slashes for paths: `/Users/...`

## Deployment Issues

### Vercel
1. Add environment variable in Vercel dashboard
2. Redeploy after adding variables
3. Check build logs for errors

### Netlify
1. Add environment variable in site settings
2. Trigger new deployment
3. Check deploy logs

## Getting Help

If issues persist:
1. Check Weatherstack API status: https://weatherstack.com/
2. Review API documentation: https://weatherstack.com/documentation
3. Check React documentation: https://react.dev/
4. Verify Node.js version: `node --version` (should be v14+)

## Debug Mode

Enable detailed logging:
```javascript
// In weatherService.js, add console.logs
console.log('API Response:', response.data);
console.log('Error:', error.response);
```

## Browser Compatibility

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## System Requirements

- Node.js v14 or higher
- npm v6 or higher
- Modern web browser
- Active internet connection

---

**Still having issues?** Check the browser console (F12) for detailed error messages.
