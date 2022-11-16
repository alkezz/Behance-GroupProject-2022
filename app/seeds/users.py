from app.models import db, User, Project, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Mills", followers=[demo])
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Bobby", last_name="Bills")
    jimmy = User(
        username='jimjohn', email='jim@aa.io', password='password2', first_name="Jim", last_name="Johns")
    francis = User(
        username='franbacon', email='bacon@aa.io', password='password3', first_name='Francis', last_name="Bacon", followers=[demo, marnie, bobbie, jimmy])
    candice = User(
        username='candice', email='candice@aa.io', password='password6', first_name="Candice", last_name="Ho", followers=[demo, marnie, bobbie, jimmy, francis])
    linus = User(
        username='linustt', email='linus@aa.io', password='password7', first_name="Linus", last_name="Tech", followers=[jimmy, francis, bobbie])
    rel = User(
        username='rel', email='rel@aa.io', password='password8', first_name="Rel", last_name="Chang", followers=[jimmy, francis, bobbie, demo])
    jay = User(
        username='jay2cool', email='jay2cool@aa.io', password='password9', first_name="Jay", last_name="Sheesh")
    tracy = User(
        username='tracy', email='tracy@aa.io', password='password10', first_name="Tracy", last_name="Tran", followers=[marnie, francis, candice, rel])
    felicia = User(
        username='felicia', email='felicia@aa.io', password='password11', first_name="Felicia", last_name="Fiddle", followers=[francis, bobbie, demo, candice, rel])
    edward = User(
        username='edward', email='edward@aa.io', password='password12', first_name="Edward", last_name="Estatic", followers=[demo, rel, jay, tracy, felicia])
    sean = User(
        username='sean', email='sean@aa.io', password='password13', first_name="Sean", last_name="Slanders", followers=[demo, rel, jay, tracy, felicia])
    talia = User(
        username='talia', email='talia@aa.io', password='password14', first_name="Talia", last_name="Tanker", followers=[demo, rel, jay, tracy, felicia])
    katie = User(
        username='katie', email='katie@aa.io', password='password15', first_name="Katie", last_name="Keshi", followers=[demo, rel, jay, tracy, felicia, sean, talia, edward])

    project_1 = Project(
        name="COOL Project", description="Such a cool project wow!", user_id=1, project_appreciations=[marnie, bobbie], images="['https://i.imgur.com/f8Mo04S.jpg']"
    )
    project_2 = Project(
        name="Ez Project", description="Not bad", user_id=2, project_appreciations=[demo], images="[]"
    )
    project_3 = Project(
        name="Bad Project", description="wow this sucked", user_id=3, project_appreciations=[jimmy, francis, demo], images="[]"
    )
    project_4 = Project(
        name="Long Project", description="This is long!", user_id=4, project_appreciations=[demo, bobbie], images="[]"
    )
    project_5 = Project(
        name="Short Project", description="Are you even trying?", user_id=5, project_appreciations=[], images="[]"
    )
    project_6 = Project(
        name="ArtsyAF", description="I'm so artistic lewl", user_id=6, project_appreciations=[], images="[]"
    )
    project_7 = Project(
        name="Books Aesthetics", description="Great read", user_id=7, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_8 = Project(
        name="Porsche", description="992 911 gt3rs ", user_id=8, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_9 = Project(
        name="Falls Fall", description="Fall weather is up. Just vibe.", user_id=9, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_10 = Project(
        name="Utopia", description="chill and relax", user_id=10, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_11 = Project(
        name="Tokyo", description="Teriyaki Boyz", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_12 = Project(
        name="Corgis", description="doggos!!!", user_id=12, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_13 = Project(
        name="Food Heaven", description="I love fried chicken", user_id=13, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_14 = Project(
        name="Demon Slayer", description="BEST ANIME EVER", user_id=14, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )
    project_15 = Project(
        name="Scifi", description="beep beep", user_id=15, project_appreciations=[marnie, bobbie, demo, francis], images="[]"
    )


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(jimmy)
    db.session.add(francis)
    db.session.add(candice)
    db.session.add(linus)
    db.session.add(rel)
    db.session.add(jay)
    db.session.add(tracy)
    db.session.add(felicia)
    db.session.add(edward)
    db.session.add(sean)
    db.session.add(talia)
    db.session.add(katie)

    db.session.add(project_1)
    db.session.add(project_2)
    db.session.add(project_3)
    db.session.add(project_4)
    db.session.add(project_5)
    db.session.add(project_6)
    db.session.add(project_7)
    db.session.add(project_8)
    db.session.add(project_9)
    db.session.add(project_10)
    db.session.add(project_11)
    db.session.add(project_12)
    db.session.add(project_13)
    db.session.add(project_14)
    db.session.add(project_15)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.appreciations RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM projects")
        db.session.execute("DELETE FROM appreciations")
        db.session.execute("DELETE FROM follows")

    db.session.commit()
