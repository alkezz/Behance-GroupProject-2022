from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"))

    #Relationships
    user = db.relationship("User", back_populates="likes")
    project = db.relationship("Projects", back_populates="likes")

    def to_dict(self):
        return {
            "id": self.id,
            "User": self.user.to_dict(),
            "Project": self.project.to_dict()
        }
