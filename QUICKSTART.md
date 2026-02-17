# Quick Start Guide

## Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Add Your API Key
1. Get a free API key from https://weatherstack.com/
2. Open the `.env` file
3. Replace `your_api_key_here` with your actual API key:
```
REACT_APP_WEATHERSTACK_API_KEY=abc123your_actual_key
```

### Step 3: Run the App
```bash
npm start
```

That's it! The app will open at http://localhost:3000

## First Search
Try searching for: "London", "New York", "Tokyo", or any city you like!

## Important Notes
- **Free Plan:** The Weatherstack free plan may have limitations on forecast and historical endpoints
- **API Key:** Never commit your `.env` file to Git (it's already in .gitignore)
- **HTTPS:** Free plan uses HTTP. Upgrade for HTTPS support if needed

## Need Help?
Check the full README.md for detailed documentation.
