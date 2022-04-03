import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoadingContent } from '../../components/loaders';
import { PAGE_SIGIN } from '../../config/constants';
import useAuth from '../../hooks/useAuth';
import GitService from '../../services/git';
import { setDisplayName } from '../../services/utils';
import './styles.scss';

function Profile(): JSX.Element {

  const { isLoggedin, user } = useAuth();
  const [nameUser, setnameUser] = useState('');

  useEffect(() => {
    setnameUser(setDisplayName(user));
  }, [user]);
  
  
  if (!isLoggedin) {
    return <Navigate to={PAGE_SIGIN} />
  }

  return (
    <div className='profile'>
      <h1>Perfil</h1>
      <div className="head">
        <h2>{nameUser}</h2>
        <p className="gitUser">GitHub ID: {user.githubId ? user.githubId : '--'}</p>
      </div>
      <SetContentProfile git={user.githubId} />
    </div>
  );
}

const SetContentProfile = ( props: any ): JSX.Element => {
  const { git } = props;

  return git ? <Repositories git={git} /> : <NoContent />;
}

const Repositories = ( props: any ): JSX.Element => {

  const { git } = props;
  const [loading, setLoading] = useState(true);
  const [errorReposOwner, setErrorReposOwner] = useState({state: false, message: ""});
  const [errorReposFavorite, setErrorReposFavorite] = useState({state: false, message: ""});
  const [reposOwner, setReposOwner] = useState([]);
  const [reposFavorite, setReposFavorite] = useState([]);

  useEffect(() => {
    GitService.getReposOwner(git)
      .then(({ repositories }: any) => {
        setLoading(false);
        if (repositories) {
          setReposOwner(repositories);
        } else {
          setErrorReposOwner({state: true, message: "Ha ocurrido un error en la petición"});
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorReposOwner({state: true, message: "Ha ocurrido un error"});
      });

    GitService.getReposFavs(git)
      .then(({ repositories }: any) => {
        setLoading(false);
        if (repositories) {
          setReposFavorite(repositories);
        } else {
          setErrorReposFavorite({state: true, message: "Ha ocurrido un error en la petición"});
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorReposFavorite({state: true, message: "Ha ocurrido un error"});
      });
  }, [git]);
  

  return (
    <div className="contentProfile">
      <div className="contentReps">
        <h4>Tus repositorios</h4>
        <div className="repos">
          {errorReposFavorite.state 
            ? <p className='error'>{errorReposFavorite.message}</p>
            : loading && reposOwner
              ? <LoadingContent />
              : <ListRepos repos={reposOwner} />
          }
        </div>
      </div>
      <div className="contentReps">
        <h4>Tus repositorios favoritos</h4>
        <div className="repos">
          {errorReposOwner.state 
            ? <p className='error'>{errorReposOwner.message}</p>
            : loading && reposOwner
              ? <LoadingContent />
              : <ListRepos repos={reposFavorite} />
          }
        </div>
      </div>
    </div>
  );
}

const NoContent = (): JSX.Element => {

  return (
    <div className="contentProfile">
      <p>No has vinculado tu cuenta de GitHub</p>
    </div>
  );
}

const ListRepos = (props: any): JSX.Element => {

  const { repos } = props;

  return (
    <ul className="listRepos">
    {repos.length > 0
      ? repos.map((repo: any) => (
          <li className="repo" key={repo.id}>
            <a href={repo.html_url} target='_blank' rel="noreferrer">
              {repo.name}
            </a>
          </li>
        ))
      : <p>No encontrados</p>
    }
  </ul>
  );
}

export default Profile;
