/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import useGitHub from '../../hooks/github-hooks';
import RepositoryItem from '../repository-item';
import * as S from './styled';

const Repositories = () => {
  const { githubState, getUserRepos, getUserStarred } = useGitHub();
  const [hasUserForSearchRepos, setHasUserForSearchRepos] = useState(false);

  useEffect( () => {
    if(githubState.user.login){
      getUserRepos(githubState.user.login);
      getUserStarred(githubState.user.login);
    }
    
    setHasUserForSearchRepos(!!githubState.repositories);
  }, [githubState.user.login]);

  return (
  <>
    {hasUserForSearchRepos ? (
      <S.WrapperTabs
        selectedTabClassName='is-selected'
        selectedTabPanelClassName='is-selected'
      >
        <S.WrapperTabList>
          <S.WrapperTab>Repositories</S.WrapperTab>
          <S.WrapperTab>Starred</S.WrapperTab>
        </S.WrapperTabList>
        <S.WrapperTabPanel>
          <S.WrapperList>
            {githubState.repositories.map(repository => (
              <RepositoryItem 
                key={repository.id}
                name={repository.name}
                linkToRepo={repository.html_url}
                fullName={repository.full_name}
            /> 
            ))}
          </S.WrapperList>
        </S.WrapperTabPanel> 
        <S.WrapperTabPanel>
          <S.WrapperList>
            {githubState.starred.map(starred => (
                <RepositoryItem 
                  key={starred.id}
                  name={starred.name}
                  linkToRepo={starred.owner.html_url}
                  fullName={starred.full_name}
              /> 
              ))}
          </S.WrapperList>
        </S.WrapperTabPanel> 
      </S.WrapperTabs>
    ) : <></>}
  </>
  );
 };

export default Repositories;  