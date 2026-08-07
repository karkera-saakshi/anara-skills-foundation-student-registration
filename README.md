# Student Registration Application

A full-stack MERN application for student registration with authentication, an admin dashboard, and complete CRUD functionality for managing student records.

## Live Links

- **Frontend:** [https://anara-skills-foundation-student-99qk.onrender.com](https://anara-skills-foundation-student-99qk.onrender.com)
- **Backend API:** [https://anara-skills-foundation-student.onrender.com](https://anara-skills-foundation-student.onrender.com)

## Tech Stack

- **Frontend:** React.js, HTML, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Deployment:** Render (Frontend as Static Site, Backend as Web Service)

## Features

- User login and registration with authentication
- Dashboard with a left-side navigation menu after login
- Full CRUD operations for student registration records
  - Create a new student record
  - Fetch/view student records
  - Update existing student records
  - Delete student records
- Separate REST API endpoints for each operation

## API Endpoints

| Method | Endpoint         | Description                  |
|--------|------------------|-------------------------------|
| POST   | `/register`      | Register a new user           |
| POST   | `/login`         | Login and authenticate user   |
| POST   | `/students`      | Create a new student record   |
| GET    | `/students`      | Fetch all student records     |
| GET    | `/students/:id`  | Fetch a single student record |
| PUT    | `/students/:id`  | Update a student record       |
| DELETE | `/students/:id`  | Delete a student record       |

*(Adjust the table above to match your actual route names/paths.)*

## Project Structure

```
project-root/
├── backend/
│   ├── routes/
│   │   └── studentRoute.js
│   ├── model/
|   |       └── studentModel.js
│   ├── controller/
|   |        └── studentController.js
│   ├── server.js
|   ├── .gitignore
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── .env
└── README.md
```

## Getting Started (Local Setup)

### Prerequisites
- Node.js installed
- MongoDB Atlas account and connection string

### Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secert_key
```

Run the backend:
```bash
node server.js
```

### Frontend Setup
```bash
cd frontend
npm install
```


Run the frontend:
```bash
npm run dev
```

## Deployment

- **Backend** is deployed on Render as a Web Service (build command: `npm install`, start command: `node server.js`).
- **Frontend** is deployed on Render as a Static Site (build command: `npm run build`, publish directory: `build` or `dist`).
- Environment variables (`MONGO_URI`, `JWT_SECRET`) are configured in the Render dashboard.

## Author

Saakshi Karkera
