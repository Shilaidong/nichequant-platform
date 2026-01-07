# NicheQuant Backend API

Backend API for NicheQuant - Vintage & Subculture Asset Platform

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Google Generative AI API

## Installation

1. Install dependencies:
```
npm install
```

2. Create a `.env` file based on the `.env.example` template:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_API_KEY=your_google_api_key
```

3. Start the server:
```
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user information

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product (requires authentication)
- `PUT /api/products/:id` - Update a product (requires authentication)
- `DELETE /api/products/:id` - Delete a product (requires authentication)

### Testimonials

- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Create a new testimonial

### Market Data

- `GET /api/market-data` - Get all market data
- `POST /api/market-data` - Create new market data

### AI Features

- `POST /api/ai/verify` - Verify product authenticity
- `POST /api/ai/valuate` - Estimate product value

## Database Models

### User
- `name` - User's name
- `email` - User's email (unique)
- `password` - Hashed password
- `avatarUrl` - User's avatar URL
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Product
- `name` - Product name
- `category` - Product category
- `price` - Product price
- `imageUrl` - Product image URL
- `seller` - Reference to User model
- `description` - Product description
- `createdAt` - Creation timestamp
- `updatedAt` - Update timestamp

### Testimonial
- `quote` - Testimonial text
- `name` - Author's name
- `handle` - Author's handle
- `avatarUrl` - Author's avatar URL
- `createdAt` - Creation timestamp

### MarketData
- `date` - Date string
- `value` - Numeric value
- `category` - Data category
- `createdAt` - Creation timestamp

## Deployment

The backend can be deployed to Vercel, Render, or any other Node.js hosting platform.

## License

MIT