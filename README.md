# Project Management App

## Description
This is a full-stack project management application that allows users to create projects, add tasks, and manage them efficiently. The backend is built with **Flask** and uses **PostgreSQL** as the database, while the frontend is built with **React** and deployed on **Vercel**. The backend is deployed on **Render**.

---

## Tech Stack
### **Frontend:**
- React
- Axios
- React Router DOM
- CSS
- Vercel (Deployment)

### **Backend:**
- Flask
- Flask SQLAlchemy
- Flask JWT Extended (Authentication)
- Flask CORS
- Flask Migrate
- PostgreSQL (Render-hosted Database)
- Gunicorn (Production Server)
- Render (Deployment)

---

## Project Structure
```plaintext
project-management/
├── migrations/           # Database migrations
├── public/               # Static files for frontend
├── src/                  # Frontend React source files
│   ├── components/       # React Components
│   ├── App.js            # Main App Component
│   ├── index.js          # Entry Point
├── venv/                 # Python Virtual Environment
├── .env                  # Environment Variables
├── .gitignore            # Git Ignore File
├── Procfile              # Deployment Config (Render)
├── app.py                # Flask Application Entry Point
├── models.py             # Database Models
├── operations.py         # Business Logic for Tasks & Projects
├── authorization.py      # User Authentication
├── requirements.txt      # Python Dependencies
├── package.json          # Frontend Dependencies
├── README.md             # This File

# Deployment Link
https://project-management-six-jet.vercel.app/


This is formatted properly as a Markdown file. Let me know if you need any further adjustments! 🚀
