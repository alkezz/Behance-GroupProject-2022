from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
  __tablename__ = "comments"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  comment = db.Column(db.String, nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))

  # Relationships
  user = db.relationship("User", back_populates="comments")
  project = db.relationship("Project", back_populates="comments")

  def to_dict(self, user=False, project=False):
    comment =  {
      "id": self.id,
      "comment": self.comment,
      "user": self.user.to_dict(),
    }

    if user:
      comment["User"] = self.user.to_dict()
    if project:
      comment["Project"] = self.project.to_dict()

    return comment
