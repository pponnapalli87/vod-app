import { fork } from 'redux-saga/effects';

import listeningForVideos from './listening-for-videos';

export default function* root() {
  yield fork(listeningForVideos);
}
