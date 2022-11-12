from app.models import db, Comment, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_rest():
    c1 = Comment(
        comment="Rad project",
        user_id=1,
        project_id=3
    )
    c2 = Comment(
        comment="disliked and unfollowed",
        user_id=2,
        project_id=4
        )
    c3 = Comment(
        comment="Not bad",
        user_id=3,
        project_id=1
    )
    c4 = Comment(
        comment="Great job!",
        user_id=4,
        project_id=5
    )
    c5 = Comment(
        comment="cool",
        user_id=5,
        project_id=2
    )


    db.session.add(c1)
    db.session.add(c2)
    db.session.add(c3)
    db.session.add(c4)
    db.session.add(c5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_rest():
    if environment == "production":
        pass
        # db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
