import * as React from "react";
import { Row, Col } from "antd";

import FootballMatchSchedule from "./FootballMatchSchedule";
import { FootballSchedule } from "../../../../types/football-api/football-schedule.model";
import FootballMatchScore from "./FootballMatchScore";

interface Props {
  header: string;
  games: FootballSchedule[];
  values: string[];
  isLoading: boolean;
  numToShow?: number;
}

function FootballScheduleSection({
  header,
  games,
  values,
  isLoading,
  numToShow
}: Props) {
  let gamesToShow: FootballSchedule[];

  if (values.length > 0)
    gamesToShow = games.filter(g =>
      values.some(
        selected =>
          selected === g.homeTeam.teamName || selected === g.awayTeam.teamName
      )
    );
  else gamesToShow = games.slice();

  if (header === "Upcoming" || header === "Past")
    gamesToShow = gamesToShow.slice(0, numToShow);

  return (
    <div className="margin-bot">
      <h2>{header}</h2>
      {gamesToShow.length ? (
        <Row>
          <Col span={8}>
            <h3>Away</h3>
          </Col>
          <Col span={8}>
            <h3>Home</h3>
          </Col>
          <Col span={8} />
        </Row>
      ) : (
        <Row>
          <Col span={8}>{!isLoading && "No games to display"}</Col>
        </Row>
      )}
      {gamesToShow.length > 0 &&
        gamesToShow.map((g, i) => {
          if (g.status === "Not Started")
            return <FootballMatchSchedule key={i} game={g} />;
          else return <FootballMatchScore key={i} game={g} />;
        })}
    </div>
  );
}

export default FootballScheduleSection;
