from .db import db, environment, SCHEMA, add_prefix_for_prod

likes = db.Table(
    "likes",
    db.Column("user.id", db.Integer, db.ForeignKey("users.id")),
    db.Column("project_id", db.Integer, db.ForeignKey("projects.id"))
)

class Project(db.Model):
  __tablename__ = "projects"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  description = db.Column(db.String)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

  # Relationships
  user = db.relationship("User", back_populates="projects")
  images = db.relationship("ProjectImage", back_populates="project")
  comments = db.relationship("Comment", back_populates="project")
  likes = db.relationship(
        "Project",
        secondar=likes,
        primaryjoin=(likes.c.project_id == id),
        secondaryjoin=(likes.c.user_id == "users.id"),
        backref=db.backref("likes", lazy="dynamic"),
        lazy="dynamic"
    )

  def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'User': self.user.to_dict()
        }
