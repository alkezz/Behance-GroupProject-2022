from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class CommentForm(FlaskForm):
    comment = StringField("Comment", validators=[DataRequired()])
    user_id = IntegerField("User_id", validators=[DataRequired()])
    project_id = IntegerField("Project_id", validators=[DataRequired()])
