import { NbaSchedule } from "./nba-schedule.model";

export interface NbaSortedSchedule {
  gamesToday: NbaSchedule[];
  upcoming: NbaSchedule[];
  beforeToday: NbaSchedule[];
}