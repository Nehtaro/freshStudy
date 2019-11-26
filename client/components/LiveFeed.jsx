import React from 'react';


export default ({ username, feed }) => {
  const display = feed.map((el, idx) => <p key={idx}>{el}</p>);

  return (
    <div id="livefeed">
      Live Feed from {username}!
      {display}
    </div>
  )
};
