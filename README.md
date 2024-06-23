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
