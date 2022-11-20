from app.models import db, User, Project, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name='Demo', last_name='User')
    marnie = User(
        username='LagerdahlPhoto', email='marnie@aa.io', password='password', first_name="Lagerdahl", last_name="Mills", followers=[demo])
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
        name="COOL Project", description="Such a cool project wow!", user_id=1, project_appreciations=[marnie, bobbie], images="[https://i.imgur.com/f8Mo04S.jpg, https://i.imgur.com/oWzdUct.jpeg,https://i.imgur.com/5tNOtWi.jpeg, https://i.imgur.com/sg1fAT9.jpeg]"
    )
    project_2 = Project(
        name="Ez Project", description="Not bad", user_id=2, project_appreciations=[demo], images="[https://i.imgur.com/oK6ulak.jpg, https://i.imgur.com/tNg4BZ1.jpeg, https://i.imgur.com/Qd6rwIx.jpeg, https://i.imgur.com/auGxvYj.jpeg, https://i.imgur.com/dWu4UAQ.jpeg]"
    )
    project_3 = Project(
        name="Bad Project", description="wow this sucked", user_id=1, project_appreciations=[jimmy, francis, demo], images="[https://i.imgur.com/1YeIqqk.jpg, https://i.imgur.com/QjWyuWM.jpeg, https://i.imgur.com/ERcTRbm.jpeg, https://images.unsplash.com/photo-1617296539691-67feaadf389e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2476&q=80, https://images.unsplash.com/photo-1604090818520-b8d788d2f58e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2487&q=80, https://images.unsplash.com/photo-1617296538902-887900d9b592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80]"
    )
    project_4 = Project(
        name="Long Project", description="This is long!", user_id=4, project_appreciations=[demo, bobbie], images="[https://i.imgur.com/ooHJOy1.jpg, https://i.imgur.com/x2sAF4U.jpeg, https://i.imgur.com/uacjmEn.jpeg, https://i.imgur.com/Vvv6Har.jpeg, https://i.imgur.com/w8cbf81.jpeg, https://i.imgur.com/LR4dWgW.jpeg, https://i.imgur.com/yaB61Uy.jpe, https://i.imgur.com/IMs4CN8.jpeg, https://i.imgur.com/7udSCU1.jpeg, https://i.imgur.com/4ybM7iA.jpeg, https://i.imgur.com/CtSuFOb.jpe, https://i.imgur.com/ISMR4gP.jpeg, https://i.imgur.com/0sbPU5C.jpeg, https://i.imgur.com/458wGu4.jpeg, https://i.imgur.com/1bXqj9B.jpeg, https://i.imgur.com/oinORgf.jpeg, https://i.imgur.com/2HghCmd.jpeg]"
    )
    project_5 = Project(
        name="Short Project", description="Are you even trying?", user_id=5, project_appreciations=[katie, sean, talia], images="[https://i.imgur.com/7XwgGw2.jpg, https://i.imgur.com/4gquMOx.jpeg, https://i.imgur.com/Qw92PkM.jpeg, https://i.imgur.com/rZzZHyG.jpeg, https://i.imgur.com/6Ky97zg.jpeg, https://i.imgur.com/LHQIZPv.jpeg, https://i.imgur.com/xmUvLqO.jpeg, https://i.imgur.com/106qncd.jpeg, https://i.imgur.com/dGLPRNP.jpeg, https://i.imgur.com/QAu3AiR.jpeg, https://i.imgur.com/Rbk4SSw.jpeg, https://i.imgur.com/fdYBfZT.jpeg, https://i.imgur.com/CvA1hnN.jpeg, https://i.imgur.com/BcjkUYK.jpeg]"
    )
    fruits = Project(
        name="Fruits Project", description="I like fruits?", user_id=5, project_appreciations=[demo, marnie, bobbie, jimmy, francis, candice, linus, rel, jay, tracy, felicia, edward, sean, talia, katie], images="[https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1519996529931-28324d5a630e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1546548970-71785318a17b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZydWl0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60, https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=696&q=80, https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80]"
    )
    cars = Project(
        name="Vroom", description="I like carrrs", user_id=2, project_appreciations=[demo, marnie, bobbie, jimmy, francis, candice, linus, rel, jay, tracy, felicia, edward, sean, talia, katie], images="[https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1883&q=80, https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=904&q=80, https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80, https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80]"
    )
    forests = Project(
        name="Forest Project", description="Forest for the trees", user_id=3, project_appreciations=[demo, marnie], images="[https://images.unsplash.com/photo-1599940824399-b87987ceb72a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80, https://images.unsplash.com/photo-1462143338528-eca9936a4d09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1503785640985-f62e3aeee448?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80]"
    )
    roses = Project(
        name="Roses", description="Roses", user_id=3, project_appreciations=[marnie, bobbie], images="[https://images.unsplash.com/photo-1518709779341-56cf4535e94b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1530906622963-8a60586a49c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80]"
    )
    roses2 = Project(
        name="White Roses", description="White Roses", user_id=3, project_appreciations=[bobbie, jimmy, francis, candice], images="[https://images.unsplash.com/photo-1592125661285-79820f2fdf7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1589458456444-f7158a7e8a4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80]"
    )
    roses3 = Project(
        name="Flower Fields", description="Look at these fields", user_id=3, project_appreciations=[francis, candice, linus, rel], images="[https://images.unsplash.com/photo-1543862475-eb136770ae9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80, https://images.unsplash.com/photo-1487202212798-4f11d5c8f57d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80]"
    )
    roses4 = Project(
        name="Daises Project", description="Daisies", user_id=3, project_appreciations=[marnie, bobbie, demo, francis], images="[https://images.unsplash.com/photo-1600264195762-c10ff160b264?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=848&q=80, https://images.unsplash.com/photo-1566146991394-b09a95e80d17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80]"
    )
    lilly = Project(
        name="Lillies Project", description="Here are some lillies", user_id=3, project_appreciations=[marnie, bobbie, jimmy, francis], images="[https://images.unsplash.com/photo-1552809425-34e60194d8bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80]"
    )
    orchids = Project(
        name="Orchids Project", description="Some orchids", user_id=3, project_appreciations=[linus, rel, jay], images="[https://images.unsplash.com/photo-1583846712268-a77d97b7fd68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80, https://images.unsplash.com/photo-1610397648930-477b8c7f0943?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=860&q=80, https://images.unsplash.com/photo-1626163081575-f7a538743788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80]"
    )
    tokyo = Project(
        name="Neo Tokyo", description="Pictuers of the nightlife of Tokyo", user_id=4, project_appreciations=[francis, candice, linus], images="[https://images.unsplash.com/photo-1555397430-57791c75748a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1788&q=80, https://images.unsplash.com/photo-1559245718-212fba2d22e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80]"
    )
    nyc = Project(
        name="New York New York", description="Heyyy, I'm...", user_id=4, project_appreciations=[marnie, bobbie, demo, francis], images="[https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1544111795-fe8b9def73f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=677&q=80]"
    )
    sanfran = Project(
        name="San Francisco", description="Images from San Francisco", user_id=4, project_appreciations=[bobbie, jimmy], images="[https://images.unsplash.com/photo-1534050359320-02900022671e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80, https://images.unsplash.com/photo-1423347673683-ccdb7f6a948f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80, https://images.unsplash.com/photo-1541464522988-31b420f688b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80]"
    )
    ocean = Project(
        name="The sea", description="o/", user_id=5, project_appreciations=[felicia, edward, sean, talia, katie], images="[https://images.unsplash.com/photo-1484291470158-b8f8d608850d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80,https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80]"
    )
    skate = Project(
        name="Do a flip", description="Life of a skateboarder", user_id=5, project_appreciations=[linus, rel, jay, tracy, felicia, edward, sean], images="[https://images.unsplash.com/photo-1597019558926-3eef445fdf60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1591311337241-cecfd26f1da1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80, https://images.unsplash.com/photo-1547447134-cd3f5c716030?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80]"
    )
    fone = Project(
        name="F1 Project", description="Formula 1", user_id=5, project_appreciations=[katie], images="[https://images.unsplash.com/photo-1532906619279-a4b7267faa66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80, https://images.unsplash.com/photo-1503945839639-aea48daa250f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80]"
    )
    volcano = Project(
        name="Volcano", description="There be demons", user_id=2, project_appreciations=[marnie, bobbie, demo, francis], images="[https://images.unsplash.com/photo-1618681317438-a8dd7da06cd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1619266465172-02a857c3556d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80,https://images.unsplash.com/photo-1616627577385-5c0c4dab0257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1475776408506-9a5371e7a068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1358&q=80]"
    )
    thunder = Project(
        name="Storms Project", description="Thunderbolts and lightning...", user_id=2, project_appreciations=[linus], images="[https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80, https://images.unsplash.com/photo-1429552077091-836152271555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80, https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80]"
    )
    eclipse = Project(
        name="Eclipses", description="Some photos I took of eclipses", user_id=2, project_appreciations=[marnie, bobbie, demo, francis], images="[https://images.unsplash.com/photo-1503775012249-06a2b8cd00eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1754&q=80, https://images.unsplash.com/photo-1529788295308-1eace6f67388?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80, https://images.unsplash.com/photo-1506747958701-808cb3805b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80]"
    )
    blackhole = Project(
        name="The Void", description="Interpretations of the black hole", user_id=2, project_appreciations=[demo, marnie, bobbie, jimmy, francis, candice, linus, rel, jay, tracy, felicia, edward, sean, talia, katie], images="[https://images.unsplash.com/photo-1640984756059-7303641db7cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80, https://images.unsplash.com/photo-1496989981497-27d69cdad83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1231&q=80, https://images.unsplash.com/photo-1599969851908-793500a08e53?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80]"
    )
    scifi = Project(
        name="Sci Fi", description="Tales from the future", user_id=1, project_appreciations=[rel, jay, tracy, felicia, edward, sean], images="[https://images.unsplash.com/photo-1627645835237-0743e52b991f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80, https://images.unsplash.com/photo-1642160432858-8e6540b5e5c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80]"
    )
    project_6 = Project(
        name="ArtsyAF", description="I'm so artistic lewl", user_id=6, project_appreciations=[linus, rel, jay], images="[https://thetechviral.com/wp-content/uploads/2017/08/behance.jpg]"
    )
    project_7 = Project(
        name="Books Aesthetics", description="Great read", user_id=7, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.essaysdeluxe.com/uploads/212/how_to_find_ideas_for_creative_book_reports.jpg]"
    )
    project_8 = Project(
        name="Porsche", description="992 911 gt3rs ", user_id=8, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.topgear.com/sites/default/files/2022/10/1%20Porsche%20911%20GT3%20RS.jpg]"
    )
    project_9 = Project(
        name="Falls Fall", description="Fall weather is up. Just vibe.", user_id=9, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.adobe.com/content/dam/cc/us/en/creative-cloud/photography/discover/landscape-photography/CODERED_B1_landscape_hero-img_900x420.jpg.img.jpg]"
    )
    project_10 = Project(
        name="Tokyo", description="chill and relax", user_id=10, project_appreciations=[marnie, bobbie, demo, francis], images="[https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8&w=1000&q=80]"
    )
    project_11 = Project(
        name="Corgi", description="doggos!!!", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://thesmartcanine.com/wp-content/uploads/2021/02/things-to-know-before-getting-corgi.jpg]"
    )
    project_12 = Project(
        name="Korean Fried Chicken", description="I love fried chicken ", user_id=12, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.dinneratthezoo.com/wp-content/uploads/2018/12/korean-fried-chicken-5.jpg]"
    )
    project_13 = Project(
        name="Demon Slayer", description="BEST ANIME EVER", user_id=13, project_appreciations=[marnie, bobbie, demo, francis], images="[https://i.pinimg.com/originals/93/dd/6c/93dd6c51a3cf9e60106ede7fed50c035.jpg]"
    )
    project_14 = Project(
        name="Scifi", description="I just love scifi here some of my personal artwork", user_id=14, project_appreciations=[marnie, bobbie, demo, francis], images="[https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5ifKifvNWbg2fwCBV3QtfyHLztF8mPQMfg&usqp=CAU]"
    )
    project_15 = Project(
        name="Backroads", description="vroom", user_id=15, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    )

    # projRep = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep2 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep3 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep4 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep5 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep6 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep7 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep8 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep9 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # projRep10 = Project(
    #     name="Backroads", description="vroom", user_id=1, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )

    # rprojRep = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep2 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep3 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep4 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep5 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep6 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep7 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep8 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep9 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )
    # rprojRep10 = Project(
    #     name="Backroads", description="vroom", user_id=11, project_appreciations=[marnie, bobbie, demo, francis], images="[https://www.thedailymeal.com/img/gallery/why-fall-is-the-only-worthwhile-season/iStock-841380450.jpg]"
    # )



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
    db.session.add(cars)
    db.session.add(forests)
    db.session.add(roses)
    db.session.add(fruits)
    db.session.add(roses2)
    db.session.add(roses3)
    db.session.add(roses4)
    db.session.add(lilly)
    db.session.add(orchids)
    db.session.add(tokyo)
    db.session.add(nyc)
    db.session.add(sanfran)
    db.session.add(ocean)
    db.session.add(skate)
    db.session.add(fone)
    db.session.add(volcano)
    db.session.add(thunder)
    db.session.add(eclipse)
    db.session.add(blackhole)
    db.session.add(scifi)
    # db.session.add(projRep)
    # db.session.add(projRep2)
    # db.session.add(projRep3)
    # db.session.add(projRep4)
    # db.session.add(projRep5)
    # db.session.add(projRep6)
    # db.session.add(projRep7)
    # db.session.add(projRep8)
    # db.session.add(projRep9)
    # db.session.add(projRep10)
    # db.session.add(rprojRep)
    # db.session.add(rprojRep2)
    # db.session.add(rprojRep3)
    # db.session.add(rprojRep4)
    # db.session.add(rprojRep5)
    # db.session.add(rprojRep6)
    # db.session.add(rprojRep7)
    # db.session.add(rprojRep8)
    # db.session.add(rprojRep9)
    # db.session.add(rprojRep10)
    
   
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
