import action from './action'

export const GET_VIDEOS = 'GET_VIDEOS'
export const GET_VIDEOS_SUCCEEDED = 'GET_VIDEOS_SUCCEEDED'
export const GET_VIDEOS_FAILED = 'GET_VIDEOS_FAILED'

export function getVideos() {
  return action(GET_VIDEOS)
}