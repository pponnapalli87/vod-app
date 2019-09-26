import { call, put, take } from 'redux-saga/effects';
import { camelizeKeys } from 'humps';

import {
  GET_VIDEOS,
  GET_VIDEOS_SUCCEEDED,
  GET_VIDEOS_FAILED
} from '../actions/videos';

export function fetchApi(url) {
  return fetch(url).then(response => response.json());
}

export default function* listeningForVideos() {
  while (true) {
    try {
      yield take(GET_VIDEOS);
      const result = yield call(
        fetchApi,
        'https://demo2697834.mockable.io/movies'
      );
      yield put({
        type: GET_VIDEOS_SUCCEEDED,
        payload: { videos: camelizeKeys(result.entries) }
      });
    } catch (error) {
      yield put({ type: GET_VIDEOS_FAILED, payload: { error } });
    }
  }
}
