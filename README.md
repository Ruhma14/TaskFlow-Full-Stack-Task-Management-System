# 🚀 TaskFlow — Full-Stack Task Management System

TaskFlow is a modern, responsive full-stack Task Management System designed to help users create, organize, track, complete, search, and manage their daily tasks.

The project started as a frontend-based task manager using Local Storage and has been extended into a full-stack application using **Node.js, Express.js, MongoDB, and Mongoose** with a RESTful API.

---

## ✨ Features

### Task Management

* Create new tasks
* View all tasks
* Mark tasks as completed or pending
* Delete tasks
* Persistent task storage using MongoDB
* Task priority management
* Task categories
* Due dates

### Search & Filtering

* Search tasks by title
* Search tasks by description
* Search tasks by category
* Filter all tasks
* Filter pending tasks
* Filter completed tasks

### Dashboard

* Total tasks
* Completed tasks
* Pending tasks
* Completion percentage
* Real-time dashboard updates

### User Interface

* Modern responsive design
* Mobile-friendly layout
* Toast notifications
* Clean task cards
* Priority badges
* Responsive dashboard
* User-friendly task management interface

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)
* Fetch API
* DOM Manipulation

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MongoDB
* Mongoose
* MongoDB Compass

### API Testing

* Postman

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Node.js

---

## 🏗️ Application Architecture

```text
┌─────────────────────────┐
│        Frontend         │
│    HTML / CSS / JS      │
└────────────┬────────────┘
             │
             │ Fetch API
             ▼
┌─────────────────────────┐
│       REST API          │
│   Node.js + Express     │
└────────────┬────────────┘
             │
             │ Mongoose
             ▼
┌─────────────────────────┐
│        MongoDB          │
│       taskflow-DB       │
└─────────────────────────┘
```

MongoDB is the main source of truth for task data.

---

## 📂 Project Structure

```text
TaskFlow/
│
├── assets/
│   └── screenshots/
│
├── css/
│   ├── styles.css
│   └── utility.css
│
├── js/
│   └── script.js
│
├── backend/
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   │
│   ├── models/
│   │   └── task.model.js
│   │
│   └── routes/
│       └── task.routes.js
│
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔌 REST API Endpoints

Base URL:

```text
http://localhost:5000/api/tasks
```

### Get all tasks

```http
GET /api/tasks
```

Returns all tasks from MongoDB.

### Get a single task

```http
GET /api/tasks/:id
```

Returns a specific task using its MongoDB ID.

### Create a task

```http
POST /api/tasks
```

Example request:

```json
{
  "title": "Learn Express",
  "description": "Practice REST API development",
  "dueDate": "2026-09-20",
  "priority": "High",
  "category": "Learning"
}
```

### Update a task

```http
PUT /api/tasks/:id
```

Example:

```json
{
  "completed": true
}
```

### Delete a task

```http
DELETE /api/tasks/:id
```

---

## ⚙️ Installation

### 1. Clone the repository

```

### 2. Open the project

```bash
cd taskflow-fullstack
```

### 3. Install dependencies

```bash
npm install
```

---

## 🗄️ MongoDB Setup

Make sure MongoDB is installed and running locally.

The application uses:

```text
Database: taskflow
Collection: tasks
```

Create:

```text
backend/.env
```

with:

```env
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
PORT=5000
```


---

## ▶️ Run the Application

Start the backend from the project root:

```bash
npm run dev
```

Expected output:

```text
MongoDB connected!
Server running on port 5000
```

The API is available at:

```text
http://localhost:5000
```

---

## 🧪 Testing

The REST API can be tested using Postman.

### API Testing Flow

```text
POST
  ↓
Create Task
  ↓
MongoDB
  ↓
GET
  ↓
Display Tasks
```

Update:

```text
PUT
  ↓
Update Task
  ↓
MongoDB
```

Delete:

```text
DELETE
  ↓
Remove Task
  ↓
MongoDB
```

MongoDB Compass can be used to verify database documents directly.

---

## 🔄 Frontend Data Flow

TaskFlow no longer depends on Local Storage for task persistence.

The current data flow is:

```text
User
 ↓
Frontend
 ↓
Fetch API
 ↓
Express REST API
 ↓
Mongoose
 ↓
MongoDB
```

When the page loads, tasks are retrieved from MongoDB through the API.

---

## 📊 Dashboard

The dashboard dynamically calculates:

* Total tasks
* Completed tasks
* Pending tasks
* Completion rate

The dashboard updates whenever tasks are created, completed, or deleted.

---

## 📱 Responsive Design

TaskFlow is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

## 🎯 Learning Outcomes

This project provided practical experience with:

* Frontend development
* Responsive web design
* JavaScript DOM manipulation
* Event handling
* CRUD operations
* REST API development
* Node.js
* Express.js
* MongoDB
* Mongoose
* API integration
* Fetch API
* Postman API testing
* MongoDB Compass
* Git and GitHub
* Full-stack application architecture

---

## 🚀 Future Improvements

Possible future improvements include:

* User authentication
* JWT-based authentication
* User-specific tasks
* Edit task functionality
* Task sorting
* Dark mode
* Drag and drop task management
* Due-date notifications
* Task pagination
* Deployment
* Cloud MongoDB integration
* Production environment configuration

---


## ⭐ Support

If you find this project useful, consider giving the repository a star ⭐
