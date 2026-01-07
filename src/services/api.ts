import { MOCK_PRODUCTS, MOCK_TESTIMONIALS, MOCK_CHART_DATA } from '../../constants';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to handle API requests
const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, mergedOptions);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(errorData.message || 'API request failed');
    }
    
    return response.json();
  } catch (error) {
    console.warn('API Error, falling back to mock data:', error);
    // Mock Data Fallback
    if (endpoint.includes('/products')) return MOCK_PRODUCTS;
    if (endpoint.includes('/testimonials')) return MOCK_TESTIMONIALS;
    if (endpoint.includes('/market-data')) return MOCK_CHART_DATA;
    if (endpoint.includes('/auth/me')) return { name: 'Demo User', email: 'demo@example.com' };
    
    throw error;
  }
};

export const api = {
  // Authentication
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
    login: (data: { email: string; password: string }) =>
      fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    getMe: (token: string) =>
      fetchApi('/auth/me', { headers: { 'x-auth-token': token } }),
  },
  
  // Products
  products: {
    getAll: () => fetchApi('/products'),
    getById: (id: string) => fetchApi(`/products/${id}`),
    create: (data: any, token: string) =>
      fetchApi('/products', { 
        method: 'POST', 
        body: JSON.stringify(data),
        headers: { 'x-auth-token': token }
      }),
    update: (id: string, data: any, token: string) =>
      fetchApi(`/products/${id}`, { 
        method: 'PUT', 
        body: JSON.stringify(data),
        headers: { 'x-auth-token': token }
      }),
    delete: (id: string, token: string) =>
      fetchApi(`/products/${id}`, { 
        method: 'DELETE',
        headers: { 'x-auth-token': token }
      }),
  },
  
  // Testimonials
  testimonials: {
    getAll: () => fetchApi('/testimonials'),
    create: (data: any) =>
      fetchApi('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  },
  
  // Market Data
  marketData: {
    getAll: (category?: string) => 
      fetchApi(category ? `/market-data?category=${category}` : '/market-data'),
    create: (data: any) =>
      fetchApi('/market-data', { method: 'POST', body: JSON.stringify(data) }),
  },
  
  // AI Features
  ai: {
    verify: (data: { imageUrl: string; description: string }) =>
      fetchApi('/ai/verify', { method: 'POST', body: JSON.stringify({ image: data.imageUrl, description: data.description }) }),
    valuate: (data: { name: string; category: string; description: string; imageUrl: string; condition: string }) =>
      fetchApi('/ai/valuate', { method: 'POST', body: JSON.stringify({ image: data.imageUrl, ...data }) }),
  },
};