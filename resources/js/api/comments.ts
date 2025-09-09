import api from './config';
import { Comment, CommentFormData, ApiResponse } from '../types/api';

export const commentService = {
  async getComments(postSlug: string): Promise<Comment[]> {
    const response = await api.get(`/posts/${postSlug}/comments`);
    
    // Handle the nested API response structure
    const apiData = response.data;
    if (apiData.success && apiData.data && Array.isArray(apiData.data.comments)) {
      return apiData.data.comments;
    }
    
    // Fallback for unexpected structure
    return Array.isArray(response.data) ? response.data : [];
  },

  async createComment(postSlug: string, data: CommentFormData): Promise<ApiResponse<Comment>> {
    const response = await api.post(`/posts/${postSlug}/comments`, data);
    return response.data;
  },

  async createReply(commentId: number, data: CommentFormData): Promise<ApiResponse<Comment>> {
    const response = await api.post(`/comments/${commentId}/replies`, data);
    return response.data;
  },

  async deleteComment(commentId: number): Promise<ApiResponse> {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  },

  async toggleLike(commentId: number): Promise<ApiResponse> {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  },
};
