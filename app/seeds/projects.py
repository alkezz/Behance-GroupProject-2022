from app.models import db, Project, environment, SCHEMA

#Adds demo Projects
def seed_projects():
    project_1 = Project(
        name="COOL Project", description="Such a cool project wow!", user_id=1
    )
    project_2 = Project(
        name="Ez Project", description="Not bad", user_id=2
    )
    project_3 = Project(
        name="Bad Project", description="wow this sucked", user_id=3
    )
    project_4 = Project(
        name="Long Project", description="This is long!", user_id=4
    )
    project_5 = Project(
        name="Short Project", description="Are you even trying?", user_id=5, project_likes=[]
    )

    db.session.add(project_1)
    db.session.add(project_2)
    db.session.add(project_3)
    db.session.add(project_4)
    db.session.add(project_5)
    db.session.commit()

def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM projects")

    db.session.commit()
