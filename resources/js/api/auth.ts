import api from './config';
import { AuthResponse, LoginData, RegisterData, User } from '../types/api';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/login', data);
    
    // Handle nested API response structure
    const apiData = response.data;
    if (apiData.success && apiData.data) {
      return {
        success: apiData.success,
        message: apiData.message,
        user: apiData.data.user,
        token: apiData.data.token,
      };
    }
    
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/register', data);
    
    // Handle nested API response structure
    const apiData = response.data;
    if (apiData.success && apiData.data) {
      return {
        success: apiData.success,
        message: apiData.message,
        user: apiData.data.user,
        token: apiData.data.token,
      };
    }
    
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
  },

  async getUser(): Promise<User> {
    const response = await api.get('/user');
    
    // Handle nested API response structure
    const apiData = response.data;
    if (apiData.success && apiData.data && apiData.data.user) {
      return apiData.data.user;
    }
    
    return response.data;
  },
};
