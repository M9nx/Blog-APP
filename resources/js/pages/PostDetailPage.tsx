import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PostCard } from '../components/PostCard';
import { LoadingPage } from '../components/Loading';
import { CommentComponent } from '../components/CommentComponent';
import { postService } from '../api/posts';
import { commentService } from '../api/comments';
import { Post, Comment } from '../types/api';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle, Edit, Trash2, Send } from 'lucide-react';

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const [postResponse, commentsResponse] = await Promise.all([
          postService.getPost(slug),
          commentService.getComments(slug)
        ]);
        
        console.log('Post response:', postResponse);
        console.log('Comments response:', commentsResponse);
        
        setPost(postResponse);
        setComments(Array.isArray(commentsResponse) ? commentsResponse : []);
      } catch (error) {
        console.error('Failed to fetch post data:', error);
        setPost(null);
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleLike = async (postSlug: string) => {
    try {
      await postService.likePost(postSlug);
      // Refresh post to get updated like status and count
      if (slug) {
        const updatedPost = await postService.getPost(slug);
        setPost(updatedPost);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !commentContent.trim()) return;

    setIsSubmittingComment(true);
    try {
      await commentService.createComment(slug, { body: commentContent.trim() });
      setCommentContent('');
      
      // Refresh comments
      await fetchComments();
    } catch (error) {
      console.error('Failed to create comment:', error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const fetchComments = async () => {
    if (!slug) return;
    try {
      const commentsResponse = await commentService.getComments(slug);
      setComments(Array.isArray(commentsResponse) ? commentsResponse : []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setComments([]);
    }
  };

  if (isLoading) {
    return <LoadingPage message="Loading post..." />;
  }

  if (!post || !slug) {
    return <Navigate to="/404" replace />;
  }

  const canEditPost = user && user.id === post.user_id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Post Content */}
      <article className="mb-8">
        <PostCard 
          post={post} 
          onLike={handleLike} 
          showFullContent={true}
        />
        
        {/* Edit/Delete Actions */}
        {canEditPost && (
          <div className="mt-4 flex space-x-2">
            <Link
              to={`/posts/${post.slug}/edit`}
              className="inline-flex items-center px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit Post
            </Link>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  // Handle delete
                  postService.deletePost(post.slug).then(() => {
                    window.location.href = '/';
                  });
                }
              }}
              className="inline-flex items-center px-3 py-2 text-sm text-red-600 hover:text-red-700"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete Post
            </button>
          </div>
        )}
      </article>

      {/* Comments Section */}
      <section id="comments" className="border-t pt-8">
        <div className="mb-6 flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>
        </div>

        {/* Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="mb-4">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmittingComment || !commentContent.trim()}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmittingComment ? 'Posting...' : 'Post Comment'}
            </button>
          </form>
        ) : (
          <div className="mb-8 rounded-md bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
              {' '}to join the discussion.
            </p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {!Array.isArray(comments) || comments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            Array.isArray(comments) && comments.map((comment) => (
              <CommentComponent
                key={comment.id}
                comment={comment}
                onCommentUpdate={fetchComments}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};
