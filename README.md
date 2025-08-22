SkyLux Airport Booking System ✈️

![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A full-stack airport booking platform where users can search, compare, and book flights with a modern interface and secure authentication system.

[Air-Port-Web-application](https://air-port-web-application.vercel.app/)   
[Air-Port-API](https://airportwebapp-api.vercel.app)  

Key Functionalities ✨
User Features

    ✈️ Flight search with filters (date, destination, price)

    🔐 JWT authentication (signup/login with email verification)

    💳 Secure payment processing (simulated)

    📋 Booking management (view/modify/cancel bookings)

    📱 Responsive design for all devices

    📬 Booking confirmation emails

Admin Features

    👑 Admin dashboard with analytics

    ➕ Add/remove/edit flights

    👥 Manage users and bookings

    📊 View flight occupancy statistics

    🔄 Real-time updates to flight schedules

Tech Stack 🛠️
Component	Technology
Frontend	React 18 + Vite
Styling	Tailwind CSS
State Management	Redux Toolkit
Routing	React Router v6
Backend	Node.js + Express
Database	MongoDB (Mongoose ODM)
Authentication	JWT + Bcrypt
Deployment	Render/Vercel
Installation & Setup 💻
Prerequisites

    Node.js (v18+)

    MongoDB Atlas account or local MongoDB instance

    Git

Frontend Setup
bash

# Clone repository
git clone https://github.com/alsongard/AirPort-WebApplication

# Install dependencies
npm install

# Start development server
npm run dev

Backend Setup
bash

cd ../server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials

# Start server
npm start

Environment Variables 🔐

Create a .env file in the server directory:
env
```
MONGODB_URI = "your_mongodb_connection_string"
PORT = 5000
JWT_SECRET = "your_jwt_secret_key"
JWT_EXPIRES_IN = "7d"
SMTP_HOST = "your_email_smtp_host"
SMTP_PORT = 587
SMTP_USER = "your_email@domain.com"
SMTP_PASS = "your_email_password"
```
Create a .env file in client directory:
env
```
VITE_API_URL="hosting_url"
```

Features Deep Dive 🧠
Flight Booking System

    Real-time flight availability checks

    Seat selection with visual mapping

    Dynamic pricing based on demand

    Multiple passenger booking support

    E-ticket generation with QR codes

User Management

    Secure password hashing with bcrypt

    Password reset functionality

    Profile management dashboard

    Booking history with filters

    Role-based access control (user/admin)

Admin Dashboard

    Flight management CRUD operations

    User management interface

    Booking analytics and reports

    Revenue tracking dashboard

    System health monitoring

API Endpoints
text

FLIGHTS:

| METHOD  | ROUTE | DESCRIPTION |
| ---- | --- | --- |
| GET |     ``/api/flights/getFlights`` | Get all flights (public) |
| POST |    ``/api/flights/createFlight`` | Create new flight (admin) |
| POST |    ``/api/flights/searchFlight`` | Search Flight |
| PUT |   ``/api/flights//updateFlight/:id``       | Update flight (admin) |
| GET |     ``/api/flights/:id``       | Get flight details |
| DELETE |  ``/api/flights/:id``       | Delete flight (admin) |


BOOKINGS:

| METHOD  | ROUTE | DESCRIPTION |
| ---- | --- | --- |
| POST |    ``/api/booking/setBooking``          | Create new booking |
| GET  |    ``/api/booking/getUserBooking/:id``     | Get user bookings |
| GET | ``/api/booking/getBooking`` | Get All Bookings(admin) |
| PATCH|    ``/api/booking/:id :(upcomingfeature)``       | Update booking |
| DELETE|   ``/api/booking/:id :(upcomingfeature)``       | Cancel booking |



ADMIN:

| METHOD  | ROUTE | DESCRIPTION |
| ---- | --- | --- |
| GET     | ``/api/admin/users``       | Get all users (admin) |
| DELETE | ``/api/admin/deleteUser/:user_id`` | Delete user (admin) |
| POST | ``/api/admin/adminLogin ``  | Admin login |
| POST | ``/api/admin/createAdmin`` | Create new admin user |

```
AUTH:UPCOMING FEATURES
POST    /api/auth/register     - User registration
POST    /api/auth/login        - User login
POST    /api/auth/forgot       - Password reset request

```
Project Structure 📂
text
```
airport-booking/
├── client/                   # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── features/         # Feature modules
│   │   ├── redux/            # State management
│   │   ├── routes/           # Protected routes
│   │   ├── services/         # API services
│   │   ├── utils/            # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Backend
│   ├── config/               # DB and environment config
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                # Helper functions
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```
License 📄

This project is licensed under the MIT License - see the LICENSE file for details.
Future Enhancements 🚀

    Real-time flight status updates

    Mobile application version

    Loyalty program integration

    Multi-language support

    AI-powered flight recommendations

    Integration with airport security systems

Contributing 🤝

Contributions are welcome! Please follow these steps:

    Fork the repository

    Create your feature branch (git checkout -b feature/new-feature)

    Commit your changes (git commit -m 'Add some feature')

    Push to the branch (git push origin feature/new-feature)

    Open a pull request

Acknowledgements 👏

    MongoDB for flexible document storage

    React Community for component libraries

    Tailwind CSS for utility-first styling

    Vite for lightning-fast development environment

    Redux for predictable state management



https://github.com/user-attachments/assets/6fa772cb-d466-473e-a721-219df9d6ab19


