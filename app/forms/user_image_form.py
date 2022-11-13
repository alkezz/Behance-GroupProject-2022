from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, URL

class UserImageForm(FlaskForm):
    user_image = StringField("Profile Picture", validators=[URL(message="A URL is required")])
    banner_image = StringField("Banner Image", validators=[URL(message="A URL is required")])
