import type { api } from 'convex/_generated/api'

export type Team = (typeof api.myFunctions.listTeams._returnType.teams)[0]
export type Teams = Array<Team>
export type Matchup =
  (typeof api.myFunctions.listMatchups._returnType.matchups)[0]
export type Matchups = Array<Matchup>
// export const Leagues = typeof api.myFunctions.listLeagues._returnType.leagues
