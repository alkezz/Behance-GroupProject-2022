from flask import Blueprint, jsonify, redirect, jsonify, request
from flask_login import login_required
from app.forms import CommentForm
from app.models import Comment, Project, db
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


#get all comments by project ID
@comments_routes.route("/<project_id>/comments")
def tweet_comments(project_id):
    comments = Comment.query.filter(Comment.project_id == project_id ).all()

    # if not comments:
    #     return "The Tweet you are looking for can not be found!", 404

    response = [comment.to_dict() for comment in comments]
    res = { "comments": response }
    return res


@comments_routes.route("/<project_id>/comments", methods=["POST"])
# @login_required
def add_comment(project_id):
    """
    Creates a new comment for logged in User
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            comment = form.data["comment"],
            user_id = form.data["user_id"],
            project_id = form.data["project_id"]
        )
        print(new_comment)
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict(user=True)

    # if form.errors:
    #     return form.errors

    # return "TEST"

#posting a comment on a project
# @comments_routes.route("/<project_id>/comments", methods=['POST'])
# # @login_required
# def add_comment(project_id):
#     comment_form = CommentForm()

#     comment = comment_form.data['comment']
#     user_id = comment_form.data['user_id']
#     project_id = comment_form.data['project_id']

#     comment_form['csrf_token'].data = request.cookies['csrf_token']
#     if comment_form.validate_on_submit() and current_user.id == user_id:
#         comment = Comment(
#             comment=comment,
#             user_id=user_id,
#             project_id=project_id
#         )

#         project = Project.query.get(project_id)

#         comment.project = project

#         db.session.add(comment)
#         db.session.commit()
#         return comment.to_dict()
#     else:
#         return "unauthorized user", 403

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
