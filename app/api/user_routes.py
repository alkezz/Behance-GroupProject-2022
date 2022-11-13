from flask import Blueprint, jsonify, request
from sqlalchemy import func
from flask_login import login_required
from app.models import User, Project, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    Url:
    "/api/users/"
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    Url:
    "/api/users/:id"
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/username/<string:un>')
@login_required
def username(un):
    """
    Query for a user by username and returns that user in a dictionary
    Url:
    "/api/users/username/:username"
    """
    user = User.query.filter(func.lower(User.username) == func.lower(un)).first()
    if user:
        return user.to_dict(projects=True)
    else:
        return "No User Found"

@user_routes.route('/<int:id>/projects/')
def user_project(id):
    """
    Querying for all projects created by user,
    returns both user dictionary and projects dictionary
    Url:
    "/api/users/:id/projects/"
    """
    user_projects = Project.query.filter(Project.user_id == id).all()
    if len(user_projects) < 1:
        return "User has no projects"
    else:
        return {'projects': [project.to_dict() for project in user_projects]}

@user_routes.route("/<int:id>/add-image/", methods=["GET", "POST"])
def edit_user(id):
    user = User.query.get(id)
    new_profile_picture = request.json["user_image"]
    new_banner_image = request.json["banner_image"]
    user.user_image = new_profile_picture
    user.banner_image = new_banner_image
    db.session.commit()
    return user.to_dict()
