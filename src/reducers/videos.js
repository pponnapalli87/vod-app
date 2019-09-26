import {
  GET_VIDEOS,
  GET_VIDEOS_SUCCEEDED,
  GET_VIDEOS_FAILED
} from '../actions/videos';

const INITIAL_STATE = {
  loading: false,
  videos: [],
  error: false
};

export default function productsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_VIDEOS: {
      return { ...state, error: false, loading: true };
    }
    case GET_VIDEOS_SUCCEEDED: {
      const { videos } = action.payload;

      return { ...state, error: false, loading: false, videos: [...videos] };
    }
    case GET_VIDEOS_FAILED: {
      return { ...state, loading: false, error: true };
    }
    default: {
      return state;
    }
  }
}
