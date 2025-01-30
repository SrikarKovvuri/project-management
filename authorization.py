from flask import request, Blueprint, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User
from werkzeug.security import check_password_hash, generate_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return jsonify({"error": "Username and Password are required"}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 400

    token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and Password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username is already taken"}), 400

    hashed_password = generate_password_hash(password)
    user = User(username=username, password_hash=hashed_password)
    db.session.add(user)
    db.session.commit()

    token = create_access_token(identity=user.id)

    return jsonify({
        "message": "Signup successful",
        "token": token
    }), 201
