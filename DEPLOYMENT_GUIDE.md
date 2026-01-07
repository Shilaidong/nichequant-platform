# Deployment Guide for NicheQuant Platform

## Backend Deployment (Render)

### Prerequisites
- A Render account
- A MongoDB Atlas account and database
- A Google Cloud account with Generative AI API enabled

### Steps

1. **Create a new Render Web Service**
   - Go to Render dashboard and click "New" → "Web Service"
   - Connect your GitHub repository containing the backend code
   - Select the backend directory as the root directory

2. **Configure the Web Service**
   - Name: nichequant-backend
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Plan: Free (or choose a paid plan for production)

3. **Set Environment Variables**
   - Go to the "Environment" tab
   - Add the following variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string for JWT signing
     - `PORT`: 5000
     - `GOOGLE_API_KEY`: Your Google Cloud API key with Generative AI enabled

4. **Deploy the Service**
   - Click "Create Web Service"
   - Wait for the deployment to complete
   - Note the public URL of your backend service

## Frontend Deployment (Vercel)

### Prerequisites
- A Vercel account
- The backend service URL from Render

### Steps

1. **Create a new Vercel Project**
   - Go to Vercel dashboard and click "New Project"
   - Connect your GitHub repository containing the frontend code

2. **Configure the Project**
   - Name: nichequant-frontend
   - Framework: React
   - Root Directory: Leave as default (root of the repository)
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**
   - Go to the "Environment Variables" section
   - Add the following variable:
     - `VITE_API_URL`: Your backend service URL (e.g., https://nichequant-backend.onrender.com/api)

4. **Deploy the Project**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Note the public URL of your frontend application

5. **Update API Service Configuration**
   - Update the `API_URL` in `src/services/api.ts` to use the environment variable:
     ```typescript
     const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
     ```
   - Commit this change and push to GitHub
   - Vercel will automatically redeploy the frontend

## Testing the Deployment

1. **Test Backend API**
   - Open your backend URL in a browser
   - You should see "API is running..."
   - Test endpoints using tools like Postman or curl

2. **Test Frontend Application**
   - Open your frontend URL in a browser
   - The application should load without errors
   - Check that data is being fetched from the backend API
   - Test AI features like product verification and valuation

## Additional Configuration

### CORS Setup
The backend already has CORS enabled, but you may want to restrict it to your frontend domain in production:

```javascript
// In server.js
const cors = require('cors');
const corsOptions = {
  origin: 'https://your-frontend-url.vercel.app',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

### MongoDB Atlas Configuration
- Ensure your MongoDB Atlas cluster is set to accept connections from all IP addresses (0.0.0.0/0) or from Render's IP addresses

### Google Generative AI API
- Ensure your API key has the necessary permissions for Generative AI
- Monitor API usage to avoid unexpected charges

## Troubleshooting

### Backend Deployment Issues
- Check the Render logs for error messages
- Ensure all environment variables are correctly set
- Verify MongoDB connection string is valid
- Check that Google API key is enabled and has the right permissions

### Frontend Deployment Issues
- Check the Vercel logs for error messages
- Ensure `VITE_API_URL` is correctly set
- Verify that the backend URL is accessible from the frontend
- Check browser console for network errors

## Monitoring and Maintenance

- Set up monitoring for both backend and frontend
- Configure error logging
- Regularly update dependencies
- Monitor API usage and database performance
- Set up backups for MongoDB Atlas

## Scaling Considerations

- For production, consider upgrading to paid plans for both Render and Vercel
- Implement caching for frequently accessed data
- Optimize database queries
- Consider using a CDN for static assets
- Set up horizontal scaling for the backend if needed