# Installation Guide

## Complete Step-by-Step Setup

### Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (v14 or higher)
- [ ] npm installed (comes with Node.js)
- [ ] A code editor (VS Code recommended)
- [ ] A Weatherstack API key

### Step 1: Verify Node.js Installation

Open terminal/command prompt and run:
```bash
node --version
npm --version
```

You should see version numbers. If not, download Node.js from https://nodejs.org/

### Step 2: Navigate to Project Directory

```bash
cd c:\Users\DELL\OneDrive\Desktop\app\weatherstack-app
```

### Step 3: Install Dependencies

```bash
npm install
```

This will install:
- React and React-DOM
- Axios for API calls
- Chart.js for visualizations
- React-Chartjs-2 for React integration
- React-Scripts for build tools

**Wait for installation to complete** (may take 2-5 minutes)

### Step 4: Get Your Weatherstack API Key

1. Go to https://weatherstack.com/
2. Click "Get Free API Key" or "Sign Up"
3. Create a free account
4. Copy your API key from the dashboard

### Step 5: Configure Environment Variables

1. Open the `.env` file in the project root
2. Replace `your_api_key_here` with your actual API key:

```
REACT_APP_WEATHERSTACK_API_KEY=abc123youractualkey456
```

**Important:** 
- No quotes around the key
- No spaces
- Save the file

### Step 6: Start the Development Server

```bash
npm start
```

The application will:
- Compile the code
- Open automatically in your browser at http://localhost:3000
- Show any compilation errors if present

### Step 7: Test the Application

1. **Search for a location:**
   - Type "London" in the search bar
   - Click "Search"
   - You should see current weather data

2. **Test forecast:**
   - Scroll to "Weather Forecast" section
   - Select number of days (e.g., 7)
   - Click "Get Forecast"

3. **Test historical data:**
   - Scroll to "Historical Weather"
   - Select a past date
   - Click "Get Historical Data"

4. **Test time-series:**
   - Scroll to "Historical Time-Series"
   - Select start and end dates
   - Click "Get Time Series"
   - View the chart and table

5. **Test theme toggle:**
   - Click the sun/moon icon in header
   - Theme should switch

6. **Test favorites:**
   - Click "Add to Favorites"
   - Refresh the page
   - Favorite should persist

### Step 8: Build for Production (Optional)

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Verification Checklist

After installation, verify:
- [ ] Application opens at http://localhost:3000
- [ ] No errors in browser console (F12)
- [ ] Search functionality works
- [ ] Current weather displays correctly
- [ ] Weather icons load properly
- [ ] Theme toggle works
- [ ] Favorites can be saved
- [ ] Responsive design works (resize browser)

## Common Installation Issues

### Issue: npm install fails

**Solution:**
```bash
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Windows
set PORT=3001
npm start

# Mac/Linux
PORT=3001 npm start
```

### Issue: API key not working

**Solution:**
- Double-check the API key in `.env`
- Ensure no extra spaces or quotes
- Restart the development server
- Verify key is active on Weatherstack

### Issue: Module not found

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

After successful installation:

1. **Customize the app:**
   - Modify colors in CSS files
   - Add your own features
   - Adjust layout

2. **Deploy the app:**
   - See README.md for deployment instructions
   - Deploy to Vercel or Netlify

3. **Explore the code:**
   - Check `src/components/` for UI components
   - Review `src/services/weatherService.js` for API logic
   - Examine `src/styles/` for styling

## File Structure Overview

```
weatherstack-app/
├── src/
│   ├── components/      # React components
│   ├── services/        # API integration
│   ├── styles/          # CSS files
│   ├── App.js          # Main app component
│   └── index.js        # Entry point
├── public/
│   └── index.html      # HTML template
├── .env                # Your API key (DO NOT COMMIT)
├── package.json        # Dependencies
└── README.md          # Documentation
```

## Support Resources

- **Weatherstack Docs:** https://weatherstack.com/documentation
- **React Docs:** https://react.dev/
- **Troubleshooting:** See TROUBLESHOOTING.md
- **Quick Start:** See QUICKSTART.md

## Success!

If you can search for a location and see weather data, you're all set! 🎉

The application is now running and ready to use.

---

**Need help?** Check TROUBLESHOOTING.md or review the browser console for error messages.
