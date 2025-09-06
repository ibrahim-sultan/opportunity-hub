# 🚀 Render Deployment Instructions - Fixed "Not Found" Error

## Quick Fix Steps

### Option 1: Single Web Service (Recommended)

1. **Create a Web Service** (NOT Static Site):
   - Go to Render Dashboard
   - Click "New +" → "Web Service"
   - Connect GitHub repo: `https://github.com/ibrahim-sultan/opportunity-hub`

2. **Configure Service**:
   ```
   Name: opportunity-hub-app
   Runtime: Node
   Build Command: npm run render-build
   Start Command: npm start
   ```

3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_platform
   JWT_SECRET=your_very_secure_secret_key_here_minimum_32_chars
   CLIENT_URL=$RENDER_EXTERNAL_URL
   ```

### Option 2: If You Want Separate Services

#### Backend Service:
```
Type: Web Service
Name: opportunity-hub-api
Root Directory: server
Build Command: npm install
Start Command: npm start
Environment Variables:
- NODE_ENV=production
- PORT=10000
- MONGODB_URI=[your MongoDB connection string]
- JWT_SECRET=[your secret key]
- CLIENT_URL=https://your-frontend-url.onrender.com
```

#### Frontend Service:
```
Type: Static Site
Name: opportunity-hub-frontend
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: build
```

## 🔍 Troubleshooting

### If you still get "Not Found":

1. **Check Render Logs**:
   - Go to your service
   - Click "Logs" tab
   - Look for build errors

2. **Common Issues**:
   - Build fails: Check Node.js version (should work with v16+)
   - Static files not served: Make sure using Web Service (not Static Site) for full-stack
   - Database connection: Verify MongoDB URI and whitelist 0.0.0.0/0

3. **Test Endpoints**:
   - Health check: `https://your-app.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"...","timestamp":"..."}`

## 📝 Key Files for Deployment

- `_redirects` file in `client/public/` handles SPA routing
- `.htaccess` file for Apache-based hosting
- Updated `server.js` serves React app for non-API routes
- `package.json` has proper build scripts

## 🎯 Expected Results

After successful deployment:
✅ Homepage loads at your Render URL
✅ All React routes work (no "Not Found" errors)  
✅ API endpoints respond correctly
✅ Navigation between pages works smoothly

Your app should be fully functional! 🎉
