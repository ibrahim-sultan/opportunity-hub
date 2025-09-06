# Internship & Volunteer Match Platform - Igbaja

## Overview

A comprehensive web platform designed to connect rural youth in Igbaja with internship and volunteer opportunities, built by the Village Coders of Igbaja team. This platform bridges the gap between young talents and organizations, fostering community development and skill enhancement.

## 🚀 Features

### For Youth
- **Profile Management**: Create and maintain detailed profiles with skills, education, and interests
- **Advanced Search**: Find opportunities with intelligent filtering and search suggestions
- **Application Tracking**: Monitor application status and communicate with organizations
- **Certificate Generation**: Earn verifiable certificates upon completion
- **Saved Searches**: Save and manage favorite search queries

### For Organizations
- **Opportunity Management**: Post, edit, and manage internship/volunteer positions
- **Application Review**: Review applications and manage candidate communications
- **Certificate Issuance**: Generate certificates for completed programs
- **Analytics**: Track application metrics and engagement

### For Administrators
- **User Management**: Oversee user accounts and roles
- **Content Moderation**: Review and approve opportunities
- **Analytics Dashboard**: Monitor platform usage and statistics

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0**: Modern UI framework
- **React Router 6.15.0**: Client-side routing
- **React Query 3.39.3**: Server state management
- **React Hook Form 7.45.4**: Form management
- **Axios 1.5.0**: HTTP client
- **React Hot Toast 2.4.1**: Notifications

### Backend
- **Node.js**: Runtime environment
- **Express 4.18.2**: Web framework
- **MongoDB**: Database with Mongoose ODM
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Express Validator**: Input validation
- **Helmet & CORS**: Security middleware

## 📁 Project Structure

```
Team A/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React context providers
│   │   └── ...
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── server/                # Express backend application
│   ├── routes/           # API route handlers
│   ├── models/           # Mongoose models
│   ├── middleware/       # Custom middleware
│   ├── services/         # Business logic services
│   ├── server.js         # Main server file
│   └── package.json      # Backend dependencies
│
└── README.md             # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ibrahim-sultan/team-a-platform.git
   cd team-a-platform
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/internship_platform
   
   # JWT
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   
   # Server
   PORT=5000
   NODE_ENV=development
   
   # Client URL for CORS
   CLIENT_URL=http://localhost:3000
   
   # Email (optional - for future use)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend application**
   ```bash
   cd client
   npm start
   ```
   Client will run on http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Opportunities Endpoints
- `GET /api/opportunities` - Get all opportunities (with filtering)
- `GET /api/opportunities/:id` - Get single opportunity
- `POST /api/opportunities` - Create opportunity (Organization only)
- `PUT /api/opportunities/:id` - Update opportunity
- `DELETE /api/opportunities/:id` - Delete opportunity
- `POST /api/opportunities/:id/save` - Save/unsave opportunity

### Search Endpoints
- `GET /api/search/opportunities` - Advanced opportunity search
- `GET /api/search/suggestions` - Search suggestions
- `POST /api/search/save` - Save search query
- `GET /api/search/saved` - Get saved searches
- `DELETE /api/search/saved/:id` - Delete saved search

### Applications Endpoints
- `GET /api/applications` - Get user applications
- `POST /api/applications` - Submit application
- `PUT /api/applications/:id/status` - Update application status

## 🚀 Deployment

### Render Deployment

1. **Prepare for deployment**
   - Ensure all environment variables are configured
   - Build the client application
   - Configure MongoDB Atlas (if using cloud database)

2. **Create render.yaml** (already included in the project)

3. **Deploy to Render**
   - Connect your GitHub repository to Render
   - Configure environment variables in Render dashboard
   - Deploy with automatic builds enabled

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=https://your-frontend-domain.com
PORT=10000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Village Coders of Igbaja**
- Building technology solutions for rural community development
- Connecting youth with opportunities for growth and skill development

## 📞 Support

For support, email support@villagecoderigbaja.com or join our community Discord.

## 🙏 Acknowledgments

- Thanks to all the youth and organizations in Igbaja community
- Special recognition to mentors who guided this project
- Built with ❤️ for rural community empowerment

---

**Made with passion by the Village Coders of Igbaja Team** 🚀
