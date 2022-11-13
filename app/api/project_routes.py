from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project

# Created our blueprint for our projects route, connecting it to our __init__.py
project_routes = Blueprint("projects", __name__)

@project_routes.route("/")
def projects():
    """
    Query for all projects and returns them as a json dictionary
    Url:
    "/api/projects"
    """
    all_projects = Project.query.all()
    return {'Projects': [project.to_dict() for project in all_projects]}

@project_routes.route("/<int:id>/")
def project_by_id(id):
    """
    Query for project by its id returns it as a json dictionary
    Url:
    "/api/projects/:id/"
    """
    one_project = Project.query.get(id)
    if one_project:
        return one_project.to_dict(user=True, comments=True)
    else:
        return f"No such project with id of {id}"
