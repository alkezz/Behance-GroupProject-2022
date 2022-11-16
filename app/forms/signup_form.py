from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('This email address is already in use.')
        
def is_email(form, field):
    email = field.data
    
    if "@" not in email:
        raise ValidationError("Please provide a valid email address")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('This username is already in use.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Please provide a username"), username_exists])
    email = StringField('email', validators=[DataRequired("Please provide an email address"), user_exists, is_email])
    password = StringField('password', validators=[DataRequired("Please provide a password")])
    first_name = StringField('first_name', validators=[DataRequired("Please provide your first name")])
    last_name = StringField("last_name", validators=[DataRequired("Please provide your last name")])
