from flask import Blueprint, jsonify, redirect, jsonify, request
from flask_login import login_required
from app.forms import CommentForm
from app.models import Comment, db
from flask_login import current_user

comments_routes = Blueprint('comments', __name__)


@comments_routes.route('/')
@login_required
def comments():
    """
    Query for all comments and returns them in a list of user dictionaries
    """
    all_coms = Comment.query.all()
    print('test')
    print('test')
    return {'comments': [com.to_dict() for com in all_coms]}

@comments_routes.route("/<int:id>/")
def one_comment(id):
    one_comment = Comment.query.get(id)
    return one_comment.to_dict(user=True)


@comments_routes.route("/new", methods=["POST"])
@login_required
def add_commemnt():
    """
    Creates a new comment for logged in User
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            comment = form.data["comment"],
            user_id = current_user.id,
            project_id = form.data["project_id"],
        )
        print(new_comment)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(user=True)

    if form.errors:
        return form.errors

    return "TEST"

@comments_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def del_commemnt(id):
    """
    Deletes a comment for logged in User
    """
    found_comment = Comment.query.filter_by(id=id).delete()
    db.session.commit()
    return {"message": "Comment successfully deleted"}
@comments_routes.route("/<int:id>/", methods=["GET", "PUT"])
def edit_comment(id):
    comment = Comment.query.get(id)
    new_comment = request.json["comment"]
    comment.comment = new_comment
    db.session.commit()
    return comment.to_dict(user=True)
