from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
  __tablename__ = "comments"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
  project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

  # Relationships
  user = db.relationship("User", back_populates="comments")
  project = db.relationship("Project", back_populates="comments")

  def to_dict(self):
    return {
      "id": self.id,
      "comment": self.comment,
      "User": self.user.to_dict(),
      "Project": self.project.to_dict()
    }
