import React from 'react';

export default ({ allHistory }) => {
  const display = allHistory.map(el => (
    <div key={el.id}>
      {[el.username, el.num_questions, el.num_correct].join('\t')}
    </div>
  ));
  return (
    <div id="leaderboard">
      <h1>Leader Board</h1>
      {display}
    </div>
  );
};
