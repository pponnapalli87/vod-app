import React from 'react';
import VideoCarousel from './VideoCarousel';
import { displayMessage } from '../common/home-helper';

const History = () => {
  const videos = localStorage.getItem('historyVideos')
    ? JSON.parse(localStorage.getItem('historyVideos'))
    : [];

  return (
    <div className="home">
      {(!videos || videos.length === 0) &&
        displayMessage('No recently seen videos')}
      {videos.length > 0 && <VideoCarousel videos={videos.reverse()} />}
    </div>
  );
};

export default History;
