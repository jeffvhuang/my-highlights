import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { paths } from '../../../helpers/constants';
import { getTennisTournamentSchedule } from '../../redux/actions/tennis-actions';

import VideoThumbnails from '../common/VideoThumbnails';
import TennisSelectDropdown from './TennisSelectDropdown';
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

    this.state = {
      tournamentId: tournamentId,
      values: [],
      matches: (tournament) ? tournament.sport_events : []
    };
  }

  componentDidMount() {
    const props = this.props;
    const tournamentId = this.state.tournamentId;
    // if (props.tennis.videos.length < 1) {
    //   props.actions.getChampionsLeagueVideos();
    //   props.actions.getEuropaLeagueVideos();
    // } 
    // if (props.tennis.teams.length < 1) props.actions.getTennisTeams();
    if (!props.tennis.tournamentSchedules.some(t => t.tournament.id == tournamentId)) 
      props.actions.getTennisTournamentSchedule(tournamentId)
        .then(data => this.setState({ matches: data }));
  }

  handleChange = values => this.setState({ values });

  resetInitialState = () => {
    this.setState({
      ongoing: this.props.tennis.ongoing,
      upcoming: this.props.tennis.upcoming 
    });
  }

  render() {
    
    return (
      <div>
        <div className="section">
          <div className="mid-flex">
            <video controls width="600" height="400" />
          </div>
        </div>
        <h1>Matches</h1>
        {/* <TennisSelectDropdown handleChange={this.handleChange} /> */}
        {/* <VideoThumbnails heading="Tennis"
          thumbnails={this.props.tennis.thumbnails}
          showCount={4}
          showMore
          showMoreLink={paths.HIGHLIGHTS + '/Tennis/tennis'} /> */}
        <div className="section">
          <TennisMatches games={this.state.matches}
            header="Matches"
            values={this.state.values} />
          {/* <TennisMatches games={this.props.tennis.upcoming}
            header="Upcoming"
            values={this.state.values} /> */}
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
    getTennisTournamentSchedule }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TennisTournamentPageContainer);
