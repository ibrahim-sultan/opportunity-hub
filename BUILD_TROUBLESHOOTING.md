# 🔧 Build Failure Troubleshooting

## Common Build Issues & Solutions

### 1. **Node.js Version Issues**
**Error**: Node version not compatible
**Solution**: 
- In Render, Node 18+ is recommended
- Add `.nvmrc` file if needed

### 2. **Dependency Installation Fails**
**Error**: `npm install` fails
**Solution**:
```bash
Build Command: cd server && npm ci && cd ../client && npm ci && npm run build
```

### 3. **Memory Issues**
**Error**: JavaScript heap out of memory
**Solution**:
```bash
Build Command: cd server && npm install && cd ../client && npm install --legacy-peer-deps && npm run build
```

### 4. **Path Issues on Render**
**Error**: Cannot find module or path
**Solution**: Use absolute paths in build commands

## 🚀 **RECOMMENDED RENDER SETTINGS**

### Option 1: Manual Configuration (Recommended)
```
Service Type: Web Service
Runtime: Node
Build Command: cd server && npm install && cd ../client && npm install && npm run build
Start Command: cd server && npm start
Root Directory: (leave empty)
```

### Option 2: Use render-simple.yaml
Copy `render-simple.yaml` to `render.yaml` and use Blueprint deployment

### Option 3: Separate the Build Steps
```
Build Command: npm install
Start Command: ./render-build.sh && cd server && npm start
```

## 🔍 **Debug Steps**

1. **Check Render Build Logs**:
   - Go to your service dashboard
   - Click "Logs" tab during build
   - Look for specific error messages

2. **Test Locally First**:
   ```bash
   # Test the exact build command locally
   cd server && npm install && cd ../client && npm install && npm run build
   ```

3. **Common Error Messages**:
   - `ENOENT: no such file or directory` = Path issue
   - `npm ERR! peer dep missing` = Dependency conflict  
   - `JavaScript heap out of memory` = Memory issue

## 🎯 **Working Build Commands**

Try these in order:

1. **Simple**: `cd server && npm install && cd ../client && npm install && npm run build`

2. **With CI**: `cd server && npm ci && cd ../client && npm ci && npm run build`

3. **Legacy**: `cd server && npm install && cd ../client && npm install --legacy-peer-deps && npm run build`

4. **Force Clean**: `cd server && rm -rf node_modules && npm install && cd ../client && rm -rf node_modules && npm install && npm run build`

## 📋 **Environment Variables**

Make sure these are set in Render:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=[your MongoDB connection string]
JWT_SECRET=[your JWT secret]
CLIENT_URL=$RENDER_EXTERNAL_URL
```

Your build should work with these configurations! 🎉
