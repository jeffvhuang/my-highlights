import axios from 'axios';

import { tennisActions as A } from './action-types';
import { youtubeAPI, gameonAPI } from '../../../helpers/constants';
import { sleep, sortTennisSchedule } from '../../../helpers/utils';

// Mock data
import TOURNAMENTS from '../../../mockApiData/tennisTournaments.json';
import TOURNAMENT_INFO from '../../../mockApiData/tennisTournamentInfo.json';
import TOURNAMENT_SCHEDULE from '../../../mockApiData/tennisTournamentSchedule.json';
// import { PLAYLIST } from '../../../mockApiData/TennisYoutube';


// Get video from youtube playlist of Tennis highlights
export const getTennisVideosRequest = () => ({ type: A.GET_TENNIS_VIDEOS_REQUEST });
export const getTennisVideosSuccess = (payload) => ({ type: A.GET_TENNIS_VIDEOS_SUCCESS, payload });
export const getTennisVideosFailure = (err) => ({ type: A.GET_TENNIS_VIDEOS_FAILURE, err });

// export const getTennisVideos = () => {
//   return (dispatch) => {
//     dispatch(getTennisVideosRequest());
//     return axios.get(youtubeAPI.HOST + youtubeAPI.PLAYLIST_ITEMS, {
//       params: {
//         'part': 'snippet',
//         'playlistId': youtubeAPI.Tennis_ID,
//         'maxResults': '25',
//         'key': youtubeAPI.KEY
//       }
//     }).then(response => {
//       dispatch(getTennisVideosSuccess(response.data.items));
//     }).catch(err => {
//       dispatch(getTennisVideosFailure(err));
//       throw(err);
//     });
//   };
// };

// mock data
// export const getTennisVideos = () => {
//   return async (dispatch) => {
//     dispatch(getTennisVideosRequest());
//     await sleep(1500);
//     return dispatch(getTennisVideosSuccess(PLAYLIST.items));
//   };
// };

// Get Schedule
export const getTennisTournamentsRequest = () => ({ type: A.GET_TENNIS_TOURNAMENTS_REQUEST });
export const getTennisTournamentsSuccess = (payload, schedule) => ({ type: A.GET_TENNIS_TOURNAMENTS_SUCCESS, payload, schedule });
export const getTennisTournamentsFailure = (err) => ({ type: A.GET_TENNIS_TOURNAMENTS_FAILURE, err });

// export const getTennisTournaments = () => {
//   return (dispatch) => {
//     dispatch(getTennisTournamentsRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS,
//     }).then(response => {
//       const today = new Date();
//       const thisYear = today.getFullYear();

//       const tournaments = response.data.filter(t => 
//         ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
//         t.currentSeason.year == thisYear);

//       const sortedSchedule = sortTennisSchedule(tournaments);
//       dispatch(getTennisTournamentsSuccess(sortedSchedule, tournaments));
//     }).catch(err => {
//       dispatch(getTennisTournamentsFailure(err));
//       throw(err);
//     });
//   };
// };

// return mock data
export const getTennisTournaments = () => {
  return async (dispatch) => {
    dispatch(getTennisTournamentsRequest());
    await sleep(1000);
    const today = new Date();
    const thisYear = today.getFullYear();

    const tournaments = TOURNAMENTS.filter(t => 
      ((t.type == 'singles' && t.category.level) || t.type == 'mixed') &&
      t.currentSeason.year == thisYear);

    const sortedSchedule = sortTennisSchedule(tournaments);
    return dispatch(getTennisTournamentsSuccess(sortedSchedule, tournaments));
  };
};

// Get Tournament schedule
export const getTennisTournamentScheduleRequest = () => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_REQUEST });
export const getTennisTournamentScheduleSuccess = (payload) => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_SUCCESS, payload });
export const getTennisTournamentScheduleFailure = (err) => ({ type: A.GET_TENNIS_TOURNAMENT_SCHEDULE_FAILURE, err });
export const clearTennisTournamentScheduleSuccess = () => ({ type: A.CLEAR_TENNIS_TOURNAMENT_SCHEDULE });

// export const getTennisTournamentSchedule = (tournamentId) => {
//   return (dispatch) => {
//     dispatch(getTennisTournamentScheduleRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS + "/" + tournamentId + gameonAPI.SCHEDULE,
//     }).then(response => {
//       dispatch(getTennisTournamentScheduleSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentScheduleFailure(err));
//       throw(err);
//     });
//   };
// };

export const getTennisTournamentSchedule = (tournamentId) => {
  return async (dispatch) => {
    dispatch(getTennisTournamentScheduleRequest());
    await sleep(1000);
    dispatch(getTennisTournamentScheduleSuccess(TOURNAMENT_SCHEDULE));
    return TOURNAMENT_SCHEDULE;
  };
};

export const clearTennisTournamentSchedule = () => {
  return (dispatch) => {
    dispatch(clearTennisTournamentScheduleSuccess());
  };
};

// Get Teams
export const getTennisTournamentInfoRequest = () => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_REQUEST });
export const getTennisTournamentInfoSuccess = (payload) => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_SUCCESS, payload });
export const getTennisTournamentInfoFailure = (err) => ({ type: A.GET_TENNIS_TOURNAMENT_INFO_FAILURE, err });
export const clearTennisTournamentInfoSuccess = () => ({ type: A.CLEAR_TENNIS_TOURNAMENT_INFO });

// export const getTennisTournamentInfo = (tournamentId) => {
//   return (dispatch) => {
//     dispatch(getTennisTournamentInfoRequest());
//     return axios({
//       method: 'get',
//       url: gameonAPI.HOST + gameonAPI.COMMON + gameonAPI.TENNIS + gameonAPI.TOURNAMENTS + "/" + tournamentId,
//     }).then(response => {
//       dispatch(getTennisTournamentInfoSuccess(response.data));
//       return response.data;
//     }).catch(err => {
//       dispatch(getTennisTournamentInfoFailure(err));
//       throw(err);
//     });
//   };
// };

export const getTennisTournamentInfo = (tournamentId) => {
  return async (dispatch) => {
    dispatch(getTennisTournamentInfoRequest());
    await sleep(1000);
    dispatch(getTennisTournamentInfoSuccess(TOURNAMENT_INFO));
    return TOURNAMENT_INFO;
  };
};

export const clearTennisTournamentInfo = () => {
  return (dispatch) => {
    dispatch(clearTennisTournamentInfoSuccess());
  };
};