import React, {useState} from 'react'
import * as S from './styled'
import useGitHub from '../../hooks/github-hooks';

const Header = () => {
  const enterKeyCode = 13;
  const { getUser } = useGitHub();
  const [usernameForSearch, setUsernameForSearch] = useState(undefined);

  const handleKeypress = (e) => {
    if (e.charCode === enterKeyCode) {
      submitGetUser();
    }
  };
  
  const submitGetUser = () => {
    if(!usernameForSearch) 
      return;
    
    return getUser(usernameForSearch);
  };

  return (
    <header>
      <S.Wrapper>
        <input 
          type="text"  
          placeholder='Digite o username para pesquisa...'
          onChange={(event) => setUsernameForSearch(event.target.value)}  
          onKeyPress={handleKeypress}
        />
        <button type="submit" onClick={submitGetUser}>
          <span>Buscar</span> 
        </button>
      </S.Wrapper>
    </header>
  )
}

export default Header