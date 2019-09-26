import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VideoCarousel from './VideoCarousel';
import { displayMessage } from '../common/home-helper';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.historyVideos = localStorage.getItem('historyVideos')
      ? JSON.parse(localStorage.getItem('historyVideos'))
      : [];
  }

  componentDidMount() {
    const { getVideos } = this.props;
    getVideos();
  }

  playVideo = video => {
    const elem = document.getElementById(video.id);

    this.playFullScreenVideo(video, elem);
  };

  playFullScreenVideo = (video, elem) => {
    function myHandler(e) {
      elem.webkitExitFullScreen();
    }

    function exitHandler() {
      if (document.webkitIsFullScreen === false) {
        elem.pause();
        elem.currentTime = 0;
        elem.load();
      } else if (document.mozFullScreen === false) {
        elem.pause();
        elem.currentTime = 0;
        elem.load();
      } else if (document.msFullscreenElement === false) {
        elem.pause();
        elem.currentTime = 0;
        elem.load();
      }
    }
    elem.pause();
    elem.currentTime = 0;
    elem.load();

    if (elem != null) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      // Show loading animation.
      const playPromise = elem.play();

      if (playPromise !== undefined) {
        let exists = false;
        for (let i = 0; i < this.historyVideos.length; i++) {
          if (this.historyVideos[i].id === video.id) {
            exists = true;
            this.historyVideos[i].countViews =
              this.historyVideos[i].countViews + 1;
            localStorage.setItem(
              'historyVideos',
              JSON.stringify(this.historyVideos)
            );
            break;
          }
        }

        if (exists === false) {
          video.countViews = 1;
          this.historyVideos.push(video);
          localStorage.setItem(
            'historyVideos',
            JSON.stringify(this.historyVideos)
          );
        }

        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log(error);
          });
      }

      // Video Ended.
      document
        .getElementById(video.id)
        .addEventListener('ended', myHandler, false);

      document.addEventListener('webkitfullscreenchange', exitHandler, false);
      document.addEventListener('mozfullscreenchange', exitHandler, false);
      document.addEventListener('fullscreenchange', exitHandler, false);
      document.addEventListener('MSFullscreenChange', exitHandler, false);
    }
  };

  handleKeyPress = (video, i, event) => {
    let elem = document.getElementById(video.id);
    const videoCarousel = document.getElementById('video-thumbnail');

    // Reset video.
    elem.pause();
    elem.currentTime = 0;
    elem.load();

    if (event.keyCode === 37) {
      if (i > 0) {
        elem = videoCarousel.childNodes[i - 1];
        elem.firstElementChild.focus();
      }
    } else if (event.keyCode === 39) {
      if (i < videoCarousel.childNodes.length - 1) {
        elem = videoCarousel.childNodes[i + 1];
        elem.firstElementChild.focus();
      }
    }

    if (event.key === 'Enter') {
      this.playFullScreenVideo(video, elem);
    }
  };

  render() {
    const { error, loading, videos } = this.props;

    return (
      <>
        {loading && displayMessage('Loading...')}
        {error && displayMessage('Something went wrong')}
        {videos && videos.length > 0 && (
          <div>
            <VideoCarousel
              videos={videos}
              playVideo={this.playVideo}
              handleKeyPress={this.handleKeyPress}
            />
          </div>
        )}
      </>
    );
  }
}

Home.propTypes = {
  loading: PropTypes.bool,
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
  error: PropTypes.bool
};

Home.defaultProps = {
  loading: false,
  error: false
};

export default Home;
