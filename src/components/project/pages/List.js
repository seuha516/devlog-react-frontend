import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProject } from 'modules/projects/listProjects';

import Error from 'components/utils/Error';
import Loading from 'components/utils/Loading';
import TagList from '../list/TagList';
import ProjectList from '../list/ProjectList';

const List = ({ location }) => {
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
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerHTML = 'Devlog - Projects';
    window.scrollTo(0, 0);
    dispatch(listProject(location.search));
    return () => {
      htmlTitle.innerHTML = 'Devlog';
    };
  }, [dispatch, location.search]);

  if (error) {
    return <Error />;
  } else if (loading) {
    return (
      <div style={{ width: '100%', height: 'calc(100vh - 62px)' }}>
        <Loading />
      </div>
    );
  }
  return (
    <>
      {page === 0
        ? tags && <TagList tags={tags} location={location} setPage={setPage} />
        : projects && (
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
