import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Comment as CommentType } from '../types/api';
import { commentService } from '../api/comments';
import { useAuth } from '../contexts/AuthContext';
import { Heart, MessageCircle, Trash2, Reply } from 'lucide-react';

interface CommentProps {
  comment: CommentType;
  onCommentUpdate: () => void;
  depth?: number;
}

const MAX_DEPTH = 3;

export const CommentComponent: React.FC<CommentProps> = ({ 
  comment, 
  onCommentUpdate, 
  depth = 0 
}) => {
  const { user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      await commentService.toggleLike(comment.id);
      onCommentUpdate();
    } catch (error) {
      console.error('Failed to toggle like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmittingReply(true);
    try {
      await commentService.createReply(comment.id, { body: replyContent.trim() });
      setReplyContent('');
      setShowReplyForm(false);
      onCommentUpdate();
    } catch (error) {
      console.error('Failed to create reply:', error);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await commentService.deleteComment(comment.id);
      onCommentUpdate();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const canDelete = user && user.id === comment.user_id;
  const canReply = user && depth < MAX_DEPTH;

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l border-gray-200 pl-4' : ''}`}>
      <div className="bg-white rounded-lg p-4 border border-gray-100">
        {/* Comment Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Link 
              to={`/profile/${comment.user.id}`}
              className="font-medium text-gray-900 hover:text-blue-600"
            >
              {comment.user.name}
            </Link>
            <span className="text-sm text-gray-500">
              {formatDate(comment.created_at)}
            </span>
          </div>
          
          {canDelete && (
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-700 p-1"
              title="Delete comment"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Comment Body */}
        <p className="text-gray-700 leading-relaxed mb-3">
          {comment.body}
        </p>
        
        {/* Comment Actions */}
        <div className="flex items-center space-x-4 text-sm">
          <button
            onClick={handleLike}
            disabled={isLiking || !user}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-colors ${
              comment.is_liked 
                ? 'text-red-600 hover:text-red-700' 
                : 'text-gray-600 hover:text-red-600'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Heart className={`h-4 w-4 ${comment.is_liked ? 'fill-current' : ''}`} />
            <span>{comment.likes_count}</span>
          </button>
          
          {canReply && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 px-2 py-1 rounded text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Reply className="h-4 w-4" />
              <span>Reply</span>
            </button>
          )}
          
          {comment.replies_count > 0 && (
            <span className="flex items-center space-x-1 text-gray-600">
              <MessageCircle className="h-4 w-4" />
              <span>{comment.replies_count} {comment.replies_count === 1 ? 'reply' : 'replies'}</span>
            </span>
          )}
        </div>
        
        {/* Reply Form */}
        {showReplyForm && user && (
          <form onSubmit={handleReplySubmit} className="mt-4 border-t pt-4">
            <div className="mb-3">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                rows={3}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                disabled={isSubmittingReply || !replyContent.trim()}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmittingReply ? 'Posting...' : 'Post Reply'}
              </button>
              <button
                type="button"
                onClick={() => setShowReplyForm(false)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
      
      {/* Render Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              onCommentUpdate={onCommentUpdate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
