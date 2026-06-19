# Personal Task Manager

A full-stack Personal Task Manager application developed as part of the Techstudio Internship Program Stage 1 assessment. The application supports complete CRUD functionality, user authentication, task organization by category and completion status, and a responsive UI across mobile and desktop.

---

## Features

- Create, view, update, and delete tasks with title, description, and category
- Mark tasks as completed or incomplete
- Filter tasks by completion status (All, Completed, Incomplete) and category tags (Casual, Important, Urgent)
- Visual indicators and dynamic tag color coding for improved clarity
- Interactive modal system for success and error feedback
- Responsive design with smooth transitions and hover animations
- Full user authentication with protected, user-specific task data
- Multi-user support with complete data isolation

---

## Extended Learning

Beyond the required curriculum, several additional tools and patterns were integrated:

**React Query** — Implemented for server state management, improving data fetching performance, enabling automatic caching and synchronization, and simplifying loading, error, and success state handling.

**Axios** — Used in place of the native Fetch API for cleaner HTTP request handling, better-structured API services, and more consistent error management.

**JWT Authentication & Email Services** — A complete authentication system was built using JSON Web Tokens, bcrypt password hashing, and an email service (Brevo) for account verification and password reset flows.

These additions reflect a deliberate effort to go beyond the minimum requirements and deepen practical understanding of full-stack security and asynchronous data flow in React.

---

## Tech Stack

**Frontend:** React (TypeScript), React Router DOM, React Query, Axios, Tailwind CSS

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Nodemailer (Brevo)

---

## Project Structure

```
root/
├── client/               # React frontend
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── services/
│       ├── types/
│       └── universal/
└── server/               # Express backend
    ├── models/
    ├── routes/
    ├── controllers/
    ├── middleware/
    ├── services/
    ├── utils/
    └── config/
```

---

## Environment Variables

Create a `.env` file in the `server/` directory with the following:

```
PORT=4040
NODE_ENV=development
MONGO_URI=<your_mongodb_connection_string>
CLIENT_URL=http://localhost:5173/
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE=<your_jwt_expiration_time>
BREVO_API_KEY=<your_brevo_api_key>
EMAIL_FROM=<your_email>
```

---

## Installation & Setup

**1. Clone the repository**

```bash
git clone <your-repo-link>
cd personal-task-manager
```

**2. Start the backend**

```bash
cd server
npm install
npm run dev
```

Runs on `http://localhost:4040`

**3. Start the frontend**

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173`

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Log in and receive a JWT |
| GET | `/auth/verify-email/:token` | Verify email address |
| POST | `/auth/forgot-password` | Request a password reset email |
| PATCH | `/auth/reset-password/:token` | Reset password using token |

### Tasks (Protected — requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Fetch all tasks for the authenticated user |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Planned Improvements

- Search functionality for tasks
- Enhanced animations and micro-interactions
- Deployment of frontend and backend

---

## Author

Built by Tolulope Ogungbemi David — Techstudio Internship Program, Stage 1