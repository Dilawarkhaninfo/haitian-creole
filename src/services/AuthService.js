// src/services/AuthService.js

const API_BASE_URL = 'http://localhost:8000';

export const AuthService = {
  register: async (userData) => {
    const formData = new URLSearchParams();
    
    // Add all user data to form data
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Registration failed');
    }
    
    return data;
  },
  
  login: async (credentials) => {
    const formData = new URLSearchParams();
    
    // Add credentials to form data
    Object.keys(credentials).forEach(key => {
      formData.append(key, credentials[key]);
    });
    
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }
    
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify({
      userId: data.user_id,
      username: data.username,
      isLoggedIn: true
    }));
    
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },
  
  getTranslationHistory: async () => {
    const currentUser = AuthService.getCurrentUser();
    
    if (!currentUser || !currentUser.userId) {
      return { chats: [] };
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/get-translation-history/${currentUser.userId}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch translation history');
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching translation history:', error);
      return { chats: [] };
    }
  }
};

export default AuthService;