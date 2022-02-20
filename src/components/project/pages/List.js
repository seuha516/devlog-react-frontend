import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProject } from 'modules/projects/listProjects';

//Components
import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import TagList from '../list/TagList';
import ProjectList from '../list/ProjectList';

//컨테이너
const List = ({ location }) => {
  const dispatch = useDispatch();
  const { projects, projectCount, tags, error, loading, user } = useSelector(
    ({ listProjects, loading, user }) => ({
      projects: listProjects.projects,
      projectCount: listProjects.projectCount,
      tags: listProjects.tags,
      error: listProjects.error,
      loading: loading['listProjects/LIST_PROJECT'],
      user: user.user,
    }),
  );
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Projects';
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, []);
  useEffect(() => {
    dispatch(listProject(location.search));
  }, [dispatch, location.search]);

  const [page, setPage] = useState(1);

  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {page === 0 ? (
        <TagList tags={tags} location={location} setPage={setPage} />
      ) : (
        <ProjectList
          projects={projects}
          projectCount={projectCount}
          location={location}
          user={user}
          setPage={setPage}
        />
      )}
    </>
  );
};

export default List;
