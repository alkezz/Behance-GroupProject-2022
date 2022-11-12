from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Comment

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