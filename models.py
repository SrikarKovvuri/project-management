from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)

    # Relationships
    projects = db.relationship('Project', back_populates='author', cascade="all, delete-orphan")
    tasks = db.relationship('Task', back_populates='author', cascade="all, delete-orphan")


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    due_date = db.Column(db.String(10), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # ForeignKey to User

    # Relationships
    author = db.relationship('User', back_populates='projects')
    tasks = db.relationship('Task', back_populates='project', cascade="all, delete-orphan")


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(5000), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)  # ForeignKey to Project
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # ForeignKey to User

    # Relationships
    project = db.relationship('Project', back_populates='tasks')
    author = db.relationship('User', back_populates='tasks')
