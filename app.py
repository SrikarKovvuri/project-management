from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import os
from dotenv import load_dotenv
from flask_cors import CORS
from operations import operations
from authorization import auth_bp


load_dotenv()  

app = Flask(__name__)

CORS(app)
database_uri = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("SECRET_KEY")

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/auth")  # Routes now start with `/auth`
app.register_blueprint(operations, url_prefix="/projects")

if __name__ == '__main__':
    app.run(debug=True)


