# Render Deployment Guide - Fixing "Route not found" Error

## 🚨 Issue Fixed: Route Not Found Error

The "Route not found" error occurs because single-page applications (SPAs) need special configuration to handle client-side routing properly.

## ✅ Fixes Applied

### 1. Client-Side Routing Fix
- Created `_redirects` file in `client/public/` to handle SPA routing
- Updated `render.yaml` with proper route rewriting configuration
- Added axios configuration for proper API URL handling

### 2. Server-Side Routing Fix  
- Updated server to serve React app for non-API routes in production
- Modified 404 handler to distinguish between API and client routes

## 🚀 Deployment Steps for Render

### Option 1: Deploy as Separate Services (Recommended)

#### Step 1: Deploy Backend API
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `https://github.com/ibrahim-sultan/opportunity-hub`
4. Configure:
   - **Name**: `opportunity-hub-api`
   - **Runtime**: `Node`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_platform
   JWT_SECRET=your_very_long_and_secure_secret_key_here_2024
   CLIENT_URL=https://your-frontend-url.onrender.com
   ```

#### Step 2: Deploy Frontend
1. Click "New +" → "Static Site"
2. Connect the same repository
3. Configure:
   - **Name**: `opportunity-hub-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-api-url.onrender.com
   ```

### Option 2: Deploy as Single Service

1. Create a Web Service (not static site)
2. Configure:
   - **Build Command**: `npm install && cd server && npm install && cd ../client && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (root of repo)

## 🔧 Key Configuration Files Added/Updated

### `client/public/_redirects`
```
/*    /index.html   200
```

### `client/src/config/api.js`
```javascript
// Handles API URL configuration for different environments
```

### Updated `server/server.js`
- Added production static file serving
- Fixed route handling for SPA

### Updated `render.yaml`
- Added route rewriting for frontend
- Proper service configuration

## 🧪 Testing Your Deployment

1. **API Health Check**: 
   - Visit `https://your-api-url.onrender.com/api/health`
   - Should return: `{"status":"OK","message":"...","timestamp":"..."}`

2. **Frontend Routes**:
   - Visit `https://your-frontend-url.onrender.com/`
   - Try navigating to `/opportunities`, `/login`, etc.
   - All routes should work without "Route not found" error

3. **API Integration**:
   - Try logging in or registering
   - Check browser network tab for successful API calls

## 🔐 Environment Variables Required

### Backend API Service
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/internship_platform
JWT_SECRET=super_secure_secret_key_minimum_32_characters_long
CLIENT_URL=https://your-frontend-url.onrender.com
```

### Frontend Static Site
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## 🛠️ Troubleshooting

### If you still get "Route not found":

1. **Check Render Logs**:
   - Go to your service dashboard
   - Click "Logs" tab
   - Look for build and runtime errors

2. **Verify Environment Variables**:
   - Ensure all required env vars are set
   - Check for typos in URLs

3. **Database Connection**:
   - Verify MongoDB Atlas connection string
   - Ensure IP whitelist includes 0.0.0.0/0 for Render

4. **CORS Issues**:
   - Make sure `CLIENT_URL` matches your frontend URL exactly
   - Include protocol (https://) in URLs

### Common Issues:

- **Build fails**: Check Node.js version compatibility
- **API calls fail**: Verify `REACT_APP_API_URL` environment variable
- **Database connection fails**: Check MongoDB connection string and network access
- **Authentication issues**: Verify JWT_SECRET is set and consistent

## 📱 Final Verification

After deployment, test these key features:
- ✅ Homepage loads correctly
- ✅ Navigation between pages works
- ✅ User registration/login functions
- ✅ Opportunity search and filtering
- ✅ API responses are received properly

Your application should now be fully functional on Render! 🎉
