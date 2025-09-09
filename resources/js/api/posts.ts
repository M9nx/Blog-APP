import api from './config';
import { Post, PostFormData, PaginatedResponse, ApiResponse } from '../types/api';

export const postService = {
  async getPosts(page = 1, search?: string): Promise<PaginatedResponse<Post>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/posts?${params}`);
    
    // Transform the API response to match our expected structure
    const apiData = response.data;
    if (apiData.success && apiData.data) {
      return {
        data: apiData.data.posts,
        current_page: apiData.data.pagination.current_page,
        last_page: apiData.data.pagination.last_page,
        per_page: apiData.data.pagination.per_page,
        total: apiData.data.pagination.total,
      } as PaginatedResponse<Post>;
    }
    
    // Fallback in case of unexpected structure
    return response.data;
  },

  async getPost(slug: string): Promise<Post> {
    const response = await api.get(`/posts/${slug}`);
    
    // Handle the nested API response structure
    const apiData = response.data;
    if (apiData.success && apiData.data && apiData.data.post) {
      return apiData.data.post;
    }
    
    // Fallback for unexpected structure
    return response.data;
  },

  async createPost(data: PostFormData): Promise<ApiResponse<Post>> {
    const response = await api.post('/posts', data);
    return response.data;
  },

  async updatePost(slug: string, data: PostFormData): Promise<ApiResponse<Post>> {
    const response = await api.put(`/posts/${slug}`, data);
    return response.data;
  },

  async deletePost(slug: string): Promise<ApiResponse> {
    const response = await api.delete(`/posts/${slug}`);
    return response.data;
  },

  async likePost(slug: string): Promise<ApiResponse> {
    const response = await api.post(`/posts/${slug}/like`);
    return response.data;
  },
};
