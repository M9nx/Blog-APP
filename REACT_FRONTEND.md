# BlogApp - React Frontend

A complete React frontend for the Laravel Blog API backend with authentication, posts, comments, likes, and user profiles.

## 🚀 Features

### ✅ **Implemented Features**

1. **Authentication System**
   - Login page with email/password
   - Registration page with validation
   - JWT token storage in localStorage
   - Protected routes with automatic redirects
   - Global authentication state with Context API

2. **Post Management**
   - Home page displaying latest posts
   - Post detail page with full content
   - Create new posts (protected)
   - Like/unlike posts functionality
   - Search posts by title/content

3. **Comments System**
   - View comments on post detail page
   - Add new comments (protected)
   - Delete own comments (protected)

4. **User Interface**
   - Responsive design with Tailwind CSS
   - Clean, modern Medium-like interface
   - Loading states and error handling
   - Pagination for post lists

## 🛠 Tech Stack

- **React 19** with TypeScript
- **React Router DOM** for routing
- **Axios** for API requests
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for development and building

## 📋 Prerequisites

- Laravel API backend running on `http://127.0.0.1:8000`
- Node.js 18+ and npm

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Start Laravel API Server
```bash
php artisan serve
```

### 4. Access the Application

- **React Frontend**: `http://127.0.0.1:8000/app`
- **Laravel Backend**: `http://127.0.0.1:8000/api`

## 🔗 Available Routes

### Public Routes
- `/app` - Home page (latest posts)
- `/app/login` - Login page
- `/app/register` - Registration page
- `/app/posts/{slug}` - Post detail page

### Protected Routes (requires authentication)
- `/app/posts/create` - Create new post
- `/app/dashboard` - User dashboard

## 📱 API Integration

The frontend consumes the following Laravel API endpoints:

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/user` - Get authenticated user

### Posts
- `GET /api/posts` - List posts (with pagination and search)
- `GET /api/posts/{slug}` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/{slug}` - Update post (protected)
- `DELETE /api/posts/{slug}` - Delete post (protected)
- `POST /api/posts/{slug}/like` - Like/unlike post (protected)

### Comments
- `GET /api/posts/{slug}/comments` - Get post comments
- `POST /api/posts/{slug}/comments` - Create comment (protected)
- `DELETE /api/comments/{id}` - Delete comment (protected)

## 🔧 Configuration

### API Configuration
Edit `resources/js/api/config.ts` to update the API base URL:

```typescript
const API_BASE_URL = 'http://127.0.0.1:8000/api';
```

### Authentication Token
The app automatically:
- Stores JWT tokens in localStorage
- Adds Authorization header to all requests
- Redirects to login on token expiration
- Clears token on logout

## 🎨 UI Components

### Reusable Components
- `Header` - Navigation with auth state
- `PostCard` - Post preview with like/comment counts
- `LoadingSpinner` - Loading indicator
- `ProtectedRoute` - Route wrapper for authenticated pages

### Pages
- `HomePage` - Main post listing with search
- `LoginPage` - User authentication
- `RegisterPage` - User registration
- `PostDetailPage` - Full post view with comments
- `CreatePostPage` - Post creation form

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends request to `/api/login`
3. Backend returns JWT token and user data
4. Token stored in localStorage
5. Token automatically added to all subsequent requests
6. On token expiration, user redirected to login

## 🚧 Todo/Future Enhancements

- [ ] Edit post functionality
- [ ] User profile pages
- [ ] Tag system integration
- [ ] Rich text editor for post creation
- [ ] Image upload for posts
- [ ] Real-time notifications
- [ ] Dark mode toggle
- [ ] User settings page

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Ensure Laravel server is running on port 8000
   - Check CORS configuration in Laravel
   - Verify API base URL in config

2. **Authentication Problems**
   - Clear localStorage: `localStorage.clear()`
   - Check JWT token expiration
   - Verify Sanctum configuration in Laravel

3. **Build Errors**
   - Run `npm install` to ensure dependencies are installed
   - Clear Vite cache: `rm -rf node_modules/.vite`

## 📝 Development Notes

- The app uses TypeScript for type safety
- All API responses are typed with interfaces
- Error handling includes both validation errors and network errors
- The app follows React best practices with hooks and functional components

## 🔄 Building for Production

```bash
npm run build
```

The built files will be in the `public/build` directory and served by Laravel.

---

**Happy coding! 🎉**
