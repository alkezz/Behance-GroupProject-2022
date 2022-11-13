from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project, ProjectImage, Comment

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

@project_routes.route("/<int:id>/images")
def project_imgs_by_id(id):
    """
    Query for project by its id returns it as a json dictionary
    Url:
    "/api/projects/:id/"
    """

    one_project = ProjectImage.query.filter_by(project_id=id).all()
    if one_project:
        res = { "images": [img.to_dict() for img in one_project]}
        print(res, "test")
        return res
    else:
        return f"No such project with id of {id}"

@project_routes.route("/<int:id>/comments")
def project_comments_by_id(id):
    """
    Query for project by its id returns all its comments as a json dictionary
    Url:
    "/api/projects/:id/comments"
    """

    one_project = Comment.query.filter_by(project_id=id).all()
    if one_project:
        res = { "comments": [img.to_dict(user=True) for img in one_project]}
        print(res, "comments")
        return res
    else:
        return f"No such project with id of {id}"
