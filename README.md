# Exercise Tracker (MERN + Auth0)

A fully deployed **MERN Stack Exercise Tracker** featuring secure authentication with **Auth0**, a responsive React UI, a REST API backend, and cloud deployment on **Vercel** (frontend) and **Render** (backend).  

This project demonstrates full-stack development skills including authentication, API integration, form validation, CRUD operations, routing, and production deployment.  

---

## Live Demo  
- **Frontend (Vercel):** https://mern-exercise-tracker-topaz.vercel.app/  
- **Backend API (Render):** https://mern-exercise-tracker-gi3a.onrender.com/

---

## Tech Stack

### **Frontend**  
- React (Function Components)  
- Vite  
- React Router  
- Auth0 React SDK  
- Custom CSS  

### **Backend**  
- Node.js  
- Express.js  
- MongoDB Atlas (via mongoose)  
- dotenv & cors  

### **DevOps / Deployment**  
- Vercel — for frontend deployment  
- Render — for backend service  
- Auth0 — for authentication & protected routes  
- GitHub — version control / CI  

---

## Authentication (Auth0)

This application uses **Auth0 Universal Login** to protect the create/edit routes.  

- Public: Home page (Please log in to view and manage your exercises.)  
- Protected:  
  - `/create` — Create Exercise page  
  - `/edit/:id` — Edit Exercise page  

If a user is not authenticated, they are redirected to Auth0 login.  

---

## Features

- **Full CRUD**: create, read, update, delete exercises.  
- **Protected Routes**: only logged-in users can create or edit exercises.  
- **REST API**: backend handles requests with proper validation.  
- **MongoDB Atlas**: production database in the cloud.  
- **Responsive UI**: React + CSS for a clean, mobile-friendly UI.  
- **Deployment-ready**: frontend on Vercel, backend on Render, Auth0 integration.  
