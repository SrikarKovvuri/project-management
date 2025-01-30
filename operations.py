from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Project, Task

operations = Blueprint("operations", __name__)

# Get all projects
@operations.route('/projects', methods=['GET'])
@jwt_required()
def get_all_projects():
    projects = Project.query.all()
    result = [{
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "due_date": project.due_date
    } for project in projects]

    return jsonify(result), 200

# Get a single project by ID
@operations.route('/projects/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    project = Project.query.get(project_id)
    
    if not project:
        return jsonify({"error": "Project not found"}), 404

    return jsonify({
        "id": project.id,
        "title": project.title,
        "description": project.description,
        "due_date": project.due_date
    }), 200

# Add a new project
@operations.route('/projects', methods=['POST'])
@jwt_required()
def add_project():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    due_date = data.get("due_date")

    user_id = get_jwt_identity()  # Get the logged-in user's ID

    if not title or not description:
        return jsonify({"error": "Title and description are required"}), 400

    new_project = Project(title=title, description=description, due_date=due_date, user_id=user_id)
    db.session.add(new_project)
    db.session.commit()

    return jsonify({"message": "Project created successfully", "id": new_project.id}), 201

# Get all tasks under a specific project
@operations.route('/projects/<int:project_id>/tasks', methods=['GET'])
@jwt_required()
def get_all_tasks_under_project(project_id):
    tasks = Task.query.filter_by(project_id=project_id).all()
    
    if not tasks:
        return jsonify({"message": "No tasks found for this project"}), 200

    result = [{"id": task.id, "text": task.text} for task in tasks]
    
    return jsonify(result), 200

# Add a task to a project
@operations.route('/projects/<int:project_id>/tasks', methods=['POST'])
@jwt_required()
def add_task(project_id):
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Task text is required"}), 400

    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    new_task = Task(text=text, project_id=project_id)
    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task added successfully", "id": new_task.id}), 201

# Update a project
@operations.route('/projects/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    data = request.json
    project = Project.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    project.title = data.get("title", project.title)
    project.description = data.get("description", project.description)
    project.due_date = data.get("due_date", project.due_date)

    db.session.commit()

    return jsonify({"message": "Project updated successfully"}), 200

# Update a task
@operations.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    data = request.json
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    task.text = data.get("text", task.text)

    db.session.commit()

    return jsonify({"message": "Task updated successfully"}), 200

# Delete a project
@operations.route('/projects/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        return jsonify({"error": "Project not found"}), 404

    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Project deleted successfully"}), 200

# Delete a task
@operations.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"error": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted successfully"}), 200
