import api from './config';
import { Tag, User, Post, PaginatedResponse } from '../types/api';

export const userService = {
  async getUser(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async getUserPosts(id: number, page = 1): Promise<PaginatedResponse<Post>> {
    const response = await api.get(`/users/${id}/posts?page=${page}`);
    return response.data;
  },
};

export const tagService = {
  async getTags(): Promise<Tag[]> {
    const response = await api.get('/tags');
    return response.data;
  },

  async getTag(slug: string): Promise<Tag> {
    const response = await api.get(`/tags/${slug}`);
    return response.data;
  },
};

export const feedService = {
  async getFeed(page = 1, search?: string): Promise<PaginatedResponse<Post>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    if (search) {
      params.append('search', search);
    }
    
    const response = await api.get(`/feed?${params}`);
    return response.data;
  },

  async getPopularPosts(): Promise<Post[]> {
    const response = await api.get('/feed/popular');
    return response.data;
  },

  async getTrendingTags(): Promise<Tag[]> {
    const response = await api.get('/feed/trending-tags');
    return response.data;
  },
};
