from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class PortfolioImageForm(FlaskForm):
    url = StringField("URL", validators=[DataRequired()])
    is_preview = BooleanField("Show Picture", validators=[DataRequired()])
    project_id = IntegerField("project id", validators=[DataRequired()])
