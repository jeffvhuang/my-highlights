import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getTennisTournamentSchedule, getTennisTournamentInfo } from '../../redux/actions/tennis-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import SelectDropdown from '../common/SelectDropdown';
import TennisMatches from './TennisMatches';

const propTypes = {
  tennis: object.isRequired,
  actions: object.isRequired,
  match: object.isRequired
};

class TennisTournamentPageContainer extends React.Component {
  constructor(props) {
    super(props);

    const tournamentId = "sr:tournament:" + props.match.params.tournamentNumber;
    const tournament = props.tennis.tournamentSchedules.find(t => t.tournament.id == tournamentId);
    const tournamentInfo = props.tennis.tournamentInfo.find(t => t.tournament.id == tournamentId);

    this.state = {
      tournamentId: tournamentId,
      values: [],
      matches: (tournament) ? tournament.sport_events : [],
      tournamentName: (tournament) ? tournament.tournament.name : '',
      competitors: (tournamentInfo) ? tournamentInfo.competitors : []
    };
  }

  componentDidMount() {
    const props = this.props;
    const tournamentId = this.state.tournamentId;
    // if (props.tennis.videos.length < 1) {
    //   props.actions.getChampionsLeagueVideos();
    //   props.actions.getEuropaLeagueVideos();
    // } 
    if (!props.tennis.tournamentSchedules.some(t => t.tournament.id == tournamentId)) 
      props.actions.getTennisTournamentSchedule(tournamentId)
        .then(data => this.setState({ 
          matches: data.sport_events,
          tournamentName: data.tournament.name
        }));
    
    if (!props.tennis.tournamentInfo.some(t => t.tournament.id == tournamentId)) 
      props.actions.getTennisTournamentInfo(tournamentId)
        .then(data => this.setState({ competitors: data.competitors }));
  }

  handleChange = values => this.setState({ values });

  render() {
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>{this.state.tournamentName}</h1>
        <SelectDropdown handleChange={this.handleChange} options={this.state.competitors} />
        {/* <VideoThumbnails heading="Tennis"
          thumbnails={this.props.tennis.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/Tennis/tennis'} /> */}
        <div className="section">
          <TennisMatches games={this.state.matches}
            header="Matches"
            values={this.state.values} />
          <Link to={paths.EVENTS} className="right">More ></Link>
        </div>
      </div>
    );
  }
}

TennisTournamentPageContainer.propTypes = propTypes;

const mapStateToProps = (state) => ({
  tennis: state.tennis
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ 
    getTennisTournamentSchedule,
    getTennisTournamentInfo }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TennisTournamentPageContainer);