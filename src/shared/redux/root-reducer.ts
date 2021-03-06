import { combineReducers, Reducer } from 'redux';
import { ReduxState } from './redux-state';
import dotaReducer from './dota/dota-reducer';
import nbaReducer from './nba/nba-reducer';
import eplReducer from './football/epl/epl-reducer';
import championsLeagueReducer from './football/champions-league/champions-league-reducer';
import europaLeagueReducer from './football/europa-league/europa-league-reducer';
import tennisReducer from './tennis/tennis-reducer';
import lolReducer from './lol/lol-reducer';
import csgoReducer from './csgo/csgo-reducer';
import overwatchReducer from './overwatch/overwatch-reducer';
import generalReducer from './general/general-reducer';

const rootReducer: Reducer<ReduxState> = combineReducers<ReduxState>({
  general: generalReducer,
  nba: nbaReducer,
  epl: eplReducer,
  championsLeague: championsLeagueReducer,
  europaLeague: europaLeagueReducer,
  tennis: tennisReducer,
  dota: dotaReducer,
  lol: lolReducer,
  csgo: csgoReducer,
  overwatch: overwatchReducer
});

export default rootReducer;
