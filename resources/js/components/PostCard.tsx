import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/api';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onLike?: (postSlug: string) => void;
  showFullContent?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike,
  showFullContent = false 
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onLike) {
      onLike(post.slug);
    }
  };

  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Post Header */}
      <div className="mb-4">
        <Link to={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {/* Author and Date */}
        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            {post.user ? (
              <Link 
                to={`/profile/${post.user.id}`}
                className="hover:text-gray-900 transition-colors"
              >
                {post.user.name}
              </Link>
            ) : (
              <span>Unknown Author</span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.created_at}>
              {formatDate(post.created_at)}
            </time>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {showFullContent ? post.content : post.excerpt}
        </p>
        {!showFullContent && (
          <Link 
            to={`/posts/${post.slug}`}
            className="mt-2 inline-block text-blue-600 hover:text-blue-700 transition-colors"
          >
            Read more →
          </Link>
        )}
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tags/${tag.slug}`}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 hover:bg-gray-200 transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              post.is_liked 
                ? 'text-red-600 hover:text-red-700' 
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${post.is_liked ? 'fill-current' : ''}`} />
            <span>{post.likes_count}</span>
          </button>

          {/* Comments */}
          <Link 
            to={`/posts/${post.slug}#comments`}
            className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments_count}</span>
          </Link>
        </div>

        {/* Status Badge */}
        {post.status === 'draft' && (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
            Draft
          </span>
        )}
      </div>
    </article>
  );
};
