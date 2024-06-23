# Task Management Application

## Introduction

This is a simple task management application that allows users to create, update, and delete tasks. Tasks have a title, description, and a status (e.g., "To Do," "In Progress," "Done"). Users can view a list of tasks and filter them by status.

## Technologies Used

- Frontend: Vite, React, TypeScript, HTML, CSS
- Frontend-helper-Library: React-toaster, React-Feather Icon, axios, react-hook-form
- Backend: Node.js, Express.js
- Backend-helper-Library: dotenv, bcrypt, cookie-parser, cors, jsonwebtoken, mongoose
- Database: MongoDB
- Version Control: Git

## Prerequisites

Before running the application, ensure you have the following installed on your system:

- Node.js (v14 or higher)
- MongoDB
- Git

## Getting Started

Follow the steps below to set up and run the application on your local machine.

### Clone the Repository

```sh
git clone <repository_url>
cd <repository_folder>

```

### Run MongoDb server and create database, collection Before starting api server and web server

### Backend setup
```sh
cd api
npm install or yarn install
npm run dev or yarn run dev
```

### Create .env file in api folder and add this path

```js
PORT=5000
CORS_ORIGIN=*
MONGODB_URI="mongodb://localhost:27017"
```

### Frontend setup
```sh
cd web
npm install or yarn install
npm run dev or yarn run dev
```

# Task Management

## User Interface

- A form to create a new task with fields for title, description, and status.
- A list of tasks with the ability to update the status or delete a task.
- A filter or dropdown to filter tasks by status (e.g., "All," "To Do," "In Progress," "Done").

## User Experience

- Smooth and responsive user interactions.
- Form validation to ensure tasks cannot be created without a title.
- Modern front-end technologies used (React, Vite).
  
## Styling

- Application styled using CSS.
- Responsive design ensuring it works well on both desktop and mobile devices.

## API Development

- RESTful API to handle CRUD operations for tasks.
- Implemented using Node.js and Express.js.

## Data Storage

- MongoDB used to store task data.

## Validation

- Server-side validation ensuring tasks have a title and a valid status.

## Error Handling

- Proper error handling with appropriate error messages and status codes.

## Code Quality

- Clean, well-documented, and maintainable code.
- Coding best practices and conventions followed.

## Version Control

- Git used to track changes in the code.

## Testing

- Unit tests written for critical parts of the application, such as API endpoints and data validation.

## Security

- Basic security measures implemented to protect the application from common vulnerabilities.
