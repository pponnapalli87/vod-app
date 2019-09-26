/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Home.css';

const VideoCarousel = ({ videos, playVideo, handleKeyPress }) => (
  <div id="video-thumbnail" className="videos">
    {videos.map((video, i) => {
      const { id, images, title, description, contents } = video;

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={id}
          className="video"
          onClick={() => playVideo(video)}
          onKeyDown={event => handleKeyPress(video, i, event)}
        >
          <video
            tabIndex="0"
            width="175px"
            height="250px"
            id={video.id}
            poster={images[0].url}
            alt={description}
          >
            <source src={contents[0].url} type="video/mp4" />
          </video>
          <div className="title">{title}</div>
        </div>
      );
    })}
  </div>
);

VideoCarousel.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired,
      contents: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  playVideo: PropTypes.func,
  handleKeyPress: PropTypes.func
};

VideoCarousel.defaultProps = {
  playVideo: () => {},
  handleKeyPress: () => {}
};

export default VideoCarousel;
