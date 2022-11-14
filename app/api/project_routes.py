from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Project, ProjectImage, Comment, db
from app.forms import CommentForm, ProjectForm, PortfolioImageForm
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

@project_routes.route("/<int:id>/")
def project_by_id(id):
    """
    Query for project by its id returns it as a json dictionary
    Url:
    "/api/projects/:id/"
    """
    one_project = Project.query.get(id)
    if one_project:
        return one_project.to_dict(user=True, comments=True, images=True)
    else:
        return f"No such project with id of {id}"


@project_routes.route("/", methods=["POST"])
def add_project():
    """
    New user project creation
    """
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_project = Project(
            name = form.data["name"],
            description = form.data["description"],
            user_id = form.data["user_id"],
        )
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    else:
        return form.errors

@project_routes.route("/project-images", methods=["POST"])
def add_project_images():
    """New Images for project form"""
    form = PortfolioImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
            new_images = ProjectImage(
                url = form.data["url"],
                is_preview = form.data["is_preview"],
                project_id = form.data["project_id"]
            )
            db.session.add(new_images)
            db.session.commit()
            return new_images.to_dict()
    else:
        return form.errors
