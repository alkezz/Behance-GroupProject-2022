from flask import Blueprint, jsonify, request
from sqlalchemy import func
from flask_login import login_required, current_user
from app.models import User, Project, db
from app.models.user import follows
from app.models.project import appreciations

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


@user_routes.route("/test/<int:id>")
def test(id):
   users = User.query.filter(User.followers.any(id=id)).all()
   return {"followers":[fol.to_dict() for fol in users]}


@user_routes.route('/<int:id>/follow_/<int:id2>', methods=["DELETE"])
@login_required
def follow(id, id2):
    """
    Route to delete a follower from the second id provided
    Syntax: user id 1 will unfollow user id 2
    """
    curr_user = User.query.get(id)
    ref_user = User.query.get(id2)

    curr_user.followers.remove(ref_user)
    db.session.commit()
    users = User.query.filter(User.followers.any(id=id2)).all()
    return {"followers":[fol.to_dict() for fol in users]}


@user_routes.route('/<int:id>/follow_/<int:id2>', methods=["POST"])
@login_required
def unfollow(id, id2):
# curr_user will follow the ref_user using this route
    """
    Route to append followers to the user with the second id in url
    Syntax: user id 1 will follow user id 2
    """
    curr_user = User.query.get(id)
    ref_user = User.query.get(id2)

    curr_user.followers.append(ref_user)
    db.session.commit()
    users = User.query.filter(User.followers.any(id=id2)).all()
    return {"followers":[fol.to_dict() for fol in users]}


@user_routes.route('/<int:id>/appreciations')
def user_app(id):
    """
    Querying for all appreciations by logged in user,

    """
    user_appinfo = db.session.query(appreciations).filter_by(user_id = id).all()
    newObj = { "project_ids": []}
    for x,z in user_appinfo:
        if x == id:
            newObj["project_ids"].append(z)
    return newObj

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

@user_routes.route("/<int:id>/add-image/", methods=["GET", "PUT"])
@login_required
def edit_user(id):
    user = User.query.get(id)
    if user:
        if current_user.id == id:
            new_profile_picture = request.json["user_image"]
            new_banner_image = request.json["banner_image"]
            user.user_image = new_profile_picture
            user.banner_image = new_banner_image
            db.session.commit()
            return user.to_dict()
        else:
            return "You can not edit a different user's profile!"
    else:
        return "User not found"

@user_routes.route('/<int:id>/follows')
def user_follow(id):
    """
    Querying for all follows by logged in user,

    """
    # user_followinfo = db.session.query(follows).filter(follows.follower_id == 1).all()
    user_followinfo = db.session.query(follows).filter_by(follower_id = id).all()
    user_followedinfo = db.session.query(follows).filter_by(followed_id = id).all()
    newObj = { "current_followed_user_ids": [], "followed_by_user_ids": []}
    for x,z in user_followinfo:
        if x == id:
            newObj["current_followed_user_ids"].append(z)

    for x,z in user_followedinfo:
        if z == id:
            newObj["followed_by_user_ids"].append(x)
    return newObj

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
def username(un):
    """
    Query for a user by username and returns that user in a dictionary
    Url:
    "/api/users/username/:username"
    """
    user = User.query.filter(func.lower(User.username) == func.lower(un)).first()
    if user:
        user_info = user.to_dict(projects=True)
        for each in user_info["projects"]:
            each["images" ] = each["images"].strip("'] ['").split(', ')
        return user_info
    else:
        return {"message":"No User Found"}
