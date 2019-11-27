import React from 'react';
import useInterval from '../hooks/useInterval';

const LiveFeed = ({ username, feed, expireFeed }) => {
  useInterval(() => {
    expireFeed(username);
  }, 10000)

  let display = null;
  if (feed.results.length) display = feed.results.map((item, idx) => (
    <p className='feed-item' key={idx}>
      {username.concat(item.isCorrect ? ' RIGHT ' : ' WRONG ').concat(`at ${item.ts}`)}
    </p>
  ));

  return (
    <div className="livefeed">
      LIVE FEED ENGAGED: {username}
      Started at {feed.start}
      {feed.end ? 'Ended at '.concat(feed.end).concat(' with ').concat(feed.score) : display}
    </div>
  )
};

export default LiveFeed;
