import React from 'react';
import { Row, Col } from 'antd';
import { string, array } from 'prop-types';

import EplMatchSchedule from './EplMatchSchedule';

FootballScheduleSection.propTypes = {
  header: string,
  games: array.isRequired,
  values: array.isRequired
};

function FootballScheduleSection({ header, games, values }) {
  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      <Row>
        <Col span={7}><h3>Away Team</h3></Col>
        <Col span={2} />
        <Col span={7}><h3>Home Team</h3></Col>
        <Col span={8} />
      </Row>
      {values.length < 1 ? (
        games.map((g, i) => <EplMatchSchedule key={i} game={g} />)
      ) : (
        games.map((g, i) => {
          if (values.some(x => x == g.homeTeam_id || x == g.awayTeam_id)) {
            return <EplMatchSchedule key={i} game={g} />;
          }
        })
      )}
    </div>
  );
}

export default FootballScheduleSection;