# from app.models import db, appreciations, environment, SCHEMA

# def project_likes():
#     project_1 = appreciations (
#         user_id=1,project_id=2
#     )
#     project_2 = appreciations (
#         user_id=2,project_id=1
#     )
#     project_3 = appreciations (
#         user_id=3,project_id=4
#     )
#     project_4 = appreciations (
#         user_id=4,project_id=3
#     )
#     project_5 = appreciations (
#         user_id=5,project_id=5
#     )

#     db.session.add(project_1)
#     db.session.add(project_2)
#     db.session.add(project_3)
#     db.session.add(project_4)
#     db.session.add(project_5)
#     db.session.commit()

# def undo_likes():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.appreciations RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM appreciations")
#     db.session.commit()
