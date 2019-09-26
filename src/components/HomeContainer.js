import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import Home from './Home';

const mapStateToProps = ({ videos: { videos, error, loading } }) => {
  return { error, loading, videos };
};

const mapDispatchToProps = dispatch => ({
  getVideos: () => {
    dispatch(getVideos());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
