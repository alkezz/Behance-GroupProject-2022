from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class ProjectForm(FlaskForm):
    name = StringField("Name of project", validators=[DataRequired()])
    description = StringField("Project description")
    user_id = IntegerField('user id', validators=[DataRequired()])
    images = StringField("Images")
