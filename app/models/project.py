from .db import db, environment, SCHEMA, add_prefix_for_prod

appreciations = db.Table(
    "appreciations",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
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
  project_appreciations = db.relationship(
        "User",
        secondary=appreciations,
        back_populates="project_likes",
        cascade="all, delete"
    )

  def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'User': self.user.to_dict()
        }
