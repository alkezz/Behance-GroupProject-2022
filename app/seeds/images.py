from app.models.project_image import db, ProjectImage, environment, SCHEMA

def seed_images():
    image_1 = ProjectImage(
        url="https://i.imgur.com/f8Mo04S.jpg", is_preview=True, project_id=1),
    image_2 = ProjectImage(
      url="https://i.imgur.com/oK6ulak.jpg", is_preview=True, project_id=2),
    image_3 = ProjectImage(
      url="https://i.imgur.com/1YeIqqk.jpg", is_preview=True, project_id=3),
    image_4 = ProjectImage(
      url="https://i.imgur.com/ooHJOy1.jpg", is_preview=True, project_id=4),
    image_5 = ProjectImage(
      url="https://i.imgur.com/7XwgGw2.jpg", is_preview=True, project_id=5)

    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.add(image_4)
    db.session.add(image_5)
    db.session.commit()

def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()
