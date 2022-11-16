# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class ProjectImage(db.Model):
#   __tablename__ = "project_images"

#   if environment == "production":
#     __table_args__ = {'schema': SCHEMA}

#   id = db.Column(db.Integer, primary_key=True)
#   url = db.Column(db.String, nullable=False)
#   is_preview = db.Column(db.Boolean)
#   project_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))

#   # Relationships
#   project = db.relationship("Project", back_populates='images')

#   def to_dict(self):
#     return {
#       "id": self.id,
#       "url": self.url,
#       "is_preview": self.is_preview
#     }
