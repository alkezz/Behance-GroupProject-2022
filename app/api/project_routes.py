from flask import Blueprint, jsonify, request, url_for, render_template, redirect, flash
from flask_login import login_required, current_user
from app.models import Project, ProjectImage, Comment, db, User
from app.forms import CommentForm, ProjectForm, PortfolioImageForm
from app.models.project import appreciations
import boto3, botocore
from werkzeug.utils import secure_filename
import os
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
    return {'Projects': [project.to_dict(images=True) for project in all_projects]}

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

@project_routes.route('/<int:id>/appreciates/<int:id2>', methods=["POST"])
def appreciate_project(id, id2):
    curr_user = User.query.get(id)
    ref_project = Project.query.get(id2)

    ref_project.project_appreciations.append(curr_user)
    db.session.commit()
    user_appinfo = db.session.query(appreciations).filter_by(user_id = id).all()
    newObj = { "project_ids": []}
    for x,z in user_appinfo:
        if x == id:
            newObj["project_ids"].append(z)
    return newObj

@project_routes.route('/<int:id>/appreciates/<int:id2>', methods=["DELETE"])
def delete_appreciations(id, id2):
    curr_user = User.query.get(id)
    ref_project = Project.query.get(id2)

    ref_project.project_appreciations.remove(curr_user)
    db.session.commit()
    user_appinfo = db.session.query(appreciations).filter_by(user_id = id).all()
    newObj = { "project_ids": []}
    for x,z in user_appinfo:
        if x == id:
            newObj["project_ids"].append(z)
    return newObj


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


@project_routes.route("/<int:id>/", methods=["DELETE"])
@login_required
def delete_project(id):
    project = Project.query.get(id)
    if project:
        if project.user_id == current_user.id:
            db.session.delete(project)
            db.session.commit()
            return {
                "message": "Project Successfully Deleted"
            }
        else:
            return {
                "message": "Can not delete project not owned by you"
            }
    else:
        return {
            "message": f"No such project with id of {id}"
        }

@project_routes.route("/<int:id>/", methods=["PUT"])
@login_required
def edit_project(id):
    project = Project.query.get(id)
    new_name = request.json["name"]
    new_description = request.json["description"]
    if project:
        if project.user_id == current_user.id:
            if new_name:
                project.name = new_name
            else:
                project.name = project.name
            if new_description:
                project.description = new_description
            else:
                project.description = project.description
            db.session.commit()
            return project.to_dict()
        else:
            return {
                "message": "Can not edit project not owned by you"
            }
    else:
        return {
            "message": f"No such project with id of {id}"
        }

@project_routes.route("/", methods=["POST"])
@login_required
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

@project_routes.route("/project-images")
@login_required
def add_project_image_index():
    """New Images for project form"""
    return render_template("upload_image.html")
    # form = PortfolioImageForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #         new_images = ProjectImage(
    #             url = form.data["url"],
    #             is_preview = form.data["is_preview"],
    #             project_id = form.data["project_id"]
    #         )
    #         db.session.add(new_images)
    #         db.session.commit()
    #         return new_images.to_dict()
    # else:
    #     return form.errors

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("AWS_ACCESS_KEY"),
   aws_secret_access_key=os.environ.get("AWS_SECRET_ACCESS_KEY")
)
BUCKET_NAME=os.environ.get("AWS_BUCKET_NAME")

@project_routes.route("/<int:id>/project-images/upload", methods=["POST"])
def upload_image(id):
    form = PortfolioImageForm()
    project = Project.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if request.method == 'POST':
        for i in request.files.getlist('file'):
                filename = secure_filename(i.filename)
                print(i, 'test')
                s3.upload_fileobj(
                    i,
                    BUCKET_NAME,
                    filename,
                    ExtraArgs = {'ACL':"public-read", 'ContentType': i.content_type}
                )
                new_images = ProjectImage(
                    url = f"https://ali-practice-aws-bucket.s3.amazonaws.com/{filename}",
                    is_preview = form.data["is_preview"],
                    project_id = form.data["project_id"]
                )
                db.session.add(new_images)
                db.session.commit()
        return project.to_dict(images=True)

@project_routes.route("/project-images/<int:id>/", methods=["GET","DELETE"])
@login_required
def delete_project_image(id):
    project_image = ProjectImage.query.get(id)
    project = Project.query.get(project_image.project_id)
    if project_image:
        if project.user_id == current_user.id:
            db.session.delete(project_image)
            db.session.commit()
            return project.to_dict(images=True)
        else:
            return {
                "message": "Can not delete images from project not owned by you"
            }
    else:
        return {
            "message": f"Project with id of {id} was not found"
        }

@project_routes.route("/project-images/<int:id>/", methods=["GET", "PUT"])
@login_required
def edit_project_image(id):
    project_image = ProjectImage.query.get(id)
    project = Project.query.get(project_image.project_id)
    if project_image:
        if project.user_id == current_user.id:
            new_url = request.json["url"]
            # new_is_preview = request.json["is_preview"]
            project_image.url = new_url
            db.session.commit()
            return project.to_dict(images=True)
        else:
            return {
                "message": "Can not edit images from project not owned by you"
            }
    else:
        return {
            "message": f"Project with id of {id} was not found"
        }
