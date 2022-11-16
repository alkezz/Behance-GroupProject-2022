# from app.models.project_image import db, ProjectImage, environment, SCHEMA

<<<<<<< HEAD
def seed_images():
    image_1 = ProjectImage(
        url="https://i.imgur.com/f8Mo04S.jpg", is_preview=True, project_id=1)
    image_2 = ProjectImage(
      url="https://i.imgur.com/oK6ulak.jpg", is_preview=True, project_id=2)
    image_3 = ProjectImage(
      url="https://i.imgur.com/1YeIqqk.jpg", is_preview=True, project_id=3)
    image_4 = ProjectImage(
      url="https://i.imgur.com/ooHJOy1.jpg", is_preview=True, project_id=4)
    image_5 = ProjectImage(
      url="https://i.imgur.com/7XwgGw2.jpg", is_preview=True, project_id=5)
    image_6 = ProjectImage(
      url="https://thetechviral.com/wp-content/uploads/2017/08/behance.jpg", is_preview=True, project_id=6)
    image_7 = ProjectImage(
      url="https://www.essaysdeluxe.com/uploads/212/how_to_find_ideas_for_creative_book_reports.jpg", is_preview=True, project_id=7)
    image_8 = ProjectImage(
      url="https://www.topgear.com/sites/default/files/2022/10/1%20Porsche%20911%20GT3%20RS.jpg", is_preview=True, project_id=8)
    image_9 = ProjectImage(
      url="https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_hero-img_900x420.jpg.img.jpg", is_preview=True, project_id=9)
    image_10 = ProjectImage(
      url="https://wallpaperaccess.com/full/423702.jpg", is_preview=True, project_id=10)
    image_11 = ProjectImage(
      url="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8&w=1000&q=80", is_preview=True, project_id=11)
    image_12 = ProjectImage(
      url="https://thesmartcanine.com/wp-content/uploads/2021/02/things-to-know-before-getting-corgi.jpg", is_preview=True, project_id=12)
    image_13 = ProjectImage(
      url="https://www.dinneratthezoo.com/wp-content/uploads/2018/12/korean-fried-chicken-5.jpg", is_preview=True, project_id=13)
    image_14 = ProjectImage(
      url="https://i.pinimg.com/originals/93/dd/6c/93dd6c51a3cf9e60106ede7fed50c035.jpg", is_preview=True, project_id=14)
    image_15 = ProjectImage(
      url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5ifKifvNWbg2fwCBV3QtfyHLztF8mPQMfg&usqp=CAU", is_preview=True, project_id=15)
    image_16 = ProjectImage(
      url="https://i.imgur.com/QjWyuWM.jpeg", is_preview=False, project_id=3)


    db.session.add(image_1)
    db.session.add(image_2)
    db.session.add(image_3)
    db.session.add(image_4)
    db.session.add(image_5)
    db.session.add(image_6)
    db.session.add(image_7)
    db.session.add(image_8)
    db.session.add(image_9)
    db.session.add(image_10)
    db.session.add(image_11)
    db.session.add(image_12)
    db.session.add(image_13)
    db.session.add(image_14)
    db.session.add(image_15)
    db.session.add(image_16)
    db.session.commit()
=======
# def seed_images():
#     image_1 = ProjectImage(
#         url="https://i.imgur.com/f8Mo04S.jpg", is_preview=True, project_id=1)
#     image_2 = ProjectImage(
#       url="https://i.imgur.com/oK6ulak.jpg", is_preview=True, project_id=2)
#     image_3 = ProjectImage(
#       url="https://i.imgur.com/1YeIqqk.jpg", is_preview=True, project_id=3)
#     image_4 = ProjectImage(
#       url="https://i.imgur.com/ooHJOy1.jpg", is_preview=True, project_id=4)
#     image_5 = ProjectImage(
#       url="https://i.imgur.com/7XwgGw2.jpg", is_preview=True, project_id=5)
#     image_6 = ProjectImage(
#       url="https://thetechviral.com/wp-content/uploads/2017/08/behance.jpg", is_preview=True, project_id=6)
#     image_7 = ProjectImage(
#       url="https://www.essaysdeluxe.com/uploads/212/how_to_find_ideas_for_creative_book_reports.jpg", is_preview=True, project_id=7)
#     image_8 = ProjectImage(
#       url="https://www.topgear.com/sites/default/files/2022/10/1%20Porsche%20911%20GT3%20RS.jpg", is_preview=True, project_id=8)
#     image_9 = ProjectImage(
#       url="https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_hero-img_900x420.jpg.img.jpg", is_preview=True, project_id=9)
#     image_10 = ProjectImage(
#       url="https://wallpaperaccess.com/full/423702.jpg", is_preview=True, project_id=10)
#     image_11 = ProjectImage(
#       url="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8&w=1000&q=80", is_preview=True, project_id=11)
#     image_12 = ProjectImage(
#       url="https://thesmartcanine.com/wp-content/uploads/2021/02/things-to-know-before-getting-corgi.jpg", is_preview=True, project_id=12)
#     image_13 = ProjectImage(
#       url="https://www.dinneratthezoo.com/wp-content/uploads/2018/12/korean-fried-chicken-5.jpg", is_preview=True, project_id=13)
#     image_14 = ProjectImage(
#       url="https://i.pinimg.com/originals/93/dd/6c/93dd6c51a3cf9e60106ede7fed50c035.jpg", is_preview=True, project_id=14)
#     image_15 = ProjectImage(
#       url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5ifKifvNWbg2fwCBV3QtfyHLztF8mPQMfg&usqp=CAU", is_preview=True, project_id=15)


#     db.session.add(image_1)
#     db.session.add(image_2)
#     db.session.add(image_3)
#     db.session.add(image_4)
#     db.session.add(image_5)
#     db.session.add(image_6)
#     db.session.add(image_7)
#     db.session.add(image_8)
#     db.session.add(image_9)
#     db.session.add(image_10)
#     db.session.add(image_11)
#     db.session.add(image_12)
#     db.session.add(image_13)
#     db.session.add(image_14)
#     db.session.add(image_15)
#     db.session.commit()
>>>>>>> f5fcbe5b777e11411aafa07e1cb07dff8f305d7f

# def undo_images():
#     if environment == "production":
#         pass
#         # db.session.execute(f"TRUNCATE table {SCHEMA}.project_images RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM project_images")

#     db.session.commit()
