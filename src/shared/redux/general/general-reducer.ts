import * as C from './general-constants';
import { GeneralState, GeneralActionTypes } from './general-types';
import { SortedWeekEvents } from '../../../types/game-on-general/sorted-week-events.model';
import { merge } from "../../../helpers/utils";

const initialEventsForWeek = {
  today: [], tomorrow: [], day3: [], day4: [], day5: [], day6: [], day7: []
}

const initialState: GeneralState = {
  isFetching: false,
  eventsForWeek: initialEventsForWeek,
  recentlyCompletedEvents: [],
  liveEvents: [],
  upcomingEvents: [],
  error: {}
}

function generalReducer(state = initialState, action: GeneralActionTypes): GeneralState {
  switch(action.type) {
    case C.GET_EVENTS_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_EVENTS_SUCCESS:
      return merge(state,
        { 
          isFetching: false,
          recentlyCompletedEvents: action.payload.recentlyCompleted,
          liveEvents: action.payload.live,
          upcomingEvents: action.payload.upcoming
        });
    case C.GET_EVENTS_FAILURE:
      return merge(state, { isFetching: false, error: action.err });
    
    case C.GET_EVENTS_FOR_WEEK_REQUEST:
      return merge(state, { isFetching: true });
    case C.GET_EVENTS_FOR_WEEK_SUCCESS:
      return merge(state,
        { 
          isFetching: false,
          eventsForWeek: action.payload
        });
    case C.GET_EVENTS_FOR_WEEK_FAILURE:
      return merge(state, { isFetching: false, error: action.err });
    
    default:
      return state;
  }
}

export default generalReducer;
