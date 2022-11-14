from app.models import db, User, Project, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name='Marnie', last_name='Mills', followers=[demo])
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name='Bobby', last_name='Bills')
    jimmy = User(
        username='jimjohn', email='jim@aa.io', password='password2', first_name='Jim', last_name='Johns')
    francis = User(
        username='franbacon', email='bacon@aa.io', password='password3', first_name='Francis', last_name='Bacon', followers=[demo, marnie, bobbie, jimmy])

    project_1 = Project(
        name='COOL Project', description='Such a cool project wow!', user_id=1, project_appreciations=[marnie, bobbie]
    )
    project_2 = Project(
        name='Ez Project', description='Not bad', user_id=2, project_appreciations=[demo]
    )
    project_3 = Project(
        name='Bad Project', description='wow this sucked', user_id=3, project_appreciations=[jimmy, francis, demo]
    )
    project_4 = Project(
        name='Long Project', description='This is long!', user_id=4, project_appreciations=[demo, bobbie]
    )
    project_5 = Project(
        name='Short Project', description='Are you even trying?', user_id=5, project_appreciations=[]
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jimmy)
    db.session.add(francis)
    db.session.add(project_1)
    db.session.add(project_2)
    db.session.add(project_3)
    db.session.add(project_4)
    db.session.add(project_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
#         db.session.execute(f'TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;')
        db.session.execute(f'TRUNCATE table {SCHEMA}."users" RESTART IDENTITY CASCADE;')
#         db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.appreciations RESTART IDENTITY CASCADE;")
#         db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM projects")
        db.session.execute("DELETE FROM appreciations")
        db.session.execute("DELETE FROM follows")

    db.session.commit()
