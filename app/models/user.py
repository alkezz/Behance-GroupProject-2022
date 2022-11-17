from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


follows = db.Table(
    "follows",
    db.Model.metadata,
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    user_image = db.Column(db.String)
    banner_image = db.Column(db.String)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    #relationships
    projects = db.relationship("Project", back_populates="user")
    comments = db.relationship("Comment", back_populates="user")
    project_likes = db.relationship(
        'Project',
        secondary= "appreciations",
        back_populates="project_appreciations",
        cascade= "all, delete"
    )
    followers = db.relationship(
        'User', 
        secondary="follows",
        back_populates="follower_id",
        cascade="all, delete"
    )
    followed = db.relationship(
        'User', 
        secondary="follows",
        back_populates="followed_id",
        cascade="all, delete"
    )
    
    def to_dict(self, projects=False):
        userInfo =  {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'user_image': self.user_image,
            'banner_image': self.banner_image
        }
        if projects:
            userInfo['projects'] = [proj.to_dict(images=True) for proj in self.projects]
        return userInfo
