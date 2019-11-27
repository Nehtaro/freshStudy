import React, { useEffect } from 'react';
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
  expireFeed: (username) => dispatch(actions.expireFeed(username)),
});

const StatsContainer = ({
  allHistory,
  feed,
  getHistory,
  expireFeed
}) => {
  useEffect(() => {
    getHistory();
  }, []);

  let feeds = null;
  const usernameList = Object.keys(feed);
  if (usernameList.length) {
    feeds = usernameList.map(username => (
      <LiveFeed
        key={username}
        username={username}
        feed={feed[username]}
        expireFeed={expireFeed}
      />
    ));
  }

  return (
    <div id="stats">
      {feeds}
      <Leaderboard allHistory={allHistory} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer);
