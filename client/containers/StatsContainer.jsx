import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Leaderboard from '../components/Leaderboard';
import LiveFeed from '../components/LiveFeed';

const mapStateToProps = ({ game, feed }) => ({
  allHistory: game.allHistory,
  feed: feed,
});

const mapDispatchToProps = dispatch => ({
  getHistory: () => dispatch(actions.getHistory()),
});

const StatsContainer = ({
  allHistory,
  feed,
  getHistory,
}) => {
  useEffect(() => {
    getHistory();
  }, []);

  const UsernameList = Object.keys(feed);

  const feeds = UsernameList.length
    ? UsernameList.map(username => {
        <LiveFeed
          key={username}
          username={username}
          feed={feed[username]}
        />
      })
    : null;

  return (
    <div id="stats">
      {feeds}
      <Leaderboard allHistory={allHistory} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
