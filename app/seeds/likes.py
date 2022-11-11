from app.models import db, Projects, Appreciations

def project_likes():
    project_1 = Appreciations (
        likes = 2512
    )
    project_2 = Appreciations (
        likes = 352
    )
    project_3 = Appreciations (
        likes  = 5000
    )
    project_4 = Appreciations (
        likes  = 52200
    )
    project_5 = Appreciations (
        likes  = 123
    )

    db.session.add(project_1)
    db.session.add(project_2)
    db.session.add(project_3)
    db.session.add(project_4)
    db.session.add(project_5)
    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
