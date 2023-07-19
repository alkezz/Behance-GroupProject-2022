from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Length

class UserImageForm(FlaskForm):
    user_image = StringField('user_image',  validators=[Length(max=250,message='Image URL is too long')])
