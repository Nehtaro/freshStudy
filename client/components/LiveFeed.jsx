import React from 'react';

export default ({ feed }) => {
  const display = feed.map((el, idx) => <p key={idx}>{el}</p>);
  return (
    <div id="livefeed">
      LiveFeed
      {display}
    </div>
  )
};
