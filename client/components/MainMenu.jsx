import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Oauth from './Oauth';
import NewGamePrompt from './NewGamePrompt';
import StatsContainer from '../containers/StatsContainer';

export default ({
  startNewGame,
  user,
  isLoggedIn,
  login,
  register,
  isPaused,
  resume,
}) => {
  const [viewToggle, setViewToggle] = useState(true);
  const handleToggle = () => setViewToggle(status => !status);
  return (
    <div className="landing_page">
      <div className="login_page">
        <NewGamePrompt
          startNewGame={startNewGame}
          isLoggedIn={isLoggedIn}
          resume={resume}
          isPaused={isPaused}
        />
        <div className="main-menu-forms-containers">
          {!isLoggedIn && (viewToggle
            ? <>
                <Login
                  login={login}
                  handleToggle={handleToggle}/>
              </>
            : <>
                <div className="login-user-form">
                <Signup
                  register={register}
                  handleToggle={handleToggle} />
                <Oauth />
                </div>
              </>
          )}
          <div className="welcome">
            {isLoggedIn && `Welcome ${user.username}!`}
          </div>
          <div className="stats-container">
            <StatsContainer />
        </div>
        </div>
      </div>
    </div>
  )
};
