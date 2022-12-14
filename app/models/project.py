from .db import db, environment, SCHEMA, add_prefix_for_prod

appreciations = db.Table(
    "appreciations",
    db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("project_id", db.Integer, db.ForeignKey(add_prefix_for_prod("projects.id")))
)

if environment == 'production':
    appreciations.schema = SCHEMA

class Project(db.Model):
  __tablename__ = "projects"

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(5000), nullable=False)
  description = db.Column(db.String)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
  images = db.Column(db.Text)
  # Relationships
  user = db.relationship("User", back_populates="projects")
#   images = db.relationship("ProjectImage", back_populates="project")
  comments = db.relationship("Comment", back_populates="project")
  project_appreciations = db.relationship(
        "User",
        secondary=appreciations,
        back_populates="project_likes",
        # cascade="all, delete"
    )


  def images_to_dict(self):
    return {
        "images": self.images
    }
  def to_dict(self, user=False, comments=False, images=False):
        proj =  {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'appreciations': len(self.project_appreciations),
            # 'prev_image': self.images[0].to_dict()
        }
        print(self.project_appreciations)
        print(self.comments)
        if user:
            proj['User'] = self.user.to_dict()

        if comments:
            proj['comments'] = [comment.to_dict(user=True,project=False) for comment in self.comments]
        if images:
            proj["images"] = self.images
        return proj
