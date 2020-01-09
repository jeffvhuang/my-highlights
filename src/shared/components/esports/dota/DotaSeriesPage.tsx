import * as React from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "redux";

import {
  getDotaSeries,
  selectDotaSeries
} from "../../../redux/dota/dota-actions";
import { DotaState } from "../../../redux/dota/dota-types";
import { ReduxState } from "../../../redux/redux-state";
import DotaSeriesListContainer from "./list-view/DotaSeriesListContainer";
import DotaSeriesCalendarContainer from "./DotaSeriesCalendarContainer";

interface StateProps extends RouteComponentProps<any> {
  dota: DotaState;
}
interface DispatchProps {
  getDotaSeries;
  selectDotaSeries;
}
type Props = StateProps & DispatchProps;
interface State {
  isListView: boolean;
}

class DotaSeriesPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isListView: false
    };
  }

  componentDidMount() {
    if (!this.props.dota.series.length) this.props.getDotaSeries();
  }

  toggleView = () =>
    this.setState(prevState => ({
      isListView: !prevState.isListView
    }));

  selectTournament = info => {
    const { history, dota } = this.props;
    const selectedSeries = dota.series.find(s => s.id == info.event.id);
    this.props.selectDotaSeries(selectedSeries);
    if (history) history.push(`/esports/dota/${info.event.id}`);
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2</h1>
        </div>
        {this.state.isListView ? (
          <DotaSeriesListContainer />
        ) : (
          <DotaSeriesCalendarContainer
            series={this.props.dota.series}
            selectTournament={this.selectTournament}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  dota: state.dota
});

const mapDispatchToProps = {
  getDotaSeries,
  selectDotaSeries
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DotaSeriesPage);
