import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getProjectComments } from "../store/comments";
import { getAllProjects } from "../store/projects"



// import spot = require("../../../../backend/db/models/spot");

const AllProjectsPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => Object.values(state?.projects));
  // const sessionUser = useSelector((state) => state.session.user)
  // const appreciations = useSelector((state) => Object.values(state?.appreciations));
  // const comments = useSelector((state) => Object.values(state?.comments) )
  // const reviewsString = JSON.stringify(reviews)

  useEffect(() => {
    getAllProjects(dispatch);
  }, [dispatch, JSON.stringify(projects)]);

  useEffect(() => {
    dispatch(getProjectComments());
  }, [dispatch, sessionUser]);

  //appreciations

  return (
    <div className="projectsPage">
      <div className="eachProject">
        {projects &&
          projects.map((project) => (
            <div className="projectCard" key={project.id}>
              <NavLink to={`/projects/${project.id}`}>
                <div className="project">

                </div>
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProjectsPage;
