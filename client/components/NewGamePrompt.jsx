import React from 'react';

const NewGamePrompt = ({ startNewGame, isLoggedIn, isPaused, resume }) => {
  const handleClick = () => {
    if (isPaused) resume();
    else startNewGame();
  };

  return (
    <div className="play-as-guest-button-container">
    <button type="button" className="playAsGuestNavBar" onClick={handleClick}>
      {isLoggedIn
        ? 'Start new game?'
        : 'Play as guest?'
      }
    </button>
    </div>
  );
};

export default NewGamePrompt;
